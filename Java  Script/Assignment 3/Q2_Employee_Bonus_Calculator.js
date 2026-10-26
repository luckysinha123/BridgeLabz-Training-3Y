"use strict";

/**
 * ==============================================================================
 * ASSIGNMENT 3 - QUESTION 2: Employee Bonus Calculator
 * ==============================================================================
 * 
 * Problem Statement:
 * Given employee data:
 * const employees = [
 *   { name: "Amit", salary: "45000", years: "5" },
 *   { name: "Sara", salary: "38000", years: "2" },
 *   { name: "Kiran", salary: "52000", years: "7" }
 * ];
 * 
 * Tasks:
 * 1. Convert salary and years to numbers.
 * 2. Calculate bonus = (salary * 0.1) if years > 3 else (salary * 0.05).
 * 3. Apply strict validation using "use strict" (no implicit globals).
 * 4. Use template strings to print each employee’s formatted details.
 * 5. Add try...catch to handle conversion or missing property errors.
 * 
 * Concepts Demonstrated:
 * - "use strict" preventing accidental leakage into global scope
 * - Type conversion from String to Number
 * - Defensive validation and error handling via try...catch
 * - Template literals for clean financial reporting
 * ==============================================================================
 */

console.log("==============================================================================");
console.log("            ASSIGNMENT 3 - Q2: EMPLOYEE BONUS CALCULATOR                      ");
console.log("==============================================================================\n");

// Given Employee Dataset
const employees = [
    { name: "Amit", salary: "45000", years: "5" },
    { name: "Sara", salary: "38000", years: "2" },
    { name: "Kiran", salary: "52000", years: "7" },
    // Additional Edge-Case test objects to validate try...catch error handling:
    { name: "Vikram", salary: "invalid_num", years: "4" },   // Invalid numeric salary
    { name: "Neha", years: "3" },                            // Missing salary property
    { salary: "60000", years: "5" },                         // Missing name property
    null                                                     // Null record
];

/**
 * Custom function to validate employee record and calculate compensation.
 * Enforces strict property existence and numeric integrity.
 * 
 * @param {Object} employee - Employee record object
 * @returns {Object} Processed employee calculation record
 * @throws {Error} When data is missing, null, or cannot be converted to a valid number
 */
function processEmployeeBonus(employee) {
    // 1. Check for null or non-object entry
    if (!employee || typeof employee !== "object") {
        throw new Error("Invalid Employee Record: Expected a valid non-null object.");
    }

    // 2. Validate essential properties existence
    if (!("name" in employee) || typeof employee.name !== "string" || employee.name.trim() === "") {
        throw new Error("Missing Property: 'name' is required and must be a non-empty string.");
    }
    if (!("salary" in employee)) {
        throw new Error(`Missing Property: 'salary' is missing for employee '${employee.name}'.`);
    }
    if (!("years" in employee)) {
        throw new Error(`Missing Property: 'years' of experience is missing for employee '${employee.name}'.`);
    }

    // 3. Task 1: Convert salary and years to numbers
    const numSalary = Number(employee.salary);
    const numYears = Number(employee.years);

    // Validate conversion results
    if (Number.isNaN(numSalary) || numSalary < 0) {
        throw new TypeError(`Conversion Error: Salary '${employee.salary}' for '${employee.name}' is not a valid positive number.`);
    }
    if (Number.isNaN(numYears) || numYears < 0) {
        throw new TypeError(`Conversion Error: Years of service '${employee.years}' for '${employee.name}' is not a valid positive number.`);
    }

    // 4. Task 2: Calculate bonus = (salary * 0.10) if years > 3 else (salary * 0.05)
    // HOISTING / STRICT MODE NOTE:
    // With "use strict", writing `bonusRate = ...` without const/let/var causes a ReferenceError.
    const bonusRate = numYears > 3 ? 0.10 : 0.05;
    const bonusAmount = numSalary * bonusRate;
    const totalCompensation = numSalary + bonusAmount;

    return {
        name: employee.name,
        baseSalary: numSalary,
        years: numYears,
        bonusRatePercentage: (bonusRate * 100).toFixed(0) + "%",
        bonusAmount: bonusAmount,
        totalCompensation: totalCompensation
    };
}

