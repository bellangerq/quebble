// Import the UI elements
var UI = require('ui');
var Vector2 = require('vector2');

// Define main window
var main = new UI.Window({
    backgroundColor: 'white',
    scrollable: true,
});

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

// Display today's date

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
    text: 'Always desire to learn something useful.',
    textAlign: 'left',
});

main.add(quote);

// Define quote size

// var qSize = quote.size();

// Display author
var author = new UI.Text({
    position: new Vector2(10,170),
    size: new Vector2(124, 168),
    font: 'gothic-18',
    color: '#555555',
    text: '— Sophocles',
    textAlign: 'right',
});

main.add(author);

main.show();
