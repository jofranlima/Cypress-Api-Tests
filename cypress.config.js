const { defineConfig } = require('cypress')

module.exports = defineConfig({

    env: {
      MAILOSAUR_API_KEY: process.env.MAILOSAUR_API_KEY,
      "db": {
        "host": "127.0.0.1",
        "user": "YOUR_USERNAME",
        "password": "YOUR_PASSWORD"
      }
    },
    e2e: {
      failOnStatusCode: false,
      viewportWidth: 1280,
      viewportHeight: 720,
      defaultCommandTimeout: 10000,
      responseTimeout:10000,
      chromeWebSecurity: false,
      headers: {
        'Strict-Transport-Security': 'false'
      },  
      projectId: '5ix4oj',
      supportFile: false,
      setupNodeEvents(on, config) {
        screenshotOnRunFailure = true;
        require('./cypress/plugins/index.js')(on, config);
        require('cypress-mochawesome-reporter/plugin')(on);
        return config;
    }
  }
})




