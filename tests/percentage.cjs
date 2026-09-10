const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const elements = {};
for (const id of ['percentageForm', 'percentage', 'number', 'percentageResult', 'changeForm', 'oldValue', 'newValue', 'changeResult']) {
  elements[id] = { value: '', validity: { badInput: false }, textContent: '', setAttribute() {}, addEventListener(event, callback) { this[event] = callback; } };
}
vm.runInNewContext(fs.readFileSync(require('node:path').join(__dirname, '../assets/percentage.js'), 'utf8'), {
  document: { getElementById: id => elements[id] }, Intl, Number
});
function run(form, values, result) {
  Object.entries(values).forEach(([id, value]) => { elements[id].value = String(value); });
  let prevented = false;
  elements[form].submit({ preventDefault() { prevented = true; } });
  assert(prevented);
  return elements[result].textContent;
}
const part = (percentage, number) => run('percentageForm', { percentage, number }, 'percentageResult');
const change = (oldValue, newValue) => run('changeForm', { oldValue, newValue }, 'changeResult');
assert.match(part(10, 500), /= 50$/);
assert.match(part(12.5, 80), /= 10$/);
assert.match(part(0, 500), /= 0$/);
assert.match(part(-10, 500), /= -50$/);
assert.match(part('', 500), /Enter a valid/);
assert.match(part('invalid', 500), /Enter a valid/);
assert.match(part('1e308', '1e308'), /too large/);
assert.match(change(100, 120), /20% increase/);
assert.match(change(100, 80), /20% decrease/);
assert.match(change(100, 100), /0% change/);
assert.match(change(100, 0), /100% decrease/);
assert.match(change(0, 100), /undefined/);
assert.match(change(-100, 100), /positive old value/);
assert.match(change('', 100), /Enter valid/);
part(10, 500);
change(100, 120);
assert.match(elements.percentageResult.textContent, /= 50$/);
console.log('Percentage calculator: 15 regression checks passed.');
