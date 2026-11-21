"use strict";

/**
 * ==============================================================================
 * ASSIGNMENT 5 - QUESTION 9: ES6 Class Inheritance (Person -> Student)
 * ==============================================================================
 * 
 * Problem Statement:
 * Rewrite your Person → Student inheritance example using ES6 classes with
 * extends and super().
 * Show that both class and prototype versions behave the same.
 * 
 * Concepts Demonstrated:
 * 1. ES6 Class Syntax: Cleaner, class-based syntactic sugar over prototype inheritance.
 * 2. 'extends' Keyword: Sets up prototype chaining between child and parent classes.
 * 3. 'super()' Keyword: Calls the parent constructor and initializes 'this'.
 * 4. Equivalence with ES5 Prototype Model: Proving that under the hood,
 *    ES6 classes and ES5 constructor functions establish identical prototype chains.
 * ==============================================================================
 */

console.log("==============================================================================");
console.log("     ASSIGNMENT 5 - Q9: ES6 CLASS INHERITANCE (Person -> Student)             ");
console.log("==============================================================================\n");

// ==============================================================================
// PART 1: ES6 CLASS IMPLEMENTATION
// ==============================================================================
console.log("------------------------------------------------------------------------------");
console.log("PART 1: ES6 CLASS IMPLEMENTATION (extends & super)");
console.log("------------------------------------------------------------------------------\n");

/**
 * Base Person class using modern ES6 syntax.
 */
class PersonClass {
    /**
     * @param {string} name - Name of the person
     */
    constructor(name) {
        this.name = name;
    }

    /**
     * Method defined on PersonClass.prototype
     */
    printName() {
        console.log(`[ES6 PersonClass.printName] -> Name: "${this.name}"`);
    }
}

/**
 * Derived Student class inheriting from PersonClass using 'extends'.
 */
class StudentClass extends PersonClass {
    /**
     * @param {string} name - Inherited name
     * @param {string} branch - Student branch
     */
    constructor(name, branch) {
        // super(name) calls PersonClass's constructor to initialize this.name
        super(name);
        this.branch = branch;
    }

    /**
     * Method defined on StudentClass.prototype
     */
    printBranch() {
        console.log(`[ES6 StudentClass.printBranch] -> Branch: "${this.branch}"`);
    }

    /**
     * Composite method
     */
    printStudentSummary() {
        console.log(`[ES6 StudentClass.printStudentSummary] -> ${this.name} (${this.branch})`);
    }
}

// Instantiate ES6 Student
const studentES6 = new StudentClass("Rohan Gupta", "Information Technology");

console.log("ES6 Student Instance Object:", studentES6);
console.log("Calling ES6 methods:");
studentES6.printName();            // Inherited from PersonClass
studentES6.printBranch();          // From StudentClass
studentES6.printStudentSummary();  // Composite method
console.log();

// ==============================================================================
// PART 2: ES5 PROTOTYPE IMPLEMENTATION (FROM Q5)
// ==============================================================================
console.log("------------------------------------------------------------------------------");
console.log("PART 2: ES5 PROTOTYPE-BASED IMPLEMENTATION (FOR DIRECT COMPARISON)");
console.log("------------------------------------------------------------------------------\n");

function PersonProto(name) {
    this.name = name;
}

PersonProto.prototype.printName = function() {
    console.log(`[ES5 PersonProto.printName] -> Name: "${this.name}"`);
};

function StudentProto(name, branch) {
    PersonProto.call(this, name); // Constructor stealing
    this.branch = branch;
}

// Setup prototype chain
StudentProto.prototype = Object.create(PersonProto.prototype);
StudentProto.prototype.constructor = StudentProto;

StudentProto.prototype.printBranch = function() {
    console.log(`[ES5 StudentProto.printBranch] -> Branch: "${this.branch}"`);
};

StudentProto.prototype.printStudentSummary = function() {
    console.log(`[ES5 StudentProto.printStudentSummary] -> ${this.name} (${this.branch})`);
};

// Instantiate ES5 Student
const studentES5 = new StudentProto("Rohan Gupta", "Information Technology");

console.log("ES5 Student Instance Object:", studentES5);
console.log("Calling ES5 methods:");
studentES5.printName();            // Inherited from PersonProto
studentES5.printBranch();          // From StudentProto
studentES5.printStudentSummary();  // Composite method
console.log();

// ==============================================================================
// PART 3: PROVING BOTH VERSIONS BEHAVE IDENTICALLY UNDER THE HOOD
// ==============================================================================
console.log("------------------------------------------------------------------------------");
console.log("PART 3: RIGOROUS PROOF OF IDENTICAL UNDER-THE-HOOD ARCHITECTURE");
console.log("------------------------------------------------------------------------------\n");

