var xmldoc = require('xmldoc');
var moMap = require('./lib/moSymbolMap');

function writeIdentifier(element, buffer) {
  buffer.push(element.val);
}

function writeNumber(element, buffer) {
  buffer.push(element.val);
}

function writeOperator(element, buffer) {
  var asciiMath = moMap[element.val];
  buffer.push(asciiMath);
}

function processMath(element, buffer) {
  processAll(element.children, buffer);
}

function processAll(elements, buffer) {
  elements.forEach(function(element) {
    process(element, buffer)
  });
}

function process(element, buffer) {
  var handler = handlers[element.name];
  handler(element, buffer);
}

// element name -> handler function
var handlers = {
  math: processMath,
  mi: writeIdentifier,
  mo: writeOperator,
  mn: writeNumber
}

function toAsciiMath(mathml) {
  var doc = new xmldoc.XmlDocument(mathml);

  var buffer = [];
  process(doc, buffer);
  return buffer.join(' ');
}

module.exports = toAsciiMath;