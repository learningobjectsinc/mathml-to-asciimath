var moHelpers = require('../mo-helpers');

function needsGrouping(element) {
    var firstChild = element.children[0];
    var lastChild = element.children.slice(-1)[0];

    // already has grouping operators
    if (firstChild.name == 'mo' &&
        moHelpers.isOpenOperator(firstChild.val) &&
        lastChild.name == 'mo' &&
        moHelpers.isCloseOperator(lastChild.val)) {

      return false;
    }

    // just mtext by itself -- ASCIIMathML does this when given text(foo)
    if (element.children.length == 1 && firstChild.name == 'mtext') {
      return false;
    }

    return true;
}

module.exports = function init(handlerApi) {

  return function handle(element, buffer) {
    var addParens = needsGrouping(element);

    if (addParens) {
      buffer.push('(');
    }

    handlerApi.handleAll(element.children, buffer);

    if (addParens) {
      buffer.push(')');
    }
  };
};
