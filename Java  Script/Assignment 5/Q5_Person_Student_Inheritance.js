"use strict";

/**
 * ==============================================================================
 * ASSIGNMENT 5 - QUESTION 5: Prototypal Inheritance (Person -> Student)
 * ==============================================================================
 * 
 * Problem Statement:
 * Create a Person constructor with property name. Then create a Student constructor
 * that inherits from Person and adds property branch. Add methods to print both name
 * and branch using prototypes. Demonstrate the prototype chain working.
 * 
 * Concepts Demonstrated:
 * 1. Constructor Stealing / Inheritance: Using Person.call(this, name) to initialize
 *    super-constructor properties inside Student.
 * 2. Prototype Linking: Using Object.create(Person.prototype) to link Student.prototype
 *    to Person.prototype.
 * 3. Constructor Resetting: Manually restoring Student.prototype.constructor = Student.
 * 4. Prototype Chain Lookup: When student.printName() is called, JavaScript searches:
 *    student instance -> Student.prototype -> Person.prototype -> Object.prototype -> null.
 * ==============================================================================
 */

console.log("==============================================================================");
console.log("     ASSIGNMENT 5 - Q5: PROTOTYPAL INHERITANCE (Person -> Student)            ");
console.log("==============================================================================\n");

// ==============================================================================
// STEP 1: Define Parent Constructor Function (Person)
// ==============================================================================
/**
 * Parent constructor representing a Person.
 * @param {string} name - Name of the person.
 */
function Person(name) {
    this.name = name;
}

// Add method to Person's prototype
Person.prototype.printName = function() {
    console.log(`[Person.prototype.printName] -> Name: "${this.name}"`);
};

// ==============================================================================
// STEP 2: Define Child Constructor Function (Student) & Call Super
// ==============================================================================
/**
 * Child constructor representing a Student.
 * @param {string} name - Name of the student (inherited from Person).
 * @param {string} branch - Academic branch/department of the student.
 */
function Student(name, branch) {
    // Call the parent constructor in the context of the new Student instance ('this')
    Person.call(this, name);
    // Student-specific property
    this.branch = branch;
}

// ==============================================================================
// STEP 3: Setup Prototype Inheritance & Restore Constructor Reference
// ==============================================================================
// Link Student.prototype to Person.prototype via Object.create()
Student.prototype = Object.create(Person.prototype);

// Crucial: Object.create overrides constructor pointer to Person; restore it to Student!
Student.prototype.constructor = Student;

// ==============================================================================
// STEP 4: Add Student-Specific Method to Student.prototype
// ==============================================================================
Student.prototype.printBranch = function() {
    console.log(`[Student.prototype.printBranch] -> Branch: "${this.branch}"`);
};

// Composite method demonstrating access to both inherited and own properties
Student.prototype.printStudentSummary = function() {
    console.log(`[Student.prototype.printStudentSummary] -> Student: ${this.name} | Department: ${this.branch}`);
};

// ==============================================================================
// STEP 5: Create Student Instance and Demonstrate Method Calls
// ==============================================================================
console.log("------------------------------------------------------------------------------");
console.log("CREATING STUDENT INSTANCE AND CALLING METHODS");
console.log("------------------------------------------------------------------------------\n");

const student1 = new Student("Aarav Mehta", "Computer Science and Engineering");
const student2 = new Student("Priya Nair", "Electronics and Communication");

console.log("Student 1 Instance Object:", student1);
console.log();

console.log("Executing student1 methods:");
// Inherited method from Person.prototype:
student1.printName();

// Child method from Student.prototype:
student1.printBranch();

// Combined method:
student1.printStudentSummary();
console.log();

console.log("Executing student2 methods:");
student2.printName();
student2.printBranch();
console.log();

// ==============================================================================
// STEP 6: Demonstrating the Prototype Chain Working
// ==============================================================================
console.log("------------------------------------------------------------------------------");
console.log("VERIFYING THE PROTOTYPE CHAIN ARCHITECTURE");
console.log("------------------------------------------------------------------------------\n");

// 1. Prototype Chain Hierarchy Inspection
const protoLevel1 = Object.getPrototypeOf(student1);
const protoLevel2 = Object.getPrototypeOf(protoLevel1);
const protoLevel3 = Object.getPrototypeOf(protoLevel2);
const protoLevel4 = Object.getPrototypeOf(protoLevel3);

console.log("Prototype Chain Traversal:");
console.log("  Level 0 (Instance)          :", student1.constructor.name, "instance");
console.log("  Level 1 (Object.getPrototypeOf(student1)) :", protoLevel1 === Student.prototype, "(Student.prototype)");
console.log("  Level 2 (Object.getPrototypeOf(Student.prototype)):", protoLevel2 === Person.prototype, "(Person.prototype)");
console.log("  Level 3 (Object.getPrototypeOf(Person.prototype)) :", protoLevel3 === Object.prototype, "(Object.prototype)");
console.log("  Level 4 (Terminal Prototype) :", protoLevel4, "(null -> Chain terminates)\n");

// 2. 'instanceof' Operator Checks
console.log("Checking instanceof across the prototype chain:");
console.log("  student1 instanceof Student :", student1 instanceof Student, "(Direct constructor)");
console.log("  student1 instanceof Person  :", student1 instanceof Person, "(Inherited constructor)");
console.log("  student1 instanceof Object  :", student1 instanceof Object, "(Root Object constructor)");
console.log();

// 3. Property & Method Location Audit
console.log("Checking property and method ownership:");
console.log("  student1.hasOwnProperty('name')        :", student1.hasOwnProperty("name"), "(Own instance property)");
console.log("  student1.hasOwnProperty('branch')      :", student1.hasOwnProperty("branch"), "(Own instance property)");
console.log("  student1.hasOwnProperty('printBranch') :", student1.hasOwnProperty("printBranch"), "(On Student.prototype)");
console.log("  student1.hasOwnProperty('printName')   :", student1.hasOwnProperty("printName"), "(On Person.prototype)");
console.log("  Student.prototype.hasOwnProperty('printBranch'):", Student.prototype.hasOwnProperty("printBranch"));
console.log("  Person.prototype.hasOwnProperty('printName')  :", Person.prototype.hasOwnProperty("printName"));
console.log("------------------------------------------------------------------------------\n");
