"use strict";

/**
 * ==============================================================================
 * ASSIGNMENT 5 - QUESTION 4: Constructor Functions & Prototype Method Sharing
 * ==============================================================================
 * 
 * Problem Statement:
 * Create a constructor function Car(brand, model). Add a prototype method
 * getDetails() that prints car brand and model. Create two car objects and call
 * this method to show method sharing via prototype.
 * 
 * Concepts Demonstrated:
 * 1. Constructor Functions: Blueprint functions invoked with the 'new' operator.
 * 2. The 'prototype' Property: Every function has a prototype property used to
 *    share properties and methods across all instances.
 * 3. Memory Optimization via Prototype: Methods defined on the prototype exist
 *    once in memory, avoiding redundant function copies per instance.
 * 4. Reference Equality: Proving car1.getDetails === car2.getDetails.
 * ==============================================================================
 */

console.log("==============================================================================");
console.log("   ASSIGNMENT 5 - Q4: CONSTRUCTOR FUNCTIONS & PROTOTYPE METHOD SHARING        ");
console.log("==============================================================================\n");

/**
 * Constructor function for Car objects.
 * Sets instance-specific state on 'this'.
 * 
 * @param {string} brand - Brand or manufacturer of the car.
 * @param {string} model - Model name of the car.
 */
function Car(brand, model) {
    // Instance-specific properties (unique for each car)
    this.brand = brand;
    this.model = model;
}

/**
 * Prototype method getDetails() added to Car.prototype.
 * All Car instances share this single function reference.
 */
Car.prototype.getDetails = function() {
    return `Car Details -> Brand: ${this.brand}, Model: ${this.model}`;
};

// ------------------------------------------------------------------------------
// Creating two distinct car instances
// ------------------------------------------------------------------------------
console.log("------------------------------------------------------------------------------");
console.log("CREATING CAR INSTANCES");
console.log("------------------------------------------------------------------------------");

const car1 = new Car("Toyota", "Supra MK4");
const car2 = new Car("BMW", "M4 Competition");

console.log("Car 1 Object:", car1);
console.log("Car 2 Object:", car2);
console.log();

// ------------------------------------------------------------------------------
// Invoking getDetails() on both instances
// ------------------------------------------------------------------------------
console.log("------------------------------------------------------------------------------");
console.log("INVOKING PROTOTYPE METHOD getDetails()");
console.log("------------------------------------------------------------------------------");
console.log("car1.getDetails():", car1.getDetails());
console.log("car2.getDetails():", car2.getDetails());
console.log();

// ------------------------------------------------------------------------------
// Demonstrating Method Sharing via Prototype (Proof of Memory Efficiency)
// ------------------------------------------------------------------------------
console.log("------------------------------------------------------------------------------");
console.log("PROOF OF PROTOTYPE METHOD SHARING IN MEMORY");
console.log("------------------------------------------------------------------------------");

// Check 1: Reference Equality
const isMethodShared = car1.getDetails === car2.getDetails;
console.log("Are car1.getDetails and car2.getDetails the EXACT same function reference?");
console.log(`  car1.getDetails === car2.getDetails: ${isMethodShared} (SHARED IN MEMORY!)`);
console.log();

// Check 2: Prototype Linkage Check
console.log("Checking prototype relationships:");
console.log("  Object.getPrototypeOf(car1) === Car.prototype:", Object.getPrototypeOf(car1) === Car.prototype);
console.log("  Object.getPrototypeOf(car2) === Car.prototype:", Object.getPrototypeOf(car2) === Car.prototype);
console.log();

// Check 3: Own Properties vs Prototype Properties
console.log("Checking property ownership (hasOwnProperty):");
console.log("  car1.hasOwnProperty('brand')     :", car1.hasOwnProperty("brand"), "(Own property)");
console.log("  car1.hasOwnProperty('model')     :", car1.hasOwnProperty("model"), "(Own property)");
console.log("  car1.hasOwnProperty('getDetails'):", car1.hasOwnProperty("getDetails"), "(NOT own property; resolved via prototype!)");
console.log("  Car.prototype.hasOwnProperty('getDetails'):", Car.prototype.hasOwnProperty("getDetails"), "(Stored on Car.prototype!)");
console.log();

// ------------------------------------------------------------------------------
// Contrast: What happens if methods are placed INSIDE the constructor?
// ------------------------------------------------------------------------------
console.log("------------------------------------------------------------------------------");
console.log("COMPARISON: INSIDE CONSTRUCTOR VS ON PROTOTYPE");
console.log("------------------------------------------------------------------------------");

function InefficientCar(brand, model) {
    this.brand = brand;
    this.model = model;
    // Anti-pattern: Creates a new function object on every instantiation
    this.getDetails = function() {
        return `${this.brand} ${this.model}`;
    };
}

const badCar1 = new InefficientCar("Ford", "Mustang");
const badCar2 = new InefficientCar("Audi", "RS6");

console.log("Method inside constructor reference equality:");
console.log("  badCar1.getDetails === badCar2.getDetails:", badCar1.getDetails === badCar2.getDetails);
console.log("  Explanation: 'false' means two separate copies of the function exist in memory.");
console.log("  If 10,000 cars are created, 10,000 duplicate functions are allocated.");
console.log("  With Car.prototype.getDetails, exactly 1 function exists regardless of instance count!");
console.log("------------------------------------------------------------------------------\n");
