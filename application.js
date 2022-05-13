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

