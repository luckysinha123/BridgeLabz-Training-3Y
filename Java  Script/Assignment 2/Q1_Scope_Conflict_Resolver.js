/**
 * ==============================================================================
 * QUESTION 1: Scope Conflict Resolver
 * ==============================================================================
 * Requirements:
 * - Declare a global variable bonus = 5000.
 * - Inside a function calculateSalary(), declare a local variable salary = 40000.
 * - Add the bonus only if a local variable isPermanent (boolean) is true.
 * - Print total salary inside the function.
 * - Demonstrate how changing isPermanent affects the global variable scope.
 * ==============================================================================
 */

// Step 1: Declare global variable accessible anywhere in this script
let bonus = 5000;

console.log("==============================================================================");
console.log("QUESTION 1: SCOPE CONFLICT RESOLVER - PAYROLL SYSTEM");
console.log("==============================================================================");
console.log(`[Global Scope Initialized] Global bonus: ₹${bonus}`);
console.log("------------------------------------------------------------------------------\n");

/**
 * Calculates and displays total salary based on employee permanence status.
 * Demonstrates function scope and access to outer global scope.
 * 
 * @param {boolean} isPermanentStatus - Indicates whether employee is permanent
 */
function calculateSalary(isPermanentStatus) {
    // Step 2: Declare local variables inside function scope
    let salary = 40000; // Local salary variable, only accessible inside calculateSalary
    let isPermanent = Boolean(isPermanentStatus); // Local boolean variable
    let totalSalary = salary;

    // Step 3: Add bonus only if local variable isPermanent is true
    if (isPermanent) {
        // Accessing global 'bonus' inside function scope (lexical scope chain)
        totalSalary += bonus;
    }

    // Step 4: Print total salary inside the function
    console.log(`[Inside calculateSalary()]`);
    console.log(`  - Local Base Salary    : ₹${salary}`);
    console.log(`  - Local isPermanent    : ${isPermanent}`);
    console.log(`  - Applied Global Bonus : ₹${isPermanent ? bonus : 0}`);
    console.log(`  - Calculated Total     : ₹${totalSalary}\n`);

    return totalSalary;
}

// Step 5: Test Case 1 - Permanent Employee (isPermanent = true)
console.log("--- Test Case 1: Permanent Employee (isPermanent = true) ---");
calculateSalary(true);

// Step 6: Test Case 2 - Contract / Temporary Employee (isPermanent = false)
console.log("--- Test Case 2: Contractual Employee (isPermanent = false) ---");
calculateSalary(false);

// Step 7: Demonstrate Scope Boundaries & Verification
console.log("------------------------------------------------------------------------------");
console.log("SCOPE VERIFICATION & GLOBAL IMPACT DEMONSTRATION");
console.log("------------------------------------------------------------------------------");

// 1. Check if global 'bonus' was altered by function executions
console.log(`1. Global variable 'bonus' value: ₹${bonus} (Remains intact and unchanged)`);

// 2. Check if local 'salary' leaked into global scope
try {
    console.log(`2. Accessing 'salary' globally: ${salary}`);
} catch (error) {
    console.log(`2. Accessing 'salary' globally: ReferenceError (${error.message})`);
    console.log("   -> Confirms 'salary' is strictly confined to function scope.");
}

// 3. Check if local 'isPermanent' leaked into global scope
try {
    console.log(`3. Accessing 'isPermanent' globally: ${isPermanent}`);
} catch (error) {
    console.log(`3. Accessing 'isPermanent' globally: ReferenceError (${error.message})`);
    console.log("   -> Confirms 'isPermanent' does not pollute the global scope.");
}

// 4. Summary explanation of scope resolution
console.log("\nSummary of Scope Behavior:");
console.log("- Global variables like 'bonus' are readable from inner scopes via the scope chain.");
console.log("- Local variables ('salary', 'isPermanent') declared with 'let' are enclosed within");
console.log("  their function scope, preventing accidental global namespace collisions.");
console.log("==============================================================================\n");
