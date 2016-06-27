var RectHelper = require('../rect_helper');

var SCREEN_WIDTH = 144;

module.exports = {
  screenWidth: SCREEN_WIDTH,
  loading: {
    image: RectHelper.MakeRect(52, 25, 40, 40),
    text:  RectHelper.MakeRect(10, 80, 124, 168)
  },
  error: {
    image: RectHelper.MakeRect(52, 25, 40, 40),
    text:  RectHelper.MakeRect(10, 80, 124, 168)
  },
  quote: {
    header: RectHelper.MakeRect(0, 0, SCREEN_WIDTH, 40),
    image:  RectHelper.MakeRect(0, 0, 20, 20),
    date:   RectHelper.MakeRect(0, 50, SCREEN_WIDTH, 168),
    quote:  RectHelper.MakeRect(10, 70, 0, 0)
  },
  settings: {
    desc:   RectHelper.MakeRect(10, 30, 124, 30),
    hour:   RectHelper.MakeRect(9, 70, 36, 36),
    minute: RectHelper.MakeRect(54, 70, 36, 36),
    period: RectHelper.MakeRect(99, 70, 36, 36)
  },
  success: {
    image: RectHelper.MakeRect(52, 25, 40, 40),
    text:  RectHelper.MakeRect(10, 80, 124, 168)
  }
};
