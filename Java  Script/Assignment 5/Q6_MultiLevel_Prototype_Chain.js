"use strict";

/**
 * ==============================================================================
 * ASSIGNMENT 5 - QUESTION 6: Multi-Level Prototype Chain
 * ==============================================================================
 * 
 * Problem Statement:
 * Create a prototype chain using constructor functions:
 * ● Person → Faculty → Professor
 * Each should have its own property and method.
 * Show how a Professor object can access all methods up the chain.
 * 
 * Concepts Demonstrated:
 * 1. Multi-Level Prototype Inheritance: Creating a 3-tier inheritance chain
 *    (Person -> Faculty -> Professor).
 * 2. Constructor Chaining: Passing parameters up the hierarchy using Function.prototype.call.
 * 3. Prototypal Delegation: How JavaScript engine resolves methods by walking
 *    up the chain until it finds the definition or hits null.
 * 4. Verification with isPrototypeOf, instanceof, and Object.getPrototypeOf.
 * ==============================================================================
 */

console.log("==============================================================================");
console.log("          ASSIGNMENT 5 - Q6: MULTI-LEVEL PROTOTYPE CHAIN                      ");
console.log("                    Person -> Faculty -> Professor                            ");
console.log("==============================================================================\n");

// ==============================================================================
// TIER 1: BASE CONSTRUCTOR - Person
// ==============================================================================
/**
 * Tier 1: Person Constructor
 * @param {string} name - Name of the person
 * @param {number} age - Age of the person
 */
function Person(name, age) {
    this.name = name;
    this.age = age;
}

// Tier 1 Prototype Method
Person.prototype.introduce = function() {
    console.log(`[Tier 1 - Person.prototype.introduce] -> Hi, I am ${this.name}, ${this.age} years old.`);
};

// ==============================================================================
// TIER 2: INTERMEDIATE CONSTRUCTOR - Faculty
// ==============================================================================
/**
 * Tier 2: Faculty Constructor (inherits from Person)
 * @param {string} name - Name of the faculty member
 * @param {number} age - Age of the faculty member
 * @param {string} department - Faculty department
 * @param {string} employeeId - Unique employee ID
 */
function Faculty(name, age, department, employeeId) {
    // Call Tier 1 constructor
    Person.call(this, name, age);
    this.department = department;
    this.employeeId = employeeId;
}

// Link Faculty prototype to Person prototype
Faculty.prototype = Object.create(Person.prototype);
Faculty.prototype.constructor = Faculty;

// Tier 2 Prototype Method
Faculty.prototype.showDepartment = function() {
    console.log(`[Tier 2 - Faculty.prototype.showDepartment] -> Faculty ID: [${this.employeeId}] | Department: ${this.department}`);
};

// ==============================================================================
// TIER 3: LEAF CONSTRUCTOR - Professor
// ==============================================================================
/**
 * Tier 3: Professor Constructor (inherits from Faculty)
 * @param {string} name - Name of the professor
 * @param {number} age - Age of the professor
 * @param {string} department - Academic department
 * @param {string} employeeId - Unique employee ID
 * @param {string} researchArea - Specialized research domain
 * @param {number} publicationsCount - Number of published academic papers
 */
function Professor(name, age, department, employeeId, researchArea, publicationsCount) {
    // Call Tier 2 constructor (which in turn calls Tier 1)
    Faculty.call(this, name, age, department, employeeId);
    this.researchArea = researchArea;
    this.publicationsCount = publicationsCount;
}

// Link Professor prototype to Faculty prototype
Professor.prototype = Object.create(Faculty.prototype);
Professor.prototype.constructor = Professor;

// Tier 3 Prototype Method
Professor.prototype.conductResearch = function() {
    console.log(`[Tier 3 - Professor.prototype.conductResearch] -> Prof. ${this.name} is leading research in "${this.researchArea}" with ${this.publicationsCount} publications.`);
};

