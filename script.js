document.addEventListener('DOMContentLoaded', function() {
  const calculator = {
      screen: document.querySelector('#calculator-screen'),
      keys: document.querySelector('.calculator-keys'),
      currentValue: '',
      operator: null,
      previousValue: '',
  };

  calculator.keys.addEventListener('click', function(event) {
      const { target } = event;
      const { value } = target;

      if (!target.matches('button')) return;

      switch (value) {
          case '=':
              calculate();
              break;
          case 'C':
              clear();
              break;
          case '+':
          case '-':
          case '*':
          case '/':
              handleOperator(value);
              break;
          default:
              handleNumber(value);
              break;
      }

      updateScreen();
  });

  function handleNumber(number) {
      calculator.currentValue += number;
  }

  function handleOperator(operator) {
      if (calculator.operator && calculator.currentValue) {
          calculate();
      }

      calculator.previousValue = calculator.currentValue;
      calculator.currentValue = '';
      calculator.operator = operator;
  }

  function calculate() {
      let result;

      const { previousValue, currentValue, operator } = calculator;

      const prev = parseFloat(previousValue);
      const curr = parseFloat(currentValue);

      if (isNaN(prev) || isNaN(curr)) return;

      switch (operator) {
          case '+':
              result = prev + curr;
              break;
          case '-':
              result = prev - curr;
              break;
          case '*':
              result = prev * curr;
              break;
          case '/':
              result = prev / curr;
              break;
          default:
              return;
      }

      calculator.currentValue = String(result);
      calculator.operator = null;
      calculator.previousValue = '';
  }

  function clear() {
      calculator.currentValue = '';
      calculator.operator = null;
      calculator.previousValue = '';
  }

  function updateScreen() {
      calculator.screen.value = calculator.currentValue;
  }
});