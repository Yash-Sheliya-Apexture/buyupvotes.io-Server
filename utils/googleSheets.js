// import { google } from 'googleapis';

// // Authenticate Google Sheets API
// export const authenticateGoogleSheets = () => {
//     try {
//         const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
//         const privateKey = process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n');

//         if (!clientEmail || !privateKey) {
//             throw new Error('Google Sheets credentials are missing.');
//         }

//         return new google.auth.JWT(
//             clientEmail,
//             null,
//             privateKey,
//             ['https://www.googleapis.com/auth/spreadsheets']
//         );
//     } catch (err) {
//         console.error('Authentication error:', err.message);
//         throw err;
//     }
// };

// // Helper function to get the current date in 'YYYY-MM-DD HH:mm:ss' format
// const getCurrentDate = () => {
//     const now = new Date();
//     const year = now.getFullYear();
//     const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-based
//     const day = String(now.getDate()).padStart(2, '0');
//     const hours = String(now.getHours()).padStart(2, '0');
//     const minutes = String(now.getMinutes()).padStart(2, '0');
//     const seconds = String(now.getSeconds()).padStart(2, '0');
//     return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
// };


// // Function to append data to Google Sheets
// export const appendDataToSheet = async (data) => {
//     console.log('Data being appended:', data);

//     const auth = authenticateGoogleSheets();
//     const sheets = google.sheets({ version: 'v4', auth });

//   const spreadsheetId = '16mjIgnRXcoxXw9Se404dSeO2Y9oRRvGaCk8C9HlYysM';
//     // Default to "-" for started if not provided or invalid
//     const startedValue = (data.started && !isNaN(data.started)) ? data.started : 'Not Started';
//     const completedVotesValue = data.completedVotes != null ?  data.completedVotes : 0 // Default completedVotes to 0

//     // Prepare data to append
//     const values = [
//         [
//             data.orderId || '',            // 1. Order ID
//             data.userId || '',             // 2. User ID
//             data.service || '',            // 3. Service
//             data.speed || '',              // 4. Delivery Speed
//             data.link || '',               // 5. Link
//             data.quantity || '',           // 6. Quantity Votes
//             getCurrentDate(),              // 7. Date
//             data.status || 'Pending',      // 8. Status
//             completedVotesValue,     // 9. Completed Votes
//             startedValue                   // 10. Started
//         ],
//     ];

//     const resource = { values };

//     try {
//         // Fetch the current data to determine the next available row
//         const currentData = await sheets.spreadsheets.values.get({
//             spreadsheetId,
//             range: 'Sheet1!A1:J1',
//         });

//         if (!currentData.data.values || currentData.data.values.length === 0) {
//             const headers = [
//                 ['Order ID', 'User ID', 'Service', 'Delivery Speed', 'Link',  'Quantity Votes','Date', 'Status', 'Completed Votes', 'Started']
//             ];
//             await sheets.spreadsheets.values.update({
//                 spreadsheetId,
//                 range: 'Sheet1!A1:J1',
//                 valueInputOption: 'RAW',
//                 resource: { values: headers },
//             });
//             console.log('Headers added to the sheet.');
//         }
//       // Get the next available row (based on the number of rows in Column A)
//       const nextRow = currentData.data.values ? currentData.data.values.length + 1 : 2; // Start from row 2 if headers were added


//         // Append the new data to the next available row
//          await sheets.spreadsheets.values.append({
//              spreadsheetId,
//                 range: `Sheet1!A${nextRow}:J${nextRow}`,
//             valueInputOption: 'RAW',
//                 resource,
//          });


//         // Add dropdown options to the "Status" column (Column I)
//         const statusValidation = {
//             requests: [
//                 {
//                     setDataValidation: {
//                         range: {
//                             sheetId: 0,
//                             startRowIndex: 1,
//                             endRowIndex: 1000,
//                             startColumnIndex: 7,
//                             endColumnIndex: 8,
//                         },
//                         rule: {
//                             condition: {
//                                 type: 'ONE_OF_LIST',
//                                 values: [
//                                     { userEnteredValue: 'In Progress' },
//                                     { userEnteredValue: 'Completed' },
//                                     { userEnteredValue: 'Pending' },
//                                     { userEnteredValue: 'Canceled' },
//                                     { userEnteredValue: 'Partial' },
//                                 ],
//                             },
//                             showCustomUi: true,
//                         },
//                     },
//                 },
//             ],
//         };

//         await sheets.spreadsheets.batchUpdate({
//             spreadsheetId,
//             requestBody: statusValidation,
//         });