// ==============================================================================
// DEMONSTRATION: Instantiate Professor & Access All Methods Up the Chain
// ==============================================================================
console.log("------------------------------------------------------------------------------");
console.log("CREATING PROFESSOR INSTANCE & EXECUTING METHODS UP THE CHAIN");
console.log("------------------------------------------------------------------------------\n");

const professorAlan = new Professor(
    "Dr. Alan Turing",
    41,
    "Computer Science & Artificial Intelligence",
    "FAC-CS-001",
    "Universal Computing & Cryptanalysis",
    28
);

console.log("Professor Instance Properties:");
console.log(professorAlan);
console.log();

console.log("Calling methods across all 3 tiers of the prototype chain:\n");

// 1. Calling Tier 3 method (defined on Professor.prototype)
console.log("1. Calling Professor's own prototype method:");
professorAlan.conductResearch();

// 2. Calling Tier 2 method (defined on Faculty.prototype)
console.log("2. Calling inherited Faculty prototype method:");
professorAlan.showDepartment();

// 3. Calling Tier 1 method (defined on Person.prototype)
console.log("3. Calling inherited Person prototype method:");
professorAlan.introduce();

console.log("\n------------------------------------------------------------------------------");
console.log("STEP-BY-STEP PROTOTYPE RESOLUTION TRACE");
console.log("------------------------------------------------------------------------------");
console.log(`
When 'professorAlan.introduce()' is called:
  Step 1: Check instance 'professorAlan' -> hasOwnProperty('introduce')? FALSE
  Step 2: Check 'Professor.prototype'    -> hasOwnProperty('introduce')? FALSE
  Step 3: Check 'Faculty.prototype'      -> hasOwnProperty('introduce')? FALSE
  Step 4: Check 'Person.prototype'       -> hasOwnProperty('introduce')? TRUE!
          Found introduce()! Bound 'this' to 'professorAlan' and executed.
`);

// ==============================================================================
// VERIFICATION OF THE CHAIN
// ==============================================================================
console.log("------------------------------------------------------------------------------");
console.log("PROTOTYPE CHAIN HIERARCHY VERIFICATIONS");
console.log("------------------------------------------------------------------------------\n");

// instanceof checks
console.log("Checking instanceof across all levels:");
console.log("  professorAlan instanceof Professor :", professorAlan instanceof Professor);
console.log("  professorAlan instanceof Faculty   :", professorAlan instanceof Faculty);
console.log("  professorAlan instanceof Person    :", professorAlan instanceof Person);
console.log("  professorAlan instanceof Object    :", professorAlan instanceof Object);
console.log();

// isPrototypeOf checks
console.log("Checking isPrototypeOf across prototypes:");
console.log("  Professor.prototype.isPrototypeOf(professorAlan):", Professor.prototype.isPrototypeOf(professorAlan));
console.log("  Faculty.prototype.isPrototypeOf(professorAlan)  :", Faculty.prototype.isPrototypeOf(professorAlan));
console.log("  Person.prototype.isPrototypeOf(professorAlan)   :", Person.prototype.isPrototypeOf(professorAlan));
console.log("  Object.prototype.isPrototypeOf(professorAlan)   :", Object.prototype.isPrototypeOf(professorAlan));
console.log();

// Prototype Chain Inspection
console.log("Exact Prototype Links:");
const pProto = Object.getPrototypeOf(professorAlan);
const fProto = Object.getPrototypeOf(pProto);
const perProto = Object.getPrototypeOf(fProto);
const objProto = Object.getPrototypeOf(perProto);
const nullProto = Object.getPrototypeOf(objProto);

console.log("  professorAlan.__proto__ === Professor.prototype :", pProto === Professor.prototype);
console.log("  Professor.prototype.__proto__ === Faculty.prototype:", fProto === Faculty.prototype);
console.log("  Faculty.prototype.__proto__ === Person.prototype  :", perProto === Person.prototype);
console.log("  Person.prototype.__proto__ === Object.prototype   :", objProto === Object.prototype);
console.log("  Object.prototype.__proto__ === null               :", nullProto === null);
console.log("------------------------------------------------------------------------------\n");
