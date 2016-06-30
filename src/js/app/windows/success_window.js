var UI = require('ui');
var RectHelper = require('../rect_helper');
var timeOut = require('../utils/timeout');

var  buildSuccessScreen = function() {
  var success = new UI.Window({
    backgroundColor: 'white',
});

// Add image
var successImage = new UI.Image({
  position: RectHelper.MakeVector(layout.image.origin),
  size:     RectHelper.MakeVector(layout.image.size),
  image:    'images/success.png',
});

success.add(successImage);

// Add text
var successMessage = new UI.Text({
    position:   RectHelper.MakeVector(layout.text.origin),
    size:       RectHelper.MakeVector(layout.text.size),
    font:       'gothic-24-bold',
    color:      '#000000',
    text:       'Daily alarm changed. Well done!',
    textAlign:  'center',
});

success.add(successMessage);

// success.show();
// settings.hide();
//
//   success.on('click', function(event) {
//   success.hide();
//   });

setTimeout(success, 2000);

  return success;
};

module.exports = createSuccessWindow;