//         // Add conditional formatting to the "Status" column
//     const conditionalFormatting = {
//       requests: [
//           // Green for "In Progress"
//           {
//               addConditionalFormatRule: {
//                   rule: {
//                       ranges: [
//                           {
//                               sheetId: 0,
//                               startRowIndex: 1,
//                               startColumnIndex: 7,
//                               endColumnIndex: 8,
//                           },
//                       ],
//                       booleanRule: {
//                           condition: {
//                               type: 'TEXT_EQ',
//                               values: [{ userEnteredValue: 'In Progress' }],
//                           },
//                           format: {
//                               backgroundColor: { red: 0, green: 1, blue: 0 },
//                           },
//                       },
//                   },
//                   index: 0,
//               },
//           },
//           // Blue for "Completed"
//           {
//               addConditionalFormatRule: {
//                   rule: {
//                       ranges: [
//                           {
//                               sheetId: 0,
//                               startRowIndex: 1,
//                               startColumnIndex: 7,
//                               endColumnIndex: 8,
//                           },
//                       ],
//                       booleanRule: {
//                           condition: {
//                               type: 'TEXT_EQ',
//                               values: [{ userEnteredValue: 'Completed' }],
//                           },
//                           format: {
//                               backgroundColor: { red: 0, green: 0, blue: 1 },
//                           },
//                       },
//                   },
//                   index: 1,
//               },
//           },
//           // Yellow for "Pending"
//           {
//               addConditionalFormatRule: {
//                   rule: {
//                       ranges: [
//                           {
//                               sheetId: 0,
//                               startRowIndex: 1,
//                               startColumnIndex: 7,
//                               endColumnIndex: 8,
//                           },
//                       ],
//                       booleanRule: {
//                           condition: {
//                               type: 'TEXT_EQ',
//                               values: [{ userEnteredValue: 'Pending' }],
//                           },
//                           format: {
//                               backgroundColor: { red: 1, green: 1, blue: 0 },
//                           },
//                       },
//                   },
//                   index: 2,
//               },
//           },
//           // Red for "Canceled"
//           {
//               addConditionalFormatRule: {
//                   rule: {
//                       ranges: [
//                           {
//                               sheetId: 0,
//                               startRowIndex: 1,
//                               startColumnIndex: 7,
//                               endColumnIndex: 8,
//                           },
//                       ],
//                       booleanRule: {
//                           condition: {
//                               type: 'TEXT_EQ',
//                               values: [{ userEnteredValue: 'Canceled' }],
//                           },
//                           format: {
//                               backgroundColor: { red: 1, green: 0, blue: 0 },
//                           },
//                       },
//                   },
//                   index: 3,
//               },
//           },
//           // Orange for "Partial"
//           {
//               addConditionalFormatRule: {
//                   rule: {
//                       ranges: [
//                           {
//                               sheetId: 0,
//                               startRowIndex: 1,
//                               startColumnIndex: 7,
//                               endColumnIndex: 8,
//                           },
//                       ],
//                       booleanRule: {
//                           condition: {
//                               type: 'TEXT_EQ',
//                               values: [{ userEnteredValue: 'Partial' }],
//                           },
//                           format: {
//                               backgroundColor: { red: 1, green: 0.5, blue: 0 },
//                           },
//                       },
//                   },
//                   index: 4,
//               },
//           },
//       ],
//     };

//     await sheets.spreadsheets.batchUpdate({
//       spreadsheetId,
//       requestBody: conditionalFormatting,
//     });

//         console.log('Data appended successfully with dropdown and conditional formatting applied.');
//     } catch (error) {
//         console.error('Error appending data to the sheet:', error);
//         throw new Error('Failed to append data to Google Sheets.');
//     }
// };

// export const getOrdersFromSheet = async () => {
//     const auth = authenticateGoogleSheets();
//     const sheets = google.sheets({ version: 'v4', auth });
//   const spreadsheetId = '16mjIgnRXcoxXw9Se404dSeO2Y9oRRvGaCk8C9HlYysM';  // Your Google Sheet ID


//     try {
//         const response = await sheets.spreadsheets.values.get({
//             spreadsheetId,
//             range: 'Sheet1!A1:J',
//         });

//         console.log('Response from Google Sheets:', response.data);
//         if (!response.data.values || response.data.values.length === 0) {
//             throw new Error('No data found in the sheet.');
//         }

//         return response.data.values.slice(1).map(row => ({
//              orderId: row[0] || '',
//             userId: row[1] || '',
//             service: row[2] || '',
//             speed: row[3] || '',
//             link: row[4] || '',
//             quantity: row[5] || '',
//             date: row[6] || '',
//             status: row[7] || 'Pending',
//             completedVotes: row[8] || '0',
//             started: row[9] && row[9] !== '-' ? row[9] : 'Not Started',
//         }));
//     } catch (err) {
//         console.error('Error fetching orders from Google Sheets:', err.message);
//         throw err;
//     }
// };


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

