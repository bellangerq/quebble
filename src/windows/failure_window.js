var UI = require('ui');
var RectHelper = require('../rect_helper');

var buildFailureScreen = function() {

  var failure = new UI.Window({
      backgroundColor: 'white',
    });

// Add image
var failureImage = new UI.Image({
  position: RectHelper.MakeVector(layout.image.origin),
  size:     RectHelper.MakeVector(layout.image.size),
  image:    'images/failure.png',
});

failure.add(failureImage);

// Add text
  var failureMessage = new UI.Text({
      position:   RectHelper.MakeVector(layout.text.origin),
      size:       RectHelper.MakeVector(layout.image.size),
      font:       'gothic-24-bold',
      color:      '#000000',
      text:       'Couldn\'t find today\'s quote... Sorry!',
      textAlign: 'center',
  });

  failure.add(failureMessage);

  return failure;
};

module.exports = createFailureWindow;
