var ensureTwoDigits = function(int) {
  if (int <= 9) {
    return "0" + int;
  } else {
    return "" + int;
  }
};

var strTruncate = function(string, width) {
	string = string.replace(/[\s\r\n]+/, ' ');
	if (string.length >= width) {
		return string[width - 1] === ' ' ? string.substr(0, width - 1) : string.substr(0, string.substr(0, width).lastIndexOf(' '));
	}
	return string;
};

var strTruncateWhole = function(string, width) {
	var arr = [];
	string = string.replace(/[\s\r\n]+/, ' ');
	var b = 0;
	while (b < string.length) {
		arr.push(strTruncate(string.substring(b), width));
		b += arr[arr.length - 1].length;
	}
	return arr;
};

var calculateUITextHeight = function(fontSize, charsPerLine, string) {
	var split = strTruncateWhole(string, charsPerLine);
	var height = split.length * fontSize;
	return height;
};

module.exports = {
  ensureTwoDigits: ensureTwoDigits,
  calculateUITextHeight: calculateUITextHeight
};
