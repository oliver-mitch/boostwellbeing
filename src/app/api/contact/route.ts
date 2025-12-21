import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { createHubSpotContact, createHubSpotDeal, createHubSpotCompany, isHubSpotConfigured } from '@/lib/hubspot';

interface ContactFormData {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  numberOfEmployees: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const data: ContactFormData = await request.json();

    // Validate required fields
    if (!data.fullName || !data.companyName || !data.email || !data.phone || !data.numberOfEmployees) {
      return NextResponse.json(
        { error: 'All required fields must be filled' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // STEP 1: Send to HubSpot first (primary system)
    let hubspotSuccess = false;
    if (isHubSpotConfigured()) {
      try {
        console.log('Creating HubSpot records...');

        // 1. Create or find Company
        const hubspotCompany = await createHubSpotCompany({
          name: data.companyName,
          phone: data.phone,
          number_of_employees: data.numberOfEmployees,
        });

        // 2. Create Contact and associate with Company
        const hubspotContact = await createHubSpotContact(
          {
            email: data.email,
            firstname: data.fullName,
            lastname: '', // Will be split from fullName in the function
            phone: data.phone,
            company: data.companyName,
            number_of_employees: data.numberOfEmployees,
            message: data.message,
          },
          hubspotCompany?.id // Associate with company if created
        );

        // 3. Create a Deal for this inquiry
        if (hubspotContact && hubspotContact.id) {
          await createHubSpotDeal(hubspotContact.id, {
            dealname: `${data.companyName} - Contact Form Inquiry`,
            dealstage: 'appointmentscheduled',
          });
          console.log('HubSpot company, contact, and deal created successfully');
          hubspotSuccess = true;
        }
      } catch (hubspotError) {
        console.error('HubSpot integration error:', hubspotError);
        // Continue to Supabase backup even if HubSpot fails
      }
    } else {
      console.log('HubSpot not configured - skipping integration');
    }

    // STEP 2: Save to Supabase as backup/record keeping
    const { error: dbError } = await supabase
      .from('contact_submissions')
      .insert({
        full_name: data.fullName,
        company_name: data.companyName,
        email: data.email,
        phone: data.phone,
        number_of_employees: data.numberOfEmployees,
        message: data.message || '',
        status: hubspotSuccess ? 'new' : 'pending_hubspot_sync',
      });

    if (dbError) {
      console.error('Database error:', dbError);
      // If both HubSpot and Supabase fail, return error
      if (!hubspotSuccess) {
        return NextResponse.json(
          { error: 'Failed to save your submission. Please try again or email us directly.' },
          { status: 500 }
        );
      }
    }

    // Log submission for monitoring
    console.log('=== NEW CONTACT FORM SUBMISSION ===');
    console.log(`Name: ${data.fullName}`);
    console.log(`Company: ${data.companyName}`);
    console.log(`Email: ${data.email}`);
    console.log(`HubSpot: ${hubspotSuccess ? 'Success' : 'Failed'}`);
    console.log(`Supabase: ${dbError ? 'Failed' : 'Success'}`);
    console.log('===================================');

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you for your inquiry. We will contact you within 24 hours.',
      },
      { status: 200 }
    );
  } catch (err) {
    console.error('Contact form error:', err);
    return NextResponse.json(
      { error: 'An error occurred. Please try again or email us directly at contact@boostwellbeing.co.nz' },
      { status: 500 }
    );
  }
}
