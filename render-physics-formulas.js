// Render the fixed Physics formula list to accessible KaTeX HTML.
const fs = require('fs');
const katex = require('katex');
const formulas = JSON.parse(fs.readFileSync('physics-formula-tex.json', 'utf8'));
const derivations = JSON.parse(fs.readFileSync('physics-derivation-tex.json', 'utf8'));
const render = tex => katex.renderToString(tex, {
  throwOnError: true,
  output: 'htmlAndMathml',
  trust: false,
  strict: 'error',
  displayMode: false
});
const output = {formulas: {}, derivations: {}};
for (const [chapter, rows] of Object.entries(formulas)) {
  output.formulas[chapter] = rows.map(row => row.map(render));
}
for (const [chapter, steps] of Object.entries(derivations)) {
  output.derivations[chapter] = steps.map(([explanation, ...equations]) => ({
    explanation,
    equations: equations.map(render)
  }));
}
process.stdout.write(JSON.stringify(output));
