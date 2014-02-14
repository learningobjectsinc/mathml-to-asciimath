// value in <mo> -> AsciiMath symbol
var moToAsciiMath = {
  '+': '+',
  '-': '-',
  '⋅': '*',
  '⋆': '**',
  '×': 'xx',
  '/': '//',
  '÷': '-:',
  '=': '=',
  '≠': '!=',
  '<': '<',
  '>': '>',
  '≤': '<=',
  '≥': '>=',
  '(': '(',
  ')': ')',
  '≈': '~~',
  '[': '[',
  ']': ']',
  ',': ',',
  '{': '{',
  '}': '}',
  '&macr;': 'bar',
  '&rarr;': 'vec',
  '&plusmn;': '+-'
};

exports.toAsciiMath = function toAsciiMath(mo) {
  return moToAsciiMath[mo];
};

exports.isOpenOperator = function isOpenOperator(operator) {
  return ['(', '[', '{'].indexOf(operator) != -1;
};

exports.isCloseOperator = function isCloseOperator(operator) {
  return [')', ']', '}'].indexOf(operator) != -1;
};
