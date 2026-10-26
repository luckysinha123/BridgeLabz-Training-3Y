"use strict";

/**
 * ==============================================================================
 * ASSIGNMENT 3 - QUESTION 10: Nested Hoisting and Closures
 * ==============================================================================
 * 
 * Problem Statement:
 * function outer() {
 *   console.log(count);
 *   var count = 5;
 *   function inner() {
 *     console.log(count);
 *     var count = 10;
 *   }
 *   inner();
 * }
 * outer();
 * 
 * Tasks:
 * 1. Predict and explain output.
 * 2. Show how hoisting creates separate memory contexts.
 * 3. Convert the inner function to an arrow and note behavior changes.
 * 4. Add a debug session and explain the call stack flow.
 * 
 * Concepts Demonstrated:
 * - Execution Context (Creation Phase vs Execution Phase)
 * - VariableEnvironment vs LexicalEnvironment
 * - Identifier Resolution and Variable Shadowing
 * - Closures and Scope Chains
 * - Arrow Functions and Lexical `this` / Variable Scoping
 * - VS Code Debugging: Call Stack and Scope Inspection
 * ==============================================================================
 */

console.log("==============================================================================");
console.log("             ASSIGNMENT 3 - Q10: NESTED HOISTING AND CLOSURES                 ");
console.log("==============================================================================\n");

// ------------------------------------------------------------------------------
// TASK 1: PREDICT AND EXPLAIN OUTPUT OF ORIGINAL CODE
// ------------------------------------------------------------------------------
console.log("------------------------------------------------------------------------------");
console.log("TASK 1: RUNNING ORIGINAL CODE & PREDICTION VERIFICATION");
console.log("------------------------------------------------------------------------------\n");

console.log("PREDICTION:");
console.log("  • First log in outer() : undefined");
console.log("  • Second log in inner(): undefined");
console.log("  Reason: Both functions declare local 'var count', which is hoisted to the top");
console.log("  of each function's respective scope and initialized to 'undefined'.\n");

console.log("ACTUAL EXECUTION OUTPUT:");
function originalOuter() {
    console.log("  [Inside originalOuter()] 1st console.log(count) ->", count);
    var count = 5;

    function inner() {
        console.log("  [Inside originalInner()] 2nd console.log(count) ->", count);
        var count = 10;
    }

    inner();
}

originalOuter();

// ------------------------------------------------------------------------------
// TASK 2: HOW HOISTING CREATES SEPARATE MEMORY CONTEXTS
// ------------------------------------------------------------------------------
console.log("\n==============================================================================");
console.log("TASK 2: MEMORY CONTEXTS & EXECUTION CONTEXT DIAGRAM");
console.log("==============================================================================");
console.log(`
┌─────────────────────────────────────────────────────────────────────────────┐
│ 1. GLOBAL EXECUTION CONTEXT (GEC)                                           │
│    • LexicalEnvironment: { originalOuter: <func> }                          │
│    • VariableEnvironment: {}                                                │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │ calls originalOuter()
┌──────────────────────────────────────▼──────────────────────────────────────┐
│ 2. outer() FUNCTION EXECUTION CONTEXT (FEC_outer)                           │
│    • Creation Phase:                                                        │
│        - 'count' allocated in VariableEnvironment -> initialized: undefined │
│        - 'inner' allocated -> fully hoisted with body                       │
│    • Execution Phase:                                                       │
│        - console.log(count) -> reads local 'count', which is UNDEFINED      │
│        - count = 5          -> updates local 'count' to 5                   │
│        - calls inner()                                                      │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │ calls inner()
┌──────────────────────────────────────▼──────────────────────────────────────┐
│ 3. inner() FUNCTION EXECUTION CONTEXT (FEC_inner)                           │
│    • Creation Phase:                                                        │
│        - 'count' allocated in FEC_inner VariableEnvironment -> undefined    │
│        - SHADOWING OCCURS: Local 'count' shadows outer()'s count (5)!       │
│    • Execution Phase:                                                       │
│        - console.log(count) -> checks FEC_inner first -> prints UNDEFINED   │
│        - It NEVER checks outer's scope because local 'count' already exists │
│        - count = 10         -> updates local 'count' to 10                  │
└─────────────────────────────────────────────────────────────────────────────┘
`);

// ------------------------------------------------------------------------------
// TASK 3: CONVERT INNER FUNCTION TO ARROW FUNCTION & OBSERVE BEHAVIOR
// ------------------------------------------------------------------------------
console.log("------------------------------------------------------------------------------");
console.log("TASK 3: ARROW FUNCTION CONVERSION & CLOSURE BEHAVIOR");
console.log("------------------------------------------------------------------------------\n");

