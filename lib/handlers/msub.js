module.exports = function init(handlerApi) {

  return function handle(element, buffer) {
    var firstChild = element.children[0];
    var secondChild = element.children[1];

    handlerApi.handle(firstChild, buffer);
    buffer.push('_');
    handlerApi.handle(secondChild, buffer);
  };
};
