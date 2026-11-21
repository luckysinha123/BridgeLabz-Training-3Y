# ASSIGNMENT 8 - CORE JAVASCRIPT (ES6+)
## BridgeLabz Training - 3rd Year Full Stack Curriculum

---

### Overview
This folder contains the complete, verified solutions for **Assignment 8**, focusing on **ES6 Classes & Inheritance, Functional Array Methods (`map`, `filter`, `reduce`), Prototype Delegation & Abstraction, Private Class Fields (`#field`), Runtime Polymorphism, and Defensive Error Handling (`try...catch`)**.

All solutions are written in standard **Core JavaScript (ES6+)** with zero third-party dependencies, adhering to `"use strict";` standards, descriptive identifiers, and robust test scenarios.

---

### File Index & Question Mapping

| File Name | Question | Concepts Covered |
| :--- | :--- | :--- |
| [`Q1_Student_Result_Processing.js`](./Q1_Student_Result_Processing.js) | **Q1: Student Result Processing** | `Student` class, `calculateAverage()` via `reduce()`, Grade calculation (A/B/C/F), 3 student test suite |
| [`Q2_Food_Ordering_System.js`](./Q2_Food_Ordering_System.js) | **Q2: Online Food Ordering** | `calculateBill()` using `map()` for price list, `reduce()` for subtotal, throws on invalid item, handled via `try/catch` |
| [`Q3_Product_Discount_Abstraction.js`](./Q3_Product_Discount_Abstraction.js) | **Q3: Product Discount System** | Constructor function, prototype method `applyDiscount(percent)`, abstraction principles and shared memory |
| [`Q4_Employee_Manager_Polymorphism.js`](./Q4_Employee_Manager_Polymorphism.js) | **Q4: Employee Inheritance** | Base `Employee` and derived `Manager` (`extends`, `super()`), method overriding (`work()`), runtime polymorphism |
| [`Q5_Ride_Sharing_Fare_Calculator.js`](./Q5_Ride_Sharing_Fare_Calculator.js) | **Q5: Ride-Sharing Application** | `User`, `Driver` inheritance, `Trip.calculateFare()`, error throwing on negative/missing distance, `try/catch` |
| [`Q6_Ecommerce_Inventory_System.js`](./Q6_Ecommerce_Inventory_System.js) | **Q6: E-Commerce Inventory System** | `getLowStockProducts()` (`filter`), `sortProductsByPrice()` (`sort`), `calculateTotalInventoryValue()` (`reduce`), `groupByCategory()` (`reduce`) |
| [`Q7_Bank_Account_Private_Fields.js`](./Q7_Bank_Account_Private_Fields.js) | **Q7: Banking Application** | Private field `#balance`, `deposit()`, `withdraw()` (insufficient balance guard), `getBalance()`, `try/catch` |
| [`Q8_Movie_Ticket_Prototype_Inheritance.js`](./Q8_Movie_Ticket_Prototype_Inheritance.js) | **Q8: Movie Ticket Booking** | `MovieTicket`, `OnlineTicket` inheritance, `MovieTicket.prototype.printTicket()` invoked on child instances via prototype chain |
| [`Q9_Fitness_App_Analytics.js`](./Q9_Fitness_App_Analytics.js) | **Q9: Fitness App Analytics** | `FitnessAnalytics` class, `getActiveUsers()` (`filter`), `getAverageCalories()` (`reduce`), `getUserSummary()` (`map`), empty dataset error |

---

### Detailed Question Summaries

#### Q 1: Student Result Processing (`Q1_Student_Result_Processing.js`)
- **Objective**: Compute average scores and determine letter grades (A: $\ge 90$, B: $\ge 75$, C: $\ge 50$, F: $< 50$).
- **Implementation**:
  - `calculateAverage()`: Uses `reduce()` to sum scores and divides by length.
  - `getGrade()`: Determines grade based on average.
  - Tested across 3 diverse students.

