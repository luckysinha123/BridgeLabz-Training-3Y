# ASSIGNMENT 4 - CORE JAVASCRIPT (ES6+)
## BridgeLabz Training - 3rd Year Full Stack Curriculum

---

### Overview
This repository contains the verified solutions for **Assignment 4**, covering **ES6 Classes & Objects, Form Validation via Regular Expressions (RegExp), Dynamic DOM Generation with innerHTML, Object State Mutation, and Functional Array Operations (`filter`, `reduce`)**.

All solutions are built purely with **Core JavaScript (ES6+)** without any frameworks, fully adhering to `"use strict";` standards, descriptive identifiers, and dual-mode execution (both Node.js console testing and interactive browser DOM interfaces).

---

### File Index & Question Mapping

| File Name | Question | Concepts Covered |
| :--- | :--- | :--- |
| [`Q1_Product_Manager.js`](./Q1_Product_Manager.js) | **Q1: E-Commerce Product Manager** | Classes, Methods (`applyDiscount`, `getDetails`), Array filtering (`price > 1000`) |
| [`Q2_Student_Form_Validator.js`](./Q2_Student_Form_Validator.js) | **Q2: Student Form Validator** | RegExp Validation (Name, Email, 10-digit Phone, Strong Password), Dynamic Red/Green UI Borders |
| [`Q3_Library_Management_System.js`](./Q3_Library_Management_System.js) | **Q3: Library Management System** | Book class, `issueBook()`, `returnBook()`, ISBN lookup via `.find()`, available inventory filtering |
| [`Q4_Custom_Form_Builder.js`](./Q4_Custom_Form_Builder.js) | **Q4: Custom Form Builder** | `FormBuilder` class, Dynamic HTML via `innerHTML`, Data Extraction using `getFormData()` |
| [`Q5_Movie_Ticket_Booking.js`](./Q5_Movie_Ticket_Booking.js) | **Q5: Movie Ticket Booking** | RegExp input validation, Booking object creation (`{ name, email, seats }`), Formatted ticket receipt |
| [`Q6_Employee_Management_System.js`](./Q6_Employee_Management_System.js) | **Q6: Employee Management System** | Employee class, `getAnnualSalary()`, `applyBonus()`, Total payroll calculation using `.reduce()` |
| [`Q7_Login_Form_Validation.js`](./Q7_Login_Form_Validation.js) | **Q7: Login Form Validation** | Username & Password strength RegExp rules, Granular error messages vs Success message |
| [`Q8_Dynamic_Object_Updater.js`](./Q8_Dynamic_Object_Updater.js) | **Q8: Dynamic Object Updater** | Real-time in-place object mutation, Two-way synchronization between input form and object |
| [`Q9_Shopping_Cart_Total.js`](./Q9_Shopping_Cart_Total.js) | **Q9: Shopping Cart Total & Coupons** | `Cart` class, Subtotal calculation, Coupon validation via RegExp (`SAVE20`, `DISC10`), Itemized invoice |
| [`index.html`](./index.html) | **Browser Interactive Dashboard** | Unified interactive web page testing Q2, Q4, Q5, Q7, and Q8 with real-time UI feedback |

---

### Detailed Question Summaries

#### Q 1: E-Commerce Product Manager (`Q1_Product_Manager.js`)
- **Objective**: Create a `Product` class with properties `id`, `name`, `price`, `category`.
- **Implementation**:
  - `applyDiscount(discountPercent)`: Calculates discounted price, rounds to 2 decimal places, and stores applied discount.
  - `getDetails()`: Returns clean, formatted product summary.
  - Generates catalog array and applies `filter(product => product.price > 1000)` to isolate premium catalog items.

#### Q 2: Student Form Validator (`Q2_Student_Form_Validator.js`)
- **Objective**: Validate Name (alphabets only), Email (valid email format), Phone (10 digits), and Password (1 uppercase, 1 number, 1 special character).
- **Implementation**:
  - Regular expressions:
    - Name: `/^[A-Za-z\s]{2,50}$/`
    - Email: `/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/`
    - Phone: `/^\d{10}$/`
    - Password: `/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{6,}$/`
  - Applies green border (`#28a745`) if valid, red border (`#dc3545`) with descriptive error message if invalid.
  - Dual-mode: Includes Node.js test runner suite and browser DOM event listeners.

