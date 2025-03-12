// import app from './app.js';

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });


// // server.js
// import app from './app.js';

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// import app from './app.js';

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });






// import app from './app.js';
// import https from 'https';
// import http from 'http';
// import fs from 'fs';

// const PORT = process.env.PORT || 5000;
// const HTTPS_PORT = 443;

// // Continue to serve HTTP for backward compatibility
// http.createServer(app).listen(PORT, () => {
//     console.log(`HTTP Server is running on port ${PORT}`);
// });

// // Add HTTPS server
// try {
//     const httpsOptions = {
//         key: fs.readFileSync('/etc/letsencrypt/live/api.redditmarketing.company/privkey.pem'),
//         cert: fs.readFileSync('/etc/letsencrypt/live/api.redditmarketing.company/fullchain.pem')
//     };

//     https.createServer(httpsOptions, app).listen(HTTPS_PORT, () => {
//         console.log(`HTTPS Server is running on port ${HTTPS_PORT}`);
//     });
// } catch (error) {
//     console.error('Failed to start HTTPS server:', error.message);
// }




// import app from './app.js';
// import https from 'https';
// import http from 'http';
// import fs from 'fs';

// const PORT = process.env.PORT || 5000;
// const HTTPS_PORT = 443;

// // Start HTTP server
// http.createServer(app).listen(PORT, () => {
//     console.log(`HTTP Server is running on port ${PORT}`);
// });

// // Conditionally start HTTPS server based on environment or flag
// if (process.env.NODE_ENV === 'production' || process.env.USE_HTTPS === 'true') {  // Check NODE_ENV or custom flag
//     try {
//         const httpsOptions = {
//             key: fs.readFileSync('/etc/letsencrypt/live/api.redditmarketing.company/privkey.pem'),
//             cert: fs.readFileSync('/etc/letsencrypt/live/api.redditmarketing.company/fullchain.pem')
//         };

//         https.createServer(httpsOptions, app).listen(HTTPS_PORT, () => {
//             console.log(`HTTPS Server is running on port ${HTTPS_PORT}`);
//         });
//     } catch (error) {
//         console.error('Failed to start HTTPS server:', error.message);
//     }
// } else {
//     console.log("HTTPS server not started (running in development or USE_HTTPS is false).");
// }


import app from './app.js';
import https from 'https';
import http from 'http';
import fs from 'fs';

const PORT = process.env.PORT || 5000;
const HTTPS_PORT = 443;

// Start HTTP server
http.createServer(app).listen(PORT, () => {
    console.log(`HTTP Server is running on port ${PORT}`);
});

// Conditionally start HTTPS server based on environment or flag
if (process.env.NODE_ENV === 'production' || process.env.USE_HTTPS === 'true') {
    try {
        const httpsOptions = {
            key: fs.readFileSync('/etc/letsencrypt/live/api.redditmarketing.company/privkey.pem'),
            cert: fs.readFileSync('/etc/letsencrypt/live/api.redditmarketing.company/fullchain.pem')
        };

        https.createServer(httpsOptions, app).listen(HTTPS_PORT, () => {
            console.log(`HTTPS Server is running on port ${HTTPS_PORT}`);
        });
    } catch (error) {
        console.error('Failed to start HTTPS server:', error.message);
    }
} else {
    console.log("HTTPS server not started (running in development or USE_HTTPS is false).");
}




// import app from './app.js';
// import https from 'https';
// import http from 'http';
// import fs from 'fs';

// const PORT = process.env.PORT || 5000;
// const HTTPS_PORT = 443;

// // Start HTTP server
// http.createServer(app).listen(PORT, () => {
//     console.log(`HTTP Server is running on port ${PORT}`);
// });

// // Conditionally start HTTPS server
// const startHttpsServer = async () => {
//     try {
//         const keyPath = '/etc/letsencrypt/live/api.redditmarketing.company/privkey.pem';
//         const certPath = '/etc/letsencrypt/live/api.redditmarketing.company/fullchain.pem';

//         // Check if the key and certificate files exist
//         if (!fs.existsSync(keyPath) || !fs.existsSync(certPath)) {
//             console.warn('HTTPS key or certificate file not found. Skipping HTTPS server.');
//             return;
//         }

//         const httpsOptions = {
//             key: fs.readFileSync(keyPath),
//             cert: fs.readFileSync(certPath)
//         };

//         https.createServer(httpsOptions, app).listen(HTTPS_PORT, () => {
//             console.log(`HTTPS Server is running on port ${HTTPS_PORT}`);
//         });
//     } catch (error) {
//         console.error('Failed to start HTTPS server:', error);
//     }
// };

// if (process.env.NODE_ENV === 'production' || process.env.USE_HTTPS === 'true') {
//     startHttpsServer();
// } else {
//     console.log("HTTPS server not started (running in development or USE_HTTPS is false).");
// }