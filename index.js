
const inputBox = document.getElementById('input');
const expressionDiv = document.getElementById('expression');
const resultDiv = document.getElementById('answer');

let expression = '';
let answer = '';

function buttonClick(event) {
    const target = event.target;
    const action = target.dataset.action;
    const value = target.dataset.value;
    //console.log(target, action, value);

switch (action) {
    case 'number':
        addValue(value);
        break;
    case 'clear':
        clear();
        break;
    
    case 'backspace':
        backspace();
        break;

    case 'addition':
    case 'subtraction':
    case 'multiplication':
    case 'division':
        if (expression === '' && answer !== '') {
            startFromResult(value);
        } else if (expression !== '' && !isLastCharOperator()) {
           addValue(value);
        }
        break;

    case 'submit':
        submit();
        break;
    case 'negate':
        negate();
        break;
    case 'mod':
        percentage();
        break;
    case 'decimal':
        decimal(value);
        break;
}

  updateDisplay(expression, answer);
}


inputBox.addEventListener('click', buttonClick); 

function addValue(value) {
    if (value === '.') {
        const lastOperatorIndex = expression.search(/[+\-*/]/);
        const lastDecimalIndex = expression.lastIndexOf('.');
        const lastNumberIndex = Math.max(
            expression.lastIndexOf('+'),
            expression.lastIndexOf('-'),
            expression.lastIndexOf('*'),
            expression.lastIndexOf('/')
        );

        if (
            (lastDecimalIndex < lastOperatorIndex ||
             lastDecimalIndex < lastNumberIndex || 
             lastDecimalIndex === -1) && (expression === '' || 
            expression.slice(lastNumberIndex + 1).indexOf('-') 
            === -1)
        ) {
        expression += value
     }
   } else {
      expression += value;
   }
}

function updateDisplay(expression, answer) {
    expressionDiv.textContent = expression;
    resultDiv.textContent = answer;
}

function clear() {
    expression = '';
    answer = '';
}

function backspace() {
    expression = expression.slice(0, -1);
}

function isLastCharOperator() {
    return isNaN(parseInt(expression.slice(-1)));
}
function startFromResult(value) {
    expression += answer + value;
}

function submit() {
    answer = evaluateExpression();
    expression = '';
}

function evaluateExpression() {
    const evalAnswer = eval(expression);
    return isNaN(evalAnswer) || !isFinite(evalAnswer)
    ? ' '
    : evalAnswer < 1 
    ? parseFloat(evalAnswer.toFixed(10))
    : parseFloat(evalAnswer.toFixed(2));
}

function negate() {
    if (expression === '' && answer !== '') {
        answer = -answer;
    } else if (!expression.startsWith('-') && expression !== '') {
        expression = '-' + expression;

    } else if (expression.startsWith('-')) {
        expression = expression.slice(1);
    }
}

function percentage() {
    if (expression !== '') {
        answer = evaluateExpression();
        expression = '';
        if (!isNaN(answer) && isFinite(answer)) {
            answer /= 100;
        } else {
            answer = '';
        }
    } else if(answer !== '') {
        answer = parseFloat(answer) / 100;
    }
}

function decimal(value) {
    if (!expression.endsWith('.') && !isNaN(expression.slice(-1))) {
        addValue(value);
    }
}