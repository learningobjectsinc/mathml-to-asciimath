var toAsciiMath = require('..');


var testCases = [
  // mathml input, expected asciimath output
  ['<math><mn>1</mn><mo>+</mo><mn>2</mn></math>', '1 + 2'],
  ['<math><mn>1</mn><mo>-</mo><mn>2</mn></math>', '1 - 2'],
  ['<math><mn>1</mn><mo>⋅</mo><mn>2</mn></math>', '1 * 2'],
  ['<math><mn>1</mn><mo>⋆</mo><mn>2</mn></math>', '1 ** 2'],
  ['<math><mn>1</mn><mo>×</mo><mn>2</mn></math>', '1 xx 2'],
  ['<math><mn>1</mn><mo>/</mo><mn>2</mn></math>', '1 // 2'],
  ['<math><mfrac><mn>1</mn><mn>2</mn></mfrac></math>', '1 / 2'],
  ['<math><mn>1</mn><mo>÷</mo><mn>2</mn></math>', '1 -: 2'],
  ['<math><mi>a</mi><mo>+</mo><mi>b</mi></math>', 'a + b'],
  ['<math><mn>1</mn><mo>+</mo><mi>b</mi></math>', '1 + b'],
  ['<math><msup><mi>a</mi><mn>2</mn></msup></math>', 'a ^ 2'],
  ['<math><msub><mi>x</mi><mn>1</mn></msub></math>', 'x _ 1']

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