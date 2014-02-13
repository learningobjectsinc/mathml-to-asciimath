var xmldoc = require('xmldoc');
var moMap = require('./lib/moSymbolMap');

function handleIdentifier(element, buffer) {
  buffer.push(element.val);
}

function handleNumber(element, buffer) {
  buffer.push(element.val);
}

function handleOperator(element, buffer) {
  var asciiMath = moMap[element.val];
  buffer.push(asciiMath);
}

function handleFraction(element, buffer) {
  var firstChild = element.children[0];
  var secondChild = element.children[1];

  translate(firstChild, buffer);
  buffer.push('/');
  translate(secondChild, buffer);
}

function handleSuperScript(element, buffer) {
  var firstChild = element.children[0];
  var secondChild = element.children[1];

  translate(firstChild, buffer);
  buffer.push('^');
  translate(secondChild, buffer);
}

function handleSubScript(element, buffer) {
  var firstChild = element.children[0];
  var secondChild = element.children[1];

  translate(firstChild, buffer);
  buffer.push('_');
  translate(secondChild, buffer);
}

function handleRow(element, buffer) {
  var firstChild = element.children[0];
  var lastChild = element.children.slice(-1)[0];
  var hasParens =
    firstChild.name == 'mo' &&
    firstChild.val == '(' &&
    lastChild.name == 'mo' &&
    lastChild.val == ')';

  if (!hasParens) {
    buffer.push('(');
  }

  handleAll(element.children, buffer);

  if (!hasParens) {
    buffer.push(')');
  }
}

function handleSquareRoot(element, buffer) {
  buffer.push('sqrt');
  handleAll(element.children, buffer);
}

function handleMath(element, buffer) {
  handleAll(element.children, buffer);
}

function handleAll(elements, buffer) {
  elements.forEach(function(element) {
    translate(element, buffer)
  });
}

function translate(element, buffer) {
  var handler = handlers[element.name];
  handler(element, buffer);
}

// element name -> handler function
var handlers = {
  math: handleMath,
  mi: handleIdentifier,
  mo: handleOperator,
  mn: handleNumber,
  mfrac: handleFraction,
  msup: handleSuperScript,
  msub: handleSubScript,
  mrow: handleRow,
  msqrt: handleSquareRoot
};

function toAsciiMath(mathml) {
  var doc = new xmldoc.XmlDocument(mathml);

  var buffer = [];
  translate(doc, buffer);
  return buffer.join(' ');
}

module.exports = toAsciiMath;