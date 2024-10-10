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

let firstOperand = 0;
let secondOperand = 0;
let result = null;
let operator = null;
let isDotUsed = false;

const reset = () => {
  firstOperand = 0;
  secondOperand = 0;
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
  outputElement.textContent = firstOperand;
}

const getAppendedOperand = (operand, part) => {
  if (operand !== 0 || part === '.') {
    return operand + part;
  } else {
    return part !== '0' ? part : operand;
  }
}

const showOutput = () => {
  const operandToShow = result ? result
  : operator ? secondOperand
  : firstOperand;

  outputElement.textContent = operandToShow;
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

    isDotUsed = isDot;
    showOutput();
  }
}

const readOperator = (e) => {
  const enteredOperator = e.target.textContent;

  if (operator) {
    firstOperand = result;
    result = null;
    calculate();
  }

  operator = enteredOperator;
  isDotUsed = false;
}

const calculate = () => {
  if (firstOperand && operator && secondOperand) {
    const operand1 = Number(firstOperand);
    const operand2 = Number(secondOperand);

    result = operate(operand1, operator, operand2);
    firstOperand = 0;
    secondOperand = 0;
    operator = null;

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
