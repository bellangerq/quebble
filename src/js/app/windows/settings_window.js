var UI = require('ui');
var Geometry = require('../helpers/geometry');
var StringUtils = require('../helpers/string_utils');
var Settings = require('settings');

var CURRENT_EDITING_RECT;
var HIGHLIGHT_COLOR = "#0055AA";
var UNHIGHLIGHT_COLOR = "#555555";
var AM_FORMAT = 'AM';
var PM_FORMAT = 'PM';

var createSettingsWindow = function(isChalk) {
  var USER_HOURS = Settings.option('hours');
  var USER_MINUTES = Settings.option('minutes');
  if (USER_HOURS === undefined || USER_HOURS == null) {
    USER_HOURS = 10;
  }
  if (USER_MINUTES === undefined || USER_MINUTES == null) {
    USER_MINUTES = 30;
  }

  var IS_AFTERNOON = false;
  if (USER_HOURS > 12) {
    USER_HOURS -= 12;
    IS_AFTERNOON = true;
  }

  var layout;
  if (isChalk) {
    layout = require('../layouts/chalk_layout').settings;
  } else {
    layout = require('../layouts/basalt_layout').settings;
  }

  var settings = new UI.Window({ backgroundColor: 'white' });

  var selectorDesc = new UI.Text({
      position:   Geometry.Vector(layout.text.origin),
      size:       Geometry.Vector(layout.text.size),
      font:       'gothic-24-bold',
      color:      '#000000',
      text:       'Set daily alarm:',
      textAlign:  'center'
  });

  settings.add(selectorDesc);

  console.log('hours: ' + USER_HOURS + ', minutes: ' + USER_MINUTES);

  var hourModel = {
    layout:   layout.hours,
    text:     StringUtils.ensureTwoDigits(USER_HOURS),
    editing:  true,
    square:   undefined,
    maxValue: 12
  };

  var minuteModel = {
    layout:   layout.minutes,
    text:     StringUtils.ensureTwoDigits(USER_MINUTES),
    editing:  false,
    square:   undefined,
    maxValue: 59
  };

  var periodModel = {
    layout:   layout.period,
    text:     IS_AFTERNOON ? PM_FORMAT : AM_FORMAT,
    editing:  false,
    square:   undefined
  };

  var inputs = [ hourModel, minuteModel, periodModel ];

  inputs.forEach(function(input){

    var square = new UI.Text({
      position: Geometry.Vector(input.layout.origin),
      size:     Geometry.Vector(input.layout.size),
      font:     'gothic-24-bold',
      color:    '#FFFFFF',
      text:     input.text,
      textAlign: 'center',
      backgroundColor: UNHIGHLIGHT_COLOR
    });

    if (input.editing) {
      CURRENT_EDITING_RECT = square;
      square.backgroundColor(HIGHLIGHT_COLOR);
    }

    input.square = square;

    settings.add(square);
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
    } else if (next < 0) {
      next = model.maxValue;
    }
    var nextStr = StringUtils.ensureTwoDigits(next);
    model.square.text(nextStr);
  };

  settings.on('click', 'select', function(){
    if (CURRENT_EDITING_RECT == hourModel.square) {

      CURRENT_EDITING_RECT = minuteModel.square;
      hourModel.square.backgroundColor(UNHIGHLIGHT_COLOR);
      minuteModel.square.backgroundColor(HIGHLIGHT_COLOR);
      periodModel.square.backgroundColor(UNHIGHLIGHT_COLOR);

    } else if (CURRENT_EDITING_RECT == minuteModel.square) {
      CURRENT_EDITING_RECT = periodModel.square;
      hourModel.square.backgroundColor(UNHIGHLIGHT_COLOR);
      minuteModel.square.backgroundColor(UNHIGHLIGHT_COLOR);
      periodModel.square.backgroundColor(HIGHLIGHT_COLOR);
    } else {
      var parsedHours = parseInt(hourModel.square.text);
      var parsedMinutes = parseInt(hourModel.square.text);
      var period = periodModel.square.text;
      if (period == PM_FORMAT){
        parsedHours += 12;
      }
      Settings.option('hours', parsedHours);
      Settings.option('minutes', parsedMinutes);
      USER_HOURS = parsedHours;
      USER_MINUTES = parsedMinutes;

      if (settings.settingsWindowDidSavePreferences !== undefined) {
        settings.settingsWindowDidSavePreferences();
      }
    }
  });

  settings.on('click', 'back', function() {
    if (CURRENT_EDITING_RECT == hourModel.square) {
      settings.hide();
    } else if (CURRENT_EDITING_RECT == minuteModel.square) {
      CURRENT_EDITING_RECT = hourModel.square;
      hourModel.square.backgroundColor(HIGHLIGHT_COLOR);
      minuteModel.square.backgroundColor(UNHIGHLIGHT_COLOR);
      periodModel.square.backgroundColor(UNHIGHLIGHT_COLOR);
    } else {
      CURRENT_EDITING_RECT = minuteModel.square;
      hourModel.square.backgroundColor(UNHIGHLIGHT_COLOR);
      minuteModel.square.backgroundColor(HIGHLIGHT_COLOR);
      periodModel.square.backgroundColor(UNHIGHLIGHT_COLOR);
    }
  });

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

  return settings;
};

module.exports = createSettingsWindow;
