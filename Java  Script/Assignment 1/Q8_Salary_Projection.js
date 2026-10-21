/**
 * Question 8: Employee Salary Projection
 * 
 * Requirements:
 * - Declare current salary and annual increment rate (in %).
 * - Use a for loop to compute salary for each of 5 years.
 * - Print yearly salary in a formatted console table.
 * - Apply rounding and assignment operators.
 */

// Step 1: Declare starting salary and increment rate
const startingSalary = 50000;
const incrementRate = 8; // in percentage
const totalYears = 5;

let runningSalary = startingSalary;
const projectionRecords = [];

// Step 2: Use for loop to compute salary for each of 5 years
for (let year = 1; year <= totalYears; year++) {
    const annualIncrement = runningSalary * (incrementRate / 100);
    runningSalary += annualIncrement; // Assignment operator (+=)

    projectionRecords.push({
        Year: `Year ${year}`,
        "Previous Base (Rs.)": Math.round(runningSalary - annualIncrement),
        "Increment Rate": `${incrementRate}%`,
        "Increment Amount (Rs.)": Math.round(annualIncrement),
        "Updated Salary (Rs.)": Math.round(runningSalary) // Applying Math.round()
    });
}

// Step 3: Print yearly salary in formatted console table
console.log(`Starting Base Salary : Rs. ${startingSalary}`);
console.log(`Annual Increment     : ${incrementRate}%`);
console.log("\n5-Year Salary Projection:");
console.table(projectionRecords);
