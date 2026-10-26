"use strict";

/**
 * ==============================================================================
 * ASSIGNMENT 3 - QUESTION 1: Dynamic Data Parser
 * ==============================================================================
 * 
 * Problem Statement:
 * You receive mixed API data:
 * const apiData = ["25", "true", "false", "NaN", " ", "100px", "3.14", null, undefined];
 * 
 * Tasks:
 * 1. Convert each value into a Number, Boolean, and String form.
 * 2. Skip invalid numbers (NaN, " ", "100px") but log them separately.
 * 3. Build two arrays — one for valid numeric data, one for invalid.
 * 4. Print a detailed report using loops and conditional formatting.
 * 
 * Concepts Demonstrated:
 * - Explicit Type Coercion (Number(), Boolean(), String())
 * - JavaScript Coercion Quirks (e.g., Number(" ") evaluates to 0, Boolean("false") is true)
 * - Strict Mode & Block Scoping (let vs var inside loops)
 * - Array classification and formatted console reporting
 * ==============================================================================
 */

// ------------------------------------------------------------------------------
// Input API Data
// ------------------------------------------------------------------------------
const apiData = ["25", "true", "false", "NaN", " ", "100px", "3.14", null, undefined];

console.log("==============================================================================");
console.log("                  ASSIGNMENT 3 - Q1: DYNAMIC DATA PARSER                     ");
console.log("==============================================================================\n");

console.log("Original Raw API Data Received:");
console.log(apiData);
console.log("\n------------------------------------------------------------------------------");
console.log("TASK 1 & 2: TYPE CONVERSIONS AND NUMERIC VALIDATION");
console.log("------------------------------------------------------------------------------\n");

// Arrays to store categorized numeric data
const validNumericData = [];
const invalidNumericData = [];

/**
 * Validates whether a given raw token represents a genuine numeric value.
 * Handles tricky JavaScript edge cases:
 * - Number(" ") coerces to 0, but " " is whitespace, NOT a valid numeric reading.
 * - Number(null) coerces to 0, but null represents absence of value.
 * - Non-empty strings like "false" or "NaN" produce NaN when converted with Number().
 * 
 * @param {*} raw - Raw input token
 * @returns {Object} Validation result with flag, parsed number, and explanation
 */
function evaluateNumericValidity(raw) {
    // Check for null or undefined
    if (raw === null || raw === undefined) {
        return {
            isValid: false,
            parsedNum: NaN,
            reason: raw === null ? "null primitive (coerces to 0 in Number(), but is not a valid number)" 
                                 : "undefined primitive (coerces to NaN)"
        };
    }

    // Check for whitespace strings (e.g. " ")
    if (typeof raw === "string" && raw.trim() === "") {
        return {
            isValid: false,
            parsedNum: NaN,
            reason: "Empty or whitespace-only string (coerces to 0 in Number(), but invalid numeric data)"
        };
    }

    // Attempt numerical conversion
    const coercedNum = Number(raw);

    // Check if the result is NaN
    if (Number.isNaN(coercedNum)) {
        return {
            isValid: false,
            parsedNum: NaN,
            reason: "Non-numeric token (Number() returned NaN)"
        };
    }

    return {
        isValid: true,
        parsedNum: coercedNum,
        reason: "Valid numerical token"
    };
}

// ------------------------------------------------------------------------------
// Processing Loop
// ------------------------------------------------------------------------------
// HOISTING NOTE:
// Using 'let index' ensures block-scoped iteration. If 'var index' were used,
// 'index' would be hoisted to the global/function scope and leak outside the loop.
for (let index = 0; index < apiData.length; index++) {
    const rawValue = apiData[index];

    // Explicit Type Conversions
    const asString = String(rawValue);
    const asBoolean = Boolean(rawValue);
    const asNumberRaw = Number(rawValue);

    // Rigorous numeric validity check
    const numericAudit = evaluateNumericValidity(rawValue);

    // Format display string for raw value
    const displayRaw = rawValue === null ? "null" : rawValue === undefined ? "undefined" : `"${rawValue}"`;

    console.log(`[Item #${index + 1}] Raw: ${displayRaw.padEnd(12)} (Type: ${typeof rawValue})`);
    console.log(`  ├── toString()  : "${asString}"`);
    console.log(`  ├── toBoolean() : ${asBoolean} ${rawValue === "false" ? "<- (Truth note: non-empty string is truthy!)" : ""}`);
    console.log(`  └── toNumber()  : ${numericAudit.isValid ? numericAudit.parsedNum : "SKIPPED (" + numericAudit.reason + ")"}`);

    // Categorize into target arrays
    if (numericAudit.isValid) {
        validNumericData.push({
            original: rawValue,
            numericValue: numericAudit.parsedNum,
            type: typeof numericAudit.parsedNum
        });
    } else {
        invalidNumericData.push({
            original: rawValue,
            rawDisplay: displayRaw,
            coercedNumber: asNumberRaw,
            reason: numericAudit.reason
        });
    }
}

// ------------------------------------------------------------------------------
// TASK 3 & 4: COMPREHENSIVE SUMMARY REPORT
// ------------------------------------------------------------------------------
console.log("\n==============================================================================");
console.log("                           FINAL PARSER AUDIT REPORT                          ");
console.log("==============================================================================");

console.log(`Total API Elements Processed : ${apiData.length}`);
console.log(`Valid Numeric Elements       : ${validNumericData.length}`);
console.log(`Invalid / Skipped Elements   : ${invalidNumericData.length}\n`);

console.log("--- 1. VALID NUMERIC DATA ARRAY ---");
if (validNumericData.length > 0) {
    validNumericData.forEach((item, idx) => {
        console.log(`  [${idx + 1}] Original: "${item.original}" => Parsed Number: ${item.numericValue}`);
    });
} else {
    console.log("  No valid numeric data found.");
}

console.log("\n--- 2. INVALID / SKIPPED DATA ARRAY (LOGGED SEPARATELY) ---");
invalidNumericData.forEach((item, idx) => {
    console.log(`  [${idx + 1}] Value: ${item.rawDisplay.padEnd(14)} | Raw Number(): ${String(item.coercedNumber).padEnd(5)} | Reason: ${item.reason}`);
});

console.log("\n==============================================================================");
console.log("DEBUG OBSERVATIONS & HOISTING ANALYSIS:");
console.log("==============================================================================");
console.log("1. HOISTING EFFECT:");
console.log("   - 'const apiData', 'const validNumericData', and 'let index' are block-scoped.");
console.log("   - In the 'creation phase', let/const are allocated memory but kept in the");
console.log("     Temporal Dead Zone (TDZ) until their declaration lines execute.");
console.log("   - 'evaluateNumericValidity' is a function declaration and is hoisted with its");
console.log("     entire definition to the top of its scope.");
console.log("2. JAVASCRIPT TYPE COERCION OBSERVATIONS:");
console.log("   - String('false') is truthy: Boolean('false') evaluates to true because any");
console.log("     non-empty string has a truthy boolean value in JavaScript.");
console.log("   - Number(' ') yields 0: JavaScript's standard coercion strips whitespace and");
console.log("     interprets an empty string as 0. We explicitly sanitized this to avoid data corruption.");
console.log("   - Number(null) yields 0, whereas Number(undefined) yields NaN. Our custom validator");
console.log("     filters both out as non-numeric primitives.");
console.log("==============================================================================\n");
