// Render the fixed Physics formula list to accessible KaTeX HTML.
const fs = require('fs');
const katex = require('katex');
const formulas = JSON.parse(fs.readFileSync('physics-formula-tex.json', 'utf8'));
const output = {};
for (const [chapter, rows] of Object.entries(formulas)) {
  output[chapter] = rows.map(row => row.map(tex => katex.renderToString(tex, {
    throwOnError: true,
    output: 'htmlAndMathml',
    trust: false,
    strict: 'error',
    displayMode: false
  })));
}
process.stdout.write(JSON.stringify(output));
