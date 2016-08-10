var UI = require('ui');
var Geometry = require('../helpers/geometry');
var StringUtils = require('../helpers/string_utils');
var Vector2 = require('vector2');
var Feature = require('platform/feature');

var createQuoteWindow = function(isChalk, content, author) {
  var layout;
  var alignment;

  if (isChalk) {
    alignment = 'center';
    layout = require('../layouts/chalk_layout').quote;
  } else {
    alignment = 'left';
    layout = require('../layouts/basalt_layout').quote;
  }

  var quoteWindow = new UI.Window({
    backgroundColor: 'white',
    scrollable: true,
    // scrolling page per page or line by line
    paging: false,
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

  var SCREEN_WIDTH = Feature.resolution().x;

  var quoteHeight = StringUtils.calculateUITextHeight(24, 18, content);

  var contentPadding = isChalk ? 50 : 20;
  var quoteContent = new UI.Text({
      position:   Geometry.Vector(layout.quote.origin),
      size:       new Vector2(SCREEN_WIDTH - contentPadding, quoteHeight),
      font:       'gothic-24-bold',
      color:      '#000000',
      text:       content,
      textAlign:  isChalk ? 'center' : 'left',
  });

  quoteWindow.add(quoteContent);

  var quoteBottom = quoteContent.position().y + quoteContent.size().y;
  var authorHeight = StringUtils.calculateUITextHeight(18, 25, author);

  var paddingBottom = isChalk ? 30 : 5;
  var author = new UI.Text({
      position:   new Vector2(10, quoteBottom + 5),
      size:       new Vector2(SCREEN_WIDTH - 20, authorHeight + paddingBottom),
      font:       'gothic-18',
      color:      '#000000',
      text:       author,
      textAlign:  isChalk ? 'center' : 'right'
  });

  if (isChalk) {
    author.size = new Vector2(SCREEN_WIDTH - 50, authorHeight + 30);
  } else {
    author.size = new Vector2(SCREEN_WIDTH - 50, authorHeight + 30);
  }

  quoteWindow.add(author);

  return quoteWindow;
};

module.exports = createQuoteWindow;
