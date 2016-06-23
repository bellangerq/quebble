var Vector2 = require('vector2');

var makeRect = function(x, y, w, h) {
  return {
    origin: {
      x: x,
      y: y
    },
    size: {
      w: width,
      height: height
    },
  }
};

var makeVector = function(point) {
  if (point.x !== undefined && point.y !== undefined) {
    return new Vector2(point.x, point.y);
  }
  if (point.width !== undefined && point.height !== undefined) {
    return new Vector2(point.width, point.height);
  }
};

module.exports = {
  MakeRect: makeRect,
  MakeVector: makeVector
};
