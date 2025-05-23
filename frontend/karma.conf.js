module.exports = function(config) {
    config.set({
      browsers: ['ChromeHeadlessNoSandbox'],
      customLaunchers: {
        ChromeHeadlessNoSandbox: {
          base: 'ChromeHeadless',
          flags: ['--no-sandbox', '--disable-gpu']
        }
      },
      singleRun: true
    });
  };
  