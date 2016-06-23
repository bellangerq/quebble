var ajax = require('ajax');

var GetQuote = function(completion){
  ajax({
    url: 'http://quotes.rest/qod.json',
    type: 'json'
  },
  function(data, status, request) {
      var content = data.contents.quotes[0].quote;
      var author = data.contents.quotes[0].author;
      completion(content, author);
  },
  function(error, status, request) {
      console.log("Error:");
      console.log(JSON.stringify(error, null, 4));
      completion(null, null, error);
  });
};

module.exports = GetQuote;
