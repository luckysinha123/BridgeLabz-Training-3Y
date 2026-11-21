"use strict";

/**
 * ==============================================================================
 * ASSIGNMENT 5 - QUESTION 7: Closures & Function Factories (makeMultiplier)
 * ==============================================================================
 * 
 * Problem Statement:
 * Write a function makeMultiplier(multiplier) that returns another function to
 * multiply any number by that multiplier.
 * 
 * Example:
 * const triple = makeMultiplier(3);
 * console.log(triple(5)); // 15
 * 
 * Explain how closure works in this example.
 * 
 * Concepts Demonstrated:
 * 1. Closure: A function bundled together with references to its surrounding
 *    lexical environment (even after outer function has returned).
 * 2. Function Factory: Generating specialized functions configured with private state.
 * 3. Lexical Scoping & Variable Lifetime: How the JavaScript engine keeps the outer
 *    'multiplier' variable alive on the heap instead of garbage collecting it.
 * 4. Separate Closure Environments: Proving different instances retain independent state.
 * ==============================================================================
 */

console.log("==============================================================================");
console.log("         ASSIGNMENT 5 - Q7: CLOSURES & FUNCTION FACTORIES                     ");
console.log("                        makeMultiplier(multiplier)                            ");
console.log("==============================================================================\n");

/**
 * Higher-Order Function Factory.
 * 
 * @param {number} multiplier - The factor to multiply by (captured in closure).
 * @returns {Function} A specialized function accepting a number and returning the product.
 */
function makeMultiplier(multiplier) {
    // The variable 'multiplier' is declared in the lexical scope of makeMultiplier.
    
    return function(number) {
        // This inner function forms a closure over 'multiplier'.
        return number * multiplier;
    };
}

// ==============================================================================
// DEMONSTRATION AS SPECIFIED IN ASSIGNMENT
// ==============================================================================
console.log("------------------------------------------------------------------------------");
console.log("ASSIGNMENT EXAMPLE EXECUTION");
console.log("------------------------------------------------------------------------------\n");

const triple = makeMultiplier(3);
console.log("const triple = makeMultiplier(3);");
console.log("console.log(triple(5)); // Expected: 15");
console.log("Actual Output:", triple(5));
console.log();

// ==============================================================================
// ADDITIONAL MULTIPLIER FACTORY INSTANCES
// ==============================================================================
console.log("------------------------------------------------------------------------------");
console.log("CREATING MULTIPLE INDEPENDENT CLOSURES");
console.log("------------------------------------------------------------------------------\n");

const double = makeMultiplier(2);
const quadruple = makeMultiplier(4);
const tenTimes = makeMultiplier(10);

console.log("Testing with input value = 7:");
console.log("  double(7)    ->", double(7));      // 14
console.log("  triple(7)    ->", triple(7));      // 21
console.log("  quadruple(7) ->", quadruple(7));   // 28
console.log("  tenTimes(7)  ->", tenTimes(7));    // 70
console.log();

// ==============================================================================
// DETAILED TECHNICAL EXPLANATION: HOW CLOSURE WORKS HERE
// ==============================================================================
console.log("------------------------------------------------------------------------------");
console.log("DETAILED TECHNICAL EXPLANATION: HOW CLOSURE WORKS IN THIS EXAMPLE");
console.log("------------------------------------------------------------------------------");
console.log(`
1. What is a Closure?
   A closure is the combination of a function bundled together (enclosed) with references
   to its lexical environment (its surrounding state). In JavaScript, every inner function
   maintains access to variables declared in its outer enclosing function.

2. Execution Lifecycle Step-by-Step:

   Step A: Execution of makeMultiplier(3)
   - When 'makeMultiplier(3)' is called, a new execution context is created on the call stack.
   - The parameter 'multiplier' is assigned the value 3 within this execution context's
     lexical environment record.
   - The outer function returns the inner anonymous function 'function(number) { return number * multiplier; }'.
   - 'makeMultiplier(3)' completes, and its execution context is popped off the Call Stack.

   Step B: Preservation of Lexical Scope (The Closure)
   - In languages without closures, local variables are destroyed when their function returns.
   - However, in JavaScript, because the returned inner function still holds a reference
     to 'multiplier', JavaScript's garbage collector does NOT destroy the lexical environment.
   - Instead, the environment containing 'multiplier = 3' is preserved on the Heap memory.
   - The returned function and this preserved environment together form a CLOSURE.

   Step C: Invocation of triple(5)
   - When 'triple(5)' is later executed, its own execution context is created with 'number = 5'.
   - The JavaScript engine encounters the expression 'number * multiplier'.
   - It finds 'number' (5) in its local scope.
   - It searches for 'multiplier' locally, doesn't find it, and looks up the SCOPE CHAIN.
   - It reaches the outer lexical environment preserved in the closure and finds 'multiplier = 3'.
   - It calculates 5 * 3 = 15 and returns the result!

3. Independence of Closure Environments:
   Each call to 'makeMultiplier' creates a brand-new, isolated lexical environment:
   - 'double' holds a closure where multiplier = 2.
   - 'triple' holds a closure where multiplier = 3.
   - Neither closure interferes with the other. This provides powerful data encapsulation.
`);

console.log("------------------------------------------------------------------------------");
console.log("CLOSURE INDEPENDENCE VERIFICATION");
console.log("------------------------------------------------------------------------------");
console.log("triple(10) =", triple(10), "(using multiplier = 3)");
console.log("double(10) =", double(10), "(using multiplier = 2)");
console.log("tenTimes(10) =", tenTimes(10), "(using multiplier = 10)");
console.log("------------------------------------------------------------------------------\n");
