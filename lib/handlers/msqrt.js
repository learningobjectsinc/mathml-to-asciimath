module.exports = function init(handlerApi) {

  return function handle(element, buffer) {
    buffer.push('sqrt');
    handlerApi.handleAll(element.children, buffer);
  };
};
