// Require

var Clock = require('clock');
var Wakeup = require('wakeup');
var ajax = require('ajax');
var Vibe = require('ui/vibe');

// Launch functions

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
        buildSuccessScreenWithQuoteContent(quoteContent, quoteAuthor);
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
    var hour = 19;
    var minutes = 10;

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



  // Define loading screen

function buildLoadingScreen() {

  var UI = require('ui');
  var Vector2 = require('vector2');

  var main = new UI.Window({
      backgroundColor: 'white',
    });

    // Loading screen test
    console.log("Currently loading...");

  main.show();

  var loadingMessage = new UI.Text({
      position: new Vector2(10,70),
      size: new Vector2(124, 168),
      font: 'gothic-24-bold',
      color: '#555555',
      text: 'Today\'s quote is loading!',
      textAlign: 'center',
  });

  main.add(loadingMessage);

}



  // Define error screen

function buildFailureScreen() {

  var UI = require('ui');
  var Vector2 = require('vector2');

  var main = new UI.Window({
      backgroundColor: 'white',
    });

    // Error screen test
    console.log("Bug identified.");

  main.show();

  var errorMessage = new UI.Text({
      position: new Vector2(10,70),
      size: new Vector2(124, 168),
      font: 'gothic-24-bold',
      color: '#555555',
      text: 'Couldn\'t find today\'s quote... Sorry!',
      textAlign: 'center',
  });

  main.add(errorMessage);

}



  // Define success screen

function buildSuccessScreenWithQuoteContent(quoteContent, quoteAuthor) {
  // Import the UI elements
var UI = require('ui');
var Vector2 = require('vector2');

  // Define main window
var main = new UI.Window({
    backgroundColor: 'white',
    scrollable: true,
});

  // Success screen test
  console.log("It's working!");

  // Create header style
var titleBg = new UI.Rect({
    position: new Vector2(0,0),
    size: new Vector2(144,40),
    backgroundColor: '#00AA55',
    text: 'Daily Quotes',
    color: '#FFFFFF',
    font: 'gothic-16-bold',
});

main.add(titleBg);

  // Display date

var date = new UI.TimeText({
  position: new Vector2(0, 50),
  size: new Vector2(144, 168),
  font: 'gothic-18',
  color: '#555555',
  text: '%m/%d/%Y',
  textAlign: 'center',
});

main.add(date);

  // Display quote
var quote = new UI.Text({
    position: new Vector2(10,70),
    size: new Vector2(124, 168),
    font: 'gothic-24-bold',
    color: '#555555',
    text: quoteContent,
    textAlign: 'left',
});

main.add(quote);

// Define quote size

// var qSize = quote.size();

var quoteBottom = quote.position().y + quote.size().y;

// console.log(quote.position().y);
// console.log(quote.size().y);

// Display author
var author = new UI.Text({
    position: new Vector2(10,quoteBottom + 10),
    size: new Vector2(124, 168),
    font: 'gothic-18',
    color: '#555555',
    text: quoteAuthor,
    textAlign: 'right',
});

main.add(author);

main.show();
}

function vibrateForEvent() {
  // Query whether we were launched by a wakeup event
  Wakeup.launch(function(e) {
  if (e.wakeup) {
    Vibe.vibrate('long');
  } else {
    console.log('Regular launch not by a wakeup event.');
  }
});
}