// 1. Prototype Chain Equivalence Check
console.log("1. Prototype Chain Hierarchy Comparison:");
const es6Proto1 = Object.getPrototypeOf(studentES6);
const es6Proto2 = Object.getPrototypeOf(es6Proto1);
const es6Proto3 = Object.getPrototypeOf(es6Proto2);

const es5Proto1 = Object.getPrototypeOf(studentES5);
const es5Proto2 = Object.getPrototypeOf(es5Proto1);
const es5Proto3 = Object.getPrototypeOf(es5Proto2);

console.log("  ES6 Instance Prototype === StudentClass.prototype :", es6Proto1 === StudentClass.prototype);
console.log("  ES5 Instance Prototype === StudentProto.prototype :", es5Proto1 === StudentProto.prototype);
console.log("  ES6 Student.prototype.__proto__ === PersonClass.prototype:", es6Proto2 === PersonClass.prototype);
console.log("  ES5 Student.prototype.__proto__ === PersonProto.prototype:", es5Proto2 === PersonProto.prototype);
console.log("  ES6 Parent.prototype.__proto__ === Object.prototype      :", es6Proto3 === Object.prototype);
console.log("  ES5 Parent.prototype.__proto__ === Object.prototype      :", es5Proto3 === Object.prototype);
console.log();

// 2. instanceof Operator Equivalence
console.log("2. 'instanceof' Evaluation Comparison:");
console.log("  ES6: studentES6 instanceof StudentClass :", studentES6 instanceof StudentClass);
console.log("  ES5: studentES5 instanceof StudentProto :", studentES5 instanceof StudentProto);
console.log("  ES6: studentES6 instanceof PersonClass  :", studentES6 instanceof PersonClass);
console.log("  ES5: studentES5 instanceof PersonProto  :", studentES5 instanceof PersonProto);
console.log("  ES6: studentES6 instanceof Object       :", studentES6 instanceof Object);
console.log("  ES5: studentES5 instanceof Object       :", studentES5 instanceof Object);
console.log();

// 3. Property Ownership Equivalence
console.log("3. Property Ownership (hasOwnProperty):");
console.log("  ES6 hasOwnProperty('name')   :", studentES6.hasOwnProperty("name"));
console.log("  ES5 hasOwnProperty('name')   :", studentES5.hasOwnProperty("name"));
console.log("  ES6 hasOwnProperty('branch') :", studentES6.hasOwnProperty("branch"));
console.log("  ES5 hasOwnProperty('branch') :", studentES5.hasOwnProperty("branch"));
console.log("  ES6 hasOwnProperty('printName')  :", studentES6.hasOwnProperty("printName"), "(Inherited via prototype)");
console.log("  ES5 hasOwnProperty('printName')  :", studentES5.hasOwnProperty("printName"), "(Inherited via prototype)");
console.log();

// ==============================================================================
// PART 4: SUMMARY TABLE & KEY DIFFERENCES
// ==============================================================================
console.log("------------------------------------------------------------------------------");
console.log("ES6 CLASSES VS ES5 CONSTRUCTORS: KEY DIFFERENCES");
console.log("------------------------------------------------------------------------------");
console.log(`
┌───────────────────────────┬───────────────────────────┬───────────────────────────┐
│ Feature                   │ ES6 Classes               │ ES5 Prototypes            │
├───────────────────────────┼───────────────────────────┼───────────────────────────┤
│ Syntax                    │ class & extends keywords  │ Constructor + Object.create│
├───────────────────────────┼───────────────────────────┼───────────────────────────┤
│ Underlying Model          │ Prototypal Inheritance    │ Prototypal Inheritance    │
├───────────────────────────┼───────────────────────────┼───────────────────────────┤
│ Call without 'new'        │ TypeError (Enforced)      │ Allowed (Pollutes global  │
│                           │                           │ unless guarded)           │
├───────────────────────────┼───────────────────────────┼───────────────────────────┤
│ Method Enumerability      │ Non-enumerable by default │ Enumerable by default     │
├───────────────────────────┼───────────────────────────┼───────────────────────────┤
│ Strict Mode               │ Always executes in strict │ Requires "use strict";    │
│                           │ mode automatically        │ manual declaration        │
├───────────────────────────┼───────────────────────────┼───────────────────────────┤
│ Constructor Inheritance   │ super(args)               │ Parent.call(this, args)   │
└───────────────────────────┴───────────────────────────┴───────────────────────────┘

Conclusion:
ES6 classes are syntactical sugar over JavaScript's existing prototype-based inheritance.
They offer clearer, more robust syntax while compiling to the exact same prototype chain!
`);
console.log("------------------------------------------------------------------------------\n");
