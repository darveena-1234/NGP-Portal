const { defineConfig } = require("cypress");

module.exports = defineConfig({
  watchForFileChange:false,
  chromeWebSecurity:false,
  waitForAnimation:true,
  animationDistanceThreshold:20,
  defaultCommandTimeout:6000,
  execTimeout:60000,
  pageLoadTimeout:6000,
  requestTimeout:15000,
  responseTimeout:15000,
  videoCompression: 15,
  video:false,
  component: {
    viewportWidth: 500,
    viewportHeight: 500
  },
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        async 'db:seed'() {
          // Send request to backend API to re-seed database with test data
          const { data } = await axios.post(`${testDataApiEndpoint}/seed`)
          return data
        },
      baseUrl: 'https://dawn.sb.stag.card91.in'
    })
  }
}
})
/*const { defineConfig } = require('cypress')

module.exports = defineConfig({
  videoCompression: 15,
  e2e: {
    baseUrl: 'http://100.91.145.58:3000'
  }
})*/


