const numberPartButtons = [...document.querySelectorAll('.button.number-part')];
const operatorUI = {
  addButton: document.getElementById('add'),
  subtractButton: document.getElementById('subtract'),
  multiplyButton: document.getElementById('multiply'),
  divideButton: document.getElementById('divide'),
};
const equalsButton = document.getElementById('equals');

const auxiliary = {
  clearButton: document.getElementById('clear'),
  changeSignButton: document.getElementById('percent'),
  percentButton: document.getElementById('change-sign'),
}
const outputElement = document.querySelector('.output');

let firstOperand = '';
let secondOperand = '';
let result = null;
let operator = null;
let isDotUsed = false;

const reset = () => {
  firstOperand = '';
  secondOperand = '';
  result = null;
  operator = null;
  isDotUsed = false;
}

const operate = (operand1, operator, operand2) => {
  switch (operator) {
    case '+':
      return operand1 + operand2;
    case '-':
      return operand1 - operand2;
    case '*':
      return operand1 * operand2;
    case '/':
      return operand1 / operand2;
  }
}

const clear = () => {
  reset();
  outputElement.textContent = '0';
}

const getAppendedOperand = (operand, part) => {
  if (operand === '' && part === '.') {
    return '0.';
  }

  if (operand === '0' && part !== '.') {
    return part;
  }

  return operand + part;
}

const showOutput = () => {
  const toShow = operator ? secondOperand
  : result ? result
  : firstOperand;

  outputElement.textContent = toShow;
}

const readNumberPartInput = (e) => {
  const enteredPart = e.target.textContent;
  const isDot = enteredPart === '.';
  const isDigit = !isDot;

  if (result && !operator) {
    result = null;
  }

  if ((isDot && !isDotUsed) || isDigit) {
    if (!operator) {
      firstOperand = getAppendedOperand(firstOperand, enteredPart);
    } else {
      secondOperand = getAppendedOperand(secondOperand, enteredPart);
    }

    isDotUsed = isDotUsed || isDot;
    showOutput();
  }
}

const readOperator = (e) => {
  const enteredOperator = e.target.textContent;

  if (operator) {
    calculate();
  }

  operator = enteredOperator;
  isDotUsed = false;
}

const calculate = () => {
  if (result) {
    firstOperand = result;
  }

  if (firstOperand && operator && secondOperand) {
    const operand1 = Number(firstOperand);
    const operand2 = Number(secondOperand);

    result = operate(operand1, operator, operand2);
    firstOperand = '';
    secondOperand = '';
    operator = null;
    isDotUsed = false;

    showOutput();
  }
}

(function addEventListeners() {
  for (const button of numberPartButtons) {
    button.addEventListener('click', readNumberPartInput);
  }
  
  for (const button in operatorUI) {
    operatorUI[button].addEventListener('click', readOperator);
  }
  
  equalsButton.addEventListener('click', calculate);
  
  auxiliary.clearButton.addEventListener('click', clear);
})();
