"use strict";

/**
 * ==============================================================================
 * ASSIGNMENT 5 - QUESTION 8: Custom Prototype Method Array.prototype.myMap
 * ==============================================================================
 * 
 * Problem Statement:
 * Add a custom prototype method myMap() to all arrays that behaves like the
 * built-in map() function.
 * 
 * Example:
 * [1, 2, 3].myMap(num => num * 2); // [2, 4, 6]
 * 
 * Concepts Demonstrated:
 * 1. Extending Built-in Prototypes: Augmenting Array.prototype safely with custom methods.
 * 2. Complete ECMAScript Specification Compliance:
 *    - Callback arguments: (currentValue, index, array).
 *    - Optional 'thisArg' context binding via callback.call(thisArg, ...).
 *    - Sparse array handling: Preserving array holes/empty slots (i in this).
 *    - Input validation: Throwing TypeError if callback is not callable or array is null/undefined.
 * 3. Pure Function Behavior: Does not mutate the original caller array; returns a new array.
 * ==============================================================================
 */

console.log("==============================================================================");
console.log("   ASSIGNMENT 5 - Q8: CUSTOM PROTOTYPE METHOD Array.prototype.myMap           ");
console.log("==============================================================================\n");

// ==============================================================================
// IMPLEMENTATION: Array.prototype.myMap
// ==============================================================================

/**
 * Custom map polyfill attached to Array.prototype.
 * Creates a new array populated with the results of calling a provided function
 * on every element in the calling array.
 * 
 * @param {Function} callback - Function that produces an element of the new Array.
 *                              Receives: (currentValue, index, array)
 * @param {*} [thisArg] - Value to use as 'this' when executing callback.
 * @returns {Array} A new array with each element being the result of the callback function.
 * @throws {TypeError} If callback is not a function.
 */
Array.prototype.myMap = function(callback, thisArg) {
    // Step 1: Check if 'this' is null or undefined (e.g. if invoked via Function.call)
    if (this == null) {
        throw new TypeError("Array.prototype.myMap called on null or undefined");
    }

    // Step 2: Validate callback
    if (typeof callback !== "function") {
        throw new TypeError(`${callback} is not a function`);
    }

    // Step 3: Convert 'this' to an object (handles primitive wrappers if called via call/apply)
    const originalArray = Object(this);
    // Convert length to an unsigned 32-bit integer as per ECMAScript specification
    const length = originalArray.length >>> 0;

    // Step 4: Allocate result array with matching length
    const resultArray = new Array(length);

    // Step 5: Iterate through elements
    for (let index = 0; index < length; index++) {
        // Sparse Array Check:
        // Use 'in' operator to verify if index exists on the array
        // (handles sparse arrays with empty slots / holes properly, e.g. [1, , 3])
        if (index in originalArray) {
            const currentValue = originalArray[index];
            // Invoke callback with thisArg, element, index, and original array reference
            resultArray[index] = callback.call(thisArg, currentValue, index, originalArray);
        }
    }

    return resultArray;
};

// ==============================================================================
// DEMONSTRATION 1: Assignment Example (num => num * 2)
// ==============================================================================
console.log("------------------------------------------------------------------------------");
console.log("DEMONSTRATION 1: ASSIGNMENT SPECIFIED EXAMPLE");
console.log("------------------------------------------------------------------------------");

const sampleArray = [1, 2, 3];
const doubledResult = sampleArray.myMap(num => num * 2);

console.log("Input Array               :", sampleArray);
console.log("Execution: [1, 2, 3].myMap(num => num * 2)");
console.log("Output                    :", doubledResult);
console.log("Expected Output           : [2, 4, 6]");
console.log("Verification Passed       :", JSON.stringify(doubledResult) === JSON.stringify([2, 4, 6]));
console.log();

// ==============================================================================
// DEMONSTRATION 2: Using (element, index, array) Callback Arguments
// ==============================================================================
console.log("------------------------------------------------------------------------------");
console.log("DEMONSTRATION 2: COMPLETE CALLBACK SIGNATURE (element, index, array)");
console.log("------------------------------------------------------------------------------");

const fruits = ["Apple", "Banana", "Cherry"];
const formattedFruits = fruits.myMap((fruit, index, arr) => {
    return `${index + 1}. ${fruit} (Total items: ${arr.length})`;
});

console.log("Original Fruits:", fruits);
console.log("Formatted Output:");
formattedFruits.forEach(item => console.log("  ", item));
console.log();

// ==============================================================================
// DEMONSTRATION 3: Using 'thisArg' Optional Context Binding
// ==============================================================================
console.log("------------------------------------------------------------------------------");
console.log("DEMONSTRATION 3: USING OPTIONAL thisArg CONTEXT");
console.log("------------------------------------------------------------------------------");

const taxCalculator = {
    taxRate: 0.18,
    calculateTotal(price) {
        return price + (price * this.taxRate);
    }
};

const productPrices = [100, 200, 500];

// Pass taxCalculator as thisArg
const pricesWithTax = productPrices.myMap(function(price) {
    return this.calculateTotal(price);
}, taxCalculator);

console.log("Base Prices      :", productPrices);
console.log("Prices with 18%  :", pricesWithTax);
console.log();

// ==============================================================================
// DEMONSTRATION 4: Sparse Array / Holes Handling (ECMAScript Compliance)
// ==============================================================================
console.log("------------------------------------------------------------------------------");
console.log("DEMONSTRATION 4: SPARSE ARRAYS (PRESERVING HOLES)");
console.log("------------------------------------------------------------------------------");

// Array with hole at index 1: [10, <empty>, 30]
const sparseArray = [10, , 30];
const mappedSparse = sparseArray.myMap(x => x * 10);

console.log("Sparse Array Input :", sparseArray);
console.log("Mapped Sparse Array:", mappedSparse);
console.log("Has index 1 in mappedSparse?", 1 in mappedSparse, "(Preserved hole properly!)");
console.log();

// ==============================================================================
// DEMONSTRATION 5: Parity Check: Built-in Array.prototype.map vs Array.prototype.myMap
// ==============================================================================
console.log("------------------------------------------------------------------------------");
console.log("DEMONSTRATION 5: PARITY CHECK WITH NATIVE map()");
console.log("------------------------------------------------------------------------------");

const testNumbers = [5, 12, 19, 24, 33];
const nativeResult = testNumbers.map((num, i) => num * i + 1);
const customResult = testNumbers.myMap((num, i) => num * i + 1);

console.log("Native Array.prototype.map Output :", nativeResult);
console.log("Custom Array.prototype.myMap Output:", customResult);
console.log("Are results identical?             :", JSON.stringify(nativeResult) === JSON.stringify(customResult));
console.log("Is original array unchanged?       :", testNumbers.length === 5 && testNumbers[0] === 5);
console.log("------------------------------------------------------------------------------\n");