#### Q 3: Library Management System (`Q3_Library_Management_System.js`)
- **Objective**: Manage library books via `Book` class (`title`, `author`, `ISBN`, `isIssued`).
- **Implementation**:
  - Methods: `issueBook()`, `returnBook()`, `getDetails()`.
  - Searches and issues books by ISBN using `.find(b => b.ISBN === searchISBN)`.
  - Filters available books using `.filter(b => !b.isIssued)`.

#### Q 4: Custom Form Builder (`Q4_Custom_Form_Builder.js`)
- **Objective**: Dynamically generate HTML forms using a `FormBuilder` class.
- **Implementation**:
  - Accepts an array of field objects (e.g., `{ type: 'text', label: 'Username', ... }`).
  - Assembles accessible HTML elements dynamically using `innerHTML`.
  - Method `getFormData()` collects all current values into a JavaScript key-value object upon submission.

#### Q 5: Movie Ticket Booking (`Q5_Movie_Ticket_Booking.js`)
- **Objective**: Validate customer booking info (Name, Email, Seats 1 to 10) and generate ticket receipt.
- **Implementation**:
  - RegExp validation for Name, Email, and Seats (`/^(?:[1-9]|10)$/`).
  - Encapsulates booking data into `{ bookingId, name, email, seats, totalAmount, bookingTimestamp }`.
  - Generates formatted cinema confirmation receipt.

#### Q 6: Employee Management System (`Q6_Employee_Management_System.js`)
- **Objective**: Calculate individual and organization-wide annual salaries with bonuses.
- **Implementation**:
  - Methods `getAnnualSalary()` and `applyBonus(percent)`.
  - Instantiates 5 employees across various departments.
  - Employs `Array.prototype.reduce()` to aggregate total annual company payroll.

#### Q 7: Login Form Validation (`Q7_Login_Form_Validation.js`)
- **Objective**: Validate login credentials with specific granular feedback.
- **Implementation**:
  - Checks username minimum length (5 chars).
  - Performs regex lookaheads for password complexity: length ($\ge 8$), uppercase (`[A-Z]`), lowercase (`[a-z]`), digit (`\d`), and symbol.
  - Outputs distinct error messages per violation or an authentication success message.

#### Q 8: Dynamic Object Updater (`Q8_Dynamic_Object_Updater.js`)
- **Objective**: Live mutation of `user = { name: "John", email: "john@mail.com", age: 21 }`.
- **Implementation**:
  - Binds form input fields to the in-memory object.
  - On submit, mutates properties in real time and re-renders updated JSON and table views in the DOM.

#### Q 9: Shopping Cart Total & Coupons (`Q9_Shopping_Cart_Total.js`)
- **Objective**: Shopping cart with items, total calculation, and coupon validation.
- **Implementation**:
  - `Cart` class with `addItem()`, `getSubtotal()`, `applyCoupon()`, and `getTotal()`.
  - Coupon RegExp: `/^(SAVE|DISC)(\d{1,2})$/i` extracts prefix and discount percentage.
  - Applies discounts and produces an itemized receipt.

---

### How to Run

#### In Node.js Console:
```bash
cd "d:\College #3rd year\Full Stack\BridgeLabz-Training-3Y\Java  Script\Assignment 4"

# Run any question directly:
node Q1_Product_Manager.js
node Q2_Student_Form_Validator.js
node Q3_Library_Management_System.js
node Q4_Custom_Form_Builder.js
node Q5_Movie_Ticket_Booking.js
node Q6_Employee_Management_System.js
node Q7_Login_Form_Validation.js
node Q8_Dynamic_Object_Updater.js
node Q9_Shopping_Cart_Total.js
```

#### In Web Browser:
Open `index.html` in any modern web browser to interactively test the forms and dynamic DOM behaviors.
