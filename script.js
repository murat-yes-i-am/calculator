const numberPartButtons = document.querySelectorAll('.button.number-part');
const operationButtons = document.querySelectorAll('.button.operation');
const auxiliaryButtons = document.querySelectorAll('.button.auxiliary');
const outputElement = document.querySelector('.button.output');

let firstOperand = 0;
let secondOperand;
let isDotUsed = false;