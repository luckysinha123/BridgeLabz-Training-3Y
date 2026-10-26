"use strict";

/**
 * ==============================================================================
 * ASSIGNMENT 3 - QUESTION 7: Smart Calculator
 * ==============================================================================
 * 
 * Problem Statement:
 * const operations = ["add", "divide", "power", "root", "subtract"];
 * const num1 = 25, num2 = 0;
 * 
 * Tasks:
 * 1. Use a switch to handle each operation.
 * 2. Add custom error handling for divide by 0 and root of negative number.
 * 3. If operation not recognized, throw InvalidOperationError.
 * 4. Wrap in try...catch and print results in a formatted summary.
 * 
 * Concepts Demonstrated:
 * - Multi-branch control flow with `switch...case`
 * - Custom error classes inheriting from Error
 * - Robust error handling with try...catch...finally
 * - Formatted summary report generation
 * ==============================================================================
 */

console.log("==============================================================================");
console.log("                 ASSIGNMENT 3 - Q7: SMART CALCULATOR                          ");
console.log("==============================================================================\n");

// ------------------------------------------------------------------------------
// Custom Error Classes
// ------------------------------------------------------------------------------
class CalculatorError extends Error {
    constructor(message, code) {
        super(message);
        this.name = "CalculatorError";
        this.code = code;
    }
}

class DivisionByZeroError extends CalculatorError {
    constructor(message = "Math Error: Division by zero is undefined.") {
        super(message, "DIV_ZERO");
        this.name = "DivisionByZeroError";
    }
}

class NegativeRootError extends CalculatorError {
    constructor(val, message) {
        super(message || `Math Error: Cannot compute square root of negative number (${val}) in real numbers.`, "NEG_ROOT");
        this.name = "NegativeRootError";
        this.invalidValue = val;
    }
}

class InvalidOperationError extends CalculatorError {
    constructor(op, message) {
        super(message || `Operation Error: Unrecognized or unsupported operation '${op}'.`, "INVALID_OP");
        this.name = "InvalidOperationError";
        this.unsupportedOperation = op;
    }
}

// ------------------------------------------------------------------------------
// Task 1, 2, 3: Calculator Function using switch and custom error throwing
// ------------------------------------------------------------------------------
/**
 * Performs mathematical operations with robust validation.
 * 
 * @param {string} op - The operation name ("add", "divide", "power", "root", "subtract")
 * @param {number} a - First operand
 * @param {number} b - Second operand
 * @returns {number} Result of the calculation
 * @throws {DivisionByZeroError|NegativeRootError|InvalidOperationError|TypeError}
 */
function calculate(op, a, b) {
    // Validate that inputs are valid finite numbers
    if (typeof a !== "number" || typeof b !== "number" || Number.isNaN(a) || Number.isNaN(b)) {
        throw new TypeError(`Operands must be valid numbers. Received a=${a}, b=${b}`);
    }

    const normalizedOp = String(op).toLowerCase().trim();

    switch (normalizedOp) {
        case "add":
            return a + b;

        case "subtract":
            return a - b;

        case "divide":
            // Check for division by zero
            if (b === 0) {
                throw new DivisionByZeroError(`Cannot divide ${a} by zero.`);
            }
            return a / b;

        case "power":
            // a raised to power b
            return Math.pow(a, b);

        case "root":
            // Square root of a; if b > 0, b-th root of a
            if (a < 0) {
                throw new NegativeRootError(a, `Cannot calculate square root of negative number (${a}).`);
            }
            // If b is provided and not 0, compute b-th root; otherwise standard square root
            return b !== 0 ? Math.pow(a, 1 / b) : Math.sqrt(a);

        default:
            // Unrecognized operation
            throw new InvalidOperationError(op, `The operation '${op}' is not supported by Smart Calculator.`);
    }
}

// ------------------------------------------------------------------------------
// Task 4: Execute with try...catch and print formatted summary
// ------------------------------------------------------------------------------
const operations = ["add", "divide", "power", "root", "subtract"];
const num1 = 25;
const num2 = 0;

