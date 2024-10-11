const MAX_LENGTH = 9;

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
  changeSignButton: document.getElementById('change-sign'),
  percentButton: document.getElementById('percent'),
}
const outputElement = document.querySelector('.output');

let firstOperand = '';
let secondOperand = '';
let result = null;
let operator = null;
let isDotUsed = false;
let currentInputLength = 0;

const reset = () => {
  firstOperand = '';
  secondOperand = '';
  result = null;
  operator = null;
  isDotUsed = false;
  currentInputLength = 0;
}

const clear = () => {
  reset();
  outputElement.textContent = '0';
}

const showOutput = () => {
  const toShow = operator ? secondOperand
    : result ? result
      : firstOperand;

  outputElement.textContent = toShow.slice(0, 10);
}

const getOpposite = (number) => '' + -number;

const changeSign = () => {
  if (!operator && result) {
    result = getOpposite(result);
  } else if (!operator && firstOperand) {
    firstOperand = getOpposite(firstOperand);
  } else if (operator && secondOperand) {
    secondOperand = getOpposite(secondOperand);
  } else {
    firstOperand = '0';
  }

  showOutput();
}

const getPercent = (number) => '' + (number / 100);

const changeToPercent = () => {
  if (!operator && result) {
    result = getPercent(result);
  } else if (!operator && firstOperand) {
    firstOperand = getPercent(firstOperand);
  } else if (operator && secondOperand) {
    secondOperand = getPercent(secondOperand);
  } else {
    firstOperand = '0';
  }

  showOutput();
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

const getAppendedOperand = (operand, part) => {
  if (operand === '' && part === '.') {
    return '0.';
  }

  if (operand === '0' && part !== '.') {
    return part;
  }

  return operand + part;
}

const readNumberPartInput = (e) => {
  if (currentInputLength < MAX_LENGTH) {
    const enteredPart = e.target.textContent;
    const isDot = enteredPart === '.';
    const isDigit = !isDot;

    if (result && !operator) {
      result = null;
    }

    if ((isDot && !isDotUsed) || isDigit) {
      if (!operator) {
        firstOperand = getAppendedOperand(firstOperand, enteredPart);
        currentInputLength = firstOperand.length;
      } else {
        secondOperand = getAppendedOperand(secondOperand, enteredPart);
        currentInputLength = secondOperand.length;
      }

      isDotUsed = isDotUsed || isDot;
      showOutput();
    }
  }
}

const getOperatorElement = (operator) => {
  switch (operator) {
    case '+':
      return operatorUI.addButton;
    case '-':
      return operatorUI.subtractButton;
    case '*':
      return operatorUI.multiplyButton;
    case '/':
      return operatorUI.divideButton;
    default:
      return null;
  }
}

const setOperatorSelected = (operator) => {
  const operatorElement = getOperatorElement(operator);
  operatorElement.classList.add('selected');
}

const unsetOperatorSelected = (operator) => {
  const operatorElement = getOperatorElement(operator);
  operatorElement.classList.remove('selected');
}

const readOperator = (e) => {
  const enteredOperator = e.target.textContent;

  if (!firstOperand && !result) {
    firstOperand = '0';
  }

  if (operator) {
    calculate();
  }

  operator = enteredOperator;
  setOperatorSelected(operator);
  isDotUsed = false;
  currentInputLength = 0;
}

const calculate = () => {
  if (result) {
    firstOperand = result;
  }

  if (firstOperand && operator && secondOperand) {
    const operand1 = Number(firstOperand);
    const operand2 = Number(secondOperand);

    result = '' + operate(operand1, operator, operand2);
    unsetOperatorSelected(operator);

    firstOperand = '';
    secondOperand = '';
    operator = null;
    isDotUsed = false;

    showOutput();
  } else {
    unsetOperatorSelected(operator);
    operator = null;
  }
}

const isNumberPart = (key) => '1234567890.'.includes(key);

const isOperator = (key) => '+-*/='.includes(key) || key === 'Enter';

const isEscape = (key) => key === 'Escape';

const readKey = (e) => {
  const { key } = e;

  switch (true) {
    case isNumberPart(key):
      readNumberPartInput({ target: { textContent: key } });
      break;
    case isOperator(key):
      readOperator({ target: { textContent: key } });
      break;
    case isEscape(key):
      clear();
      break;
  }
}

(function addEventListeners() {
  document.body.addEventListener('keydown', readKey);

  for (const button of numberPartButtons) {
    button.addEventListener('click', readNumberPartInput);
  }

  for (const button in operatorUI) {
    operatorUI[button].addEventListener('click', readOperator);
  }

  equalsButton.addEventListener('click', calculate);

  auxiliary.clearButton.addEventListener('click', clear);

  auxiliary.changeSignButton.addEventListener('click', changeSign);

  auxiliary.percentButton.addEventListener('click', changeToPercent);
})();
