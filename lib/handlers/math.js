module.exports = function init(handlerApi) {

  return function handle(element, buffer) {
    handlerApi.handleAll(element.children, buffer);
  };
};
