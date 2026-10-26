"use strict";

/**
 * ==============================================================================
 * ASSIGNMENT 3 - QUESTION 3: Transaction Validator
 * ==============================================================================
 * 
 * Problem Statement:
 * const transactions = [
 *   { id: 1, amount: 2000 },
 *   { id: 2, amount: -500 },
 *   { id: 3 },
 *   null
 * ];
 * 
 * Tasks:
 * 1. Loop through each transaction.
 * 2. Throw custom errors for:
 *    - Negative amount
 *    - Missing amount or id
 *    - Null entries
 * 3. Catch and categorize each error type in arrays (invalid, valid).
 * 4. Print final reports with counts of successful and failed transactions.
 * 5. Use a breakpoint to watch variable states.
 * 
 * Concepts Demonstrated:
 * - Custom Error classes extending Error
 * - Exception throwing and catching
 * - Categorization of validation failures
 * - Step-debugging, Breakpoints, and Watch Variables in VS Code
 * ==============================================================================
 */

console.log("==============================================================================");
console.log("                ASSIGNMENT 3 - Q3: TRANSACTION VALIDATOR                      ");
console.log("==============================================================================\n");

// ------------------------------------------------------------------------------
// Custom Error Hierarchy
// ------------------------------------------------------------------------------
class TransactionError extends Error {
    constructor(message, category) {
        super(message);
        this.name = "TransactionError";
        this.category = category;
    }
}

class NullTransactionError extends TransactionError {
    constructor(message = "Transaction entry is null or undefined") {
        super(message, "NULL_ENTRY");
        this.name = "NullTransactionError";
    }
}

class MissingFieldError extends TransactionError {
    constructor(field, message) {
        super(message || `Required field '${field}' is missing in transaction.`, "MISSING_FIELD");
        this.name = "MissingFieldError";
        this.missingField = field;
    }
}

class NegativeAmountError extends TransactionError {
    constructor(amount, message) {
        super(message || `Transaction amount cannot be negative: ₹${amount}`, "NEGATIVE_AMOUNT");
        this.name = "NegativeAmountError";
        this.invalidAmount = amount;
    }
}

// ------------------------------------------------------------------------------
// Input Transactions
// ------------------------------------------------------------------------------
const transactions = [
    { id: 1, amount: 2000 },
    { id: 2, amount: -500 },
    { id: 3 },
    null
];

// Tracking collections
const validTransactions = [];
const invalidTransactions = [];

/**
 * Validates an individual transaction against business rules.
 * 
 * @param {Object} txn - Transaction object to validate
 * @returns {Object} Validated transaction
 * @throws {NullTransactionError|MissingFieldError|NegativeAmountError}
 */
function validateTransaction(txn) {
    // Check 1: Null or undefined entry
    if (txn === null || txn === undefined) {
        throw new NullTransactionError("Encountered null or undefined transaction entry.");
    }

    // Check 2: Missing id
    if (!("id" in txn) || txn.id === null || txn.id === undefined) {
        throw new MissingFieldError("id", "Transaction record lacks a mandatory 'id' field.");
    }

    // Check 3: Missing amount
    if (!("amount" in txn) || txn.amount === null || txn.amount === undefined) {
        throw new MissingFieldError("amount", `Transaction ID [${txn.id}] lacks a mandatory 'amount' field.`);
    }

    // Check 4: Negative amount
    if (typeof txn.amount !== "number" || isNaN(txn.amount)) {
        throw new TransactionError(`Transaction ID [${txn.id}] amount is not a valid number.`, "INVALID_DATA_TYPE");
    }

    if (txn.amount < 0) {
        throw new NegativeAmountError(txn.amount, `Transaction ID [${txn.id}] has negative amount: ₹${txn.amount}. Negative balances are disallowed.`);
    }

    return txn;
}

// ------------------------------------------------------------------------------
// Loop Through Transactions with Error Handling
// ------------------------------------------------------------------------------
console.log("------------------------------------------------------------------------------");
console.log("VALIDATING TRANSACTIONS (STEP-BY-STEP AUDIT)");
console.log("------------------------------------------------------------------------------\n");

