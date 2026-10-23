/**
 * ==============================================================================
 * QUESTION 6: Event-Based Counter Simulation
 * ==============================================================================
 * Requirements:
 * - Use variable count = 0.
 * - Create two functions: increment() and decrement().
 * - Each function modifies count and logs the current value.
 * - Simulate "click" by calling these functions manually in code.
 * - Use a nested function to show function scope of count updates.
 * ==============================================================================
 */

console.log("==============================================================================");
console.log("QUESTION 6: EVENT-BASED COUNTER SIMULATION WITH NESTED FUNCTION SCOPE");
console.log("==============================================================================");

// Step 1: Initialize global/module-scoped counter variable
let count = 0;

console.log(`[Initial State] Counter initialized: count = ${count}\n`);

/**
 * Simulates a click event that increments the counter.
 * Uses an inner nested function to demonstrate lexical scope and variable mutation.
 */
function increment() {
    // Step 2: Nested function demonstrating function-level scope
    function performIncrement() {
        // Step size local to this inner nested scope
        const stepSize = 1;
        count = count + stepSize; // Accesses and modifies 'count' from outer scope
        return count;
    }

    // Invoke nested function within enclosing function scope
    const updatedCount = performIncrement();
    console.log(`[EVENT: CLICK -> INCREMENT (+1)] | Current Count: ${updatedCount}`);
    return updatedCount;
}

/**
 * Simulates a click event that decrements the counter.
 * Uses an inner nested function to demonstrate lexical scope and variable mutation.
 */
function decrement() {
    // Step 3: Nested function demonstrating function-level scope
    function performDecrement() {
        // Step size local to this inner nested scope
        const stepSize = 1;
        count = count - stepSize; // Accesses and modifies 'count' from outer scope
        return count;
    }

    // Invoke nested function within enclosing function scope
    const updatedCount = performDecrement();
    console.log(`[EVENT: CLICK -> DECREMENT (-1)] | Current Count: ${updatedCount}`);
    return updatedCount;
}

// Step 4: Simulate a sequence of UI button click events
console.log("--- Simulating User UI Button Click Events ---");
increment(); // count: 1
increment(); // count: 2
increment(); // count: 3
decrement(); // count: 2
increment(); // count: 3
decrement(); // count: 2
decrement(); // count: 1

console.log(`\nFinal Counter Value after click stream: ${count}`);

// Step 5: Advanced Demonstration - Encapsulated Closure Counter (Nested Function Scope)
console.log("\n------------------------------------------------------------------------------");
console.log("SCOPE DEMONSTRATION: ENCAPSULATED CLOSURE COUNTER");
console.log("------------------------------------------------------------------------------");

function createSecureCounter(initialValue = 0) {
    // Private state protected inside the outer function's lexical scope
    let privateCount = initialValue;

    // Nested handler function with closure over privateCount
    function update(amount, actionName) {
        privateCount += amount;
        console.log(`  [Secure Instance | ${actionName}] Count: ${privateCount}`);
        return privateCount;
    }

    return {
        clickAdd: () => update(1, "ADD_CLICK"),
        clickSubtract: () => update(-1, "SUBTRACT_CLICK"),
        getValue: () => privateCount
    };
}

const uiCounter = createSecureCounter(10);
console.log("Created isolated counter instance starting at 10:");
uiCounter.clickAdd();
uiCounter.clickAdd();
uiCounter.clickSubtract();

console.log(`Maintained isolated state: ${uiCounter.getValue()}`);
console.log("==============================================================================\n");
