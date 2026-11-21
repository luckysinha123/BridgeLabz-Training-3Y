"use strict";

/**
 * ==============================================================================
 * ASSIGNMENT 4 - QUESTION 6: Employee Management System (Classes + Object Methods)
 * ==============================================================================
 * 
 * Problem Statement:
 * Create a class Employee with properties: id, name, department, salary.
 * 
 * Tasks:
 * 1. Add methods getAnnualSalary() and applyBonus(percent).
 * 2. Create 5 employee objects and calculate annual salary for each.
 * 3. Use reduce() to calculate total annual payout of the company.
 * 
 * Concepts Demonstrated:
 * - ES6 Class Syntax & State Encapsulation
 * - Instance Methods & Dynamic Calculations
 * - Array.prototype.reduce() Accumulation Pattern
 * - Formatted Tabular Reports
 * ==============================================================================
 */

console.log("==============================================================================");
console.log("        ASSIGNMENT 4 - Q6: EMPLOYEE MANAGEMENT SYSTEM                         ");
console.log("==============================================================================\n");

/**
 * Class representing an Employee in the organization.
 */
class Employee {
    /**
     * @param {string|number} id - Unique Employee ID
     * @param {string} name - Employee Full Name
     * @param {string} department - Department / Division
     * @param {number} salary - Monthly Base Salary (in INR)
     */
    constructor(id, name, department, salary) {
        if (!id || !name || !department || salary == null) {
            throw new Error("All fields (id, name, department, salary) are required.");
        }
        if (typeof salary !== "number" || salary <= 0) {
            throw new TypeError("Salary must be a positive number.");
        }

        this.id = id;
        this.name = name;
        this.department = department;
        this.salary = salary; // Monthly salary
        this.bonusPercentage = 0;
    }

    /**
     * Calculates the annual salary of the employee (12 months base salary + bonus).
     * @returns {number} Total annual earnings
     */
    getAnnualSalary() {
        const baseAnnualSalary = this.salary * 12;
        const bonusAmount = (baseAnnualSalary * this.bonusPercentage) / 100;
        return Math.round((baseAnnualSalary + bonusAmount) * 100) / 100;
    }

    /**
     * Applies an annual performance bonus percentage.
     * @param {number} percent - Bonus percentage (0 to 100)
     * @returns {number} The updated annual salary
     */
    applyBonus(percent) {
        if (typeof percent !== "number" || percent < 0) {
            console.warn(`[Warning] Invalid bonus percentage (${percent}%) for employee ${this.name}.`);
            return this.getAnnualSalary();
        }

        this.bonusPercentage = percent;
        console.log(`[Bonus Applied] ${percent}% bonus assigned to ${this.name} (${this.department}).`);
        return this.getAnnualSalary();
    }

    /**
     * Returns a summary description of the employee.
     * @returns {string}
     */
    getSummary() {
        return `[ID: ${this.id}] ${this.name.padEnd(20)} | Dept: ${this.department.padEnd(14)} | Monthly: ₹${this.salary.toLocaleString("en-IN")} | Annual Payout: ₹${this.getAnnualSalary().toLocaleString("en-IN")}`;
    }
}

// ==============================================================================
// STEP 1: Create 5 Employee Objects
// ==============================================================================
console.log("------------------------------------------------------------------------------");
console.log("STEP 1: CREATING 5 EMPLOYEE OBJECTS");
console.log("------------------------------------------------------------------------------\n");

const employees = [
    new Employee("EMP001", "Aarav Sharma", "Engineering", 95000),
    new Employee("EMP002", "Deepika Padukone", "Marketing", 75000),
    new Employee("EMP003", "Karan Johar", "Human Resources", 62000),
    new Employee("EMP004", "Sunil Chetri", "Operations", 58000),
    new Employee("EMP005", "Tanmay Bhat", "Content & Media", 80000)
];

console.log("Initial Employee Roster:\n");
employees.forEach(emp => console.log("  " + emp.getSummary()));
console.log();

// ==============================================================================
// STEP 2: Apply Bonuses and Calculate Annual Salary for Each
// ==============================================================================
console.log("------------------------------------------------------------------------------");
console.log("STEP 2: APPLYING PERFORMANCE BONUSES");
console.log("------------------------------------------------------------------------------\n");

// Assigning performance bonuses
employees[0].applyBonus(15); // Engineering: 15% bonus
employees[1].applyBonus(10); // Marketing: 10% bonus
employees[2].applyBonus(8);  // HR: 8% bonus
employees[3].applyBonus(12); // Operations: 12% bonus
employees[4].applyBonus(20); // Content: 20% bonus
console.log();

console.log("Updated Annual Salaries with Bonus Breakdown:\n");
employees.forEach((emp, index) => {
    const baseAnnual = emp.salary * 12;
    const bonusVal = (baseAnnual * emp.bonusPercentage) / 100;
    const totalAnnual = emp.getAnnualSalary();
    console.log(`  ${index + 1}. ${emp.name} (${emp.id}):`);
    console.log(`     - Base Annual : ₹${baseAnnual.toLocaleString("en-IN")}`);
    console.log(`     - Bonus (${emp.bonusPercentage}%) : ₹${bonusVal.toLocaleString("en-IN")}`);
    console.log(`     - Final Annual: ₹${totalAnnual.toLocaleString("en-IN")}\n`);
});

// ==============================================================================
// STEP 3: Use reduce() to Calculate Total Annual Payout of the Company
// ==============================================================================
console.log("------------------------------------------------------------------------------");
console.log("STEP 3: CALCULATE TOTAL ANNUAL PAYOUT USING reduce()");
console.log("------------------------------------------------------------------------------\n");

/**
 * Array.prototype.reduce accumulates each employee's annual salary
 * into a single total organization payout figure.
 */
const totalCompanyAnnualPayout = employees.reduce((accumulator, currentEmployee) => {
    return accumulator + currentEmployee.getAnnualSalary();
}, 0);

console.log(`Total Company Annual Payroll Expense: ₹${totalCompanyAnnualPayout.toLocaleString("en-IN", { minimumFractionDigits: 2 })}`);
console.log();

// ==============================================================================
// SUMMARY TABLE
// ==============================================================================
console.log("------------------------------------------------------------------------------");
console.log("COMPANY PAYROLL SUMMARY TABLE");
console.log("------------------------------------------------------------------------------");
console.table(employees.map(emp => ({
    "Emp ID": emp.id,
    Name: emp.name,
    Department: emp.department,
    "Monthly (₹)": emp.salary.toLocaleString("en-IN"),
    "Bonus %": `${emp.bonusPercentage}%`,
    "Total Annual Payout (₹)": emp.getAnnualSalary().toLocaleString("en-IN")
})));

console.log(`>>> TOTAL PAYOUT: ₹${totalCompanyAnnualPayout.toLocaleString("en-IN", { minimumFractionDigits: 2 })} <<<\n`);
console.log("==============================================================================\n");
