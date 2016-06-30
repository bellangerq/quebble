var UI = require('ui');
var Geometry = require('../helpers/geometry');

var createLoadingWindow = function(isChalk) {

  var layout;

  if (isChalk) {
    layout = require('../layouts/chalk_layout').loading;
  } else {
    layout = require('../layouts/basalt_layout').loading;
  }

  var loading = new UI.Window({
    backgroundColor: 'white'
  });

  // Add image
  var loadingImage = new UI.Image({
    position: Geometry.Vector(layout.image.origin),
    size:     Geometry.Vector(layout.image.size),
    image:    'images/loading.png'
  });

  loading.add(loadingImage);

  // Add text
  var loadingMessage = new UI.Text({
      position:  Geometry.Vector(layout.text.origin),
      size:      Geometry.Vector(layout.text.size),
      font:      'gothic-24-bold',
      color:     '#000000',
      text:      'Don\'t panic!\nToday\'s quote is coming!',
      textAlign: 'center',
  });

  loading.add(loadingMessage);

  return loading;
};

module.exports = createLoadingWindow;
