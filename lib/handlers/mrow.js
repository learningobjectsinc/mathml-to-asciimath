var moHelpers = require('../mo');

module.exports = function init(handlerApi) {

  return function handle(element, buffer) {
    var firstChild = element.children[0];
    var lastChild = element.children.slice(-1)[0];
    var hasGrouping =
      firstChild.name == 'mo' &&
      moHelpers.isOpenOperator(firstChild.val) &&
      lastChild.name == 'mo' &&
      moHelpers.isCloseOperator(lastChild.val);

    if (!hasGrouping) {
      buffer.push('(');
    }

    handlerApi.handleAll(element.children, buffer);

    if (!hasGrouping) {
      buffer.push(')');
    }
  };
};
