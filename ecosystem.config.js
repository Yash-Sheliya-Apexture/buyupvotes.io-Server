module.exports = {
    apps: [
      {
        name: 'buyupvotes-backend',
        script: 'server.js',
        interpreter: 'bun',
        watch: false,
        autorestart: true,
        env: {
          NODE_ENV: 'production',
          USE_HTTPS: 'false',  // Add this for local development
        },
      },
    ],
  };