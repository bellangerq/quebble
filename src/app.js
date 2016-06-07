// DETECT PEBBLE MODEL
var info = Pebble.getActiveWatchInfo(); // Returns watch info
var platform = info.platform; // Returns a string of the platform name
var isChalk = platform === 'chalk';

// DEFINING SCREEN WIDTH
var screenWidth = isChalk ? 180 : 144;

// LOADING POSITIONING FOR CHALK
var xLoadingImagePosition = isChalk ? 70 : 52;
var yLoadingImagePosition = isChalk ? 25 : 25;
var xLoadingMessagePosition = isChalk ? 28 : 10;
var yLoadingMessagePosition = isChalk ? 80 : 80;

// ERROR POSITIONING FOR CHALK
var xErrorImagePosition = isChalk ? 70 : 52;
var yErrorImagePosition = isChalk ? 25 : 25;
var xErrorMessagePosition = isChalk ? 28 : 10;
var yErrorMessagePosition = isChalk ? 80 : 80;

// QUOTE POSITIONING FOR CHALK
  // HEADER
var xQuoteReclanglePosition = isChalk ? 0 : 0;
var yQuoteReclanglePosition = isChalk ? 0 : 0;
var xQuoteImagePosition = isChalk ? 80 : 62;
var yQuoteImagePosition = isChalk ? 10 : 10;

  // QUOTE
var xQuoteQuotePosition = isChalk ? 28 : 10;

  // AUTHOR
// var xQuoteQuotePosition = isChalk ? 28 : 10;

// SETTINGS POSITIONING FOR CHALK
  // DESCRIPTION
var xSettingsSelectorDescPosition = isChalk ? 28 : 10;
var ySettingsSelectorDescPosition = isChalk ? 50 : 30;

  // HOUR
var xSettingsHourRectPosition = isChalk ? 27 : 9;
var ySettingsHourRectPosition = isChalk ? 90 : 70;
var xSettingsHourTextPosition = isChalk ? 27 : 9;
var ySettingsHourTextPosition = isChalk ? 90 : 70;

  // MINUTE
var xSettingsMinuteRectPosition = isChalk ? 72 : 54;
var ySettingsMinuteRectPosition = isChalk ? 90 : 70;
var xSettingsMinuteTextPosition = isChalk ? 72 : 54;
var ySettingsMinuteTextPosition = isChalk ? 90 : 70;

  // PERIOD
var xSettingsPeriodRectPosition = isChalk ? 117 : 99;
var ySettingsPeriodRectPosition = isChalk ? 90 : 70;
var xSettingsPeriodTextPosition = isChalk ? 117 : 99;
var ySettingsPeriodTextPosition = isChalk ? 90 : 70;

// SUCCESS POSITIONING FOR CHALK
var xSuccessImagePosition = isChalk ? 70 : 52;
var ySuccessImagePosition = isChalk ? 25 : 25;
var xSuccessMessagePosition = isChalk ? 28 : 10;
var ySuccessMessagePosition = isChalk ? 80 : 80;

// INITIAL REQUIRE
var Clock = require('clock');
var Wakeup = require('wakeup');
var ajax = require('ajax');
var Vibe = require('ui/vibe');
var Settings = require('settings');

// FIND TIME
var loading;
    var hour = Settings.option('hours');
    var minutes = Settings.option('minutes');

    if (hour === undefined) {
      hour = 10;
    }
    if (minutes === undefined) {
      minutes = 30;
    }

// CALL FUNCTIONS
vibrateForEvent();
registerAllWakupsForNextWeek();
buildLoadingScreen();

// CONTENT FOR TESTING
// var quoteContent ="Dreambig and dareto fail. Dream bigand daretofail. Dream big and dare to fail.";
// var quoteAuthor = "Toto Le Héros";
// buildQuoteScreen(quoteContent, quoteAuthor);


