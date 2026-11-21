"use strict";

/**
 * ==============================================================================
 * ASSIGNMENT 5 - QUESTION 3: 'this' Context in Arrow vs Normal Functions
 * ==============================================================================
 * 
 * Problem Statement:
 * Create an object user with:
 * ● a property name
 * ● a method showName written as an arrow function
 * Log the output and explain why this.name is undefined.
 * Then fix it by using a normal function.
 * 
 * Concepts Demonstrated:
 * 1. Lexical 'this' Binding: Arrow functions do NOT have their own 'this'.
 *    They capture 'this' from their enclosing lexical context at definition time.
 * 2. Object Literals Do Not Create Scope: An object literal {...} does NOT
 *    create a new execution context or lexical 'this' boundary.
 * 3. Dynamic 'this' Binding: Normal functions determine 'this' dynamically
 *    based on how and by whom the function is called (the call-site object).
 * ==============================================================================
 */

console.log("==============================================================================");
console.log("     ASSIGNMENT 5 - Q3: 'this' CONTEXT IN ARROW VS NORMAL FUNCTIONS          ");
console.log("==============================================================================\n");

// ==============================================================================
// PART 1: The Problematic Implementation (Arrow Function)
// ==============================================================================
console.log("------------------------------------------------------------------------------");
console.log("PART 1: OBJECT METHOD WRITTEN AS AN ARROW FUNCTION");
console.log("------------------------------------------------------------------------------\n");

const userWithArrow = {
    name: "Lucky Sharma",
    // Arrow function method
    showName: () => {
        console.log("Inside userWithArrow.showName():");
        console.log("  this value is       :", this);
        console.log("  this.name evaluates to:", this ? this.name : undefined);
    }
};

console.log("Calling userWithArrow.showName():");
userWithArrow.showName();

// ==============================================================================
// PART 2: In-Depth Explanation: Why is this.name undefined?
// ==============================================================================
console.log("\n------------------------------------------------------------------------------");
console.log("DETAILED TECHNICAL EXPLANATION: WHY IS this.name UNDEFINED?");
console.log("------------------------------------------------------------------------------");
console.log(`
1. Lexical 'this' Resolution:
   Unlike traditional JavaScript functions, arrow functions do NOT bind their own 'this'.
   Instead, they retain the 'this' value of the enclosing lexical execution context at the
   exact place where they were created.

2. Object Literals Are Not Scopes:
   The curly braces of an object literal ({ name: "...", showName: () => ... }) define an
   object value, NOT a code block or execution context. Therefore, the enclosing scope of
   the arrow function is NOT the 'userWithArrow' object, but the outer module/global scope.

3. Node.js vs Browser Environment:
   - In Node.js (CommonJS modules with strict mode):
     The top-level 'this' refers to 'module.exports' (an empty object: {}).
     Since module.exports does not have a property called 'name',
     'this.name' evaluates to 'undefined'.
   - In Browser environments:
     The top-level 'this' refers to 'window'. Unless window.name was explicitly
     assigned elsewhere, 'window.name' is "" or undefined.

4. Call-site Irrelevance for Arrow Functions:
   Even though we invoke 'userWithArrow.showName()', the object preceding the dot
   ('userWithArrow') is completely ignored by arrow functions.
`);

// ==============================================================================
// PART 3: The Solution (Fixing with Normal Functions)
// ==============================================================================
console.log("------------------------------------------------------------------------------");
console.log("PART 3: FIXING THE ISSUE USING A NORMAL FUNCTION");
console.log("------------------------------------------------------------------------------\n");

// Method A: ES5 Standard Function Expression
const userWithNormalFunc = {
    name: "Lucky Sharma",
    showName: function() {
        console.log("Inside userWithNormalFunc.showName():");
        console.log("  'this' points to      :", this);
        console.log("  'this.name' resolves to:", this.name);
    }
};

console.log("Calling userWithNormalFunc.showName() [Standard Function Expression]:");
userWithNormalFunc.showName();
console.log();

// Method B: ES6 Method Shorthand Syntax (Recommended Clean Modern Style)
const userWithMethodShorthand = {
    name: "Lucky Sharma",
    showName() {
        console.log("Inside userWithMethodShorthand.showName():");
        console.log("  'this' points to      :", this);
        console.log("  'this.name' resolves to:", this.name);
    }
};

console.log("Calling userWithMethodShorthand.showName() [ES6 Method Shorthand]:");
userWithMethodShorthand.showName();
console.log();

// ==============================================================================
// PART 4: Summary Comparison Table
// ==============================================================================
console.log("------------------------------------------------------------------------------");
console.log("SUMMARY: NORMAL FUNCTION VS ARROW FUNCTION IN OBJECT METHODS");
console.log("------------------------------------------------------------------------------");
console.log(`
┌──────────────────────┬────────────────────────────┬────────────────────────────┐
│ Feature              │ Normal Function / Shorthand│ Arrow Function             │
├──────────────────────┼────────────────────────────┼────────────────────────────┤
│ 'this' Binding       │ Dynamic (determined at     │ Lexical (inherited from    │
│                      │ call-site by caller)       │ enclosing outer scope)     │
├──────────────────────┼────────────────────────────┼────────────────────────────┤
│ Object Method Suit.  │ Perfect (this = the object)│ Unsuitable for object      │
│                      │                            │ methods accessing instance │
├──────────────────────┼────────────────────────────┼────────────────────────────┤
│ Constructor (new)    │ Supported                  │ TypeError (not constructable│
├──────────────────────┼────────────────────────────┼────────────────────────────┤
│ 'arguments' object   │ Available                  │ Inherited from outer scope │
└──────────────────────┴────────────────────────────┴────────────────────────────┘
`);
