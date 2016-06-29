var dismissWindow(window, delay) {
  setTimeout(function() {
    window.hide();
  }, delay * 1000);
}

module.exports = dismissWindow;
