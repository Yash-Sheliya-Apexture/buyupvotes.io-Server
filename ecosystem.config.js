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
      },
    },
  ],
};