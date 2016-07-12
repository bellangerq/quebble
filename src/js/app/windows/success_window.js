var UI = require('ui');
var Geometry = require('../helpers/geometry');

var createSuccessWindow = function(isChalk) {
  var layout;

  if (isChalk) {
    layout = require('../layouts/chalk_layout').success;
  } else {
    layout = require('../layouts/basalt_layout').success;
  }

  var success = new UI.Window({
    backgroundColor: 'white',
  });

  // Add image
  var successImage = new UI.Image({
    position: Geometry.Vector(layout.image.origin),
    size:     Geometry.Vector(layout.image.size),
    image:    'images/success.png',
  });

  success.add(successImage);

  // Add text
  var successMessage = new UI.Text({
      position:   Geometry.Vector(layout.text.origin),
      size:       Geometry.Vector(layout.text.size),
      font:       'gothic-24-bold',
      color:      '#000000',
      text:       'Daily alarm changed. Well done!',
      textAlign:  'center',
  });

  success.add(successMessage);

  return success;
};

module.exports = createSuccessWindow;
