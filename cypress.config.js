const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "8axud3",
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    charts: true,
    reportPageTitle: "BootcampsHub Landing page API Automation documentation",
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
    ignoreVideos: false,
    videoOnFailOnly: false,
    quiet: true,
    saveAllAttempts: true,
    debug: true,
  },
  e2e: {
    baseUrl: "https://staging-api.bootcampshub.ai/api",
    setupNodeEvents(on, config) {
      try {
        require("cypress-mochawesome-reporter/plugin")(on);
        require("@cypress/grep/src/plugin")(config);
      } catch (error) {
        console.error("Error setting up plugins:", error);
        throw error;
      }
      return config;
    },
  },
});
