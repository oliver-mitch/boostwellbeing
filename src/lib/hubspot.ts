// HubSpot API integration for contact form submissions

interface HubSpotContactData {
  email: string;
  firstname: string;
  lastname: string;
  phone: string;
  company: string;
  number_of_employees?: string;
  message?: string;
}

interface HubSpotDealData {
  dealname: string;
  pipeline: string;
  dealstage: string;
  amount?: string;
}

/**
 * Create or update a contact in HubSpot
 */
export async function createHubSpotContact(data: HubSpotContactData): Promise<any> {
  const apiKey = process.env.HUBSPOT_API_KEY;

  if (!apiKey) {
    console.warn('HubSpot API key not configured. Skipping HubSpot integration.');
    return null;
  }

  try {
    // Split full name into first and last name
    const nameParts = data.firstname.split(' ');
    const firstname = nameParts[0] || '';
    const lastname = nameParts.slice(1).join(' ') || '';

    // Prepare contact properties (only standard HubSpot properties)
    const properties = {
      email: data.email,
      firstname: firstname,
      lastname: lastname,
      phone: data.phone,
      company: data.company,
      lifecyclestage: 'lead',
    };

    // Create or update contact using email as unique identifier
    const response = await fetch(
      `https://api.hubapi.com/crm/v3/objects/contacts`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({ properties }),
      }
    );

    if (!response.ok) {
      // If contact already exists, try to update instead
      if (response.status === 409) {
        console.log('Contact already exists, updating instead...');
        return await updateHubSpotContact(data);
      }

      const errorData = await response.text();
      console.error('HubSpot API error:', response.status, errorData);
      throw new Error(`HubSpot API error: ${response.status}`);
    }

    const result = await response.json();
    console.log('HubSpot contact created:', result.id);

    // Add note with the message and employee count
    await addNoteToContact(result.id, data.message, data.number_of_employees);

    return result;
  } catch (error) {
    console.error('Error creating HubSpot contact:', error);
    // Don't throw - we don't want HubSpot errors to break the contact form
    return null;
  }
}

/**
 * Update an existing contact in HubSpot by email
 */
async function updateHubSpotContact(data: HubSpotContactData): Promise<any> {
  const apiKey = process.env.HUBSPOT_API_KEY;

  if (!apiKey) {
    return null;
  }

  try {
    // First, search for the contact by email
    const searchResponse = await fetch(
      `https://api.hubapi.com/crm/v3/objects/contacts/search`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          filterGroups: [
            {
              filters: [
                {
                  propertyName: 'email',
                  operator: 'EQ',
                  value: data.email,
                },
              ],
            },
          ],
        }),
      }
    );

    if (!searchResponse.ok) {
      throw new Error('Failed to search for contact');
    }

    const searchResult = await searchResponse.json();

    if (searchResult.results && searchResult.results.length > 0) {
      const contactId = searchResult.results[0].id;

      // Update the contact
      const nameParts = data.firstname.split(' ');
      const firstname = nameParts[0] || '';
      const lastname = nameParts.slice(1).join(' ') || '';

      const properties = {
        firstname: firstname,
        lastname: lastname,
        phone: data.phone,
        company: data.company,
      };

      const updateResponse = await fetch(
        `https://api.hubapi.com/crm/v3/objects/contacts/${contactId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
          },
          body: JSON.stringify({ properties }),
        }
      );

      const result = await updateResponse.json();
      console.log('HubSpot contact updated:', contactId);

      // Add note with the new message and employee count
      await addNoteToContact(contactId, data.message, data.number_of_employees);

      return result;
    }
  } catch (error) {
    console.error('Error updating HubSpot contact:', error);
    return null;
  }
}

/**
 * Add a note to a contact in HubSpot
 */
async function addNoteToContact(contactId: string, message?: string, numberOfEmployees?: string): Promise<any> {
  const apiKey = process.env.HUBSPOT_API_KEY;

  if (!apiKey) {
    return null;
  }

  try {
    // Build note body with all available information
    let noteBody = 'Contact Form Submission:\n\n';
    if (numberOfEmployees) {
      noteBody += `Number of Employees: ${numberOfEmployees}\n\n`;
    }
    if (message) {
      noteBody += `Message: ${message}\n\n`;
    }
    noteBody += `Submitted: ${new Date().toLocaleString('en-NZ', { timeZone: 'Pacific/Auckland' })}`;

    const response = await fetch(
      `https://api.hubapi.com/crm/v3/objects/notes`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          properties: {
            hs_note_body: noteBody,
            hs_timestamp: new Date().toISOString(),
          },
          associations: [
            {
              to: {
                id: contactId,
              },
              types: [
                {
                  associationCategory: 'HUBSPOT_DEFINED',
                  associationTypeId: 202, // Note to Contact association
                },
              ],
            },
          ],
        }),
      }
    );

    if (response.ok) {
      const result = await response.json();
      console.log('Note added to HubSpot contact:', result.id);
      return result;
    }
  } catch (error) {
    console.error('Error adding note to HubSpot contact:', error);
  }

  return null;
}

/**
 * Create a deal in HubSpot associated with a contact
 */
export async function createHubSpotDeal(
  contactId: string,
  dealData: Partial<HubSpotDealData>
): Promise<any> {
  const apiKey = process.env.HUBSPOT_API_KEY;

  if (!apiKey) {
    console.warn('HubSpot API key not configured. Skipping deal creation.');
    return null;
  }

  try {
    const properties = {
      dealname: dealData.dealname || 'New Contact Form Inquiry',
      pipeline: dealData.pipeline || 'default',
      dealstage: dealData.dealstage || 'appointmentscheduled',
      amount: dealData.amount || '0',
      closedate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
    };

    const response = await fetch(
      `https://api.hubapi.com/crm/v3/objects/deals`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          properties,
          associations: [
            {
              to: {
                id: contactId,
              },
              types: [
                {
                  associationCategory: 'HUBSPOT_DEFINED',
                  associationTypeId: 3, // Deal to Contact association
                },
              ],
            },
          ],
        }),
      }
    );

    if (response.ok) {
      const result = await response.json();
      console.log('HubSpot deal created:', result.id);
      return result;
    } else {
      const errorData = await response.text();
      console.error('HubSpot deal creation error:', response.status, errorData);
    }
  } catch (error) {
    console.error('Error creating HubSpot deal:', error);
  }

  return null;
}

/**
 * Check if HubSpot integration is configured
 */
export function isHubSpotConfigured(): boolean {
  return Boolean(process.env.HUBSPOT_API_KEY);
}
