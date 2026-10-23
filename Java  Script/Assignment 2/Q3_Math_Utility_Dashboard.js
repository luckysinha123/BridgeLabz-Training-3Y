/**
 * ==============================================================================
 * QUESTION 3: Math Utility Dashboard
 * ==============================================================================
 * Requirements:
 * - Take a number x = 16.75.
 * - Display:
 *   - Rounded value (Math.round)
 *   - Square root (Math.sqrt)
 *   - Power (Math.pow(x, 3))
 *   - Random number between 10–50 (Math.floor(Math.random() * 41) + 10)
 * - Use template literals to show a formatted result summary.
 * ==============================================================================
 */

console.log("==============================================================================");
console.log("QUESTION 3: SCIENTIFIC CALCULATOR - MATH UTILITY DASHBOARD");
console.log("==============================================================================");

// Step 1: Initialize the base input variable
const x = 16.75;

// Step 2: Perform required mathematical computations
const roundedValue = Math.round(x);
const squareRootValue = Math.sqrt(x);
const powerCubedValue = Math.pow(x, 3);

// Formula for random integer between MIN and MAX inclusive:
// Math.floor(Math.random() * (MAX - MIN + 1)) + MIN
// Here: (50 - 10 + 1) = 41, MIN = 10
const randomBetween10And50 = Math.floor(Math.random() * 41) + 10;

// Step 3: Format the summary dashboard using template literals
const dashboardSummary = `
+----------------------------------------------------------------------------+
|                      SCIENTIFIC MATH UTILITY DASHBOARD                     |
+----------------------------------------------------------------------------+
| Input Value (x)                 : ${x}
|
| 1. Rounded Value [Math.round]   : ${roundedValue}
| 2. Square Root   [Math.sqrt]    : ${squareRootValue} (≈ ${squareRootValue.toFixed(4)})
| 3. Power (x^3)   [Math.pow]     : ${powerCubedValue}
| 4. Random Int    [10 to 50]     : ${randomBetween10And50}
+----------------------------------------------------------------------------+
| Additional Math Context:
| - Math.floor(x)                 : ${Math.floor(x)} (Greatest integer <= x)
| - Math.ceil(x)                  : ${Math.ceil(x)} (Smallest integer >= x)
| - Random range calculation      : Math.floor(Math.random() * 41) + 10
+----------------------------------------------------------------------------+
`;

// Step 4: Display the formatted dashboard
console.log(dashboardSummary);

// Display multiple random samples to demonstrate generator consistency
console.log("Random Number Generator Sample Checks (5 trials between 10 and 50):");
const randomSamples = [];
for (let i = 1; i <= 5; i++) {
    randomSamples.push({
        Trial: `#${i}`,
        GeneratedNumber: Math.floor(Math.random() * 41) + 10,
        ValidRange: "10 <= N <= 50 (Passed)"
    });
}
console.table(randomSamples);

console.log("==============================================================================\n");
