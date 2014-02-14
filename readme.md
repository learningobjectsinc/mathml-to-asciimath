# mathml-to-asciimath

Naively convert subset of MathML to AsciiMath.

## Usage

```
var convert = require('mathml-to-asciimath');

var mathml = "<math><mn>1</mn><mo>+</mo><mn>2</mn></math>";
convert(mathml); // => '1 + 2'
```

## This module is not

- comprehensive
- performant

