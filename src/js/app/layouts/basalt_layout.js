var Geometry = require('../helpers/geometry');
var Feature = require('platform/feature');

var SCREEN_WIDTH = Feature.resolution().x;
var SCREEN_HEIGHT = Feature.resolution().y;

module.exports = {
  screenWidth: SCREEN_WIDTH,
  loading: {
    image: Geometry.Rect((SCREEN_WIDTH - 40) / 2.0, 25, 40, 40),
    text:  Geometry.Rect(10, 80, SCREEN_WIDTH - 20, 168)
  },
  failure: {
    image: Geometry.Rect((SCREEN_WIDTH - 40) / 2.0, 25, 40, 40),
    text:  Geometry.Rect(10, 80, SCREEN_WIDTH - 20, 168)
  },
  quote: {
    header: Geometry.Rect(0, 0, SCREEN_WIDTH, 40),
    image:  Geometry.Rect((SCREEN_WIDTH - 20) / 2, 10, 20, 20),
    date:   Geometry.Rect(0, 50, SCREEN_WIDTH, 168),
    quote:  Geometry.Rect(10, 70, 0, 0)
  },
  settings: {
    text:    Geometry.Rect(10, 30, 124, 30),
    hours:   Geometry.Rect(9, 70, 36, 36),
    minutes: Geometry.Rect(54, 70, 36, 36),
    period:  Geometry.Rect(99, 70, 36, 36)
  },
  success: {
    image: Geometry.Rect((SCREEN_WIDTH - 40) / 2.0, 25, 40, 40),
    text:  Geometry.Rect(10, 80, SCREEN_WIDTH - 20, 168)
  }
};
