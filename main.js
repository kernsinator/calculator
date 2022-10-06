let displayValue = "";
let firstOperand = "";
let secondOperand = "";
let solution;
let operator;
let previousOperator;
let haveAlreadyCalculated = false;

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
        if (solution) {
            solution = '';
            displayValue = '';
        }
        displayValue = displayValue.concat(button);
    } 
    else if (operators.includes(button)) {
        previousOperator = operator;
        operator = button;
        handleOperator(+displayValue);
    } 
    else if (button === '=') {
        if(!displayValue) {
            drawScreen('Missed button!');
            return;
        }
        secondOperand = +displayValue;
        solution = operate(operator, firstOperand, secondOperand);
        firstOperand = solution;
        displayValue = solution;
        secondOperand = '';
        previousOperator = '';
        haveAlreadyCalculated = true;
        
    }
    
    drawScreen(`${displayValue}`);

}

function handleOperator(value) {
    if (haveAlreadyCalculated) {
        haveAlreadyCalculated = false;
        displayValue = '';
    } else if (!firstOperand) {
        firstOperand = value;
        displayValue = '';
    } else if (firstOperand && previousOperator) {
        solution = operate(previousOperator, +firstOperand, +displayValue)
        firstOperand = solution;
        displayValue = `${solution}`;
    } else if (firstOperand) {
        solution = operate(operator, +firstOperand, +displayValue)
        firstOperand = solution;
        displayValue = `${solution}`;
    }
}

function clearValues() {
    firstOperand = "";
    secondOperand = "";
    solution = "";
    operator = "";
    haveAlreadyCalculated = false;
    previousOperator = "";
}

function operate(operator, a, b) {
    switch(operator) {
        case '+':
            result = add(a, b);
            break;
        case '-':
            result = subtract(a, b);
            break;

        case '*':
            result = multiply(a, b);
            break;

        case '/':
            if(b === 0) {
                clearValues();
                return "Can't divide by 0"
            }
            result = divide(a, b);
            break;
    }
    return Math.round(result * 100) / 100
}


function drawScreen(text) {
    const calculatorScreen = document.querySelector('.calculator-screen');
    calculatorScreen.innerHTML = text;
}

const buttons = document.querySelectorAll('.button')
buttons.forEach(button => button.addEventListener('click', handleButtonClick))