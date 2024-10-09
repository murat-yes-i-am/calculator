const digitButtons = [...document.querySelectorAll('.button.digit')];
const dotButton = document.getElementById('dot');
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

let firstOperand = '0';
let secondOperand = null;
let isDotUsed = false;
let operator = null;

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

const operate = (operand1, operator, operand2) => {
  switch (operator) {
    case '+':
      return add(operand1, operand2);
    case '-':
      return subtract(operand1, operand2);
    case '*':
      return multiply(operand1, operand2);
    case '/':
      return divide(operand1, operand2);
  }
}

const clear = () => {
  firstOperand = '0';
  secondOperand = null;
  operator = null;
  isDotUsed = false;
  outputElement.textContent = firstOperand;
}

const fullFillOperand = (operand, digit) => {
  if (operand != '0') {
    return operand + digit;
  } else {
    return digit !== '0' ? digit : operand;
  }
}

const showInput = () => {
  const operandToShow = operator ? secondOperand : firstOperand;

  outputElement.textContent = operandToShow;
}

/**
 * 
 * @param {MouseEvent} e 
 */
const readNumberInput = (e) => {
  const enteredDigit = e.target.textContent;

  if (!operator) {
    firstOperand = fullFillOperand(firstOperand, enteredDigit);
  } else {
    secondOperand = fullFillOperand(secondOperand, enteredDigit);
  }

  showInput();
}

const readOperator = (e) => {
  const enteredOperator = e.target.textContent;

  operator = enteredOperator;

  console.log(operator);
}

const calculate = () => {
  if (firstOperand && operator && secondOperand) {
    firstOperand = operate(firstOperand, operator, secondOperand);
  }
}

for (const button of digitButtons) {
  button.addEventListener('click', readNumberInput);
}

for (const button in operatorUI) {
  operatorUI[button].addEventListener('click', readOperator);
}

equalsButton.addEventListener('click', calculate);

auxiliary.clearButton.addEventListener('click', clear);