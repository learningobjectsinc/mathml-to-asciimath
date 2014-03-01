var trim = require('trim');

module.exports = function init() {
  return function handle(element, buffer) {
    var value = trim(element.val);
    buffer.push('text(' + value + ')');
  };
};
