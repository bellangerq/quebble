var UI = require('ui');
var RectHelper = require('../rect_helper');

var createLoadingWindow = function(layout) {
  var loading = new UI.Window({
    backgroundColor: 'white',
  });

  // Add image
  var loadingImage = new UI.Image({
    position: RectHelper.MakeVector(layout.image.origin),
    size:     RectHelper.MakeVector(layout.image.size),
    image:    'images/loading.png',
  });

  loading.add(loadingImage);

  // Add text
  var loadingMessage = new UI.Text({
      position:  RectHelper.MakeVector(layout.text.origin),
      size:      RectHelper.MakeVector(layout.text.size),
      font:      'gothic-24-bold',
      color:     '#000000',
      text:      'Don\'t panic! Today\'s quote is coming!',
      textAlign: 'center',
  });

  loading.add(loadingMessage);

  return loading;
};

module.exports = createLoadingWindow;
