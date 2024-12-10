import { google } from 'googleapis';

// Authenticate Google Sheets API using environment variables
export const authenticateGoogleSheets = () => {
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n');  // Fix multiline private key

  const auth = new google.auth.JWT(
    clientEmail,
    null,
    privateKey,
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

// Fetch data from Google Sheets
export const fetchSheetData = async () => {
  const auth = authenticateGoogleSheets();
  const sheets = google.sheets({ version: 'v4', auth });

  const spreadsheetId = '16mjIgnRXcoxXw9Se404dSeO2Y9oRRvGaCk8C9HlYysM';

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Sheet1!A:E', // Get all columns A through E
    });

    const rows = response.data.values || [];
    
    // Skip header row if it exists and map the data
    const data = rows.slice(1).map(row => ({
      service: row[0] || '',
      speed: row[1] || '',
      link: row[2] || '',
      quantity: row[3] || '',
      date: row[4] || ''
    }));

    return data;
  } catch (error) {
    console.error('Error fetching data from sheet:', error);
    throw new Error('Failed to fetch data from Google Sheets');
  }
};

