// REQUIRE

var Clock = require('clock');
var Wakeup = require('wakeup');
var ajax = require('ajax');
var Vibe = require('ui/vibe');
var Settings = require('settings');

var loading;

vibrateForEvent();
registerAllWakupsForNextWeek();
buildLoadingScreen();

// Delete this once app is ready

/*var quoteContent ="Dream big and dare to fail.";
var quoteAuthor = "Norman Vaughan";
buildQuoteScreen(quoteContent, quoteAuthor);*/

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
    var hour = Settings.option('hours');
    var minutes = Settings.option('minutes');
  
    if (hour === undefined) {
      hour = 10;
    }
    if (minutes === undefined) {
      minutes = 30;
    }
  
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
  
  // work only if launched by a wakeup event
  
  Wakeup.launch(function(e) {
  if (e.wakeup) {
    Vibe.vibrate('short');
  } else {
    console.log('Regular launch not by a wakeup event.');
  }
});
}

// DEFINE LOADING SCREEN

function buildLoadingScreen() {

  var UI = require('ui');
  var Vector2 = require('vector2');

  loading = new UI.Window({
      backgroundColor: 'white',
    });

    // test screen
    console.log("Currently loading...");

  loading.show();

      // add image
  
  var loadingImage = new UI.Image({
    position: new Vector2(52, 20),
    size: new Vector2(40, 40),
    backgroundColor: 'and',
    image: 'images/loading.png',
  });
  
  loading.add(loadingImage);
  loading.show();
  
      // add  message
  
  var loadingMessage = new UI.Text({
      position: new Vector2(10,70),
      size: new Vector2(124, 168),
      font: 'gothic-24-bold',
      color: '#555555',
      text: 'Don\'t panic! Today\'s quote is coming!',
      textAlign: 'center',
  });

  loading.add(loadingMessage);

}



// DEFINE ERROR SCREEN

function buildFailureScreen() {

  var UI = require('ui');
  var Vector2 = require('vector2');

  var error = new UI.Window({
      backgroundColor: 'white',
    });

      // test screen
    console.log("Bug identified.");

  error.show();

      // add image
  
  var errorImage = new UI.Image({
    position: new Vector2(52, 20),
    size: new Vector2(40, 40),
    backgroundColor: 'and',
    image: 'images/error.png',
  });
  
  error.add(errorImage);
  
      // add message
  
  var errorMessage = new UI.Text({
      position: new Vector2(10,70),
      size: new Vector2(124, 168),
      font: 'gothic-24-bold',
      color: '#555555',
      text: 'Couldn\'t find today\'s quote... Sorry!',
      textAlign: 'center',
  });

  error.add(errorMessage);

  error.show();
  loading.hide();
}



// DEFINE QUOTE SCREEN

