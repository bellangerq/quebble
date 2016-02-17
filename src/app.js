// REQUIRE

var Clock = require('clock');
var Wakeup = require('wakeup');
var ajax = require('ajax');
var Vibe = require('ui/vibe');

vibrateForEvent();
registerAllWakupsForNextWeek();
buildLoadingScreen();
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
      console.log(error);
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
    var hour = 10;
    var minutes = 30;

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
    Vibe.vibrate('long');
  } else {
    console.log('Regular launch not by a wakeup event.');
  }
});
}

// DEFINE LOADING SCREEN

function buildLoadingScreen() {

  var UI = require('ui');
  var Vector2 = require('vector2');

  var loading = new UI.Window({
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
    text: 'Daily Quotes',
    color: '#FFFFFF',
    font: 'gothic-16-bold',
});

quote.add(header);

  // add header image
  
  var quoteImage = new UI.Image({
    position: new Vector2(64, 2),
    size: new Vector2(16, 16),
    backgroundColor: 'and',
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

  // display quote
var content = new UI.Text({
    position: new Vector2(10,70),
    size: new Vector2(124, 168),
    font: 'gothic-24-bold',
    color: '#555555',
    text: quoteContent,
    textAlign: 'left',
});

quote.add(content);

// define quote size

// var qSize = quote.size();
var quoteBottom = content.position().y + content.size().y;

// display author

var author = new UI.Text({
    position: new Vector2(10,quoteBottom + 10),
    size: new Vector2(124, 168),
    font: 'gothic-18',
    color: '#555555',
    text: quoteAuthor,
    textAlign: 'right',
});

quote.add(author);

quote.show();

  //  back to home on Back button click

//main.on('click', 'back', function() {
  //console.log('Back button is working');

// });
  
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

    // test click
    
    console.log('Button clicked!');

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

    settings.on('click', 'select', function() {
      
// DEFINE SUCCESS SCREEN
      
      buildSuccessScreen();

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
      success.show();
      
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

        }
        
        });
      
  }
  
  });


}