"use strict";

/**
 * ==============================================================================
 * ASSIGNMENT 8 - QUESTION 7: Banking Application (Private Fields #balance)
 * ==============================================================================
 * 
 * Problem Statement:
 * Create a BankAccount class with private fields:
 * ● #balance
 * Add methods:
 * ● deposit(amount)
 * ● withdraw(amount) (throw error if insufficient balance)
 * ● getBalance()
 * 
 * Demonstrate:
 * ● valid deposits
 * ● invalid withdrawals (handled using try/catch)
 * 
 * Concepts Demonstrated:
 * - ECMAScript Private Class Fields (#field syntax)
 * - True Data Encapsulation (Preventing external balance tampering)
 * - Custom Error Throwing on Overdraft / Invalid Amounts
 * - Safe Exception Handling with try...catch
 * ==============================================================================
 */

console.log("==============================================================================");
console.log("     ASSIGNMENT 8 - Q7: BANKING APPLICATION (Private Fields Encapsulation)    ");
console.log("==============================================================================\n");

/**
 * Class representing a Secure Bank Account.
 */
class BankAccount {
    // Private Field: Strictly inaccessible from outside class scope
    #balance;
    #accountNumber;
    #accountHolder;

    /**
     * @param {string} accountHolder - Customer Name
     * @param {string} accountNumber - Account identifier
     * @param {number} [initialDeposit=0] - Starting balance
     */
    constructor(accountHolder, accountNumber, initialDeposit = 0) {
        if (!accountHolder || !accountNumber) {
            throw new Error("Account holder name and account number are required.");
        }
        if (typeof initialDeposit !== "number" || initialDeposit < 0) {
            throw new TypeError("Initial deposit must be a non-negative number.");
        }

        this.#accountHolder = accountHolder;
        this.#accountNumber = accountNumber;
        this.#balance = initialDeposit;
    }

    /**
     * Deposits money into the account.
     * 
     * @param {number} amount - Amount to deposit
     * @returns {number} Updated balance
     * @throws {Error} If amount is non-positive or non-numeric
     */
    deposit(amount) {
        if (typeof amount !== "number" || isNaN(amount) || amount <= 0) {
            throw new Error(`Deposit Failed: Deposit amount must be a positive number. (Received: ${amount})`);
        }

        this.#balance += amount;
        console.log(`[DEPOSIT SUCCESS] Deposited ₹${amount.toFixed(2)} into Account [${this.#accountNumber}]. New Balance: ₹${this.#balance.toFixed(2)}`);
        return this.#balance;
    }

    /**
     * Withdraws money from the account.
     * 
     * Requirements:
     * - Throw error if insufficient balance
     * - Throw error if withdrawal amount is invalid
     * 
     * @param {number} amount - Amount to withdraw
     * @returns {number} Remaining balance
     * @throws {Error} If insufficient balance or invalid amount
     */
    withdraw(amount) {
        if (typeof amount !== "number" || isNaN(amount) || amount <= 0) {
            throw new Error(`Withdrawal Failed: Amount must be a positive number. (Received: ${amount})`);
        }

        // Required condition: Throw error if insufficient balance
        if (amount > this.#balance) {
            throw new Error(
                `INSUFFICIENT FUNDS: Attempted to withdraw ₹${amount.toFixed(2)}, but available balance is only ₹${this.#balance.toFixed(2)}.`
            );
        }

        this.#balance -= amount;
        console.log(`[WITHDRAWAL SUCCESS] Withdrew ₹${amount.toFixed(2)} from Account [${this.#accountNumber}]. Remaining Balance: ₹${this.#balance.toFixed(2)}`);
        return this.#balance;
    }

    /**
     * Returns the current account balance (Controlled public read access).
     * @returns {number}
     */
    getBalance() {
        return this.#balance;
    }

    /**
     * Returns public account summary.
     * @returns {string}
     */
    getAccountSummary() {
        return `Account [${this.#accountNumber}] | Holder: ${this.#accountHolder} | Balance: ₹${this.getBalance().toFixed(2)}`;
    }
}

// ==============================================================================
// DEMONSTRATION & TEST CASES
// ==============================================================================

console.log("------------------------------------------------------------------------------");
console.log("STEP 1: INITIALIZING BANK ACCOUNT");
console.log("------------------------------------------------------------------------------\n");

const myAccount = new BankAccount("Lucky Sinha", "SB-987654321", 5000);
console.log("Account Created:");
console.log("  " + myAccount.getAccountSummary());
console.log("  Current Balance via getBalance(): ₹" + myAccount.getBalance().toFixed(2));
console.log();

// ==============================================================================
// DEMONSTRATING VALID DEPOSITS
// ==============================================================================
console.log("------------------------------------------------------------------------------");
console.log("STEP 2: DEMONSTRATING VALID DEPOSITS");
console.log("------------------------------------------------------------------------------\n");

try {
    myAccount.deposit(2500); // Balance -> 7500
    myAccount.deposit(10000); // Balance -> 17500
    console.log(`Verified Balance: ₹${myAccount.getBalance().toFixed(2)}\n`);
} catch (err) {
    console.error("Deposit error:", err.message);
}

// ==============================================================================
// DEMONSTRATING VALID WITHDRAWALS
// ==============================================================================
console.log("------------------------------------------------------------------------------");
console.log("STEP 3: DEMONSTRATING VALID WITHDRAWALS");
console.log("------------------------------------------------------------------------------\n");

try {
    myAccount.withdraw(4500); // Balance -> 13000
    console.log(`Verified Balance: ₹${myAccount.getBalance().toFixed(2)}\n`);
} catch (err) {
    console.error("Withdrawal error:", err.message);
}

// ==============================================================================
// DEMONSTRATING INVALID WITHDRAWALS (HANDLED VIA try/catch)
// ==============================================================================
console.log("------------------------------------------------------------------------------");
console.log("STEP 4: DEMONSTRATING INVALID WITHDRAWALS (HANDLED VIA try/catch)");
console.log("------------------------------------------------------------------------------\n");

// Test A: Overdraft Attempt (Exceeds available balance)
console.log(">>> Attempting to withdraw ₹50,000 (Available Balance: ₹13,000):");
try {
    myAccount.withdraw(50000);
} catch (error) {
    console.error("  ❌ [Caught Error]:", error.message);
    console.log("  ✔ Security Trigger: Transaction rejected. Account balance remains safe.");
}
console.log();

// Test B: Negative Withdrawal Attempt
console.log(">>> Attempting to withdraw negative amount (-₹1,000):");
try {
    myAccount.withdraw(-1000);
} catch (error) {
    console.error("  ❌ [Caught Error]:", error.message);
}
console.log();

// ==============================================================================
// STEP 5: PROOF OF PRIVATE FIELD ENCAPSULATION
// ==============================================================================
console.log("------------------------------------------------------------------------------");
console.log("STEP 5: PROOF OF PRIVATE FIELD SECURITY (#balance)");
console.log("------------------------------------------------------------------------------");

console.log("Trying to read 'myAccount.balance' directly:");
console.log("  myAccount.balance is:", myAccount.balance, "(undefined -> not accessible!)");

console.log("Trying to mutate 'myAccount.balance = 999999':");
myAccount.balance = 999999;
console.log("Did external assignment change private #balance?");
console.log("  myAccount.getBalance() -> ₹" + myAccount.getBalance().toFixed(2) + " (UNTOUCHED & SECURE!)");
console.log("------------------------------------------------------------------------------\n");