// [DEBUG INSTRUCTION FOR TASK 5]:
// Set Breakpoint #1 on the line below to inspect 'i' and 'currentTxn' on each iteration:
for (let i = 0; i < transactions.length; i++) {
    const currentTxn = transactions[i];

    try {
        // [DEBUG INSTRUCTION FOR TASK 5]:
        // Set Breakpoint #2 here to inspect argument before calling validateTransaction
        const validated = validateTransaction(currentTxn);

        validTransactions.push(validated);
        console.log(`[Item #${i + 1}] VALID TRANSACTION:`);
        console.log(`  ├── ID     : ${validated.id}`);
        console.log(`  └── Amount : ₹${validated.amount.toLocaleString("en-IN")}\n`);

    } catch (err) {
        // [DEBUG INSTRUCTION FOR TASK 5]:
        // Set Breakpoint #3 here to inspect 'err.name', 'err.category', and call stack
        const category = err instanceof TransactionError ? err.category : "UNKNOWN_ERROR";

        invalidTransactions.push({
            index: i,
            rawRecord: currentTxn,
            errorType: err.name,
            category: category,
            message: err.message
        });

        console.log(`[Item #${i + 1}] INVALID TRANSACTION (${category}):`);
        console.log(`  ├── Error Class : ${err.name}`);
        console.log(`  └── Error Msg   : ${err.message}\n`);
    }
}

// ------------------------------------------------------------------------------
// Task 4: Final Reports with Counts
// ------------------------------------------------------------------------------
console.log("==============================================================================");
console.log("                        FINAL TRANSACTION AUDIT REPORT                        ");
console.log("==============================================================================");
console.log(`Total Transactions Evaluated : ${transactions.length}`);
console.log(`Successful / Valid (Count)   : ${validTransactions.length}`);
console.log(`Failed / Invalid (Count)     : ${invalidTransactions.length}\n`);

console.log("--- APPROVED TRANSACTIONS ---");
if (validTransactions.length > 0) {
    validTransactions.forEach((t, idx) => {
        console.log(`  ✓ [Record ${idx + 1}] ID: ${t.id} | Amount: ₹${t.amount.toLocaleString("en-IN")}`);
    });
} else {
    console.log("  No valid transactions found.");
}

console.log("\n--- REJECTED TRANSACTIONS CATEGORIZATION ---");
invalidTransactions.forEach((fail, idx) => {
    console.log(
        `  ✗ [Failed #${idx + 1}] Category: ${fail.category.padEnd(16)} | ` +
        `Error: ${fail.errorType.padEnd(22)} | Reason: ${fail.message}`
    );
});

// Category Breakdown
const categoryCount = invalidTransactions.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + 1;
    return acc;
}, {});

console.log("\n--- FAILURE COUNTS BY CATEGORY ---");
for (const [cat, count] of Object.entries(categoryCount)) {
    console.log(`  • ${cat.padEnd(18)}: ${count} occurrence(s)`);
}

console.log("\n==============================================================================");
console.log("TASK 5: DEBUGGING & BREAKPOINT GUIDE (VS CODE)");
console.log("==============================================================================");
console.log("How to debug variable states in VS Code:");
console.log("1. Open VS Code and navigate to Q3_Transaction_Validator.js.");
console.log("2. Click on the left margin (gutter) next to the following lines:");
console.log("   - Line containing 'for (let i = 0; i < transactions.length; i++)'");
console.log("   - Line containing 'validateTransaction(currentTxn)'");
console.log("   - Line containing 'const category = err instanceof TransactionError...'");
console.log("3. Press F5 (Run and Debug -> Node.js).");
console.log("4. In the 'WATCH' window on the left debug pane, click '+' and add:");
console.log("   - currentTxn");
console.log("   - validTransactions.length");
console.log("   - invalidTransactions.length");
console.log("   - err.name");
console.log("   - err.category");
console.log("5. Step over with F10 and observe how each variable updates in real time.");
console.log("==============================================================================\n");
