var Vector2 = require('vector2');

var makeRect = function(x, y, width, height) {
  return {
    origin: { x: x, y: y },
    size: { width: width, height: height },
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

var getMaxY = function(rect) {
  return rect.origin.x + rect.size.height;
};

module.exports = {
  Rect: makeRect,
  Vector: makeVector,
  MaxY: getMaxY
};
