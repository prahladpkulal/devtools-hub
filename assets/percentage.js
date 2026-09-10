(() => {
  const get = id => document.getElementById(id);
  const display = value => new Intl.NumberFormat(undefined, { maximumSignificantDigits: 12 }).format(value);

  function readNumber(id) {
    const field = get(id);
    const value = Number(field.value);
    const valid = field.value.trim() !== '' && !field.validity.badInput && Number.isFinite(value);
    field.setAttribute('aria-invalid', String(!valid));
    return valid ? value : null;
  }

  get('percentageForm').addEventListener('submit', event => {
    event.preventDefault();
    const percentage = readNumber('percentage');
    const number = readNumber('number');
    const result = get('percentageResult');
    if (percentage === null || number === null) {
      result.textContent = 'Enter a valid percentage and number.';
      return;
    }
    const value = percentage / 100 * number;
    result.textContent = Number.isFinite(value)
      ? `${display(percentage)}% of ${display(number)} = ${display(value)}`
      : 'These values are too large to calculate. Try smaller numbers.';
  });

  get('changeForm').addEventListener('submit', event => {
    event.preventDefault();
    const oldValue = readNumber('oldValue');
    const newValue = readNumber('newValue');
    const result = get('changeResult');
    if (oldValue === null || newValue === null) {
      result.textContent = 'Enter valid old and new values.';
      return;
    }
    if (oldValue === 0) {
      result.textContent = 'Percentage change is undefined when the old value is zero.';
      return;
    }
    if (oldValue < 0) {
      result.textContent = 'Use a positive old value for a meaningful percentage change.';
      return;
    }
    const value = (newValue - oldValue) / oldValue * 100;
    result.textContent = Number.isFinite(value)
      ? `${display(Math.abs(value))}% ${value > 0 ? 'increase' : value < 0 ? 'decrease' : 'change'} (${display(oldValue)} → ${display(newValue)})`
      : 'These values are too large to calculate. Try smaller numbers.';
  });
})();