// ------------------------------------------------------------------------------
// Processing Loop with try...catch
// ------------------------------------------------------------------------------
console.log("------------------------------------------------------------------------------");
console.log("PROCESSING EMPLOYEES WITH STRICT VALIDATION & ERROR HANDLING");
console.log("------------------------------------------------------------------------------\n");

const successfulCalculations = [];
const failedCalculations = [];

for (let i = 0; i < employees.length; i++) {
    const rawEmp = employees[i];
    const recordLabel = rawEmp && rawEmp.name ? `Employee "${rawEmp.name}"` : `Record Index [${i}]`;

    try {
        // Step 5: Wrap in try block to catch conversion and validation exceptions
        const result = processEmployeeBonus(rawEmp);
        successfulCalculations.push(result);

        // Step 4: Use template strings to print formatted details
        console.log(`✓ SUCCESS: ${recordLabel}`);
        console.log(`  ├── Employee Name      : ${result.name}`);
        console.log(`  ├── Experience         : ${result.years} year(s)`);
        console.log(`  ├── Base Salary        : ₹${result.baseSalary.toLocaleString("en-IN")}`);
        console.log(`  ├── Applied Bonus Rate : ${result.bonusRatePercentage} (${result.years > 3 ? "Senior Tier > 3 yrs" : "Standard Tier <= 3 yrs"})`);
        console.log(`  ├── Bonus Amount       : ₹${result.bonusAmount.toLocaleString("en-IN")}`);
        console.log(`  └── Total Pay          : ₹${result.totalCompensation.toLocaleString("en-IN")}\n`);

    } catch (error) {
        // Handle conversion or missing property errors gracefully
        failedCalculations.push({
            record: rawEmp,
            errorMessage: error.message,
            errorType: error.name
        });

        console.log(`✗ REJECTED: ${recordLabel}`);
        console.log(`  ├── Error Type : ${error.name}`);
        console.log(`  └── Reason     : ${error.message}\n`);
    }
}

// ------------------------------------------------------------------------------
// SUMMARY REPORT
// ------------------------------------------------------------------------------
console.log("==============================================================================");
console.log("                         PAYROLL SUMMARY REPORT                               ");
console.log("==============================================================================");
console.log(`Total Records Audited     : ${employees.length}`);
console.log(`Successfully Processed    : ${successfulCalculations.length}`);
console.log(`Failed / Rejected Records : ${failedCalculations.length}\n`);

console.log("Successfully Processed Payroll:");
successfulCalculations.forEach((emp, index) => {
    console.log(
        ` [${index + 1}] ${emp.name.padEnd(8)} | Years: ${String(emp.years).padEnd(2)} | ` +
        `Base: ₹${emp.baseSalary.toLocaleString("en-IN").padEnd(8)} | ` +
        `Bonus (${emp.bonusRatePercentage}): ₹${emp.bonusAmount.toLocaleString("en-IN").padEnd(8)} | ` +
        `Total: ₹${emp.totalCompensation.toLocaleString("en-IN")}`
    );
});

console.log("\n==============================================================================");
console.log("DEBUG OBSERVATIONS & HOISTING NOTES:");
console.log("==============================================================================");
console.log("1. STRICT MODE ENFORCEMENT:");
console.log("   - Because 'use strict' is active, any attempt to assign to an undeclared");
console.log("     variable (e.g. bonus = 5000 without let/const) immediately throws a");
console.log("     ReferenceError instead of creating an accidental global variable.");
console.log("2. EXPLICIT COERCION vs IMPLICIT ADDITION:");
console.log("   - Converting 'salary' with Number() is critical. If we did `salary + bonus`");
console.log("     where salary is string '45000', JavaScript would concatenate them into '450004500'!");
console.log("3. TRY...CATCH CONTROL FLOW:");
console.log("   - When an exception occurs inside processEmployeeBonus(), execution immediately");
console.log("     halts within that iteration and jumps to the catch(error) block, preventing");
console.log("     the script from crashing and preserving program continuity.");
console.log("==============================================================================\n");
