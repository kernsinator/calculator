let displayValue = "";
let firstOperand = "";
let secondOperand = "";
let solution;
let operator;
let isFirstPass = true;

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operator, a, b) {
    return operator(a, b);
}

function handleButtonClick(e) {
    let operators = ['+', '-', '*', '/']
    let button = e.target.getAttribute('data-button-type');

    if (button === 'clear') {
        displayValue = '';
        clearValues();
    } 
    else if (typeof(+button) === 'number' && !isNaN(+button)) {
        displayValue = displayValue.concat(button);
    } 
    else if (operators.includes(button)) {
        operator = button;
        handleOperator(+displayValue);
        displayValue = '';
        
    } 
    else if (button === '=') {
        secondOperand = +displayValue;
        displayValue = operate(operator, firstOperand, secondOperand);
    }
    
    drawScreen(`${displayValue}`);

}

function handleOperator(value) {
    if (isFirstPass) {
        firstOperand = value;
        isFirstPass = false;
    } else {
        secondOperand = value;
    }
}

function clearValues() {
    firstOperand = "";
    secondOperand = "";
    solution = "";
    operator = "";
    isFirstPass = true;
}

function operate(operator, a, b) {
    switch(operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);

    }
}


function drawScreen(text) {
    const calculatorScreen = document.querySelector('.calculator-screen');
    calculatorScreen.innerHTML = text;
}

const buttons = document.querySelectorAll('.button')
buttons.forEach(button => button.addEventListener('click', handleButtonClick))