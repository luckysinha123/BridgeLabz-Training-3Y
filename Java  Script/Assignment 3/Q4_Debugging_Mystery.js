"use strict";

/**
 * ==============================================================================
 * ASSIGNMENT 3 - QUESTION 4: Debugging Mystery
 * ==============================================================================
 * 
 * Problem Statement:
 * Start with:
 * "use strict";
 * function showMessage() {
 *   greeting = "Welcome"; // undeclared
 *   console.log(greeting);
 * }
 * showMessage();
 * 
 * Tasks:
 * 1. Identify why this throws an error under strict mode.
 * 2. Fix it and explain how scope declaration rules changed behavior.
 * 3. Add a watch variable and observe the call stack in VS Code’s debugger.
 * 
 * Concepts Demonstrated:
 * - Strict mode preventing accidental global variable pollution
 * - Scope chain and LHS (Left Hand Side) lookup
 * - Variable declarations (let, const, var) and Execution Contexts
 * - Debugger Call Stack and Watch Variable mechanics
 * ==============================================================================
 */

console.log("==============================================================================");
console.log("                 ASSIGNMENT 3 - Q4: DEBUGGING MYSTERY                         ");
console.log("==============================================================================\n");

// ------------------------------------------------------------------------------
// TASK 1: DEMONSTRATING AND IDENTIFYING THE ERROR UNDER STRICT MODE
// ------------------------------------------------------------------------------
console.log("------------------------------------------------------------------------------");
console.log("TASK 1: EXAMINING THE STRICT MODE ERROR");
console.log("------------------------------------------------------------------------------");

function buggyShowMessage() {
    // In non-strict mode, assigning to an undeclared identifier automatically creates
    // a global property on 'window' (browser) or 'global' (Node.js).
    // Under "use strict", JavaScript forbids undeclared assignments and throws ReferenceError.
    greeting = "Welcome"; // <- ReferenceError: greeting is not defined
    console.log(greeting);
}

try {
    console.log("[Invoking buggyShowMessage()...]");
    buggyShowMessage();
} catch (error) {
    console.log(`\nCaught Expected Runtime Error:`);
    console.log(`  ├── Error Name    : ${error.name}`);
    console.log(`  ├── Error Message : ${error.message}`);
    console.log(`  └── File Location : Q4_Debugging_Mystery.js\n`);
}

console.log("==============================================================================");
console.log("WHY STRICT MODE THROWS THIS ERROR (DETAILED ROOT CAUSE):");
console.log("==============================================================================");
console.log("1. NON-STRICT (SLOPPY) BEHAVIOR:");
console.log("   - When the JS engine executes an assignment `greeting = 'Welcome'`, it performs");
console.log("     a Left-Hand Side (LHS) reference search in the current lexical environment.");
console.log("   - If not found locally, it travels up the scope chain to the Global Scope.");
console.log("   - In non-strict mode, if the identifier is STILL not found, the global object");
console.log("     quietly instantiates a new property `window.greeting = 'Welcome'` or `global.greeting`.");
console.log("   - This leads to 'accidental global variable leak', namespace pollution, hard-to-trace bugs,");
console.log("     and memory retention issues.");
console.log("2. STRICT MODE BEHAVIOR ('use strict'):");
console.log("   - Strict mode converts silent failures into explicit throwing errors.");
console.log("   - In strict mode, an LHS search that reaches the global scope without finding");
console.log("     a declared binding immediately terminates execution with a ReferenceError.");
console.log("==============================================================================\n");

// ------------------------------------------------------------------------------
// TASK 2: FIXING THE CODE & EXPLAINING SCOPE DECLARATION RULES
// ------------------------------------------------------------------------------
console.log("------------------------------------------------------------------------------");
console.log("TASK 2: FIXED IMPLEMENTATION & SCOPE ANALYSIS");
console.log("------------------------------------------------------------------------------");

/**
 * Solution Option A: Local Function Scope (Recommended)
 * The variable 'greeting' is declared inside the function using 'const' or 'let'.
 * It exists only during the function's execution lifecycle.
 */
function fixedShowMessageLocal() {
    const greeting = "Welcome (Local Block/Function Scope)"; // Properly declared!
    console.log(`[fixedShowMessageLocal] -> ${greeting}`);
    return greeting;
}

/**
 * Solution Option B: Module / Script Scope
 * If 'greeting' needs to be shared across multiple functions, declare it in the outer scope.
 */
let sharedGreeting = "Welcome (Outer Scope)";

function fixedShowMessageOuter() {
    sharedGreeting = "Welcome (Updated via Outer Scope)";
    console.log(`[fixedShowMessageOuter] -> ${sharedGreeting}`);
}

console.log("\nExecuting Fixed Versions:");
fixedShowMessageLocal();
fixedShowMessageOuter();

console.log("\n--- Scope Declaration Comparison ---");
console.log("• Using 'const / let': Block-scoped, not hoisted to global object, protected by TDZ.");
console.log("• Using 'var'        : Function-scoped, hoisted as undefined, can be reassigned.");
console.log("• Omitting keyword   : Prohibited in strict mode; triggers ReferenceError.");

// ------------------------------------------------------------------------------
// TASK 3: CALL STACK & WATCH VARIABLES IN VS CODE DEBUGGER
// ------------------------------------------------------------------------------
console.log("\n==============================================================================");
console.log("TASK 3: WATCH VARIABLE & CALL STACK OBSERVATION GUIDE (VS CODE)");
console.log("==============================================================================");
console.log("Follow these steps to observe the Call Stack and Variable lifecycle in VS Code:");
console.log("");
console.log("1. SETTING THE BREAKPOINT:");
console.log("   - Open 'Q4_Debugging_Mystery.js' in VS Code.");
console.log("   - Click the left gutter at line `const greeting = 'Welcome...'` inside fixedShowMessageLocal().");
console.log("");
console.log("2. STARTING DEBUGGING:");
console.log("   - Press 'F5' (or click Run -> Start Debugging -> Node.js).");
console.log("   - The program pauses on the breakpoint line before executing it.");
console.log("");
console.log("3. ADDING WATCH VARIABLES:");
console.log("   - In the left Debug Side Bar, locate the 'WATCH' panel.");
console.log("   - Click '+' to add:");
console.log("       • `greeting`");
console.log("       • `typeof greeting`");
console.log("       • `this`");
console.log("   - Note: Before the declaration executes, 'greeting' shows: <not available> (TDZ).");
console.log("   - Press F10 (Step Over): 'greeting' changes to 'Welcome (Local Block/Function Scope)'.");
console.log("");
console.log("4. OBSERVING THE CALL STACK:");
console.log("   - Look at the 'CALL STACK' panel in the bottom-left pane:");
console.log("     ┌────────────────────────────────────────────────────────┐");
console.log("     │ CALL STACK (Top to Bottom)                             │");
console.log("     ├────────────────────────────────────────────────────────┤");
console.log("     │ 1. fixedShowMessageLocal [Q4_Debugging_Mystery.js:88]   │ <- Active Execution Context");
console.log("     │ 2. (anonymous) / Module Wrapper                        │ <- Outer / Global Context");
console.log("     └────────────────────────────────────────────────────────┘");
console.log("   - Clicking on frame 1 displays the local scope containing 'greeting'.");
console.log("   - Clicking on frame 2 displays the module/global scope.");
console.log("   - Press F11 (Step Out) or F10 to complete the function: the top frame is popped");
console.log("     off the call stack and garbage collected.");
console.log("==============================================================================\n");
