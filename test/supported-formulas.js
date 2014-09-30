var toAsciiMath = require('..');


var testCases = [
  // mathml input, expected asciimath output
  ['<math><mn>1</mn><mo>+</mo><mn>2</mn></math>', '1 + 2'],
  ['<math><mn>1</mn><mo>-</mo><mn>2</mn></math>', '1 - 2'],
  ['<math><mn>1</mn><mo>&sdot;</mo><mn>2</mn></math>', '1 * 2'],
  ['<math><mn>1</mn><mo>&Star;</mo><mn>2</mn></math>', '1 ** 2'],
  ['<math><mn>1</mn><mo>&times;</mo><mn>2</mn></math>', '1 xx 2'],
  ['<math><mi>a</mi><mi>b</mi></math>', 'a b'],
  ['<math><mn>2</mn><mi>b</mi></math>', '2 b'],
  ['<math><mn>2</mn><mrow><mo>(</mo><mi>x</mi><mo>+</mo><mn>2</mn><mo>)</mo></mrow></math>', '2 ( x + 2 )'],
  ['<math><mn>1</mn><mo>/</mo><mn>2</mn></math>', '1 // 2'],
  ['<math><mfrac><mn>1</mn><mn>2</mn></mfrac></math>', '1 / 2'],
  ['<math><mn>1</mn><mo>&divide;</mo><mn>2</mn></math>', '1 -: 2'],
  ['<math><mi>a</mi><mo>+</mo><mi>b</mi></math>', 'a + b'],
  ['<math><mn>1</mn><mo>+</mo><mi>b</mi></math>', '1 + b'],
  ['<math><msup><mi>a</mi><mn>2</mn></msup></math>', 'a ^ 2'],
  ['<math><msup><mi>x</mi><mrow><mi>i</mi><mi>j</mi></mrow></msup></math>', 'x ^ ( i j )'],
  ['<math><msub><mi>x</mi><mn>1</mn></msub></math>', 'x _ 1'],
  ['<math><msub><mi>x</mi><mrow><mi>i</mi><mi>j</mi></mrow></msub></math>', 'x _ ( i j )'],
  ['<math><mi>a</mi><mo>+</mo><mn>3</mn><mo>=</mo><mn>4</mn></math>', 'a + 3 = 4'],
  ['<math><mfrac><mrow><mn>1</mn><mo>+</mo><mn>2</mn><mo>+</mo><mn>3</mn><mo>+</mo><mn>4</mn></mrow><mn>10</mn></mfrac></math>', '( 1 + 2 + 3 + 4 ) / 10'],
  ['<math><mrow><mo>(</mo><mi>x</mi><mo>+</mo><mn>1</mn><mo>)</mo></mrow></math>', '( x + 1 )'],
  ['<math><mfrac><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mn>4</mn></mfrac></math>', '( x + 1 ) / 4'],
  ['<math><mfrac><mrow><mn>1</mn><mo>+</mo><mn>2</mn><mo>+</mo><mn>3</mn><mo>+</mo><mn>4</mn></mrow><mrow><mn>10</mn><mo>+</mo><mi>a</mi><mo>+</mo><mi>b</mi></mrow></mfrac></math>', '( 1 + 2 + 3 + 4 ) / ( 10 + a + b )'],
  ['<math><mn>4</mn><mfrac><mn>2</mn><mn>3</mn></mfrac></math>', '4 2 / 3'],
  ['<math><mfrac><mn>3</mn><mn>4</mn></mfrac><mrow><mo>(</mo><mn>240</mn><mo>)</mo></mrow><mo>=</mo><mn>180</mn></math>', '3 / 4 ( 240 ) = 180'],
  ['<math><mrow><mo>(</mo><mn>0.37</mn><mo>)</mo></mrow><mrow><mo>(</mo><mn>120</mn><mo>)</mo></mrow><mo>=</mo><mn>44.4</mn></math>', '( 0.37 ) ( 120 ) = 44.4'],
  ['<math><msqrt><mi>x</mi></msqrt></math>', 'sqrt x'],
  ['<math><msqrt><mrow><mi>x</mi></mrow></msqrt></math>', 'sqrt ( x )'],
  ['<math><msqrt><mrow><mi>x</mi><mo>+</mo><mn>2</mn></mrow></msqrt></math>', 'sqrt ( x + 2 )'],
  ['<math><mi>a</mi><mo>=</mo><mn>2</mn></math>', 'a = 2'],
  ['<math><mi>a</mi><mo>&ne;</mo><mn>2</mn></math>', 'a != 2'],
  ['<math><mi>a</mi><mo>&lt;</mo><mn>2</mn></math>', 'a < 2'],
  ['<math><mi>a</mi><mo>&gt;</mo><mn>2</mn></math>', 'a > 2'],
  ['<math><mi>a</mi><mo>&le;</mo><mi>b</mi></math>', 'a <= b'],
  ['<math><mi>a</mi><mo>&ge;</mo><mi>b</mi></math>', 'a >= b'],
  ['<math><mi>a</mi><mo>&asymp;</mo><mn>2</mn></math>', 'a ~~ 2'],
  ['<math><mrow><mo>[</mo><mn>1</mn><mo>,</mo><mn>3</mn><mo>]</mo></mrow></math>', '[ 1 , 3 ]'],
  ['<math><mrow><mo>[</mo><mn>1</mn><mo>,</mo><mn>3</mn><mo>)</mo></mrow></math>', '[ 1 , 3 )'],
  ['<math><mrow><mo>(</mo><mn>1</mn><mo>,</mo><mn>3</mn><mo>]</mo></mrow></math>', '( 1 , 3 ]'],
  ['<math><mrow><mo>(</mo><mn>1</mn><mo>,</mo><mn>3</mn><mo>)</mo></mrow></math>', '( 1 , 3 )'],
  ['<math><mrow><mo>{</mo><mn>1</mn><mo>,</mo><mn>3</mn><mo>}</mo></mrow></math>', '{ 1 , 3 }'],
  ['<math><mn>3.3</mn><mover><mn>3</mn><mo>&macr;</mo></mover></math>', '3.3 bar 3'],
  ['<math><mover><mrow><mi>a</mi><mi>b</mi></mrow><mo>&macr;</mo></mover></math>', 'bar ( a b )'],
  ['<math><mover><mrow><mi>a</mi><mi>b</mi></mrow><mo>&rarr;</mo></mover></math>', 'vec ( a b )'],
  ['<math><mover><mrow><mi>a</mi><mi>b</mi></mrow><mo>&harr;</mo></mover></math>', 'line ( a b )'],
  ['<math><mn>2</mn><mo>&plusmn;</mo><mn>3</mn></math>', '2 +- 3'],
  ['<math><mn>2</mn><mo>+</mo><mtext>dog</mtext></math>', '2 + text(dog)'],
  ['<math><mn>2</mn><mo>+</mo><mtext>?</mtext></math>', '2 + text(?)'],
  ['<math><mn>2</mn><mo>+</mo><mo>?</mo></math>', '2 + ?'],
  ['<math><mn>2</mn><mo>+</mo><mtext>__</mtext></math>', '2 + text(__)'],
  ['<math><mo>&ang;</mo></math>', '/_'],
  ['<math><mo>&ang;</mo><mi>A</mi><mi>B</mi><mi>C</mi></math>', '/_ A B C'],
  ['<math><mn>4</mn><mo>&deg;</mo></math>', '4 deg'],

  ['<math><mstyle><mn>1</mn><mo>+</mo><mn>2</mn></mstyle></math>', '1 + 2', 'has <mstyle>'],
  ['<?xml version="1.0"?><math><mn>1</mn><mo>+</mo><mn>2</mn></math>', '1 + 2', 'has xml declaration'],
  ['<math><mn>  \t\n\r  1  \n\r\t   </mn><mo>+</mo><mi>b</mi></math>', '1 + b', 'whitespace inside <mn>'],
  ['<math><mn>1</mn><mo>   \n\r\t   +   \n\r\t   </mo><mi>b</mi></math>', '1 + b', 'whitespace inside <mo>'],
  ['<math><mn>1</mn><mo>+</mo><mi>  \n\r\t   b   \n\r\t  </mi></math>', '1 + b', 'whitespace inside <mi>'],
  ['<math><mn>1</mn><mo>+</mo><mtext>  \n\r\t   dog   \n\r\t  </mtext></math>', '1 + text(dog)', 'whitespace inside <mtext>'],
  ['<math><mrow><mtext>__</mtext></mrow><mo>+</mo><mn>4</mn></math>', 'text(__) + 4'],
  ['<math><mrow><mo>(</mo><mrow><mtext>__</mtext></mrow><mo>+</mo><mn>3</mn><mo>)</mo></mrow><mo>+</mo><mn>3</mn></math>', '( text(__) + 3 ) + 3'],

  // greek symbols - identifiers
  ['<math><mi>&alpha;</mi></math>'    , 'alpha'],
  ['<math><mi>&beta;</mi></math>'     , 'beta'],
  ['<math><mi>&chi;</mi></math>'      , 'chi'],
  ['<math><mi>&delta;</mi></math>'    , 'delta'],
  ['<math><mi>&epsilon;</mi></math>'  , 'epsi'],
  ['<math><mi>&eta;</mi></math>'      , 'eta'],
  ['<math><mi>&gamma;</mi></math>'    , 'gamma'],
  ['<math><mi>&iota;</mi></math>'     , 'iota'],
  ['<math><mi>&kappa;</mi></math>'    , 'kappa'],
  ['<math><mi>&lambda;</mi></math>'   , 'lambda'],
  ['<math><mi>&mu;</mi></math>'       , 'mu'],
  ['<math><mi>&nu;</mi></math>'       , 'nu'],
  ['<math><mi>&omega;</mi></math>'    , 'omega'],
  ['<math><mi>&phi;</mi></math>'      , 'phi'],
  ['<math><mi>&pi;</mi></math>'       , 'pi'],
  ['<math><mi>&psi;</mi></math>'      , 'psi'],
  ['<math><mi>&rho;</mi></math>'      , 'rho'],
  ['<math><mi>&sigma;</mi></math>'    , 'sigma'],
  ['<math><mi>&tau;</mi></math>'      , 'tau'],
  ['<math><mi>&theta;</mi></math>'    , 'theta'],
  ['<math><mi>&upsilon;</mi></math>'  , 'upsilon'],
  ['<math><mi>&xi;</mi></math>'       , 'xi'],
  ['<math><mi>&zeta;</mi></math>'     , 'zeta'],

  // greek symbols - operators
  ['<math><mo>&Delta;</mo></math>'  , 'Delta'],
  ['<math><mo>&Gamma;</mo></math>'  , 'Gamma'],
  ['<math><mo>&Lambda;</mo></math>' , 'Lambda'],
  ['<math><mo>&Omega;</mo></math>'  , 'Omega'],
  ['<math><mo>&Phi;</mo></math>'    , 'Phi'],
  ['<math><mo>&Pi;</mo></math>'     , 'Pi'],
  ['<math><mo>&Sigma;</mo></math>'  , 'Sigma'],
  ['<math><mo>&Theta;</mo></math>'  , 'Theta'],
  ['<math><mo>&Xi;</mo></math>'     , 'Xi']
];

testCases.forEach(function(testCase) {
  var expected = testCase[1];
  var note = testCase[2];
  note = note ? ' (' + note + ')' : '';

  exports[expected + note] = function(test) {
    var input = testCase[0];
    var output = toAsciiMath(input);

    test.equal(output, expected);
    test.done();
  };
});