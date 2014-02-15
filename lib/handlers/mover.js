module.exports = function init(handlerApi) {

  return function handle(element, buffer) {
    var base = element.children[0];
    var overscript = element.children[1];

    handlerApi.handleAll([overscript, base], buffer);
  };
};
