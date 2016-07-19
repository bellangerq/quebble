var Settings = require('settings');

function SettingsRepository() {
  this.getTimeSettings = function() {
    return {
      hours: Settings.option('hours'),
      minutes: Settings.option('minutes'),
    };
  };

  this.updateTimeSettings = function(options) {
    Settings.option('hours', options.hours);
    Settings.option('minutes', options.minutes);
  };
};

module.exports = new SettingsRepository();
