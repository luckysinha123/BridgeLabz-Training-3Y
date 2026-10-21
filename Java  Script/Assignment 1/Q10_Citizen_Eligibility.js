/**
 * Question 10: Citizen Eligibility Validator
 * 
 * Requirements:
 * - Input: age and isCitizen (boolean).
 * - Use nested if-else and logical operators to print:
 *   - "Eligible for all services." if citizen and age >= 18 (21+ full adult services)
 *   - "Eligible to vote only." if citizen and 18-20
 *   - "Only age criteria met." if not citizen but age >= 18
 *   - "Not eligible yet." otherwise
 * - Use console.log() for all outcomes.
 */

// Step 1: Input variables
const userAge = 22;
const isCitizen = true;

// Step 2: Evaluation function using nested if-else and logical operators
function checkCitizenEligibility(age, citizen) {
    if (citizen) {
        // Citizen branch
        if (age >= 18) {
            // Nested check: 18-20 is vote only, 21+ is eligible for all services
            if (age >= 18 && age <= 20) {
                console.log("Eligible to vote only.");
            } else {
                console.log("Eligible for all services.");
            }
        } else {
            console.log("Not eligible yet.");
        }
    } else {
        // Non-citizen branch
        if (age >= 18) {
            console.log("Only age criteria met.");
        } else {
            console.log("Not eligible yet.");
        }
    }
}

// Step 3: Run checks
console.log(`Input: Age = ${userAge}, Is Citizen = ${isCitizen}`);
console.log("Eligibility Result:");
checkCitizenEligibility(userAge, isCitizen);

console.log("\nTesting All Conditions:");
console.log("- Citizen, age 25  :");
checkCitizenEligibility(25, true);
console.log("- Citizen, age 19  :");
checkCitizenEligibility(19, true);
console.log("- Non-citizen, age 24 :");
checkCitizenEligibility(24, false);
console.log("- Citizen, age 16  :");
checkCitizenEligibility(16, true);
console.log("- Non-citizen, age 15 :");
checkCitizenEligibility(15, false);
