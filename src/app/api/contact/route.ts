import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { createHubSpotContact, createHubSpotDeal, isHubSpotConfigured } from '@/lib/hubspot';

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

    // Save to database
    const { error: dbError } = await supabase
      .from('contact_submissions')
      .insert({
        full_name: data.fullName,
        company_name: data.companyName,
        email: data.email,
        phone: data.phone,
        number_of_employees: data.numberOfEmployees,
        message: data.message || '',
        status: 'new',
      });

    if (dbError) {
      console.error('Database error:', dbError);
      // Continue even if database insert fails - we'll still send the email
    }

    // Send email notification
    // For now, we'll use a simple approach - log to console
    // In production, integrate with SendGrid, Resend, or similar
    const emailContent = `
New Contact Form Submission

Name: ${data.fullName}
Company: ${data.companyName}
Email: ${data.email}
Phone: ${data.phone}
Number of Employees: ${data.numberOfEmployees}
Message: ${data.message || '(No message)'}

Submitted: ${new Date().toLocaleString('en-NZ', { timeZone: 'Pacific/Auckland' })}
    `.trim();

    console.log('=== NEW CONTACT FORM SUBMISSION ===');
    console.log(emailContent);
    console.log('===================================');

    // Send to HubSpot
    if (isHubSpotConfigured()) {
      try {
        const hubspotContact = await createHubSpotContact({
          email: data.email,
          firstname: data.fullName,
          lastname: '', // Will be split from fullName in the function
          phone: data.phone,
          company: data.companyName,
          number_of_employees: data.numberOfEmployees,
          message: data.message,
        });

        // Create a deal for this inquiry
        if (hubspotContact && hubspotContact.id) {
          await createHubSpotDeal(hubspotContact.id, {
            dealname: `${data.companyName} - Contact Form Inquiry`,
            dealstage: 'appointmentscheduled',
          });
          console.log('HubSpot contact and deal created successfully');
        }
      } catch (hubspotError) {
        console.error('HubSpot integration error:', hubspotError);
        // Don't fail the request if HubSpot fails
      }
    } else {
      console.log('HubSpot not configured - skipping integration');
    }

    // TODO: Send actual email
    // Example with SendGrid:
    // await sendEmail({
    //   to: 'contact@boostwellbeing.co.nz',
    //   from: 'noreply@boostwellbeing.co.nz',
    //   subject: `New Contact: ${data.fullName} from ${data.companyName}`,
    //   text: emailContent,
    // });

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
