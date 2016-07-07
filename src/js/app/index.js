var IS_CHALK = Pebble.getActiveWatchInfo().platform === 'chalk';
var QuoteRepository = require('./repositories/quote_repository');

var LoadingPageCreator = require('./windows/loading_window');
var QuotePageCreator = require('./windows/quote_window');
var FailurePageCreator = require('./windows/failure_window');
var SettingsPageCreator = require('./windows/settings_window');

/// Display the loading page
var loadingPage = LoadingPageCreator(IS_CHALK);
loadingPage.show();

/// Download Quote
var quoteRepository = new QuoteRepository();
quoteRepository.fetchQuote(function(content, author, error){
  if (error !== undefined) {
    console.log('Got an error while downloading quote: ' + JSON.stringify(error));

    /// Here we should present the error screen
    var failPage = FailurePageCreator(IS_CHALK, 'Couldn\'t find today\'s quote... Sorry!');
    failPage.show();

  } else {
    console.log('Getting quote: \n\"' + content + '\"\n' + author);

    /// Here we should present the quote screen
    var quotePage = QuotePageCreator(IS_CHALK, content, author);
    quotePage.show();
  }

  loadingPage.hide();

  /// Here we should present the settings screen on click
  quotePage.on('click', 'select', function() {

    var settingsPage = SettingsPageCreator(IS_CHALK);
    settings.show();

    });

});
