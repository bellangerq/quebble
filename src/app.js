var Clock = require('clock');
var Wakeup = require('wakeup');
var Vibe = require('ui/vibe');
var Settings = require('settings');
var Info = Pebble.getActiveWatchInfo(); // Returns watch info
var Platform = info.platform; // Returns a string of the platform name

var GetQuote = require('../repositories/quote_repository');
var GetQuote = require('../utils/timeout.js');

var CreateFailureScreen = require('../windows/failure_window');
var CreateLoadingScreen = require('../windows/loading_window');
var CreateQuoteScreen = require('../windows/quote_window');
var CreateSuccessScreen = require('../windows/success_window');

/// Load the correct layout
var IsChalk = platform === 'chalk';
var Layout = isChalk ? require('./layout/chalk_layout') : require('./layout/basalt_layout');

/// Reference all UI.Window
var Windows = {
  loading:  null,
  success:  null,
  quote:    null,
  settings: null,
  error:    null
};

/// Setup global settings
var AppSettings = {
  hour: Settings.option('hours'),
  minutes: Settings.option('minutes')
};

if (AppSettings.hour === undefined) {
  AppSettings.hour = 10;
}
if (AppSettings.minutes === undefined) {
  AppSettings.minutes = 30;
}

var main = function() {
  registerVibrateForEvent();
  registerAllWakupsForNextWeek();

  /// Start by creating the loading screen while fetching qod
  Windows.loading = CreateLoadingScreen(Layout.loading);

  /// Present the loading screen to the user
  Windows.loading.show();

  /// Dismiss the loading screen after 15s
  dismissWindow(Windows.loading, 15);

  /// Fetch quote
  GetQuote(function(content, author, error){
    if content !== undefined && author !== undefined {
      /// Show the quote screen
      Windows.quote = CreateQuoteScreen(Layout.quote, content, author);
      Windows.quote.show();

      dismissWindow(Windows.quote, 30);

    } else {

      /// Show the failure screen
      Windows.quote.show();
    }
  });

};

main();

// DAILY WAKE UP
function registerAllWakupsForNextWeek() {
    var allDays = [
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
        'sunday'
    ];

  console.log("hour is : " + hour);
  console.log("minutes is : " + minutes);

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
}

// VIBRATE FUNCTION
var registerVibrateForEvent = function() {
  Wakeup.launch(function(e) {
    if (e.wakeup) {
      Vibe.vibrate('long');
    } else {
      console.log('Regular launch not by a wakeup event.');
    }
  });
};

// ERROR SCREEN
function buildFailureScreen() {

  var UI = require('ui');
  var Vector2 = require('vector2');

  var error = new UI.Window({
      backgroundColor: 'white',
    });

  error.show();

// IMAGE
var errorImage = new UI.Image({
  position: new Vector2(xErrorImagePosition, yErrorImagePosition),
  size: new Vector2(40, 40),
  image: 'images/error.png',
});

error.add(errorImage);

// CONTENT
  var errorMessage = new UI.Text({
      position: new Vector2(xErrorMessagePosition,yErrorMessagePosition),
      size: new Vector2(124, 168),
      font: 'gothic-24-bold',
      color: '#000000',
      text: 'Couldn\'t find today\'s quote... Sorry!',
      textAlign: 'center',
  });

  error.add(errorMessage);

}

// QUOTE SCREEN
function buildQuoteScreen(quoteContent, quoteAuthor) {

// CALCULATE AUTHOR HEIGHT
var quoteBottom = content.position().y + content.size().y;
var authorHeight = calculateUITextHeight(18, 25, quoteAuthor);

 quote.on('click', 'select', function() {

 // SETTINGS SCREEN
   buildSettingsScreen();

   function buildSettingsScreen() {


     settings.on('click', 'select', function() {
       if (currentlyEditing == hourText) {
         currentlyEditing = minuteText;
         currentMax = 59;
         hourRect.backgroundColor('#555555');
         minuteRect.backgroundColor('#0055AA');
       } else if (currentlyEditing == minuteText) {
         currentlyEditing = periodText;
         minuteRect.backgroundColor('#555555');
         periodRect.backgroundColor('#0055AA');
       } else {
         saveTime();
         buildSuccessScreen();
       }

// SUCCESS SCREEN
     function saveTime() {
       var localHours = parseInt(hourText.text());
       var localMinutes = parseInt(minuteText.text());
       var period = periodText.text();
       if (period == 'PM') {
         localHours = localHours + 12;
       }
       Settings.option('hours', localHours);
       Settings.option('minutes', localMinutes);
       hour = localHours;
       minutes = localMinutes;

       registerAllWakupsForNextWeek();
     }

     function buildSuccessScreen() {

     var UI = require('ui');
     var Vector2 = require('vector2');

     var success = new UI.Window({
         backgroundColor: 'white',
     });

     success.show();

// IMAGE
     var successImage = new UI.Image({
       position: new Vector2(xSuccessImagePosition, ySuccessImagePosition),
       size: new Vector2(40, 40),
       image: 'images/success.png',
     });

     success.add(successImage);


// CONTENT
     var successMessage = new UI.Text({
         position: new Vector2(xSuccessMessagePosition,ySuccessMessagePosition),
         size: new Vector2(124, 168),
         font: 'gothic-24-bold',
         color: '#000000',
         text: 'Daily alarm changed. Well done!',
         textAlign: 'center',
     });

     success.add(successMessage);

     success.show();
       settings.hide();

       setTimeout(function() {
         success.hide();
       }, 2000);

       success.on('click', function(event) {
         success.hide();
       });
       }

   });
    }
 });
}

// CONVERT INT TO STRING WITH TWO DIGITS
function intToString(int) {
  if (int <= 9) {
    return "0" + int;
  } else {
    return "" + int;
  }
}

// DEFINE QUOTE HEIGHT

function strTruncate(string, width) {
	string = string.replace(/[\s\r\n]+/, ' ');
	if (string.length >= width) {
		return string[width - 1] === ' ' ? string.substr(0, width - 1) : string.substr(0, string.substr(0, width).lastIndexOf(' '));
	}
	return string;
}

function strTruncateWhole(string, width) {
	var arr = [];
	string = string.replace(/[\s\r\n]+/, ' ');
	var b = 0;
	while (b < string.length) {
		arr.push(strTruncate(string.substring(b), width));
		b += arr[arr.length - 1].length;
	}
	return arr;
}

function calculateUITextHeight(fontSize, charsPerLine, string) {
	var split = strTruncateWhole(string, charsPerLine);
	var height = split.length * fontSize;
	return height;
}
