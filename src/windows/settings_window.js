var UI = require('ui');
var RH = require('../rect_helper');
var StringUtils = require('../string_utils');

var CURRENT_EDITING_RECT;
var HIGHLIGHT_COLOR = "#0055AA";
var UNHIGHLIGHT_COLOR = "#555555";
var AM_FORMAT = 'AM';
var PM_FORMAT = 'PM';

var createSettingsWindow = function(layout) {
  var settings = new UI.Window({ backgroundColor: 'white' });

  var selectorDesc = new UI.Text({
      position:   RH.MakeVector(layout.header.origin),
      size:       RH.MakeVector(layout.header.size),
      font:       'gothic-24-bold',
      color:      '#000000',
      text:       'Set daily alarm:',
      textAlign:  'center'
  });

  settings.add(selectorDesc);

  var hourModel = {
    layout:   layout.hour,
    text:     StringUtils.ensureTwoDigits(twelveHourTime),
    editing:  true,
    square:   undefined,
    maxValue: 12
  };

  var minuteModel = {
    layout:   layout.minute,
    text:     StringUtils.ensureTwoDigits(minutes),
    editing:  false,
    square:   undefined,
    maxValue: 59
  };

  var periodModel = {
    layout:   layout.period,
    text:     isAfternoon ? PM_FORMAT : AM_FORMAT,
    editing:  false,
    square:   undefined
  };

  var inputs = [ hourModel, minuteModel, periodModel ];

  inputs.forEach(function(input){
    var square = new UI.Rect({
      position: RH.MakeVector(input.layout.origin),
      size:     RH.MakeVector(input.layout.size),
      font:     'gothic-24-bold',
      color:    '#FFFFFF',
      text:     input.text
    });

    if (input.editing) {
      CURRENT_EDITING_RECT = square;
    }

    input.square = square;

    settings.add(square)
  });

  var swapPeriod = function() {
    var text = periodModel.square.text();
    if (text == 'AM') {
      periodModel.square.text(PM_FORMAT);
    } else {
      periodModel.square.text(AM_FORMAT);
    }
  };

  var incNumberForModel = function(model, inc) {
    var nb = parseInt(model.square.text());
    var next = nb + inc;
    if (next > model.maxValue) {
      next = 0;
    }
    var nextStr = StringUtils.ensureTwoDigits(next);
    model.square.text(nextStr);
  };

  settings.on('click', 'up', function() {
    var text = CURRENT_EDITING_RECT.text();

    if (CURRENT_EDITING_RECT == periodModel.square) {
      swapPeriod();
    } else {
      var model = CURRENT_EDITING_RECT == hourModel.square ? hourModel : minuteModel;
      incNumberForModel(model, 1);
    }
  });

  settings.on('click', 'down', function() {
    if (CURRENT_EDITING_RECT == periodModel.square) {
      swapPeriod();
    } else {
      var model = CURRENT_EDITING_RECT == hourModel.square ? hourModel : minuteModel;
      incNumberForModel(model, -1);
    }
  });

  settings.on('click', 'back', function() {
    if (CURRENT_EDITING_RECT == hourModel.square) {
      settings.hide();
    } else if (CURRENT_EDITING_RECT == minuteModel.square) {
      CURRENT_EDITING_RECT = hourModel.square;
      minuteModel.square.backgroundColor(UNHIGHLIGHT_COLOR);
      hourModel.square.backgroundColor(HIGHLIGHT_COLOR);
    } else if (CURRENT_EDITING_RECT == periodModel.square) {
      CURRENT_EDITING_RECT = minuteModel.square;
      periodModel.square.backgroundColor(HIGHLIGHT_COLOR);
      minuteModel.square.backgroundColor(UNHIGHLIGHT_COLOR);
    }
  });

  return settings;
};

module.exports = createSettingsWindow;
