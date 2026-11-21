"use strict";

/**
 * ==============================================================================
 * ASSIGNMENT 5 - QUESTION 2: Higher-Order Function (applyOperation)
 * ==============================================================================
 * 
 * Problem Statement:
 * Create a function applyOperation(numbers, operation) that takes an array and a
 * callback function.
 * Use it to:
 * ● Double each number in [1, 2, 3, 4]
 * ● Square each number in [1, 2, 3, 4]
 * 
 * Concepts Demonstrated:
 * 1. Higher-Order Functions: Functions that operate on other functions by taking
 *    them as arguments or returning them.
 * 2. Immutability & Pure Functions: Returning a transformed copy without
 *    mutating the original input array.
 * 3. Functional Callbacks: Passing custom transformation operations as callbacks.
 * 4. Callback signature handling: Providing element, index, and reference array.
 * ==============================================================================
 */

console.log("==============================================================================");
console.log("       ASSIGNMENT 5 - Q2: HIGHER-ORDER FUNCTION (applyOperation)              ");
console.log("==============================================================================\n");

/**
 * Applies a transformation callback operation on each element of an input array.
 * 
 * @param {Array<number>} numbers - The source array of numbers.
 * @param {Function} operation - The callback function defining the transformation.
 * @returns {Array<number>} A brand-new array containing the transformed numbers.
 * @throws {TypeError} If numbers is not an array or operation is not a function.
 */
function applyOperation(numbers, operation) {
    // Input validation
    if (!Array.isArray(numbers)) {
        throw new TypeError("applyOperation expects the first argument to be an Array.");
    }
    if (typeof operation !== "function") {
        throw new TypeError("applyOperation expects the second argument to be a Callback Function.");
    }

    const transformedResult = [];

    // Iterate through the array and apply the callback operation
    for (let index = 0; index < numbers.length; index++) {
        const originalElement = numbers[index];
        // Pass element, index, and source array to support full callback signature
        const transformedElement = operation(originalElement, index, numbers);
        transformedResult.push(transformedElement);
    }

    return transformedResult;
}

// ------------------------------------------------------------------------------
// Named Callback Functions for Reusability and Clarity
// ------------------------------------------------------------------------------

/**
 * Callback to double a number.
 * @param {number} num 
 * @returns {number}
 */
function double(num) {
    return num * 2;
}

/**
 * Callback to square a number.
 * @param {number} num 
 * @returns {number}
 */
function square(num) {
    return num * num;
}

// ------------------------------------------------------------------------------
// Input Data
// ------------------------------------------------------------------------------
const originalNumbers = [1, 2, 3, 4];

console.log("Original Input Array:", originalNumbers);
console.log("Original Array Memory Reference:", Object.isFrozen(originalNumbers) ? "Frozen" : "Mutable");
console.log("------------------------------------------------------------------------------\n");

// ==============================================================================
// TASK 1: Double each number in [1, 2, 3, 4]
// ==============================================================================
console.log(">>> TASK 1: Double each number in [1, 2, 3, 4] <<<");

// Using named callback
const doubledNumbersNamed = applyOperation(originalNumbers, double);
console.log("Result using named function (double):", doubledNumbersNamed);

// Using arrow function callback
const doubledNumbersArrow = applyOperation(originalNumbers, (num) => num * 2);
console.log("Result using arrow function (num => num * 2):", doubledNumbersArrow);
console.log();

// ==============================================================================
// TASK 2: Square each number in [1, 2, 3, 4]
// ==============================================================================
console.log(">>> TASK 2: Square each number in [1, 2, 3, 4] <<<");

// Using named callback
const squaredNumbersNamed = applyOperation(originalNumbers, square);
console.log("Result using named function (square):", squaredNumbersNamed);

// Using arrow function callback
const squaredNumbersArrow = applyOperation(originalNumbers, (num) => num ** 2);
console.log("Result using arrow function (num => num ** 2):", squaredNumbersArrow);
console.log();

// ==============================================================================
// IMMUTABILITY VERIFICATION
// ==============================================================================
console.log("------------------------------------------------------------------------------");
console.log("IMMUTABILITY CHECK:");
console.log("Original array after operations:", originalNumbers);
console.log("Is original array reference identical to doubled array?", originalNumbers === doubledNumbersNamed ? "Yes (Mutated!)" : "No (Pure function - new array created!)");
console.log("------------------------------------------------------------------------------\n");

// ==============================================================================
// ADDITIONAL DEMONSTRATIONS: Extensibility of applyOperation
// ==============================================================================
console.log(">>> ADDITIONAL DEMONSTRATIONS: Extensibility with Custom Operations <<<");

// Operation: Cube
const cubed = applyOperation(originalNumbers, (num) => num ** 3);
console.log("Cubed [num => num ** 3]:", cubed);

// Operation: Half
const halved = applyOperation(originalNumbers, (num) => num / 2);
console.log("Halved [num => num / 2]:", halved);

// Operation: Add Index Offset
const withIndex = applyOperation(originalNumbers, (num, idx) => `Val: ${num} at Index: ${idx}`);
console.log("With index metadata:", withIndex);
