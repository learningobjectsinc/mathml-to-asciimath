var moHelpers = require('../mo-helpers');
var trim = require('trim');

module.exports = function init() {
  return function handle(element, buffer) {
    var value = trim(element.val)
    var asciiMathSymbol = moHelpers.toAsciiMath(value);

    if (typeof asciiMathSymbol == 'undefined') {
      throw new Error('Unsupported operator: ' + value)
    }

    buffer.push(asciiMathSymbol);
  };
};
