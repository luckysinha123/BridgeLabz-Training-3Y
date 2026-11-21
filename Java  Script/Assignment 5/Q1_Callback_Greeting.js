"use strict";

/**
 * ==============================================================================
 * ASSIGNMENT 5 - QUESTION 1: Callback Flow Demonstration
 * ==============================================================================
 * 
 * Problem Statement:
 * Write a function greetUser(name, callback) that prints "Hello <name>" and then
 * executes a callback function showEndMessage() which prints "Welcome to the course!".
 * Demonstrate callback flow clearly.
 * 
 * Concepts Demonstrated:
 * 1. Higher-Order Functions: Functions that accept other functions as arguments.
 * 2. Callbacks: A callback function is a function passed into another function
 *    as an argument, which is then invoked inside the outer function to complete
 *    some kind of routine or action.
 * 3. Synchronous Execution Flow: Step-by-step trace showing the caller,
 *    higher-order function, and callback execution stages.
 * ==============================================================================
 */

console.log("==============================================================================");
console.log("             ASSIGNMENT 5 - Q1: CALLBACK FLOW DEMONSTRATION                   ");
console.log("==============================================================================\n");

/**
 * Callback function to display the course welcome message.
 * Executed after the primary greeting has finished.
 */
function showEndMessage() {
    console.log("  [showEndMessage Callback] -> \"Welcome to the course!\"");
}

/**
 * Higher-Order Function that greets a user and invokes a callback.
 * 
 * @param {string} name - The name of the user to greet.
 * @param {Function} callback - The callback function to execute after greeting.
 */
function greetUser(name, callback) {
    console.log("------------------------------------------------------------------------------");
    console.log(`[greetUser] Function started execution for user: "${name}"`);
    
    // Step 1: Print greeting
    console.log(`[greetUser] Output: "Hello ${name}"`);
    
    // Step 2: Validate and execute the callback
    console.log("[greetUser] Preparing to invoke callback function...");
    
    if (typeof callback === "function") {
        console.log(`[greetUser] Handing control over to callback (${callback.name || "anonymous"})...`);
        callback();
        console.log("[greetUser] Callback finished execution.");
    } else {
        console.warn("[greetUser] Warning: Provided callback is not a function. Skipping execution.");
    }
    
    console.log("[greetUser] Execution completed successfully.");
    console.log("------------------------------------------------------------------------------\n");
}

// ==============================================================================
// DEMONSTRATION 1: Standard Callback Execution Flow (as requested)
// ==============================================================================
console.log(">>> DEMONSTRATION 1: Standard execution with showEndMessage <<<\n");
greetUser("Alice", showEndMessage);

// ==============================================================================
// DEMONSTRATION 2: Callback Flow with a Different User
// ==============================================================================
console.log(">>> DEMONSTRATION 2: Standard execution with another student <<<\n");
greetUser("Lucky", showEndMessage);

// ==============================================================================
// DEMONSTRATION 3: Demonstrating Callback Flexibility (Custom & Arrow Callbacks)
// ==============================================================================
console.log(">>> DEMONSTRATION 3: Passing custom and inline callbacks <<<\n");

function showCustomAdminMessage() {
    console.log("  [showCustomAdminMessage] -> \"System Alert: You have Administrator Privileges.\"");
}

// Passing custom named callback
greetUser("Bob (Instructor)", showCustomAdminMessage);

// Passing inline anonymous arrow function callback
greetUser("Charlie", () => {
    console.log("  [Inline Arrow Callback] -> \"Your modules are unlocked. Happy coding!\"");
});

// ==============================================================================
// DEMONSTRATION 4: Defensive Error Handling (Invalid Callback)
// ==============================================================================
console.log(">>> DEMONSTRATION 4: Passing non-function callback <<<\n");
greetUser("David", null);
