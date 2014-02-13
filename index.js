var xmldoc = require('xmldoc');
var moMap = require('./lib/moSymbolMap');

var buffer = [];

function writeIdentifier(element) {
  write(element.val);
}

function writeNumber(element) {
  write(element.val);
}

function writeOperator(element) {
  var asciiMath = moMap[element.val];
  write(asciiMath);
}

function write(s) {
  buffer.push(s);
}

function processAll(elements) {
  elements.forEach(function(element) {
    process(element)
  });
}

function defaultHandler(element) {
  processAll(element.children);
}

function process(element) {
  var handler = handlers[element.name];
  handler(element);
}

// element name -> handler function
var handlers = {
  math: function(element) {
    processAll(element.children);
  },
  mi: function(element) {
    writeIdentifier(element);
  },
  mo: function(element) {
    writeOperator(element);
  },
  mn: function(element) {
    writeNumber(element);
  }
}

function toAsciiMath(mathml) {
  var doc = new xmldoc.XmlDocument(mathml);
  process(doc);
  var result = buffer.join(' ');
  buffer = [];
  return result;
}

module.exports = toAsciiMath;