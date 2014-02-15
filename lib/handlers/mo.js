var moHelpers = require('../mo-helpers');

module.exports = function init() {

  return function handle(element, buffer) {
    var asciiMathSymbol = moHelpers.toAsciiMath(element.val);

    if (typeof asciiMathSymbol == 'undefined') {
      throw new Error('Unsupported operator: ' + element.val)
    }

    buffer.push(asciiMathSymbol);
  };
};
