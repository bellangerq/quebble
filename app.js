// Import the UI elements
var UI = require('ui');

// Define first card : make it scrollable
var main = new UI.Card({
  icon: 'app_icon.png',
  title: 'Today\'s quote',
  body: 'Always desire to learn something useful.',
  scrollable: true,
});

main.show();
