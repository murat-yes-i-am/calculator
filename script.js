const numberPartButtons = document.querySelectorAll('.button.number-part');
const operationButtons = document.querySelectorAll('.button.operation');

const auxiliaryButtons = {
  clear: document.getElementById('clear'),
  changeSign: document.getElementById('percent'),
  percent: document.getElementById('change-sign'),
}
const outputElement = document.querySelector('.button.output');

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
