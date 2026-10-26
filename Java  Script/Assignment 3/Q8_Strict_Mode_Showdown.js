"use strict";

/**
 * ==============================================================================
 * ASSIGNMENT 3 - QUESTION 8: Strict Mode Showdown
 * ==============================================================================
 * 
 * Problem Statement:
 * Given buggy snippet:
 * function demo(a, a) {
 *   total = 10;
 *   delete total;
 * }
 * demo(5, 10);
 * 
 * Tasks:
 * 1. Run this with and without "use strict".
 * 2. Record the errors and differences in behavior.
 * 3. Explain why strict mode makes these operations illegal.
 * 4. Show a correct version using ES6 rules.
 * 
 * Concepts Demonstrated:
 * - Strict Mode compilation and runtime rules
 * - Duplicate parameter restrictions
 * - Unqualified identifier deletion prohibition
 * - Clean modern ES6 parameter and variable declaration patterns
 * ==============================================================================
 */

console.log("==============================================================================");
console.log("                ASSIGNMENT 3 - Q8: STRICT MODE SHOWDOWN                       ");
console.log("==============================================================================\n");

// ------------------------------------------------------------------------------
// TASK 1 & 2: RUNNING WITH AND WITHOUT STRICT MODE & RECORDING BEHAVIORS
// ------------------------------------------------------------------------------
console.log("------------------------------------------------------------------------------");
console.log("TASK 1 & 2: EXPERIMENTAL COMPARISON (NON-STRICT VS STRICT MODE)");
console.log("------------------------------------------------------------------------------\n");

// --- TEST A: NON-STRICT MODE EXECUTION ---
console.log(">>> [MODE 1: NON-STRICT (SLOPPY) MODE]");
try {
    // We execute the non-strict function dynamically to isolate its environment:
    const nonStrictRunner = new Function(`
        function demo(a, a) {
            total = 10; // Undeclared variable assignment
            const deleted = delete total; // Deleting unqualified identifier
            return {
                paramShadowedA: a,
                deletedSuccess: deleted,
                globalTotalExists: typeof total !== "undefined"
            };
        }
        return demo(5, 10);
    `);

    const nonStrictResult = nonStrictRunner();
    console.log("  • Execution Status       : RAN WITHOUT CRASHING (Silent Bugs Permitted)");
    console.log("  • Duplicate Parameter    : Allowed! Parameter 'a' took the 2nd value:", nonStrictResult.paramShadowedA);
    console.log("  • Undeclared 'total'     : Allowed! Created implicit global property.");
    console.log("  • 'delete total' Output  : Allowed! Returned:", nonStrictResult.deletedSuccess);
    console.log("  • Total in Global Scope  :", nonStrictResult.globalTotalExists ? "Still Exists" : "Deleted from global");

} catch (err) {
    console.log("  Non-strict unexpected error:", err.message);
}

// --- TEST B: STRICT MODE EXECUTION ---
console.log("\n>>> [MODE 2: STRICT MODE ('use strict')]");

// Sub-check 1: Duplicate Parameters in Strict Mode
console.log("1. Testing Duplicate Parameters 'function demo(a, a)' under 'use strict':");
try {
    eval('"use strict"; function testDuplicateParams(a, a) {}');
} catch (err) {
    console.log(`  ✗ BLOCKED by Strict Mode: ${err.name} -> "${err.message}"`);
}

// Sub-check 2: Undeclared Variable in Strict Mode
console.log("2. Testing Undeclared Assignment 'total = 10' under 'use strict':");
try {
    eval('"use strict"; function testUndeclared() { total = 10; } testUndeclared();');
} catch (err) {
    console.log(`  ✗ BLOCKED by Strict Mode: ${err.name} -> "${err.message}"`);
}

// Sub-check 3: Delete Unqualified Identifier in Strict Mode
console.log("3. Testing Delete on Identifier 'delete total' under 'use strict':");
try {
    eval('"use strict"; var totalVar = 10; delete totalVar;');
} catch (err) {
    console.log(`  ✗ BLOCKED by Strict Mode: ${err.name} -> "${err.message}"`);
}