// AJAX CALL FOR QUOTE API
ajax(
    {
        url: 'http://quotes.rest/qod.json',
        type: 'json'
    },
    function(data, status, request) {
        var quoteContent = data.contents.quotes[0].quote;
        var quoteAuthor = data.contents.quotes[0].author;
        buildQuoteScreen(quoteContent, quoteAuthor);
    },
    function(error, status, request) {
        console.log("Error:");
        console.log(JSON.stringify(error, null, 4));
        buildFailureScreen();
    }
);

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
function vibrateForEvent() {

  Wakeup.launch(function(e) {
  if (e.wakeup) {
    Vibe.vibrate('long');
  } else {
    console.log('Regular launch not by a wakeup event.');
  }
});
}

// LOADING SCREEN
function buildLoadingScreen() {

  var UI = require('ui');
  var Vector2 = require('vector2');

  var loading = new UI.Window({
      backgroundColor: 'white',
    });

  loading.show();

// IMAGE
  var loadingImage = new UI.Image({
    position: new Vector2(xLoadingImagePosition, yLoadingImagePosition),
    size: new Vector2(40, 40),
    image: 'images/loading.png',
  });

  loading.add(loadingImage);

// CONTENT
  var loadingMessage = new UI.Text({
      position: new Vector2(xLoadingMessagePosition,yLoadingMessagePosition),
      size: new Vector2(124, 168),
      font: 'gothic-24-bold',
      color: '#000000',
      text: 'Don\'t panic! Today\'s quote is coming!',
      textAlign: 'center',
  });

  loading.add(loadingMessage);

  // CLOSE SCREEN OVER TIME
  setTimeout(function() {

    loading.hide();

  }, 15000);

}

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

var UI = require('ui');
var Vector2 = require('vector2');

// MAIN WINDOW
var quote = new UI.Window({
    backgroundColor: 'white',
    scrollable: true,
});

// HEADER
var header = new UI.Rect({
    position: new Vector2(xQuoteReclanglePosition,yQuoteReclanglePosition),
    size: new Vector2(screenWidth,40),
    backgroundColor: '#0055AA',
    color: '#FFFFFF',
    font: 'gothic-16-bold',
});

  quote.add(header);

// IMAGE
  var quoteImage = new UI.Image({
    position: new Vector2(xQuoteImagePosition, yQuoteImagePosition),
    size: new Vector2(20, 20),
    compositing: 'set',
    image: 'images/quote.png',
  });

  quote.add(quoteImage);

// DATE
var quoteDate = new UI.TimeText({
  position: new Vector2(0, 50),
  size: new Vector2(screenWidth, 168),
  font: 'gothic-18',
  color: '#000000',
  text: '%m/%d/%Y',
  textAlign: 'center',
});

quote.add(quoteDate);

// CALCULATE QUOTE HEIGHT
var quoteHeight = calculateUITextHeight(24, 18, quoteContent);


// QUOTE
var content = new UI.Text({
    position: new Vector2(xQuoteQuotePosition,70),
    size: new Vector2(screenWidth - (xLoadingMessagePosition * 2), quoteHeight),
    font: 'gothic-24-bold',
    color: '#000000',
    text: quoteContent,
    textAlign: 'left',
});

quote.add(content);

// CALCULATE AUTHOR HEIGHT
var quoteBottom = content.position().y + content.size().y;
var authorHeight = calculateUITextHeight(18, 25, quoteAuthor);

// AUTHOR
var author = new UI.Text({
    position: new Vector2(10,quoteBottom + 10),
    size: new Vector2(124, authorHeight + 10),
    font: 'gothic-18',
    color: '#000000',
    text: quoteAuthor,
    textAlign: 'right',
});

quote.add(author);

quote.show();

