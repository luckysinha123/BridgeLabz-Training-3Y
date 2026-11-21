# ASSIGNMENT 5 - CORE JAVASCRIPT (ES6+)
## BridgeLabz Training - 3rd Year Full Stack Curriculum

---

### Overview
This folder contains the complete, verified solutions for **Assignment 5** focusing on **Callbacks, Higher-Order Functions, `this` Context Resolution, Constructor Functions, Prototypes, Prototypal Inheritance, Multi-Level Chains, Closures, and ES6 Class Equivalents**.

All programs are implemented strictly using **Core JavaScript (ES6+)**, free of any external libraries or frameworks, adhering to `"use strict";` standards, descriptive variable naming, thorough inline documentation, and comprehensive console logs.

---

### File Index & Question Mapping

| File Name | Question | Key Concepts Covered |
| :--- | :--- | :--- |
| [`Q1_Callback_Greeting.js`](./Q1_Callback_Greeting.js) | **Q1** | Higher-Order Functions, Callbacks, Synchronous Execution Flow |
| [`Q2_Apply_Operation.js`](./Q2_Apply_Operation.js) | **Q2** | Custom Higher-Order Array Mapper, Pure Functions, Immutability |
| [`Q3_Arrow_vs_Normal_Function_This.js`](./Q3_Arrow_vs_Normal_Function_This.js) | **Q3** | Lexical `this` vs Dynamic `this`, Object Literal Scope, Method Shorthand |
| [`Q4_Car_Constructor_Prototype.js`](./Q4_Car_Constructor_Prototype.js) | **Q4** | Constructor Functions, Prototype Method Sharing, Memory Optimization |
| [`Q5_Person_Student_Inheritance.js`](./Q5_Person_Student_Inheritance.js) | **Q5** | Prototypal Inheritance (`Object.create`), Constructor Stealing (`call`), `instanceof` |
| [`Q6_MultiLevel_Prototype_Chain.js`](./Q6_MultiLevel_Prototype_Chain.js) | **Q6** | 3-Tier Hierarchy (`Person → Faculty → Professor`), Prototype Chain Traversal |
| [`Q7_Make_Multiplier_Closure.js`](./Q7_Make_Multiplier_Closure.js) | **Q7** | Closures, Lexical Environment Heap Retention, Function Factories |
| [`Q8_Custom_Array_Map_Prototype.js`](./Q8_Custom_Array_Map_Prototype.js) | **Q8** | Polyfilling `Array.prototype.myMap`, Sparse Array Handling, `thisArg` Binding |
| [`Q9_ES6_Class_Inheritance.js`](./Q9_ES6_Class_Inheritance.js) | **Q9** | ES6 Classes (`extends`, `super()`), Syntactic Sugar Proof & Parity with ES5 |

---

### Detailed Question Summaries & Solutions

#### Q 1. Callback Greeting Flow (`Q1_Callback_Greeting.js`)
- **Objective**: Implement `greetUser(name, callback)` which outputs `"Hello <name>"` and triggers `showEndMessage()` printing `"Welcome to the course!"`.
- **Key Mechanics**:
  - Highlights synchronous flow where control transitions from the caller to `greetUser` and then delegates to the callback.
  - Implements defensive type-checking (`typeof callback === "function"`).
  - Demonstrates flexibility by invoking both named and inline arrow callbacks.

#### Q 2. Higher-Order `applyOperation` (`Q2_Apply_Operation.js`)
- **Objective**: Implement `applyOperation(numbers, operation)` taking an array and a transformation callback to:
  - Double each number in `[1, 2, 3, 4]` $\rightarrow$ `[2, 4, 6, 8]`
  - Square each number in `[1, 2, 3, 4]` $\rightarrow$ `[1, 4, 9, 16]`
- **Key Mechanics**:
  - Pure function design: preserves immutability of the source array.
  - Supplies `(element, index, array)` to the callback.
  - Demonstrates named functions as well as arrow functions.

#### Q 3. `this` Binding: Arrow vs Normal Function (`Q3_Arrow_vs_Normal_Function_This.js`)
- **Objective**: Create `user` with property `name` and arrow method `showName`. Explain why `this.name` is `undefined`, and fix it with a normal function.
- **Why `this.name` is undefined**:
  - Arrow functions do **not** have their own `this` binding; they capture `this` lexically from their enclosing context at definition time.
  - Object literals `{ ... }` do not create a scope for `this`.
  - In Node.js CommonJS modules, the enclosing lexical `this` is `module.exports` (`{}`). Since `{}` lacks `name`, `this.name` is `undefined`.
- **Fix**:
  - Use a normal function (or ES6 method shorthand `showName() { ... }`). Normal functions dynamically bind `this` to the object calling the method (`user`).

