var UI = require('ui');
var Geometry = require('../helpers/geometry');

var createFailureWindow = function(isChalk, message) {

  var layout;

  if (isChalk) {
    layout = require('../layouts/chalk_layout').failure;
  } else {
    layout = require('../layouts/basalt_layout').failure;
  }

  var failure = new UI.Window({
    backgroundColor: 'white'
  });

  // Add image
  var failureImage = new UI.Image({
    position: Geometry.Vector(layout.image.origin),
    size:     Geometry.Vector(layout.image.size),
    image:    'images/error.png',
  });

  failure.add(failureImage);

  // Add text
  var failureMessage = new UI.Text({
      position:   Geometry.Vector(layout.text.origin),
      size:       Geometry.Vector(layout.text.size),
      font:       'gothic-24-bold',
      color:      '#000000',
      text:       message,
      textAlign:  'center',
  });

  failure.add(failureMessage);

  return failure;
};

module.exports = createFailureWindow;
