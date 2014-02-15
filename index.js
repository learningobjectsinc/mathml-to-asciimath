var xmldoc = require('xmldoc');

function handleAll(elements, buffer) {
  elements.forEach(function(element) {
    handle(element, buffer)
  });
}

function handle(element, buffer) {
  var handler = handlers[element.name] || function() {
    throw new Error('Unsupported element: ' + element.name);
  };
  handler(element, buffer);
}

var handlerApi = {
  handle: handle,
  handleAll: handleAll
};

// element name -> function(element, buffer)
var handlers = {};

[
  'math',
  'mi',
  'mo',
  'mn',
  'mfrac',
  'msup',
  'msub',
  'mrow',
  'msqrt',
  'mover',
  'mstyle'
].forEach(function registerHandler(elementName) {
  handlers[elementName] = require('./lib/handlers/' + elementName)(handlerApi);
});

function toAsciiMath(mathml) {
  var doc = new xmldoc.XmlDocument(mathml);

  var buffer = [];
  handle(doc, buffer);
  return buffer.join(' ');
}

module.exports = toAsciiMath;