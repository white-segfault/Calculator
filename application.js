const NUMBERS = "1234567890";
const OPERATORS = "%/*-+=";
let calc = {};
newCalc();

// Sets up the calculator
function newCalc() {
    calc.ui = {};
    button_set_up();
    new_inputs();
}

// Set up the buttons
function button_set_up() {
    // create buttons
    calc.ui.numbers = document.querySelectorAll("button.numbers");
    calc.ui.leftDisplay = document.querySelector(".operation.display");
    calc.ui.rightDisplay = document.querySelector(".result.display");
    calc.ui.operations = document.querySelectorAll("button.operators");
    calc.ui.clearButton = document.querySelector("#reset");
    calc.ui.backSpace = document.querySelector("#backspace");
    calc.ui.decimalButton = document.querySelector("#decimal");

    // Adding event listener
    // Handle number inputs
    calc.ui.numbers.forEach((number) => {
        number.addEventListener('click', () => (
            handle_numbers(number.getAttribute("id")))
        )
    });
    // Handle calc.operator inputs
    calc.ui.operations.forEach((operation) => {
        operation.addEventListener('click', () => (
            handle_operators(operation.getAttribute("id")))
        )
    });
    calc.ui.clearButton.addEventListener('click', () => (new_inputs()));
    calc.ui.decimalButton.addEventListener('click', () => (handle_decimals()));
    calc.ui.backSpace.addEventListener('click', () => handle_backSpace());
    // keyboard support
    // Handles numbers and operators key input
    document.addEventListener('keypress', (event) => {
        for (let i = 0; i < NUMBERS.length; ++i) {
            if (NUMBERS[i] === event.key) {
                handle_numbers(event.key);
                return;
            }
        }
        for (let i = 0; i < OPERATORS.length; ++i) {
            if (OPERATORS[i] === event.key) {
                handle_operators(event.key);
                return;
            }
        }
        if (event.key === ".") {
            handle_decimals();
        }
    })
    // Handles backspace and reset keys
    document.addEventListener('keydown', (event) => {
        switch (event.key) {
            case "Backspace":
                handle_backSpace();
                break;
            case "Esc":
            case "Escape":
                new_inputs();
        }
    });
}

// Handles backspace key when pressed
function handle_backSpace() {
    if (calc.ui.rightDisplay.textContent.length <= 0) {
        // do nothing
    } else if (calc.ui.rightDisplay.textContent.length === 1 ||
        (calc.ui.rightDisplay.textContent.length === 2 && calc.operands[calc.currentOperandIndex] < 0)) {
        calc.ui.rightDisplay.textContent = "";
        calc.operands[calc.currentOperandIndex] = 0;
        calc.operandsActivated[calc.currentOperandIndex] = false;
    } else {
        calc.ui.rightDisplay.textContent = calc.ui.rightDisplay.textContent.slice(0,
            calc.ui.rightDisplay.textContent.length - 1);
        calc.operands[calc.currentOperandIndex] = parseFloat(calc.ui.rightDisplay.textContent);
    }
}

// Starts the calculator in a fresh mode.
function new_inputs() {
    calc.operator = "";
    calc.operands = [0, 0];
    calc.decimalActivated = [false, false];
    calc.currentOperandIndex = 0;
    calc.operandsActivated = [false, false];
    calc.ui.leftDisplay.textContent = "";
    calc.ui.rightDisplay.textContent = "";
}

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

// Handles the corresponding input calc.operator to match their
// supposed functionality
// inputOperator: The calc.operator that the user currently inputs
function handle_operators(inputOperator) {
    if (!calc.operandsActivated[0] && !calc.operandsActivated[1]){
        return;  // nothing to compute
    } else if (calc.operandsActivated[0] && !calc.operandsActivated[1] &&
            (calc.operator !== "" || inputOperator === "equal") ) {
        return; // already have an calc.operator, don't need more calc.operator yet
    }

    if (calc.operandsActivated[0] && calc.operandsActivated[1] && calc.operator !== "") {
        // pairwise operation
        let valueComputed = Math.round(operate(calc.operands[0], calc.operands[1], calc.operator) * 1000) / 1000;
        if (valueComputed === 1/0) {
            alert("You cannot divide by 0!");
            return;
        } else if (isNaN(valueComputed)) {
            alert("You cannot have mod 0");
            return;
        }
        calc.operands[0] = valueComputed;
        calc.operandsActivated[1] = false;
    }

    calc.operands[1] = 0;
    if (inputOperator === "equal" || inputOperator === "=") {
        calc.operator = "";
        calc.ui.leftDisplay.textContent = "";
        calc.ui.rightDisplay.textContent = "" + calc.operands[0];
        calc.currentOperandIndex = 0;
    } else {
        calc.operator = inputOperator;
        calc.ui.rightDisplay.textContent = "";
        calc.ui.leftDisplay.textContent = "" + calc.operands[0] + " " + calc.operator;
        calc.currentOperandIndex = 1;
    }
}

// Handle number inputs by the user
// input: input of the user in string
function handle_numbers(input) {
    input = +input;
    if (!calc.operandsActivated[calc.currentOperandIndex]) {
        calc.operandsActivated[calc.currentOperandIndex] = true;
        calc.operands[calc.currentOperandIndex] = input;
    } else {
        // decimal mode
        if (calc.decimalActivated[calc.currentOperandIndex]) {
            calc.ui.rightDisplay.textContent += "" + input;
            calc.operands[calc.currentOperandIndex] = parseFloat(calc.ui.rightDisplay.textContent);
            return;
        }

        if (calc.operands[calc.currentOperandIndex]  >= 0) {
            calc.operands[calc.currentOperandIndex] = (calc.operands[calc.currentOperandIndex] * 10) + input;
        } else {
            calc.operands[calc.currentOperandIndex] = (calc.operands[calc.currentOperandIndex] * 10) - input;
        }
    }
    calc.ui.rightDisplay.textContent = "" + calc.operands[calc.currentOperandIndex];
}

// Handles decimal inputs
function handle_decimals() {
    if (calc.operandsActivated[calc.currentOperandIndex]
        && !calc.decimalActivated[calc.currentOperandIndex]) {
            calc.ui.rightDisplay.textContent += ".";
            calc.decimalActivated[calc.currentOperandIndex] = true;
        }
}