module.exports = function init() {

  return function handle(element, buffer) {
    buffer.push(element.val);
  };
};
