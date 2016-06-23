var UI = require('ui');
var RectHelper = require('../rect_helper');

var createQuoteWindow = function(layout, content, author) {
  var quoteWindow = new UI.Window({
    backgroundColor: 'white',
    scrollable: true
  });

  var header = new UI.Rect({
      position: RectHelper.MakeVector(layout.header.origin),
      size:     RectHelper.MakeVector(layout.header.size),
      backgroundColor: '#0055AA',
      color: '#FFFFFF',
      font: 'gothic-16-bold',
  });

  quoteWindow.add(header);

  var quoteImage = new UI.Image({
    position: RectHelper.MakeVector(layout.image.origin),
    size:     RectHelper.MakeVector(layout.image.size),
    compositing: 'set',
    image: 'images/quote.png',
  });

  quote.add(quoteImage);

  var quoteDate = new UI.TimeText({
    position: RectHelper.MakeVector(layout.date.origin),
    size:     RectHelper.MakeVector(layout.date.size),
    font:     'gothic-18',
    color:    '#000000',
    text:     '%m/%d/%Y',
    textAlign: 'center',
  });

  quote.add(quoteDate);

  var quoteHeight = calculateUITextHeight(24, 18, content);

  var quoteContent = new UI.Text({
      position: RectHelper.MakeVector(layout.content.origin),
      size:     new Vector2(screenWidth - 20, quoteHeight),
      font:     'gothic-24-bold',
      color:    '#000000',
      text:     quoteContent,
      textAlign: 'left',
  });

  quote.add(quoteContent);

  var quoteBottom = quoteContent.position().y + quoteContent.size().y;
  var authorHeight = calculateUITextHeight(18, 25, author);

  var author = new UI.Text({
      position:  new Vector2(10,quoteBottom + 10),
      size:      new Vector2(124, authorHeight + 10),
      font:      'gothic-18',
      color:     '#000000',
      text:      author,
      textAlign: 'right',
  });

  quote.add(author);

  return quoteWindow;
};

module.exports = createQuoteWindow;

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