/**
 * Scenario 3A: Arrow Function closing over outer variable (True Closure)
 * Removing local 'var count' allows the arrow function to resolve 'count' from outer().
 */
function outerWithArrowClosure() {
    console.log("--- Scenario 3A: Arrow Function as a True Closure (No local count) ---");
    var count = 5;

    // Arrow function has NO local 'count'; it closes over outer's lexical environment
    const innerArrow = () => {
        console.log("  [innerArrow Closure] count resolved from outer scope ->", count); // 5!
    };

    innerArrow();
}
outerWithArrowClosure();

/**
 * Scenario 3B: Arrow Function with local 'var count' (Still Hoists locally!)
 */
function outerWithArrowLocalVar() {
    console.log("\n--- Scenario 3B: Arrow Function with local 'var count' ---");
    var count = 5;

    const innerArrowWithLocalVar = () => {
        console.log("  [innerArrow Local Var] count hoisted locally ->", count); // undefined
        var count = 10;
    };

    innerArrowWithLocalVar();
}
outerWithArrowLocalVar();

/**
 * Scenario 3C: Modern ES6 with 'let' (Exposing Temporal Dead Zone)
 */
function outerWithArrowTDZ() {
    console.log("\n--- Scenario 3C: Arrow Function with local 'let count' (TDZ Trap) ---");
    let count = 5;

    const innerArrowTDZ = () => {
        try {
            // Because 'let count' is declared below, this 'count' refers to the local let!
            // But it is in the TDZ, so it throws ReferenceError instead of reading 5!
            console.log(count);
            let count = 10;
        } catch (err) {
            console.log(`  [innerArrow TDZ] Caught Error: ${err.name} -> ${err.message}`);
            console.log("  => Explanation: Local 'let count' hoists into the Temporal Dead Zone (TDZ),");
            console.log("     shadowing the outer variable and blocking early access!");
        }
    };

    innerArrowTDZ();
}
outerWithArrowTDZ();

// ------------------------------------------------------------------------------
// TASK 4: DEBUG SESSION & CALL STACK FLOW IN VS CODE
// ------------------------------------------------------------------------------
console.log("\n==============================================================================");
console.log("TASK 4: VS CODE DEBUG SESSION & CALL STACK LIFECYCLE GUIDE");
console.log("==============================================================================");
console.log("Step-by-Step Instructions to inspect the Call Stack and Memory in VS Code:");
console.log("");
console.log("1. SET BREAKPOINTS:");
console.log("   - Line containing 'console.log(count)' inside originalOuter()");
console.log("   - Line containing 'console.log(count)' inside inner()");
console.log("");
console.log("2. START DEBUGGER (F5 -> Node.js):");
console.log("   - Debugger pauses at the first breakpoint inside originalOuter().");
console.log("");
console.log("3. INSPECT SCOPE PANE (Top-Left):");
console.log("   - Expand 'Local':");
console.log("     • count: undefined");
console.log("     • inner: ƒ inner()");
console.log("     • this: undefined (in strict mode)");
console.log("");
console.log("4. INSPECT CALL STACK PANE:");
console.log("   - Frame 1: originalOuter (Active top of stack)");
console.log("   - Frame 2: (anonymous) / Global Module");
console.log("");
console.log("5. STEP OVER (F10) & STEP INTO (F11):");
console.log("   - Step over 'var count = 5'. Local scope updates: `count: 5`.");
console.log("   - Step into 'inner()'. A NEW stack frame is pushed!");
console.log("   - CALL STACK now shows:");
console.log("     ┌────────────────────────────────────────────────────────┐");
console.log("     │ 1. inner          [Q10_Nested_Hoisting_and_Closures.js]│ <- Top");
console.log("     │ 2. originalOuter  [Q10_Nested_Hoisting_and_Closures.js]│");
console.log("     │ 3. (anonymous)    [Module Wrapper]                     │ <- Base");
console.log("     └────────────────────────────────────────────────────────┘");
console.log("   - Look at the SCOPES pane while paused inside inner():");
console.log("     • Local Scope (inner) : `count: undefined`");
console.log("     • Closure (originalOuter) : `count: 5` (shadowed by Local!)");
console.log("     • Global Scope : `Object`");
console.log("   - Notice how VS Code explicitly displays both the local variable and the");
console.log("     outer closure in separate hierarchical sections!");
console.log("==============================================================================\n");
