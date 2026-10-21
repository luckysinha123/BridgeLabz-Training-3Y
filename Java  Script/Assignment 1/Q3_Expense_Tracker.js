/**
 * Question 3: Monthly Expense Tracker
 * 
 * Requirements:
 * - Use an array of expenses for 5 categories (food, travel, rent, bills, leisure).
 * - Use arithmetic and assignment operators to add 10% tax to the total.
 * - Use toFixed(2) to round values.
 * - Display total, average, and final amount after tax.
 */

// Step 1: Expenses for 5 categories
const expenseItems = [
    { category: "Food", amount: 4500.50 },
    { category: "Travel", amount: 1850.25 },
    { category: "Rent", amount: 12000.00 },
    { category: "Bills", amount: 2450.75 },
    { category: "Leisure", amount: 3200.00 }
];

// Step 2: Calculate total expense using arithmetic and assignment operator (+=)
let totalExpense = 0;
for (let i = 0; i < expenseItems.length; i++) {
    totalExpense += expenseItems[i].amount; // Assignment operator
}

// Step 3: Calculate average expense using arithmetic division (/)
const averageExpense = totalExpense / expenseItems.length;

// Step 4: Add 10% tax using arithmetic multiplication (*) and assignment (+=)
const taxRate = 0.10; // 10%
const taxAmount = totalExpense * taxRate;

let finalAmount = totalExpense;
finalAmount += taxAmount; // Compound assignment operator

// Step 5: Display total, average, and final amount formatted with toFixed(2)
console.log("Monthly Expenses Breakdown:");
console.table(expenseItems);

console.log(`Total Expenses        : Rs. ${totalExpense.toFixed(2)}`);
console.log(`Average Category Cost : Rs. ${averageExpense.toFixed(2)}`);
console.log(`Tax Added (10%)       : Rs. ${taxAmount.toFixed(2)}`);
console.log(`Final Amount After Tax: Rs. ${finalAmount.toFixed(2)}`);