// ------------------------------------------------------------------------------
// BEHAVIOR COMPARISON MATRIX
// ------------------------------------------------------------------------------
console.log("\n┌─────────────────────────────┬──────────────────────────┬─────────────────────────────┐");
console.log("│ Operation                   │ Non-Strict (Sloppy) Mode │ Strict Mode ('use strict')  │");
console.log("├─────────────────────────────┼──────────────────────────┼─────────────────────────────┤");
console.log("│ Duplicate Params: (a, a)    │ Silent Overwrite         │ SyntaxError                 │");
console.log("│ Undeclared: total = 10      │ Leaks Global Variable    │ ReferenceError              │");
console.log("│ Delete: delete total        │ Silently deletes or false│ SyntaxError                 │");
console.log("└─────────────────────────────┴──────────────────────────┴─────────────────────────────┘\n");

// ------------------------------------------------------------------------------
// TASK 3: DETAILED EXPLANATION OF WHY STRICT MODE FORBIDS THESE
// ------------------------------------------------------------------------------
console.log("==============================================================================");
console.log("TASK 3: WHY STRICT MODE MAKES THESE OPERATIONS ILLEGAL");
console.log("==============================================================================");
console.log("1. FORBIDDING DUPLICATE PARAMETERS (a, a):");
console.log("   - In sloppy mode, having two parameters with the same name causes the second");
console.log("     parameter to silently shadow the first, making the first value unreachable");
console.log("     except through the legacy 'arguments' object.");
console.log("   - Strict mode treats duplicate parameter names as a syntax error to prevent");
console.log("     hidden logic bugs where developers inadvertently overwrite argument values.");
console.log("");
console.log("2. FORBIDDING UNDECLARED ASSIGNMENT (total = 10):");
console.log("   - In sloppy mode, a typo in a variable name silently creates a global variable");
console.log("     on the window/global object, creating pollution and cross-module collisions.");
console.log("   - Strict mode requires explicit variable declaration (let, const, var), immediately");
console.log("     flagging typos and undeclared identifiers with a ReferenceError.");
console.log("");
console.log("3. FORBIDDING UNQUALIFIED DELETION (delete total):");
console.log("   - In JavaScript, the 'delete' operator is designed solely to remove configurable");
console.log("     properties from OBJECTS (e.g., delete user.age).");
console.log("   - Applying 'delete' to a plain variable name is nonsensical because bindings");
console.log("     in Lexical Environment Records are non-configurable. Strict mode throws a");
console.log("     SyntaxError to prevent invalid assumptions about memory deallocation.");
console.log("==============================================================================\n");

// ------------------------------------------------------------------------------
// TASK 4: CORRECT VERSION USING ES6 RULES
// ------------------------------------------------------------------------------
console.log("------------------------------------------------------------------------------");
console.log("TASK 4: CORRECT IMPLEMENTATION USING CLEAN ES6 RULES");
console.log("------------------------------------------------------------------------------\n");

/**
 * Modern ES6 Corrected Implementation:
 * 1. Descriptive, unique parameter names with default values.
 * 2. Explicit block-scoped variable declaration using 'let' or 'const'.
 * 3. Proper object encapsulation if property deletion is required.
 * 4. Clean arrow function syntax.
 * 
 * @param {number} val1 - First numeric value
 * @param {number} val2 - Second numeric value
 * @returns {Object} Calculated metrics
 */
const demoCorrected = (val1 = 0, val2 = 0) => {
    // Explicit block-scoped declaration
    let total = val1 + val2;

    // Encapsulate into an object if dynamic property removal is necessary
    const calculationPayload = {
        operandA: val1,
        operandB: val2,
        total: total,
        timestamp: new Date().toISOString()
    };

    console.log("  • State before cleanup:", JSON.stringify(calculationPayload));

    // Valid use of delete: deleting a property on an object instance
    delete calculationPayload.timestamp;

    console.log("  • State after deleting 'timestamp' property:", JSON.stringify(calculationPayload));

    return calculationPayload;
};

console.log("Invoking demoCorrected(5, 10):");
const output = demoCorrected(5, 10);
console.log("\nFinal Returned Object:", output);
console.log("==============================================================================\n");
