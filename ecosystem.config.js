module.exports = {
  apps: [
    {
      name: 'redditmarketing.company',
      script: 'server.js',
      interpreter: 'bun',
      watch: false,
      autorestart: true,
      env: {
        NODE_ENV: 'production',
        USE_HTTPS: 'true',  // Add this for local development false
        GOOGLE_REDIRECT_URI: 'https://redditmarketing.company/auth/google/callback', // ✅ Set for live website
      },
    },
  ],
};