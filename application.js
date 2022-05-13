let displayNum = NaN;
let currentPow = 0;
let operator = "";
let operands = [0, 0];
let currentOperandIndex = 0;
let operandsActivated = [false, false];

const add = function(numOne, numTwo) {
    return numOne + numTwo;
};

const subtract = function(numOne, numTwo) {
    return numOne - numTwo;
};

const sum = function(nums) {
    return nums.reduce(
        (prevVal, currentVal) => prevVal + currentVal,
        0
    );
};

const multiply = function(nums) {
    return nums.reduce(
        (prevVal, currentVal) => prevVal * currentVal,
        1
    );
};

const power = function(base, power) {

    return Math.pow(base, power);

};

const factorial = function(num) {
    if (num === 0) {
        return 1;
    } else if (num < 0) {
        return "error"; // don't handle complex numbers here
    }

    let total = 1;
    for (let i = 1; i <= num; ++i) {
        total *= i;
    }

    return total;
};

const numbers = document.querySelectorAll("button.numbers");
const display = document.querySelector(".display");

numbers.forEach((number) => {
    number.addEventListener('click', function(e) {
        let input = +number.getAttribute("id");
        if (isNaN(displayNum)) {
            displayNum = input;
            operandsActivated[currentOperandIndex] = true;
        } else {
            displayNum = (displayNum * 10) + input;
        }

        operands[currentOperandIndex] = displayNum;
        display.textContent = "" + displayNum;
        e.stopPropagation(); // stop any possible bubbling
    });
});

