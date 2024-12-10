import { google } from 'googleapis';
import credentials from './google-credentials.json' assert { type: 'json' };

// Authenticate Google Sheets API
export const authenticateGoogleSheets = () => { // Export the function
  const { client_email, private_key } = credentials;

  const auth = new google.auth.JWT(
    client_email,
    null,
    private_key,
    ['https://www.googleapis.com/auth/spreadsheets']
  );

  return auth; // Return the auth object
};

// Append data to Google Sheets
export const appendDataToSheet = async (data) => {
  const auth = authenticateGoogleSheets(); // Get authenticated client
  const sheets = google.sheets({ version: 'v4', auth });

  const spreadsheetId = '16mjIgnRXcoxXw9Se404dSeO2Y9oRRvGaCk8C9HlYysM'; // Replace with your Google Sheets ID

  const values = [
    [
      data.service,
      data.speed,
      data.link,
      data.quantity,
      new Date().toLocaleString(), 
    ], // Row of data
  ];

  const resource = {
    values,
  };

  try {
    // Fetch the current data to determine the next available row
    const currentData = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Sheet1!A:A', // Column A to get the current row count
    });

    // Get the next available row (based on the number of rows in Column A)
    const nextRow = currentData.data.values ? currentData.data.values.length + 1 : 1; // Default to 1 if no data

    // Append the new data to the next available row
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `Sheet1!A${nextRow}:E${nextRow}`, // Dynamically setting the row range
      valueInputOption: 'RAW',
      resource,
    });

    console.log('Data successfully added to Google Sheets');
  } catch (error) {
    console.error('Error appending data to sheet:', error);
    throw new Error('Failed to append data to Google Sheets');
  }
};
