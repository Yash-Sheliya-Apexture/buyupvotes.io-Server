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






import app from './app.js';
import https from 'https';
import http from 'http';
import fs from 'fs';

const PORT = process.env.PORT || 5000;
const HTTPS_PORT = 443;

// Continue to serve HTTP for backward compatibility
http.createServer(app).listen(PORT, () => {
    console.log(`HTTP Server is running on port ${PORT}`);
});

// Add HTTPS server
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