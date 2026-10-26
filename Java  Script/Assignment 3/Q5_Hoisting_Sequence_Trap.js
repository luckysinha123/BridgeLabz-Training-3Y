"use strict";

/**
 * ==============================================================================
 * ASSIGNMENT 3 - QUESTION 5: Hoisting Lab: The Sequence Trap
 * ==============================================================================
 * 
 * Problem Statement:
 * Predict, then run:
 * 
 * console.log(score);
 * announce();
 * var score = 50;
 * function announce() { console.log("Game started"); }
 * let status = "ready";
 * startGame();
 * function startGame() {
 *   console.log(status);
 * }
 * 
 * Tasks:
 * 1. Explain each hoisted element’s memory state.
 * 2. Fix the code to run properly.
 * 3. Rewrite using arrow functions to compare hoisting differences.
 * 
 * Concepts Demonstrated:
 * - Two-phase JavaScript execution: Creation (Memory Allocation) Phase & Execution Phase
 * - Hoisting differences between `var`, `let`/`const`, and `function` declarations
 * - Temporal Dead Zone (TDZ)
 * - Function declarations vs Arrow function expressions hoisting behaviors
 * ==============================================================================
 */

console.log("==============================================================================");
console.log("             ASSIGNMENT 3 - Q5: HOISTING LAB: THE SEQUENCE TRAP               ");
console.log("==============================================================================\n");

// ------------------------------------------------------------------------------
// TASK 1: MEMORY STATE IN CREATION PHASE VS EXECUTION PHASE
// ------------------------------------------------------------------------------
console.log("------------------------------------------------------------------------------");
console.log("TASK 1: MEMORY STATE EXPLANATION (CREATION VS EXECUTION PHASE)");
console.log("------------------------------------------------------------------------------\n");

console.log("┌──────────────┬──────────────┬─────────────────────────┬───────────────────────────────┐");
console.log("│ Identifier   │ Keyword      │ Creation Phase State    │ Execution Phase Behavior      │");
console.log("├──────────────┼──────────────┼─────────────────────────┼───────────────────────────────┤");
console.log("│ score        │ var          │ Initialized: undefined  │ Access before assignment gives│");
console.log("│              │              │                         │ 'undefined' (hoisting trap).  │");
console.log("│ announce     │ function ()  │ Fully hoisted with body │ Callable anytime in scope.    │");
console.log("│ status       │ let          │ Uninitialized in TDZ    │ Cannot be accessed until the  │");
console.log("│              │              │                         │ let statement is executed.    │");
console.log("│ startGame    │ function ()  │ Fully hoisted with body │ Callable anytime; accesses    │");
console.log("│              │              │                         │ 'status' lexically.           │");
console.log("└──────────────┴──────────────┴─────────────────────────┴───────────────────────────────┘\n");

console.log("Executing Original Code with step-by-step logs:");
console.log("--- START ORIGINAL CODE ---");

// Step 1: Accessing hoisted var
console.log("1. console.log(score) -> Output:", typeof score !== "undefined" ? score : undefined, "(Logged 'undefined' because var was hoisted, but value 50 was not yet assigned)");

// Step 2: Calling hoisted function declaration
announce();

// Step 3: Assignment to var score
var score = 50;
console.log("3. var score = 50 executed. Now score =", score);

function announce() {
    console.log("2. announce() invoked -> 'Game started'");
}

// Step 4: let status is initialized (exits TDZ)
let status = "ready";
console.log("4. let status = 'ready' executed.");

// Step 5: Calling startGame()
startGame();

function startGame() {
    console.log("5. startGame() invoked -> status is:", status);
}

console.log("--- END ORIGINAL CODE ---\n");

// ------------------------------------------------------------------------------
// TASK 2: FIX THE CODE TO RUN PROPERLY (CLEAN SEQUENTIAL ORDER)
// ------------------------------------------------------------------------------
console.log("------------------------------------------------------------------------------");
console.log("TASK 2: FIXED CODE (PREDICTABLE SEQUENTIAL FLOW)");
console.log("------------------------------------------------------------------------------\n");

/**
 * Clean ES6 Design Rules applied:
 * 1. Declare and initialize all state variables upfront using const/let.
 * 2. Define business logic functions before caller invocations.
 * 3. Invoke routines only after prerequisites are established.
 */
{
    // Step 1: Clean declarations with values
    const fixedScore = 50;
    const fixedStatus = "ready";

    // Step 2: Clear function definitions
    function cleanAnnounce() {
        console.log("Game started (Clean Order)");
    }

    function cleanStartGame() {
        console.log(`Game is active! Initial Status: ${fixedStatus}, Initial Score: ${fixedScore}`);
    }

    // Step 3: Invocations in correct sequence
    console.log("Executing Fixed Flow:");
    cleanAnnounce();
    cleanStartGame();
    console.log(`Verified Final Score: ${fixedScore}\n`);
}

// ------------------------------------------------------------------------------
// TASK 3: REWRITE USING ARROW FUNCTIONS TO COMPARE HOISTING DIFFERENCES
// ------------------------------------------------------------------------------
console.log("------------------------------------------------------------------------------");
console.log("TASK 3: ARROW FUNCTIONS HOISTING COMPARISON");
console.log("------------------------------------------------------------------------------\n");

console.log("Key Difference:");
console.log("• Function declarations `function foo() {}` are hoisted with their implementation.");
console.log("• Arrow functions are expressions assigned to variables `const foo = () => {}`.");
console.log("  They follow variable hoisting rules, NOT function declaration hoisting rules!\n");

// Case A: Arrow function assigned to 'var' invoked before assignment
console.log("--- Case A: Arrow Function assigned to 'var' before initialization ---");
try {
    // At this line, varArrowAnnounce is hoisted as 'undefined'
    console.log("Value of varArrowAnnounce before assignment:", typeof varArrowAnnounce);
    varArrowAnnounce(); // Throws TypeError: varArrowAnnounce is not a function
} catch (err) {
    console.log(`Caught Error: ${err.name} -> ${err.message}`);
    console.log("Reason: 'varArrowAnnounce' holds 'undefined' in memory, so calling () throws TypeError.\n");
}
var varArrowAnnounce = () => {
    console.log("Game started (via var arrow)");
};

// Case B: Arrow function assigned to 'const'/'let' invoked before declaration
console.log("--- Case B: Arrow Function assigned to 'const' before declaration ---");
try {
    // Calling constArrowStartGame before initialization triggers TDZ
    constArrowStartGame();
} catch (err) {
    console.log(`Caught Error: ${err.name} -> ${err.message}`);
    console.log("Reason: 'constArrowStartGame' is trapped in the Temporal Dead Zone (TDZ).\n");
}

const constArrowStartGame = () => {
    console.log("Game started (via const arrow)");
};

// Proper invocation after initialization
console.log("--- Proper Invocation After Initialization ---");
varArrowAnnounce();
constArrowStartGame();

console.log("\n==============================================================================");
console.log("SUMMARY: HOISTING CHEAT SHEET");
console.log("==============================================================================");
console.log("1. function name() {} : Hoisted fully (both name and function body are ready).");
console.log("2. var identifier     : Hoisted name, initialized to undefined (value omitted).");
console.log("3. let / const id     : Hoisted name, NOT initialized; accessing causes ReferenceError (TDZ).");
console.log("4. Arrow Functions    : Tied to their variable declaration keyword (var/let/const).");
console.log("==============================================================================\n");
