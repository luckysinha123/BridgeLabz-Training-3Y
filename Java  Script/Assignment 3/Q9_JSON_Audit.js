"use strict";

/**
 * ==============================================================================
 * ASSIGNMENT 3 - QUESTION 9: JSON Audit
 * ==============================================================================
 * 
 * Problem Statement:
 * const rawData = [
 *   '{"user":"Alex","age":25}',
 *   '{"id":2}',
 *   '{invalid}',
 *   '{"user":"Mina","age":"22"}'
 * ];
 * 
 * Tasks:
 * 1. Parse each entry in a loop using try...catch.
 * 2. Detect missing keys (user, age) and invalid JSON.
 * 3. Push valid entries to a clean array; log errors with line numbers.
 * 4. Debug step-by-step to see how control flows on error.
 * 5. Add bonus: convert age to Number and filter under-18 users.
 * 
 * Concepts Demonstrated:
 * - Robust JSON deserialization with `JSON.parse()`
 * - Custom schema validation inside `try...catch`
 * - Detailed error diagnostics (item index / line number)
 * - Array transformations and predicate filtering
 * ==============================================================================
 */

console.log("==============================================================================");
console.log("                     ASSIGNMENT 3 - Q9: JSON AUDIT                            ");
console.log("==============================================================================\n");

// ------------------------------------------------------------------------------
// Input Dataset (including an additional under-18 test case to verify bonus)
// ------------------------------------------------------------------------------
const rawData = [
    '{"user":"Alex","age":25}',
    '{"id":2}',
    '{invalid}',
    '{"user":"Mina","age":"22"}',
    '{"user":"Rohan","age":16}' // Additional test case: valid JSON & keys, but under 18!
];

console.log("Input Raw JSON Stream:");
rawData.forEach((entry, idx) => {
    console.log(`  [Line ${idx + 1}] ${entry}`);
});
console.log("\n------------------------------------------------------------------------------");
console.log("PROCESSING & AUDITING JSON STREAM (STEP-BY-STEP CONTROL FLOW)");
console.log("------------------------------------------------------------------------------\n");

// Custom Domain Error for Schema Violations
class SchemaValidationError extends Error {
    constructor(missingKey, lineNum) {
        super(`Missing mandatory key: '${missingKey}' at line ${lineNum}`);
        this.name = "SchemaValidationError";
        this.missingKey = missingKey;
        this.lineNum = lineNum;
    }
}

class InvalidDataFormatError extends Error {
    constructor(field, value, lineNum) {
        super(`Invalid value '${value}' for field '${field}' at line ${lineNum}`);
        this.name = "InvalidDataFormatError";
        this.field = field;
        this.lineNum = lineNum;
    }
}

// Target Data Stores
const validCleanUsers = [];
const auditErrorLog = [];

for (let i = 0; i < rawData.length; i++) {
    const rawEntry = rawData[i];
    const lineNumber = i + 1; // 1-indexed line representation

    try {
        // [Task 1]: Attempt JSON Deserialization
        // Control Flow Note: If rawEntry is malformed, JSON.parse() throws SyntaxError
        // and execution immediately aborts the try block, jumping directly to catch(err).
        let parsedObject;
        try {
            parsedObject = JSON.parse(rawEntry);
        } catch (syntaxErr) {
            throw new SyntaxError(`Malformed JSON syntax at line ${lineNumber}: ${syntaxErr.message}`);
        }

        // [Task 2]: Detect missing keys (user, age)
        if (!parsedObject || typeof parsedObject !== "object" || Array.isArray(parsedObject)) {
            throw new SchemaValidationError("object structure", lineNumber);
        }

        if (!("user" in parsedObject) || typeof parsedObject.user !== "string" || parsedObject.user.trim() === "") {
            throw new SchemaValidationError("user", lineNumber);
        }

        if (!("age" in parsedObject) || parsedObject.age === null || parsedObject.age === undefined) {
            throw new SchemaValidationError("age", lineNumber);
        }

        // [Task 5 Bonus]: Convert age to Number and validate
        const numericAge = Number(parsedObject.age);
        if (Number.isNaN(numericAge) || numericAge < 0 || !Number.isInteger(numericAge)) {
            throw new InvalidDataFormatError("age", parsedObject.age, lineNumber);
        }

        // Construct cleaned, sanitized record
        const cleanUser = {
            lineNumber: lineNumber,
            user: parsedObject.user.trim(),
            age: numericAge,
            originalRaw: rawEntry
        };

        // [Task 3]: Push valid entry to clean array
        validCleanUsers.push(cleanUser);

        console.log(`✓ [Line ${lineNumber}] VALID USER PARSED:`);
        console.log(`  ├── Name        : "${cleanUser.user}"`);
        console.log(`  └── Age (num)   : ${cleanUser.age}\n`);

    } catch (err) {
        // Catch and log error with line number
        auditErrorLog.push({
            lineNumber: lineNumber,
            rawInput: rawEntry,
            errorType: err.name,
            errorMessage: err.message
        });

        console.log(`✗ [Line ${lineNumber}] AUDIT EXCEPTION:`);
        console.log(`  ├── Raw Payload : ${rawEntry}`);
        console.log(`  ├── Error Type  : ${err.name}`);
        console.log(`  └── Reason      : ${err.message}\n`);
    }
}

