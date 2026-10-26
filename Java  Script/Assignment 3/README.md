# JavaScript Assignment 3: Hoisting, Strict Mode, Error Handling & Debugging

**Course:** Full Stack Web Development (3rd Year)  
**Location:** `d:\College #3rd year\Full Stack\Java  Script\Assignment 3`  
**Execution Environment:** Node.js (v18+) or Modern Browser DevTools  

---

## 📋 General Instructions Followed

- ✅ **Separate `.js` files:** Each question is implemented in its own modular `.js` file with dedicated test cases.
- ✅ **`"use strict"` enforced:** Applied at the top of all scripts to guarantee strict scope resolution and prevent implicit globals.
- ✅ **In-depth comments:** Comprehensive commentary covering hoisting effects, creation vs. execution phases, Temporal Dead Zone (TDZ), and call stack diagnostics.
- ✅ **Zero external dependencies:** Pure vanilla JavaScript adhering to modern ECMAScript standards.
- ✅ **Visible console reporting:** Formatted ASCII tables, borders, and structured `console.log()` streams.
- ✅ **Consolidated Master Script:** `Assignment3.js` is provided to run all 10 modules seamlessly in sequence.

---

## 📁 File Structure & Mapping

| File | Question & Title | Core Concepts |
| :--- | :--- | :--- |
| [`Q1_Dynamic_Data_Parser.js`](file:///d:/College%20%233rd%20year/Full%20Stack/Java%20%20Script/Assignment%203/Q1_Dynamic_Data_Parser.js) | Q1 – Dynamic Data Parser | Type coercion (`Number`, `Boolean`, `String`), whitespace parsing, categorization |
| [`Q2_Employee_Bonus_Calculator.js`](file:///d:/College%20%233rd%20year/Full%20Stack/Java%20%20Script/Assignment%203/Q2_Employee_Bonus_Calculator.js) | Q2 – Employee Bonus Calculator | Strict mode validation, type conversion, template literals, `try...catch` |
| [`Q3_Transaction_Validator.js`](file:///d:/College%20%233rd%20year/Full%20Stack/Java%20%20Script/Assignment%203/Q3_Transaction_Validator.js) | Q3 – Transaction Validator | Custom Error classes (`NullTransactionError`, etc.), error categorization, breakpoints |
| [`Q4_Debugging_Mystery.js`](file:///d:/College%20%233rd%20year/Full%20Stack/Java%20%20Script/Assignment%203/Q4_Debugging_Mystery.js) | Q4 – Debugging Mystery | Undeclared variable `ReferenceError`, scope rules, call stack & watch variables |
| [`Q5_Hoisting_Sequence_Trap.js`](file:///d:/College%20%233rd%20year/Full%20Stack/Java%20%20Script/Assignment%203/Q5_Hoisting_Sequence_Trap.js) | Q5 – Hoisting Lab: The Sequence Trap | Creation phase vs execution phase, TDZ, function declarations vs arrow functions |
| [`Q6_Pyramid_Pattern_Generator.js`](file:///d:/College%20%233rd%20year/Full%20Stack/Java%20%20Script/Assignment%203/Q6_Pyramid_Pattern_Generator.js) | Q6 – Pyramid Pattern Generator | Nested loops, `var` scope leakage vs `let` block scoping, collision bug, strict mode loop checks |
| [`Q7_Smart_Calculator.js`](file:///d:/College%20%233rd%20year/Full%20Stack/Java%20%20Script/Assignment%203/Q7_Smart_Calculator.js) | Q7 – Smart Calculator | `switch...case`, `DivisionByZeroError`, `NegativeRootError`, `InvalidOperationError` |
| [`Q8_Strict_Mode_Showdown.js`](file:///d:/College%20%233rd%20year/Full%20Stack/Java%20%20Script/Assignment%203/Q8_Strict_Mode_Showdown.js) | Q8 – Strict Mode Showdown | Non-strict vs strict comparison, duplicate params, deleting identifiers, ES6 refactor |
| [`Q9_JSON_Audit.js`](file:///d:/College%20%233rd%20year/Full%20Stack/Java%20%20Script/Assignment%203/Q9_JSON_Audit.js) | Q9 – JSON Audit | `JSON.parse` exception handling, line-number logging, schema validation, age filtering |
| [`Q10_Nested_Hoisting_and_Closures.js`](file:///d:/College%20%233rd%20year/Full%20Stack/Java%20%20Script/Assignment%203/Q10_Nested_Hoisting_and_Closures.js) | Q10 – Nested Hoisting & Closures | Nested execution contexts, variable shadowing, arrow closures, call stack trace |
| [`Assignment3.js`](file:///d:/College%20%233rd%20year/Full%20Stack/Java%20%20Script/Assignment%203/Assignment3.js) | Consolidated Master Runner | Sequential batch runner executing all questions with section headers |

---

## 🚀 How to Run

### Run All Questions Together:
```bash
node Assignment3.js
```

### Run Any Specific Question File:
```bash
node Q1_Dynamic_Data_Parser.js
node Q2_Employee_Bonus_Calculator.js
node Q3_Transaction_Validator.js
node Q4_Debugging_Mystery.js
node Q5_Hoisting_Sequence_Trap.js
node Q6_Pyramid_Pattern_Generator.js
node Q7_Smart_Calculator.js
node Q8_Strict_Mode_Showdown.js
node Q9_JSON_Audit.js
node Q10_Nested_Hoisting_and_Closures.js
```

---

## 🔍 Detailed Question Summaries

### Q1 – Dynamic Data Parser
- **Input:** `["25", "true", "false", "NaN", " ", "100px", "3.14", null, undefined]`
- **Conversions Handled:**
  - `String(val)`: Direct string representation.
  - `Boolean(val)`: Demonstrates that `"false"` is truthy (non-empty string).
  - `Number(val)`: Sanitizes whitespace (`" "` coerces to `0` in raw JS, but is flagged as invalid numeric data) and nulls.
- **Categorization:** Separates into `validNumericData` (`25`, `3.14`) and `invalidNumericData` (`"true"`, `"false"`, `"NaN"`, `" "`, `"100px"`, `null`, `undefined`) with detailed diagnostic reasons.

### Q2 – Employee Bonus Calculator
- **Logic:**
  - Converts string salary and service years into numbers.
  - Bonus rate: $10\%$ if `years > 3`, else $5\%$.
  - Total compensation = $\text{baseSalary} + \text{bonus}$.
- **Validation:** Uses `"use strict"` to guard against accidental globals, verifies property presence, and catches invalid numeric strings via `try...catch`.

### Q3 – Transaction Validator
- **Custom Errors:**
  - `NullTransactionError`: Flags `null` or `undefined` records.
  - `MissingFieldError`: Flags missing `id` or `amount`.
  - `NegativeAmountError`: Flags negative balances.
- **Categorization:** Populates `validTransactions` and `invalidTransactions` arrays and outputs counts by error category.
- **Debugging Guide:** Identifies breakpoints and variables to watch (`currentTxn`, `err.category`, array lengths).

### Q4 – Debugging Mystery
- **Buggy Code:**
  ```javascript
  "use strict";
  function showMessage() {
    greeting = "Welcome"; // undeclared
    console.log(greeting);
  }
  showMessage();
  ```
- **Analysis:** In non-strict mode, an LHS lookup creates an accidental global variable. In `"use strict"`, it throws `ReferenceError: greeting is not defined`.
- **Fix:** Declared locally with `const greeting = "Welcome";` to confine scope to the function context.
- **VS Code Guide:** Step-by-step walkthrough observing the `showMessage` frame and `(anonymous)` module frame in the Call Stack.

### Q5 – Hoisting Lab: The Sequence Trap
- **Memory Phase Analysis:**
  - `var score`: Allocated in creation phase, initialized to `undefined`. Accessing before assignment yields `undefined`.
  - `function announce()`: Fully hoisted with body; can be invoked anywhere.
  - `let status`: Hoisted into the Temporal Dead Zone (TDZ); accessing before initialization throws `ReferenceError`.
  - `function startGame()`: Fully hoisted; reads `status` lexically.
- **Arrow Functions Comparison:**
  - `var arrowFunc = () => {}`: Hoisted as `undefined`, invocation causes `TypeError: arrowFunc is not a function`.
  - `const arrowFunc = () => {}`: Trapped in TDZ, invocation causes `ReferenceError`.

### Q6 – Pyramid Pattern Generator
- **Base Pattern:** Generates ascending asterisks.
- **`var` vs `let` Analysis:**
  - Demonstrates how `var` leaks loop counters (`vRow`, `vCol`) into the outer function scope.
  - Demonstrates the **variable collision bug** when an inner loop accidentally reuses the same `var` counter name, mutating the outer loop's index.
- **Parameterization:** Built `generatePyramid(totalRows = 5, symbol = "*")`.
- **Strict Mode Check:** Verifies that loop counters without `let`/`var` throw `ReferenceError`.

### Q7 – Smart Calculator
- **Supported Operations:** `add`, `divide`, `power`, `root`, `subtract`.
- **Defensive Errors:**
  - `DivisionByZeroError`: Intercepts `divide by 0` (which normally yields `Infinity` silently in JS).
  - `NegativeRootError`: Intercepts square root of negative numbers (which normally yields `NaN` silently in JS).
  - `InvalidOperationError`: Intercepts unsupported operations via `switch` default case.
- **Audit Table:** Formats all results and errors into an ASCII summary matrix.

### Q8 – Strict Mode Showdown
- **Three Forbidden Operations:**
  1. Duplicate parameters `function demo(a, a)`: Syntax error in strict mode; shadows first argument in non-strict mode.
  2. Undeclared assignment `total = 10`: Reference error in strict mode; pollutes global scope in non-strict mode.
  3. `delete total`: Syntax error in strict mode; plain variable bindings are non-configurable.
- **ES6 Refactor:** Uses distinct parameter names, `let` declaration, and proper object property deletion.

### Q9 – JSON Audit
- **Pipeline:** Loops through JSON strings, using `try...catch` to intercept `SyntaxError` from `JSON.parse()`.
- **Schema Validation:** Checks for mandatory `user` and `age` fields, throws custom `SchemaValidationError`.
- **Bonus Feature:** Converts `age` to `Number`, filters users into adults ($\ge 18$) and minors ($< 18$).
- **Diagnostics:** Logs errors with 1-based line numbers and raw payloads.

### Q10 – Nested Hoisting and Closures
- **Output:** Both logs output `undefined`.
- **Reason:** `var count` inside `outer()` hoists locally as `undefined`. `var count` inside `inner()` hoists locally inside `inner()` as `undefined` and **shadows** `outer()`'s `count = 5`.
- **Arrow Conversion Scenarios:**
  - Closure without local `count`: Correctly resolves `count` ($5$) from outer lexical scope.
  - Local `var count`: Hoists locally within the arrow function, logging `undefined`.
  - Local `let count`: Trapped in TDZ, throwing `ReferenceError`.
- **Call Stack Analysis:** Visualizes GEC $\rightarrow$ `FEC_outer` $\rightarrow$ `FEC_inner` call stack lifecycle.

---

## 🛠️ Debugging in Visual Studio Code

1. Open the assignment directory in VS Code.
2. Open any `.js` file (e.g., `Q3_Transaction_Validator.js` or `Q10_Nested_Hoisting_and_Closures.js`).
3. Place a red breakpoint by clicking in the left margin next to any line number.
4. Press `F5` and select **Node.js**.
5. Use:
   - **`F10` (Step Over):** Advance line-by-line in the current context.
   - **`F11` (Step Into):** Step into function invocations to inspect new stack frames.
   - **`Shift + F11` (Step Out):** Return to the caller context.
   - **Watch Pane:** Add expressions such as `currentTxn`, `count`, `validCleanUsers.length`.
   - **Call Stack Pane:** Observe active execution contexts being pushed and popped.
