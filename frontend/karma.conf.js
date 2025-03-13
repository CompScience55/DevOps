module.exports = function(config) {
    config.set({
      // ... deine bisherigen Konfigurationen ...
      browsers: ['ChromeHeadlessNoSandbox'],
      customLaunchers: {
        ChromeHeadlessNoSandbox: {
          base: 'ChromeHeadless',
          flags: ['--no-sandbox', '--disable-gpu']
        }
      },
      singleRun: true
      // ...
    });
  };
  