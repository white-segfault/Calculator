let operator = "";
let operands = [0, 0];
let currentOperandIndex = 0;
let operandsActivated = [false, false];

// operation: The operation to perform
// Computes the two number given based on their operation
// numOne: first number for computation
// numTwo: second number for computation
function operate(numOne, numTwo, operation) {
    if (operation === "+") {
        return numOne + numTwo;
    } else if (operation === "-") {
        return numOne - numTwo;
    } else if (operation === "/") {
        return numOne/numTwo;
    } else if (operation === "*") {
        return numOne * numTwo;
    } else if (operation === "%") {
        return numOne % numTwo;
    } else {
        return NaN;
    }
}

// Handles the corresponding input operator to match their
// supposed functionality
// inputOperator: The operator that the user currently inputs
function handle_operators(inputOperator) {
    if (!operandsActivated[0] && !operandsActivated[1]){
        return;  // nothing to compute
    } else if (operandsActivated[0] && !operandsActivated[1] &&
            (operator !== "" || inputOperator === "equal") ) {
        return; // already have an operator, don't need more operator yet
    }

    if (operandsActivated[0] && operandsActivated[1] && operator !== "") {
        // pairwise operation
        // handle divide by 0 case somewhere later(?
        operands[0] = operate(operands[0], operands[1], operator);
        operandsActivated[1] = false;
    }

    if (inputOperator === "equal") {
        operator = "";
        leftDisplay.textContent = "";
        rightDisplay.textContent = "" + operands[0];
    } else {
        operator = inputOperator;
        rightDisplay.textContent = "";
        leftDisplay.textContent = "" + operands[0] + " " + operator;
    }
    currentOperandIndex = 1;
}

const numbers = document.querySelectorAll("button.numbers");
const leftDisplay = document.querySelector(".operation.display");
const rightDisplay = document.querySelector(".result.display");
const operations = document.querySelectorAll("button.operators");
const clearButton = document.querySelector("#equal");

numbers.forEach((number) => {
    number.addEventListener('click', function(e) {
        let input = +number.getAttribute("id");
        if (!operandsActivated[currentOperandIndex]) {
            operandsActivated[currentOperandIndex] = true;
            operands[currentOperandIndex] = input;
        } else {
            operands[currentOperandIndex] = (operands[currentOperandIndex] * 10) + input;
        }

        rightDisplay.textContent = "" + operands[currentOperandIndex];
        e.stopPropagation(); // stop any possible bubbling
    });
});

operations.forEach((operation) => {
    operation.addEventListener('click', function(e) {
        let input = operation.getAttribute("id");
        handle_operators(input);
        e.stopPropagation();
    })
});
