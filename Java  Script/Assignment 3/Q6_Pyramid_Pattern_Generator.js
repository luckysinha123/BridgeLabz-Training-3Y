"use strict";

/**
 * ==============================================================================
 * ASSIGNMENT 3 - QUESTION 6: Pyramid Pattern Generator
 * ==============================================================================
 * 
 * Problem Statement:
 * Generate:
 * *
 * * *
 * * * *
 * * * * *
 * 
 * Then:
 * 1. Replace let with var and observe changes in output.
 * 2. Debug step-by-step to track variable re-use.
 * 3. Add an outer loop limit controlled by user input (default = 5).
 * 4. Use "use strict" to catch undeclared loop variables.
 * 
 * Concepts Demonstrated:
 * - Nested loops and string accumulation
 * - Block scope (`let`) vs Function/Global scope (`var`)
 * - Scope leakage and unintended variable collision/re-use bugs
 * - Strict mode enforcement preventing undeclared loop counter leaks
 * ==============================================================================
 */

console.log("==============================================================================");
console.log("             ASSIGNMENT 3 - Q6: PYRAMID PATTERN GENERATOR                     ");
console.log("==============================================================================\n");

// ------------------------------------------------------------------------------
// BASELINE: STANDARD 4-ROW PYRAMID (USING BLOCK-SCOPED `let`)
// ------------------------------------------------------------------------------
console.log("--- Baseline Pattern (4 Rows using 'let') ---");
for (let row = 1; row <= 4; row++) {
    let line = "";
    for (let col = 1; col <= row; col++) {
        line += "* ";
    }
    console.log(line.trimEnd());
}
console.log("");

// ------------------------------------------------------------------------------
// TASK 1 & 2: REPLACING `let` WITH `var` & OBSERVING VARIABLE LEAK / RE-USE
// ------------------------------------------------------------------------------
console.log("------------------------------------------------------------------------------");
console.log("TASK 1 & 2: 'let' VS 'var' SCOPE ANALYSIS & VARIABLE RE-USE TRAP");
console.log("------------------------------------------------------------------------------\n");

/**
 * Experiment 1A: Variable Scope Leakage
 * Demonstrates that variables declared with `var` inside for-loops do NOT stay
 * inside the loop body—they leak into the surrounding function/global scope.
 */
function testVarScopeLeak() {
    console.log("[Experiment 1A: Checking scope leakage with 'var']");
    for (var vRow = 1; vRow <= 3; vRow++) {
        for (var vCol = 1; vCol <= vRow; vCol++) {
            // inside loop
        }
    }
    // Accessing variables outside the loop:
    console.log(`  • After loop ended, 'vRow' is still accessible in memory! Value: ${vRow}`);
    console.log(`  • After loop ended, 'vCol' is still accessible in memory! Value: ${vCol}`);
    console.log("  => DANGER: 'var' polluted the outer function scope.\n");
}
testVarScopeLeak();

/**
 * Experiment 1B: The Variable Re-use Collision Bug
 * If an inner loop accidentally uses the SAME variable name declared with 'var',
 * it mutates the outer loop's counter because both reference the SAME memory slot!
 */
function demonstrateVarCollisionTrap() {
    console.log("[Experiment 1B: Variable Collision Bug when using 'var']");
    console.log("  Scenario: Outer loop uses 'var k', inner loop accidentally also uses 'var k'.");
    
    let iterations = 0;
    // Outer loop with var k
    for (var k = 1; k <= 3; k++) {
        iterations++;
        // Accidental inner reuse of var k
        for (var k = 10; k <= 11; k++) {
            // inner loop modifies the EXACT SAME 'k' in outer scope!
        }
        // When inner loop finishes, k is now 12!
        // Outer loop's `k++` increments it to 13, terminating the outer loop after only 1 iteration!
    }
    console.log(`  • Outer loop intended to run 3 times, but ran only ${iterations} time(s)!`);
    console.log(`  • Final value of 'k' after collision: ${k}`);
    console.log("  => With 'let', each block creates a distinct lexical binding, preventing this bug.\n");
}
demonstrateVarCollisionTrap();

