var ensureTwoDigits = function(int) {
  if (int <= 9) {
    return "0" + int;
  } else {
    return "" + int;
  }
};

module.exports = {
  ensureTwoDigits: ensureTwoDigits
};