#### Q 2: Online Food Ordering (`Q2_Food_Ordering_System.js`)
- **Objective**: Calculate food bill using menu master data.
- **Implementation**:
  - `map()` validates each item against master menu and returns price details.
  - `reduce()` sums individual item subtotals.
  - Throws custom errors if items are unlisted or quantities invalid, caught and reported with `try...catch`.

#### Q 3: Product Discount Abstraction (`Q3_Product_Discount_Abstraction.js`)
- **Objective**: Constructor function `Product(name, price)` with prototype method `applyDiscount(percent)`.
- **Implementation**:
  - Hides arithmetic, rounding, and validation details behind a clean public method.
  - Demonstrates prototype sharing across multiple products (iPad, Sony Headphones, Logitech Mouse).

#### Q 4: Employee Inheritance & Runtime Polymorphism (`Q4_Employee_Manager_Polymorphism.js`)
- **Objective**: Base class `Employee` and derived `Manager` overriding `work()`.
- **Implementation**:
  - Iterates over an array of mixed `Employee` and `Manager` objects.
  - Calls `.work()` on each element, dynamically executing the specialized implementation at runtime.

#### Q 5: Ride-Sharing Fare Calculator (`Q5_Ride_Sharing_Fare_Calculator.js`)
- **Objective**: Model ride-sharing with `User`, `Driver`, and `Trip`.
- **Implementation**:
  - `calculateFare()`: Computes fare = Base Fare + (Distance $\times$ Rate/km).
  - Throws `RangeError` / `Error` on negative or missing distance.
  - Handles errors with `try...catch`.

#### Q 6: E-Commerce Inventory System (`Q6_Ecommerce_Inventory_System.js`)
- **Objective**: Comprehensive inventory management using functional array methods.
- **Implementation**:
  1. `getLowStockProducts(inventory, 5)` $\rightarrow$ `filter()`
  2. `sortProductsByPrice(inventory, "asc")` $\rightarrow$ `sort()` (preserves original array)
  3. `calculateTotalInventoryValue(inventory)` $\rightarrow$ `reduce()`
  4. `groupByCategory(inventory)` $\rightarrow$ `reduce()` grouping into dictionary format.

#### Q 7: Banking Application (`Q7_Bank_Account_Private_Fields.js`)
- **Objective**: Enforce private state encapsulation using `#balance`.
- **Implementation**:
  - Methods: `deposit()`, `withdraw()`, and `getBalance()`.
  - Disallows overdrafts by throwing an error if withdrawal exceeds `#balance`.
  - Proves `#balance` is completely immune to external tampering.

#### Q 8: Movie Ticket Prototype Inheritance (`Q8_Movie_Ticket_Prototype_Inheritance.js`)
- **Objective**: `OnlineTicket` inheriting from `MovieTicket`.
- **Implementation**:
  - `printTicket()` attached directly to `MovieTicket.prototype`.
  - Calling `onlineTicket.printTicket()` traverses up the prototype chain to `MovieTicket.prototype`.

#### Q 9: Fitness App Analytics (`Q9_Fitness_App_Analytics.js`)
- **Objective**: Analyze workout metrics.
- **Implementation**:
  - `getActiveUsers(7000)`: Uses `filter()` for steps $> 7000$.
  - `getAverageCalories()`: Uses `reduce()` to find average calories.
  - `getUserSummary()`: Uses `map()` to produce descriptive messages.
  - Rejects empty datasets with error handling.

---

### How to Run

```powershell
cd "d:\College #3rd year\Full Stack\BridgeLabz-Training-3Y\Java  Script\Assignment 8"

node Q1_Student_Result_Processing.js
node Q2_Food_Ordering_System.js
node Q3_Product_Discount_Abstraction.js
node Q4_Employee_Manager_Polymorphism.js
node Q5_Ride_Sharing_Fare_Calculator.js
node Q6_Ecommerce_Inventory_System.js
node Q7_Bank_Account_Private_Fields.js
node Q8_Movie_Ticket_Prototype_Inheritance.js
node Q9_Fitness_App_Analytics.js
```
