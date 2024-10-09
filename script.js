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
let secondOperand = '';
let isDotUsed = false;
let operator = null;

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
  firstOperand = '0';
  secondOperand = '';
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

const readNumberInput = (e) => {
  const enteredDigit = e.target.textContent;

  if (!operator) {
    firstOperand = fullFillOperand(firstOperand, enteredDigit);
  } else {
    secondOperand = fullFillOperand(secondOperand, enteredDigit);
  }

  showInput();
}

const readDotInput = () => {
  if (!isDotUsed) {
    if (!operator) {
      firstOperand = firstOperand + '.';
    } else {
      secondOperand = secondOperand + '.';
    }

    isDotUsed = true;
  }
}

const readOperator = (e) => {
  const enteredOperator = e.target.textContent;

  if (operator) {
    calculate();
  }

  operator = enteredOperator;
}

const calculate = () => {
  if (firstOperand && operator && secondOperand) {
    const operand1 = Number(firstOperand);
    const operand2 = Number(secondOperand);

    firstOperand = operate(operand1, operator, operand2);
    secondOperand = '';
    operator = null;

    showInput();
  }
}

for (const button of digitButtons) {
  button.addEventListener('click', readNumberInput);
}

dotButton.addEventListener('click', readDotInput);

for (const button in operatorUI) {
  operatorUI[button].addEventListener('click', readOperator);
}

equalsButton.addEventListener('click', calculate);

auxiliary.clearButton.addEventListener('click', clear);