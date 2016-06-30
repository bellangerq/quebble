var UI = require('ui');
var Geometry = require('../helpers/geometry');
var StringUtils = require('../helpers/string_utils');
var Vector2 = require('vector2');
var Feature = require('platform/feature');

var createQuoteWindow = function(isChalk, content, author) {
  var layout;

  if (isChalk) {
    layout = require('../layouts/chalk_layout').quote;
  } else {
    layout = require('../layouts/basalt_layout').quote;
  }

  var quoteWindow = new UI.Window({
    backgroundColor: 'white',
    scrollable: true
  });

  var header = new UI.Rect({
      position: Geometry.Vector(layout.header.origin),
      size:     Geometry.Vector(layout.header.size),
      backgroundColor: '#0055AA',
      color: '#FFFFFF',
      font: 'gothic-16-bold',
  });

  quoteWindow.add(header);

  var quoteImage = new UI.Image({
    position: Geometry.Vector(layout.image.origin),
    size:     Geometry.Vector(layout.image.size),
    compositing: 'set',
    image: 'images/quote.png',
  });

  quoteWindow.add(quoteImage);

  var quoteDate = new UI.TimeText({
    position: Geometry.Vector(layout.date.origin),
    size:     Geometry.Vector(layout.date.size),
    font:     'gothic-18',
    color:    '#000000',
    text:     '%m/%d/%Y',
    textAlign: 'center',
  });

  quoteWindow.add(quoteDate);

  var quoteHeight = StringUtils.calculateUITextHeight(24, 18, content);
  console.log('quoteHeight: ' + quoteHeight);

  var SCREEN_WIDTH = Feature.resolution().x;

  var quoteContent = new UI.Text({
      position:   Geometry.Vector(layout.quote.origin),
      size:       new Vector2(SCREEN_WIDTH - 20, quoteHeight),
      font:       'gothic-24-bold',
      color:      '#000000',
      text:       content,
      textAlign:  'left'
  });

  quoteWindow.add(quoteContent);

  var quoteBottom = quoteContent.position().y + quoteContent.size().y;
  var authorHeight = StringUtils.calculateUITextHeight(18, 25, author);

  var author = new UI.Text({
      position:  new Vector2(10, quoteBottom + 10),
      size:      new Vector2(124, authorHeight + 10),
      font:      'gothic-18',
      color:     '#000000',
      text:      author,
      textAlign: 'right',
  });

  quoteWindow.add(author);

  return quoteWindow;
};

module.exports = createQuoteWindow;