function buildQuoteScreen(quoteContent, quoteAuthor) {
  
  // import the UI elements
  
var UI = require('ui');
var Vector2 = require('vector2');

  // define main window
  
var quote = new UI.Window({
    backgroundColor: 'white',
    scrollable: true,
});

  // test screen
  
  console.log("It's working!");

  // create header style
  
var header = new UI.Rect({
    position: new Vector2(0,0),
    size: new Vector2(144,40),
    backgroundColor: '#0055AA',
    color: '#FFFFFF',
    font: 'gothic-16-bold',
});

  quote.add(header);

  // add header image
  
  var quoteImage = new UI.Image({
    position: new Vector2(62, 10),
    size: new Vector2(20, 20),
    compositing: 'set',
    image: 'images/quote.png',
  });
  
  quote.add(quoteImage);
  
  // display date

var quoteDate = new UI.TimeText({
  position: new Vector2(0, 50),
  size: new Vector2(144, 168),
  font: 'gothic-18',
  color: '#555555',
  text: '%m/%d/%Y',
  textAlign: 'center',
});

quote.add(quoteDate);

// Define quote height
  
var quoteHeight = calculateUITextHeight(24, 18, quoteContent);
  
  // display quote
var content = new UI.Text({
    position: new Vector2(10,70),
    size: new Vector2(124, quoteHeight),
    font: 'gothic-24-bold',
    color: '#555555',
    text: quoteContent,
    textAlign: 'left',
});

quote.add(content);

// define quote size

// var qSize = quote.size();
var quoteBottom = content.position().y + content.size().y;

// Define author height
  
var authorHeight = calculateUITextHeight(17, 25, quoteAuthor);
  
// display author

var author = new UI.Text({
    position: new Vector2(10,quoteBottom + 10),
    size: new Vector2(124, authorHeight + 10),
    font: 'gothic-18',
    color: '#555555',
    text: quoteAuthor,
    textAlign: 'right',
});

quote.add(author);

  // back to home view on back button click
  
quote.show();
loading.hide();
  
  // close app after 15 seconds
  
setTimeout(function() {
   
   quote.hide();
   
 }, 15000);

  // Open settings on Select button click

quote.on('click', 'select', function() {

// DEFINE SETTINGS SCREEN

  buildSettingsScreen();

  function buildSettingsScreen() {

    var UI = require('ui');
    var Vector2 = require('vector2');

    var settings = new UI.Window({
        backgroundColor: 'white',
      });

    settings.show();

    var selectorDesc = new UI.Text({
        position: new Vector2(10,20),
        size: new Vector2(124,30),
        font: 'gothic-24-bold',
        color: '#555555',
        text: 'Set daily alarm:',
        textAlign: 'center',
    });

    settings.add(selectorDesc);

    var hourRect = new UI.Rect({
        position: new Vector2(8,65),
        size: new Vector2(36,36),
        backgroundColor: '#0055AA',
    });

    settings.add(hourRect);

    var hourText = new UI.Text({
        position: new Vector2(8,65),
        size: new Vector2(36,36),
        font: 'gothic-24-bold',
        color: '#FFFFFF',
        text: '09',
        textAlign: 'center',
    });

    settings.add(hourText);

    var minuteRect = new UI.Rect({
        position: new Vector2(54,65),
        size: new Vector2(36,36),
        backgroundColor: '#555555',
    });

    settings.add(minuteRect);

    var minuteText = new UI.Text({
        position: new Vector2(54,65),
        size: new Vector2(36,36),
        font: 'gothic-24-bold',
        color: '#FFFFFF',
        text: '30',
        textAlign: 'center',
    });

    settings.add(minuteText);

    var periodRect = new UI.Rect({
        position: new Vector2(100,65),
        size: new Vector2(36,36),
        backgroundColor: '#555555',
    });

    settings.add(periodRect);

    var periodText = new UI.Text({
        position: new Vector2(100,65),
        size: new Vector2(36,36),
        font: 'gothic-24-bold',
        color: '#FFFFFF',
        text: 'PM',
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
// DEFINE SUCCESS SCREEN
      
      function saveTime() {
        var hours = parseInt(hourText.text());        
        var minutes = parseInt(minuteText.text());
        var period = periodText.text();
        if (period == 'PM') {
          hours = hours + 12;
        }
        Settings.option('hours', hours);
        Settings.option('minutes', minutes);
        
        registerAllWakupsForNextWeek();
      }

      function buildSuccessScreen() {

      var UI = require('ui');
      var Vector2 = require('vector2');

      var success = new UI.Window({
          backgroundColor: 'white',
      });

      // test screen
          
      console.log("Success screen is working.");

      success.show();

      // add image
      
      var successImage = new UI.Image({
        position: new Vector2(52, 20),
        size: new Vector2(40, 40),
        backgroundColor: 'and',
        image: 'images/success.png',
      });
      
      success.add(successImage);
      
      
    // add message
      
      var successMessage = new UI.Text({
          position: new Vector2(10,70),
          size: new Vector2(124, 168),
          font: 'gothic-24-bold',
          color: '#555555',
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

// convert int to string with two digits
function intToString(int) {
  if (int < 9) {
    return "0" + int;
  } else {
    return "" + int;
  }
}

// Define quote height

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