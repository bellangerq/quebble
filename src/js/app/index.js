var IS_CHALK = Pebble.getActiveWatchInfo().platform === 'chalk';
var QuoteRepository = require('./repositories/quote_repository');

var LoadingPageCreator = require('./windows/loading_window');
var QuotePageCreator = require('./windows/quote_window');
var FailurePageCreator = require('./windows/failure_window');
var SettingsPageCreator = require('./windows/settings_window');
var SuccessPageCreator = require('./windows/success_window');

var SettingsRepository = require('./repositories/settings_repository');

SettingsRepository.registerAllWakupsForNextWeek();

/// Display the loading page
var loadingPage = LoadingPageCreator(IS_CHALK);
loadingPage.show();

/// Download Quote
QuoteRepository.fetchQuote(function(content, author, error){
  if (error !== undefined) {
    console.log('Got an error while downloading quote: ' + JSON.stringify(error));

    /// Here we should present the error screen
    var failPage = FailurePageCreator(IS_CHALK, 'Couldn\'t find today\'s quote... Sorry!');
    failPage.show();

    return;
  }

  /// Here we should present the quote screen
  var quotePage = QuotePageCreator(IS_CHALK, content, author);
  quotePage.show();

  loadingPage.hide();

  /// Here we should present the settings screen on click
  quotePage.on('click', 'select', function() {
    console.log('settings page');
    var settingsPage = SettingsPageCreator(IS_CHALK);
    settingsPage.settingsWindowDidSavePreferences = function() {
      var success = SuccessPageCreator(IS_CHALK);
      success.show();
      settingsPage.hide();

      setTimeout(function(){
        quotePage.show();
        success.hide();
      }, 5000);
    };
    settingsPage.show();
  });
});
