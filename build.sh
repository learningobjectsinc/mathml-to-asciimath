#!/bin/sh

dest_file="mathml-to-asciimath.js"

browserify index.js --standalone mathml-to-asciimath > "$dest_file"
echo "Output written to $dest_file with global mathmlToAsciimath"