// Helper function to get the current date in 'YYYY-MM-DD HH:mm:ss' format
const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};


// Function to append data to Google Sheets
export const appendDataToSheet = async (data) => {
    console.log('Data being appended:', data);

    const auth = authenticateGoogleSheets();
    const sheets = google.sheets({ version: 'v4', auth });

    const spreadsheetId = '16mjIgnRXcoxXw9Se404dSeO2Y9oRRvGaCk8C9HlYysM';
    // Default to "-" for started if not provided or invalid
    const startedValue = (data.started && !isNaN(data.started)) ? String(data.started) : 'Not Started';
    const completedVotesValue = data.completedVotes != null ? String(data.completedVotes) : '0' // Default completedVotes to 0

    // Prepare data to append
    const values = [
        [
            String(data.orderId) || '',            // 1. Order ID
            String(data.userId) || '',             // 2. User ID
            String(data.service) || '',            // 3. Service
            String(data.speed) || '',              // 4. Delivery Speed
            String(data.link) || '',               // 5. Link
            String(data.quantity) || '',           // 6. Quantity Votes
            getCurrentDate(),              // 7. Date
            String(data.status) || 'Pending',      // 8. Status
            completedVotesValue,     // 9. Completed Votes
            startedValue                   // 10. Started
        ],
    ];

    const resource = { values };

    try {
        // Fetch the current data to determine the next available row
        const currentData = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range: 'Sheet1!A1:J1',
        });

        if (!currentData.data.values || currentData.data.values.length === 0) {
            const headers = [
                ['Order ID', 'User ID', 'Service', 'Delivery Speed', 'Link', 'Quantity Votes', 'Date', 'Status', 'Completed Votes', 'Started']
            ];
            await sheets.spreadsheets.values.update({
                spreadsheetId,
                range: 'Sheet1!A1:J1',
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
            range: `Sheet1!A${nextRow}:J${nextRow}`,
            valueInputOption: 'RAW',
            resource,
        });


        // Add dropdown options to the "Status" column (Column I)
        const statusValidation = {
            requests: [
                {
                    setDataValidation: {
                        range: {
                            sheetId: 0,
                            startRowIndex: 1,
                            endRowIndex: 1000,
                            startColumnIndex: 7,
                            endColumnIndex: 8,
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
                            showCustomUi: true,
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
            range: 'Sheet1!A1:J',
        });

        console.log('Response from Google Sheets:', response.data);
        if (!response.data.values || response.data.values.length === 0) {
            return [];
        }

        return response.data.values.slice(1).map(row => ({
            orderId: String(row[0] || ''),
            userId: String(row[1] || ''),
            service: String(row[2] || ''),
            speed: String(row[3] || ''),
            link: String(row[4] || ''),
            quantity: String(row[5] || ''),
            date: String(row[6] || ''),
            status: String(row[7] || 'Pending'),
            completedVotes: String(row[8] || '0'),
            started: String(row[9] && row[9] !== '-' ? row[9] : 'Not Started'),
        }));
    } catch (err) {
        console.error('Error fetching orders from Google Sheets:', err.message);
        throw new Error('Failed to fetch data from google sheet')
    }
};

export const updateDataFromSheet = async (orderId, newStatus) => {
  const auth = authenticateGoogleSheets();
  const sheets = google.sheets({ version: "v4", auth });
    const spreadsheetId = '16mjIgnRXcoxXw9Se404dSeO2Y9oRRvGaCk8C9HlYysM';

    try {
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range: "Sheet1",
        });

        const rows = response.data.values;
        if (!rows || rows.length <= 1) {
            return false; // No data or just the header
        }
        const orderIdIndex = rows[0].indexOf('Order ID');
        const statusIndex = rows[0].indexOf('Status');

        if (orderIdIndex === -1 || statusIndex === -1) return false;
        const rowIndexToUpdate = rows.findIndex(
            (row, index) => index !== 0 && String(row[orderIdIndex]) === orderId
        );
        if (rowIndexToUpdate === -1) {
            return false; // Order ID not found
        }

        // Update the status in the correct column
       await sheets.spreadsheets.values.update({
          spreadsheetId: spreadsheetId,
          range: `Sheet1!H${rowIndexToUpdate + 1}`,
            valueInputOption: 'RAW',
            resource: {
               values: [[newStatus]]
            }
        });
         console.log(`Order ${orderId} status updated to ${newStatus}`);
        return true;


    } catch (error) {
        console.error("Error updating data in Google Sheet:", error.message);
        throw new Error('Failed to update order in google sheet');
    }
};