// ------------------------------------------------------------------------------
// Task 5 Bonus: Filter under-18 users
// ------------------------------------------------------------------------------
console.log("==============================================================================");
console.log("             TASK 5 BONUS: AGE AUDIT & UNDER-18 FILTERING                     ");
console.log("==============================================================================");

const eligibleAdultUsers = validCleanUsers.filter(u => u.age >= 18);
const under18Users = validCleanUsers.filter(u => u.age < 18);

console.log("\n--- ELIGIBLE ADULT USERS (AGE >= 18) ---");
eligibleAdultUsers.forEach((u, idx) => {
    console.log(`  [${idx + 1}] User: ${u.user.padEnd(8)} | Age: ${u.age} | Source Line: ${u.lineNumber}`);
});

console.log("\n--- FILTERED OUT: UNDER-18 USERS (AGE < 18) ---");
if (under18Users.length > 0) {
    under18Users.forEach((u, idx) => {
        console.log(`  • User: ${u.user.padEnd(8)} | Age: ${u.age} (Underage - Excluded from adult database)`);
    });
} else {
    console.log("  None found.");
}

// ------------------------------------------------------------------------------
// FINAL AUDIT SUMMARY REPORT
// ------------------------------------------------------------------------------
console.log("\n==============================================================================");
console.log("                         JSON AUDIT SUMMARY REPORT                            ");
console.log("==============================================================================");
console.log(`Total JSON Stream Entries Evaluated : ${rawData.length}`);
console.log(`Successfully Parsed & Validated     : ${validCleanUsers.length}`);
console.log(`Adult Users (>= 18)                 : ${eligibleAdultUsers.length}`);
console.log(`Minor Users (< 18)                  : ${under18Users.length}`);
console.log(`Failed / Malformed Entries          : ${auditErrorLog.length}\n`);

console.log("--- REJECTED ENTRIES LOG (WITH LINE NUMBERS) ---");
auditErrorLog.forEach((entry, idx) => {
    console.log(
        `  [Fail #${idx + 1}] Line ${entry.lineNumber}: ` +
        `[${entry.errorType}] ${entry.errorMessage} | Raw: ${entry.rawInput}`
    );
});

console.log("\n==============================================================================");
console.log("TASK 4: DEBUG STEP-BY-STEP CONTROL FLOW OBSERVATION");
console.log("==============================================================================");
console.log("Control Flow on Error in JavaScript's Event Loop:");
console.log("1. Normal Execution:");
console.log("   - Line 1 '{\"user\":\"Alex\",\"age\":25}': JSON.parse() succeeds -> all validations pass");
console.log("     -> cleanUser object pushed to validCleanUsers -> exits try block cleanly.");
console.log("2. Schema Violation Exception:");
console.log("   - Line 2 '{\"id\":2}': JSON.parse() succeeds, but 'user' and 'age' properties");
console.log("     are missing. The 'if (!(\"user\" in parsedObject))' check triggers.");
console.log("   - 'throw new SchemaValidationError()' executes, instantly halting the try block.");
console.log("   - Control jumps directly to catch(err) at the bottom of the loop body.");
console.log("3. Parse Syntax Exception:");
console.log("   - Line 3 '{invalid}': JSON.parse() encounters unquoted string and invalid token.");
console.log("   - Native C++ JSON parser throws SyntaxError before any JS validation code runs.");
console.log("   - Control jumps straight to the catch block, safely preserving the application");
console.log("     from crashing and allowing Line 4 to be processed smoothly.");
console.log("==============================================================================\n");