#### Q 4. Constructor Function & Prototype Sharing (`Q4_Car_Constructor_Prototype.js`)
- **Objective**: Create `Car(brand, model)` with prototype method `getDetails()`. Demonstrate method sharing across two car instances.
- **Key Mechanics**:
  - Proves `car1.getDetails === car2.getDetails` is `true` (shared in memory).
  - Contrasts with defining methods inside the constructor (which duplicates the function per instance, wasting memory).
  - Verifies `hasOwnProperty` differences between own properties (`brand`, `model`) and prototype properties (`getDetails`).

#### Q 5. Prototypal Inheritance: Person $\rightarrow$ Student (`Q5_Person_Student_Inheritance.js`)
- **Objective**: Create `Person(name)` and `Student(name, branch)` where `Student` inherits from `Person` via prototype.
- **Key Mechanics**:
  - Uses `Person.call(this, name)` to initialize parent properties (constructor stealing).
  - Uses `Student.prototype = Object.create(Person.prototype)` to link prototypes.
  - Corrects constructor reference: `Student.prototype.constructor = Student`.
  - Verifies prototype chain lookup: `student.printName()` resolves on `Person.prototype`.

#### Q 6. Multi-Level Prototype Chain (`Q6_MultiLevel_Prototype_Chain.js`)
- **Objective**: Build a 3-tier prototype chain: `Person → Faculty → Professor`.
- **Key Mechanics**:
  - Tier 1: `Person(name, age)` $\rightarrow$ `introduce()`
  - Tier 2: `Faculty(name, age, department, employeeId)` $\rightarrow$ `showDepartment()`
  - Tier 3: `Professor(name, age, department, employeeId, researchArea, publicationsCount)` $\rightarrow$ `conductResearch()`
  - Demonstrates a `Professor` instance accessing methods across all three prototype levels.
  - Verifies prototype links via `instanceof`, `isPrototypeOf`, and `Object.getPrototypeOf`.

#### Q 7. Closures & Function Factory (`Q7_Make_Multiplier_Closure.js`)
- **Objective**: Implement `makeMultiplier(multiplier)` returning a multiplier function. Example: `const triple = makeMultiplier(3); triple(5); // 15`. Explain how closure works.
- **How Closure Works**:
  - When `makeMultiplier(3)` runs, its execution context contains `multiplier = 3`.
  - Even after `makeMultiplier` finishes executing and returns the inner function, JavaScript preserves the lexical scope on the Heap because the returned function references `multiplier`.
  - When `triple(5)` is later called, it resolves `multiplier` via its scope chain from the preserved closure environment, computing $5 \times 3 = 15$.
  - Independent instances (`double`, `triple`, `tenTimes`) maintain distinct, isolated closure environments.

#### Q 8. Custom `Array.prototype.myMap` (`Q8_Custom_Array_Map_Prototype.js`)
- **Objective**: Add `myMap()` to `Array.prototype` that replicates the built-in `map()`.
- **Key Mechanics**:
  - Full ECMAScript compliance: passes `(currentValue, index, array)` to the callback.
  - Supports optional `thisArg` context argument (`callback.call(thisArg, ...)`).
  - Handles sparse arrays (preserving empty holes via `index in originalArray`).
  - Strict error handling (throws `TypeError` on invalid callbacks or null `this`).
  - Tested against native `Array.prototype.map` proving identical output.

#### Q 9. ES6 Class Inheritance (`Q9_ES6_Class_Inheritance.js`)
- **Objective**: Rewrite the `Person → Student` inheritance example using modern ES6 `class`, `extends`, and `super()`. Show both versions behave identically under the hood.
- **Key Mechanics**:
  - Compares ES6 syntax (`class Student extends Person`) side-by-side with ES5 prototype inheritance.
  - Verifies prototype chain equivalence:
    `studentES6.__proto__ === StudentClass.prototype`
    `StudentClass.prototype.__proto__ === PersonClass.prototype`
  - Explains that ES6 classes are syntactic sugar over prototypal inheritance, adding strict mode enforcement, mandatory `new` keyword, and non-enumerable methods.

---

### How to Run the Files

You can run any question file individually using Node.js from the command line:

```bash
# Navigate to Assignment 5 folder:
cd "d:\College #3rd year\Full Stack\BridgeLabz-Training-3Y\Java  Script\Assignment 5"

# Run individual questions:
node Q1_Callback_Greeting.js
node Q2_Apply_Operation.js
node Q3_Arrow_vs_Normal_Function_This.js
node Q4_Car_Constructor_Prototype.js
node Q5_Person_Student_Inheritance.js
node Q6_MultiLevel_Prototype_Chain.js
node Q7_Make_Multiplier_Closure.js
node Q8_Custom_Array_Map_Prototype.js
node Q9_ES6_Class_Inheritance.js
```
