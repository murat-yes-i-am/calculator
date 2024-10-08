const numberPartButtons = document.querySelectorAll('.button.number-part');
const operationButtons = document.querySelectorAll('.button.operation');
const auxiliaryButtons = document.querySelectorAll('.button.auxiliary');
const outputElement = document.querySelector('.button.output');

let firstOperand = 0;
let secondOperand;
let isDotUsed = false;
let operator;

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