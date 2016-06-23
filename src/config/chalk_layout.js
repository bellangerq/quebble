var RectHelper = require('../rect_helper');

module.exports = {
  screenWidth: 180,
  loading: {
    image: RectHelper.MakeRect(70, 25, 40, 40),
    text:  RectHelper.MakeRect(28, 80, 40, 40)
  },
  error: {
    image: RectHelper.MakeRect(70, 25, 40, 40),
    text:  RectHelper.MakeRect(28, 80, 40, 40)
  },
  quote: {
    header: { x: 0,  y: 0 },
    image:  { x: 80, y: 10 },
    quote:  { x: 28, y: 70 }
  },
  settings: {
    desc:   { x: 28, y: 50 },
    hour:   { x: 27, y: 90, size: 36 },
    minute: { x: 72, y: 90, size: 36 },
    period: { x: 117, y: 90, size: 36 }
  },
  success: {
    image: RectHelper.MakeRect(70, 25, 40, 40),
    text:  RectHelper.MakeRect(28, 80, 40, 40)
  }
};