// ------------------------------------------------------------------------------
// TASK 3: PARAMETERIZED PATTERN GENERATOR WITH DEFAULT LIMIT = 5
// ------------------------------------------------------------------------------
console.log("------------------------------------------------------------------------------");
console.log("TASK 3: USER-CONTROLLED PYRAMID GENERATOR (DEFAULT = 5)");
console.log("------------------------------------------------------------------------------\n");

/**
 * Generates an ASCII pyramid with a configurable row limit.
 * 
 * @param {number} totalRows - Number of pyramid tiers (default = 5)
 * @param {string} symbol - Character symbol to repeat (default = "*")
 * @returns {Array<string>} Array of generated pyramid lines
 */
function generatePyramid(totalRows = 5, symbol = "*") {
    // Coerce and sanitize input
    const rows = Number(totalRows);

    if (isNaN(rows) || rows <= 0 || !Number.isInteger(rows)) {
        console.log(`[Error] Invalid row count: '${totalRows}'. Row count must be a positive integer.`);
        return [];
    }

    console.log(`Generating Pyramid with [${rows}] rows (Symbol: '${symbol}'):`);
    const outputLines = [];

    for (let r = 1; r <= rows; r++) {
        let rowContent = "";
        for (let c = 1; c <= r; c++) {
            rowContent += symbol + " ";
        }
        const trimmed = rowContent.trimEnd();
        outputLines.push(trimmed);
        console.log(`  Row ${String(r).padStart(2)}: ${trimmed}`);
    }

    return outputLines;
}

// Test 1: Using default parameter (default = 5)
console.log("--- 1. Default Parameter Call: generatePyramid() ---");
generatePyramid();

console.log("\n--- 2. Custom User Input: generatePyramid(7, '#') ---");
generatePyramid(7, "#");

// ------------------------------------------------------------------------------
// TASK 4: "use strict" CATCHING UNDECLARED LOOP VARIABLES
// ------------------------------------------------------------------------------
console.log("\n------------------------------------------------------------------------------");
console.log("TASK 4: STRICT MODE PREVENTING UNDECLARED LOOP COUNTERS");
console.log("------------------------------------------------------------------------------\n");

function testUndeclaredLoopVariable() {
    // In non-strict mode: `for (counter = 0; ...)` would silently create global `window.counter`.
    // In "use strict": it instantly throws a ReferenceError!
    try {
        console.log("Attempting loop with undeclared variable: 'for (counter = 1; counter <= 3; counter++)'");
        // Simulating undeclared assignment:
        eval("for (counter = 1; counter <= 3; counter++) {}");
    } catch (err) {
        console.log(`✓ STRICT MODE BLOCKED UNDECLARED VARIABLE:`);
        console.log(`  ├── Error Type : ${err.name}`);
        console.log(`  └── Message    : ${err.message}`);
        console.log(`  => Reason: Strict mode requires explicit declaration (let/const/var).\n`);
    }
}
testUndeclaredLoopVariable();

console.log("==============================================================================");
console.log("DEBUG OBSERVATIONS & STEP-BY-STEP TRACE:");
console.log("==============================================================================");
console.log("Step-by-step trace of nested loop execution for rows = 3:");
console.log("  • Outer Loop i=1 -> Inner Loop j runs [1]    -> String accumulated: '* '");
console.log("  • Outer Loop i=2 -> Inner Loop j runs [1, 2] -> String accumulated: '* * '");
console.log("  • Outer Loop i=3 -> Inner Loop j runs [1, 2, 3] -> String accumulated: '* * * '");
console.log("In VS Code Debugger:");
console.log("  - Add watch expressions: `r`, `c`, `rowContent.length`");
console.log("  - Notice how `let r` and `let c` exist only within their loop block scopes,");
console.log("    whereas `var` lives on the Function Environment Record.");
console.log("==============================================================================\n");
