"use strict";

/**
 * ==============================================================================
 * ASSIGNMENT 8 - QUESTION 4: Employee Inheritance & Runtime Polymorphism
 * ==============================================================================
 * 
 * Problem Statement:
 * Create classes Employee and Manager.
 * ● Employee → properties: name, department
 * ● Manager → inherits Employee and overrides a work() method
 * Create objects and show runtime polymorphism.
 * 
 * Concepts Demonstrated:
 * - ES6 Class Inheritance (extends, super)
 * - Method Overriding (Specializing base behavior in child classes)
 * - Runtime Polymorphism: Different object types responding uniquely to the same
 *   method call (.work()) when invoked via a shared interface.
 * ==============================================================================
 */

console.log("==============================================================================");
console.log("   ASSIGNMENT 8 - Q4: EMPLOYEE INHERITANCE & RUNTIME POLYMORPHISM             ");
console.log("==============================================================================\n");

/**
 * Base Class: Employee
 */
class Employee {
    /**
     * @param {string} name - Employee Full Name
     * @param {string} department - Department / Division
     */
    constructor(name, department) {
        if (!name || !department) {
            throw new Error("Both name and department are required for an Employee.");
        }
        this.name = name;
        this.department = department;
    }

    /**
     * Base implementation of work()
     * @returns {string} Description of employee duties
     */
    work() {
        return `${this.name} is writing code and completing assigned operational tasks in ${this.department}.`;
    }

    /**
     * Common method to get employee credentials
     */
    getDetails() {
        return `[Employee] Name: ${this.name.padEnd(16)} | Department: ${this.department}`;
    }
}

/**
 * Derived Class: Manager (inherits from Employee)
 */
class Manager extends Employee {
    /**
     * @param {string} name - Manager Full Name
     * @param {string} department - Department
     * @param {number} teamSize - Number of direct reports
     */
    constructor(name, department, teamSize = 5) {
        // Call super-constructor to initialize name and department
        super(name, department);
        this.teamSize = teamSize;
    }

    /**
     * Overridden work() method specifically tailored for managerial responsibilities.
     * Overrides Employee.prototype.work()
     * @returns {string}
     */
    work() {
        return `${this.name} is leading sprint planning, reviewing team PRs, and managing a team of ${this.teamSize} engineers in ${this.department}.`;
    }

    /**
     * Overridden getDetails()
     */
    getDetails() {
        return `[Manager]  Name: ${this.name.padEnd(16)} | Department: ${this.department.padEnd(12)} | Team Size: ${this.teamSize}`;
    }
}

// ==============================================================================
// DEMONSTRATION OF RUNTIME POLYMORPHISM
// ==============================================================================
console.log("------------------------------------------------------------------------------");
console.log("CREATING HETEROGENEOUS OBJECT COLLECTION");
console.log("------------------------------------------------------------------------------\n");

const staffMembers = [
    new Employee("Aarav Sharma", "Software Engineering"),
    new Manager("Priya Nair", "Software Engineering", 12),
    new Employee("Karan Johar", "Marketing"),
    new Manager("Sunil Chetri", "Operations", 8),
    new Employee("Tanmay Bhat", "Content Creation")
];

console.log("Staff Directory:");
staffMembers.forEach(staff => console.log("  " + staff.getDetails()));
console.log();

console.log("------------------------------------------------------------------------------");
console.log("DEMONSTRATING RUNTIME POLYMORPHISM (.work() CALLS)");
console.log("------------------------------------------------------------------------------\n");
console.log("Iterating through staff collection and invoking staffMember.work():");
console.log("The JavaScript engine dynamically resolves the correct method based on");
console.log("the concrete object instance at runtime!\n");

staffMembers.forEach((staffMember, index) => {
    // RUNTIME POLYMORPHISM: Same method signature (.work()), completely different behavior!
    console.log(`[Member #${index + 1}] (${staffMember instanceof Manager ? "Manager" : "Employee"}):`);
    console.log(`  -> ${staffMember.work()}\n`);
});

// ==============================================================================
// VERIFYING INHERITANCE AND PROTOTYPE CHAIN
// ==============================================================================
console.log("------------------------------------------------------------------------------");
console.log("PROTOTYPE & INHERITANCE VERIFICATIONS");
console.log("------------------------------------------------------------------------------");

const sampleManager = staffMembers[1]; // Priya Nair (Manager)
console.log("Checking sampleManager (Priya Nair):");
console.log("  sampleManager instanceof Manager  :", sampleManager instanceof Manager, "(Direct class)");
console.log("  sampleManager instanceof Employee :", sampleManager instanceof Employee, "(Inherited class)");
console.log("  sampleManager instanceof Object   :", sampleManager instanceof Object, "(Base Object)");
console.log();
console.log("Method Resolution Check:");
console.log("  Manager.prototype.hasOwnProperty('work')  :", Manager.prototype.hasOwnProperty("work"), "(Overrides base method)");
console.log("  Employee.prototype.hasOwnProperty('work') :", Employee.prototype.hasOwnProperty("work"), "(Base method)");
console.log("==============================================================================\n");
