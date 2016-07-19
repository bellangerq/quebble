var ajax = require('ajax');

function QuoteRepository() {
  this.fetchQuote = function(completion) {
    completion("Mother fucker holy shit, fuck you BITCH", "Nany la pute");
    // ajax(
    //   {
    //     url: 'http://quotes.rest/qod.json',
    //     type: 'json'
    //   },
    //   function(data, status, request) {
    //     var content = data.contents.quotes[0].quote;
    //     var author = data.contents.quotes[0].author;
    //     completion(content, author);
    //   },
    //   function(error, status, request) {
    //     completion(null, null, error);
    //   }
    // );
  };
};

module.exports = new QuoteRepository();
