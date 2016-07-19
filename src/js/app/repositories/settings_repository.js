var Wakeup = require('wakeup');
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

  this.registerAllWakupsForNextWeek(options) {
      var allDays = [
          'monday',
          'tuesday',
          'wednesday',
          'thursday',
          'friday',
          'saturday',
          'sunday'
      ];

      Wakeup.cancel('all');
      for (var i = 0; i < allDays.length; i++) {
          var day = allDays[i];
          var timeUntilNextDay = Clock.weekday(day, hour, minutes);
          Wakeup.schedule(
              { time: timeUntilNextDay },
              function(e) {
                  console.log("I woke up");
              }
          );
      }
  };
};

module.exports = new SettingsRepository();
