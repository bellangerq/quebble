var Wakeup = require('wakeup');
var Clock = require('clock');
var Settings = require('settings');

module.exports = new SettingsRepository();

function SettingsRepository() {
  this.getTimeSettings = function() {
    var hours = Settings.option('hours');
    var minutes = Settings.option('minutes');

    if (hours === undefined) {
      hours = 10;
    }

    if (minutes === undefined) {
      minutes = 30;
    }

    return {
      hours: hours,
      minutes: minutes,
    };
  };

  this.updateTimeSettings = function(options) {
    console.log(JSON.stringify(options));

    Settings.option('hours', options.hours);
    Settings.option('minutes', options.minutes);

    this.registerAllWakupsForNextWeek();
  };

  this.registerAllWakupsForNextWeek = function() {
    var options = this.getTimeSettings();

    var allDays = [
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
      'sunday',
    ];

    Wakeup.cancel('all');

    for (var i = 0; i < allDays.length; i++) {
      var day = allDays[i];
      var timeUntilNextDay = Clock.weekday(day, options.hours, options.minutes);
      Wakeup.schedule({ time: timeUntilNextDay });
    }

  };
};
