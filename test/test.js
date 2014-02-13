var toAsciiMath = require('..');


var testCases = [
  // mathml input, expected asciimath output
  ['<math><mn>1</mn><mo>+</mo><mn>2</mn></math>', '1 + 2'],
  ['<math><mn>1</mn><mo>-</mo><mn>2</mn></math>', '1 - 2'],
  ['<math><mn>1</mn><mo>⋅</mo><mn>2</mn></math>', '1 * 2'],
  [' <math><mn>1</mn><mo>⋆</mo><mn>2</mn></math>', '1 ** 2'],
  [' <math><mn>1</mn><mo>×</mo><mn>2</mn></math>', '1 xx 2']
];

testCases.forEach(function(testCase) {
  var expected = testCase[1];

  exports[expected] = function(test) {
    var input = testCase[0];
    var output = toAsciiMath(input);

    test.equal(output, expected);
    test.done();
  };
});