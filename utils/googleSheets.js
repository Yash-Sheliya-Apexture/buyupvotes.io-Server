import { google } from 'googleapis';

// Authenticate Google Sheets API
export const authenticateGoogleSheets = () => {
  try {
    const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n');

    if (!clientEmail || !privateKey) {
      throw new Error('Google Sheets credentials are missing.');
    }

    return new google.auth.JWT(
      clientEmail,
      null,
      privateKey,
      ['https://www.googleapis.com/auth/spreadsheets']
    );
  } catch (err) {
    console.error('Authentication error:', err.message);
    throw err;
  }
};

// Function to append data to Google Sheets
export const appendDataToSheet = async (data) => {
  console.log('Data being appended:', data); // Log data to inspect it

  const auth = authenticateGoogleSheets(); // Get authenticated client
  const sheets = google.sheets({ version: 'v4', auth });

  const spreadsheetId = '16mjIgnRXcoxXw9Se404dSeO2Y9oRRvGaCk8C9HlYysM'; // Replace with your Google Sheets ID

  // Prepare data to append
  const values = [
    [
      data.orderId,          // 1. Order ID
      data.userId,           // 2. User ID
      data.service,          // 3. Service
      data.speed,            // 4. Delivery Speed
      data.link,             // 5. Link
      data.quantity,         // 6. Quantity Votes
      new Date().toLocaleString(), // 7. Date (automatically generated)
      data.status || 'Pending',   // 8. Status (default to 'Pending')
    ],
  ];

  const resource = { values };

  try {
    // Fetch the current data to determine the next available row
    const currentData = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Sheet1!A:A', // Column A to get the current row count
    });

    // Check if the first row (header row) exists; if not, create it
    const headerExists = currentData.data.values && currentData.data.values.length > 0;
    if (!headerExists) {
      // Add headers to the first row in the correct column order
      const headers = [
        ['Order ID', 'User ID', 'Service', 'Delivery Speed', 'Link', 'Total Votes', 'Date', 'Status']
      ];
      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: 'Sheet1!A1:H1', // Header range
        valueInputOption: 'RAW',
        resource: { values: headers },
      });
      console.log('Headers added to the sheet.');
    }

    // Get the next available row (based on the number of rows in Column A)
    const nextRow = currentData.data.values ? currentData.data.values.length + 1 : 2; // Start from row 2 if headers were added

    // Append the new data to the next available row
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `Sheet1!A${nextRow}:H${nextRow}`, // Updated range to include all columns
      valueInputOption: 'RAW',
      resource,
    });

    // Add dropdown options to the "Status" column (Column H)
    const statusValidation = {
      requests: [
        {
          setDataValidation: {
            range: {
              sheetId: 0, // Assuming this is the first sheet
              startRowIndex: 1, // Start from the second row (data only, not headers)
              endRowIndex: 1000, // Apply to the first 1000 rows (adjust as needed)
              startColumnIndex: 7, // Column H (Status) index
              endColumnIndex: 8,   // End at Column H
            },
            rule: {
              condition: {
                type: 'ONE_OF_LIST',
                values: [
                  { userEnteredValue: 'In Progress' },
                  { userEnteredValue: 'Completed' },
                  { userEnteredValue: 'Pending' },
                  { userEnteredValue: 'Canceled' },
                  { userEnteredValue: 'Partial' },
                ],
              },
              showCustomUi: true, // Show dropdown UI in Google Sheets
            },
          },
        },
      ],
    };

    await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: statusValidation,
    });

    // Add conditional formatting to the "Status" column
    const conditionalFormatting = {
      requests: [
        // Green for "In Progress"
        {
          addConditionalFormatRule: {
            rule: {
              ranges: [
                {
                  sheetId: 0,
                  startRowIndex: 1,
                  startColumnIndex: 7,
                  endColumnIndex: 8,
                },
              ],
              booleanRule: {
                condition: {
                  type: 'TEXT_EQ',
                  values: [{ userEnteredValue: 'In Progress' }],
                },
                format: {
                  backgroundColor: { red: 0, green: 1, blue: 0 },
                },
              },
            },
            index: 0,
          },
        },
        // Blue for "Completed"
        {
          addConditionalFormatRule: {
            rule: {
              ranges: [
                {
                  sheetId: 0,
                  startRowIndex: 1,
                  startColumnIndex: 7,
                  endColumnIndex: 8,
                },
              ],
              booleanRule: {
                condition: {
                  type: 'TEXT_EQ',
                  values: [{ userEnteredValue: 'Completed' }],
                },
                format: {
                  backgroundColor: { red: 0, green: 0, blue: 1 },
                },
              },
            },
            index: 1,
          },
        },
        // Yellow for "Pending"
        {
          addConditionalFormatRule: {
            rule: {
              ranges: [
                {
                  sheetId: 0,
                  startRowIndex: 1,
                  startColumnIndex: 7,
                  endColumnIndex: 8,
                },
              ],
              booleanRule: {
                condition: {
                  type: 'TEXT_EQ',
                  values: [{ userEnteredValue: 'Pending' }],
                },
                format: {
                  backgroundColor: { red: 1, green: 1, blue: 0 },
                },
              },
            },
            index: 2,
          },
        },
        // Red for "Canceled"
        {
          addConditionalFormatRule: {
            rule: {
              ranges: [
                {
                  sheetId: 0,
                  startRowIndex: 1,
                  startColumnIndex: 7,
                  endColumnIndex: 8,
                },
              ],
              booleanRule: {
                condition: {
                  type: 'TEXT_EQ',
                  values: [{ userEnteredValue: 'Canceled' }],
                },
                format: {
                  backgroundColor: { red: 1, green: 0, blue: 0 },
                },
              },
            },
            index: 3,
          },
        },
        // Orange for "Partial"
        {
          addConditionalFormatRule: {
            rule: {
              ranges: [
                {
                  sheetId: 0,
                  startRowIndex: 1,
                  startColumnIndex: 7,
                  endColumnIndex: 8,
                },
              ],
              booleanRule: {
                condition: {
                  type: 'TEXT_EQ',
                  values: [{ userEnteredValue: 'Partial' }],
                },
                format: {
                  backgroundColor: { red: 1, green: 0.5, blue: 0 },
                },
              },
            },
            index: 4,
          },
        },
      ],
    };

    await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: conditionalFormatting,
    });

    console.log('Data appended successfully with dropdown and conditional formatting applied.');
  } catch (error) {
    console.error('Error appending data to the sheet:', error);
    throw new Error('Failed to append data to Google Sheets.');
  }
};

export const getOrdersFromSheet = async () => {
  const auth = authenticateGoogleSheets();
  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = '16mjIgnRXcoxXw9Se404dSeO2Y9oRRvGaCk8C9HlYysM';  // Your Google Sheet ID

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Sheet1!A:H',
    });

    return response.data.values.slice(1).map(row => ({
      orderId: row[0],
      userId: row[1],
      service: row[2],
      speed: row[3],
      link: row[4],
      quantity: row[5],
      date: row[6],
      status: row[7],
    }));
  } catch (err) {
    console.error('Error fetching orders from Google Sheets:', err.message);
    throw err;
  }
};