// Extra test cases to demonstrate all error handlers:
const testSuite = [
    // Standard suite from assignment:
    ...operations.map(op => ({ op, a: num1, b: num2 })),
    // Edge-case 1: Negative root error
    { op: "root", a: -16, b: 0, testLabel: "Edge Case: Root of Negative Number" },
    // Edge-case 2: Unrecognized operation error
    { op: "modulus", a: 25, b: 4, testLabel: "Edge Case: Invalid Operation Name" }
];

const results = [];

console.log("------------------------------------------------------------------------------");
console.log(`EXECUTING OPERATIONS ON NUM1 = ${num1}, NUM2 = ${num2} + EDGE CASES`);
console.log("------------------------------------------------------------------------------\n");

for (let i = 0; i < testSuite.length; i++) {
    const test = testSuite[i];
    const label = test.testLabel || `Standard Operation: "${test.op}"`;

    try {
        const value = calculate(test.op, test.a, test.b);
        results.push({
            label: label,
            operation: test.op,
            expression: `${test.a} ${test.op} ${test.b}`,
            status: "SUCCESS",
            result: value,
            error: null
        });

        console.log(`✓ [Test #${i + 1}] ${label}`);
        console.log(`  ├── Operands : a = ${test.a}, b = ${test.b}`);
        console.log(`  └── Result   : ${value}\n`);

    } catch (err) {
        results.push({
            label: label,
            operation: test.op,
            expression: `${test.a} ${test.op} ${test.b}`,
            status: "FAILED",
            result: null,
            error: {
                type: err.name,
                code: err.code || "UNKNOWN",
                message: err.message
            }
        });

        console.log(`✗ [Test #${i + 1}] ${label}`);
        console.log(`  ├── Operands   : a = ${test.a}, b = ${test.b}`);
        console.log(`  ├── Error Type : ${err.name} [${err.code || "ERR"}]`);
        console.log(`  └── Error Msg  : ${err.message}\n`);
    }
}

// ------------------------------------------------------------------------------
// SUMMARY REPORT TABLE
// ------------------------------------------------------------------------------
console.log("==============================================================================");
console.log("                       CALCULATOR SUMMARY AUDIT REPORT                        ");
console.log("==============================================================================");
console.log(`Total Computations Tested : ${results.length}`);
console.log(`Successful Computations   : ${results.filter(r => r.status === "SUCCESS").length}`);
console.log(`Failed / Handled Errors   : ${results.filter(r => r.status === "FAILED").length}\n`);

console.log("┌────┬──────────────┬──────────────────┬──────────┬─────────────────────────────┐");
console.log("│ #  │ Operation    │ Operands (a, b)  │ Status   │ Output / Caught Exception   │");
console.log("├────┼──────────────┼──────────────────┼──────────┼─────────────────────────────┤");

results.forEach((r, idx) => {
    const numCol = String(idx + 1).padEnd(2);
    const opCol = r.operation.padEnd(12);
    const exprCol = r.expression.padEnd(16);
    const statusCol = r.status.padEnd(8);
    const outputCol = (r.status === "SUCCESS" ? String(r.result) : `${r.error.type}`).padEnd(27);
    console.log(`│ ${numCol} │ ${opCol} │ ${exprCol} │ ${statusCol} │ ${outputCol} │`);
});

console.log("└────┴──────────────┴──────────────────┴──────────┴─────────────────────────────┘\n");

console.log("==============================================================================");
console.log("DEBUG OBSERVATIONS & HOISTING NOTES:");
console.log("==============================================================================");
console.log("1. SWITCH STATEMENT BEST PRACTICES:");
console.log("   - Each case block must terminate with 'return' or 'break' to prevent fall-through.");
console.log("   - The 'default' branch safely guarantees that any unsupported or misspelled");
console.log("     operation throws a dedicated 'InvalidOperationError'.");
console.log("2. JAVASCRIPT MATH QUIRKS PREVENTED:");
console.log("   - In default JS, 25 / 0 yields 'Infinity' without throwing an error!");
console.log("   - Math.sqrt(-16) yields 'NaN' without throwing an error!");
console.log("   - Our defensive custom validation explicitly intercepts these silent anomalies");
console.log("     and converts them into structured, trackable domain exceptions.");
console.log("==============================================================================\n");