// CLOSE SCREEN OVER TIME
setTimeout(function() {

  quote.hide();

}, 30000);

 quote.on('click', 'select', function() {

 // SETTINGS SCREEN
   buildSettingsScreen();

   function buildSettingsScreen() {

     var UI = require('ui');
     var Vector2 = require('vector2');

     var settings = new UI.Window({
         backgroundColor: 'white',
       });

    settings.show();

     var selectorDesc = new UI.Text({
         position: new Vector2(xSettingsSelectorDescPosition,ySettingsSelectorDescPosition),
         size: new Vector2(124,30),
         font: 'gothic-24-bold',
         color: '#000000',
         text: 'Set daily alarm:',
         textAlign: 'center',
     });

     settings.add(selectorDesc);

     var hourRect = new UI.Rect({
         position: new Vector2(xSettingsHourRectPosition,ySettingsHourRectPosition),
         size: new Vector2(36,36),
         backgroundColor: '#0055AA',
     });

     settings.add(hourRect);

     var isAfternoon = false;
     var twelveHourTime = hour;
     if (hour > 12) {
       twelveHourTime = hour - 12;
       isAfternoon = true;
     }

     var hourText = new UI.Text({
         position: new Vector2(xSettingsHourTextPosition,ySettingsHourTextPosition),
         size: new Vector2(36,36),
         font: 'gothic-24-bold',
         color: '#FFFFFF',
         text: intToString(twelveHourTime),
         textAlign: 'center',
     });

     settings.add(hourText);

     var minuteRect = new UI.Rect({
         position: new Vector2(xSettingsMinuteRectPosition,ySettingsMinuteRectPosition),
         size: new Vector2(36,36),
         backgroundColor: '#555555',
     });

     settings.add(minuteRect);

     var minuteText = new UI.Text({
         position: new Vector2(xSettingsMinuteTextPosition,ySettingsMinuteTextPosition),
         size: new Vector2(36,36),
         font: 'gothic-24-bold',
         color: '#FFFFFF',
         text: intToString(minutes),
         textAlign: 'center',
     });

     settings.add(minuteText);

     var periodRect = new UI.Rect({
         position: new Vector2(xSettingsPeriodRectPosition,ySettingsPeriodRectPosition),
         size: new Vector2(36,36),
         backgroundColor: '#555555',
     });

     settings.add(periodRect);

     var text = 'AM';
     if (isAfternoon) {
       text = 'PM';
     }

     var periodText = new UI.Text({
         position: new Vector2(xSettingsPeriodTextPosition,ySettingsPeriodTextPosition),
         size: new Vector2(36,36),
         font: 'gothic-24-bold',
         color: '#FFFFFF',
         text: text,
         textAlign: 'center',
     });

     settings.add(periodText);

     var currentlyEditing = hourText;
     var currentMax = 12;

     settings.on('click', 'up', function() {
       if (currentlyEditing == periodText) {
         if (currentlyEditing.text() == 'AM') {
           currentlyEditing.text('PM');
         } else {
           currentlyEditing.text('AM');
         }
       } else {
       var currentText = currentlyEditing.text();
       var currentNumber = parseInt(currentText);
       var nextNumber = currentNumber + 1;
       if (nextNumber > currentMax) {
         nextNumber = 0;
       }
       var nextNumberString = intToString(nextNumber);
       currentlyEditing.text(nextNumberString);
       }
     });

     settings.on('click', 'down', function() {
       if (currentlyEditing == periodText) {
         if (currentlyEditing.text() == 'AM') {
           currentlyEditing.text('PM');
         } else {
           currentlyEditing.text('AM');
         }
       } else {
       var currentText = currentlyEditing.text();
       var currentNumber = parseInt(currentText);
       var nextNumber = currentNumber - 1;
       if (nextNumber < 0) {
         nextNumber = currentMax;
       }
       var nextNumberString = intToString(nextNumber);
       currentlyEditing.text(nextNumberString);
       }
     });

     settings.on('click', 'back', function() {
       if (currentlyEditing == hourText) {
         settings.hide();
       } else if (currentlyEditing == minuteText) {
         currentlyEditing = hourText;
         currentMax = 12;
         minuteRect.backgroundColor('#555555');
         hourRect.backgroundColor('#0055AA');
       } else if (currentlyEditing == periodText) {
         currentlyEditing = minuteText;
         currentMax = 59;
         periodRect.backgroundColor('#555555');
         minuteRect.backgroundColor('#0055AA');
       }
     });

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
