"use strict";

/**
 * ==============================================================================
 * ASSIGNMENT 8 - QUESTION 2: Online Food Ordering (map + Error Handling)
 * ==============================================================================
 * 
 * Problem Statement:
 * You have an array of menu items with prices.
 * Write a function calculateBill(orderItems) that:
 * ● Uses map() to get price list
 * ● Uses reduce() to calculate the total
 * ● Throws an error if an invalid item is ordered
 * ● Use try-catch to show meaningful messages
 * 
 * Concepts Demonstrated:
 * - Array Transformation with Array.prototype.map()
 * - Aggregation with Array.prototype.reduce()
 * - Defensive Data Validation & Custom Error Throwing
 * - Exception Handling via try...catch Blocks
 * ==============================================================================
 */

console.log("==============================================================================");
console.log("     ASSIGNMENT 8 - Q2: ONLINE FOOD ORDERING (map + Error Handling)           ");
console.log("==============================================================================\n");

// ==============================================================================
// 1. RESTAURANT MENU MASTER DATA
// ==============================================================================
const restaurantMenu = [
    { id: "M101", name: "Margherita Pizza", price: 350 },
    { id: "M102", name: "Paneer Tikka Burger", price: 180 },
    { id: "M103", name: "Cold Coffee", price: 120 },
    { id: "M104", name: "Pasta Alfredo", price: 280 },
    { id: "M105", name: "French Fries", price: 90 },
    { id: "M106", name: "Chocolate Brownie", price: 150 }
];

console.log("Restaurant Master Menu Catalog:");
console.table(restaurantMenu);
console.log();

/**
 * Calculates the total food bill for a customer's order.
 * 
 * @param {Array<{ name: string, quantity: number }>} orderItems - Customer order list
 * @returns {{ itemizedBill: Array<Object>, totalAmount: number }}
 * @throws {Error} If orderItems is not an array, empty, or contains an invalid item.
 */
function calculateBill(orderItems) {
    if (!Array.isArray(orderItems) || orderItems.length === 0) {
        throw new Error("Order cannot be empty. Please select at least one item.");
    }

    // STEP 1: Use map() to extract item details, validate against menu, and obtain price list
    const priceList = orderItems.map((orderItem) => {
        if (!orderItem || !orderItem.name) {
            throw new Error("Invalid order entry: Missing item name.");
        }

        const quantity = orderItem.quantity != null ? orderItem.quantity : 1;
        if (typeof quantity !== "number" || quantity <= 0) {
            throw new Error(`Invalid quantity (${quantity}) for "${orderItem.name}". Must be >= 1.`);
        }

        // Search for item in master menu
        const menuItem = restaurantMenu.find(
            menu => menu.name.toLowerCase() === orderItem.name.trim().toLowerCase()
        );

        // Required condition: Throw error if an invalid item is ordered
        if (!menuItem) {
            throw new Error(`Menu Item Not Found: "${orderItem.name}" is not available on our menu.`);
        }

        const itemSubtotal = menuItem.price * quantity;

        return {
            name: menuItem.name,
            unitPrice: menuItem.price,
            quantity: quantity,
            subtotal: itemSubtotal
        };
    });

    // STEP 2: Use reduce() on the mapped price list to calculate the total bill
    const totalAmount = priceList.reduce((accumulator, item) => {
        return accumulator + item.subtotal;
    }, 0);

    return {
        itemizedBill: priceList,
        totalAmount
    };
}

/**
 * Helper wrapper that safely invokes calculateBill() within a try-catch block.
 * @param {string} orderTitle - Title for console logging
 * @param {Array<Object>} orderItems - The order to test
 */
function processCustomerOrder(orderTitle, orderItems) {
    console.log("------------------------------------------------------------------------------");
    console.log(`PROCESSING: ${orderTitle}`);
    console.log("------------------------------------------------------------------------------");
    console.log("Submitted Order Items:", orderItems);

    try {
        const bill = calculateBill(orderItems);

        console.log("\n✔ Order Validated Successfully!");
        console.log("Itemized Bill Breakdown (derived via map):");
        bill.itemizedBill.forEach((item, idx) => {
            console.log(`  ${idx + 1}. ${item.name.padEnd(22)} | Qty: ${String(item.quantity).padEnd(2)} | Unit: ₹${item.unitPrice} | Total: ₹${item.subtotal}`);
        });
        console.log("------------------------------------------------------------------------------");
        console.log(`TOTAL BILL AMOUNT (calculated via reduce): ₹${bill.totalAmount.toFixed(2)}`);
        console.log("------------------------------------------------------------------------------\n");
    } catch (error) {
        // Required condition: Use try-catch to show meaningful messages
        console.error("\n❌ ORDER PROCESSING FAILED!");
        console.error(`Error Message : ${error.message}`);
        console.error("Please revise your cart and select items from the official menu.\n");
    }
}

// ==============================================================================
// TEST CASES
// ==============================================================================

// Test Case 1: Valid Order
processCustomerOrder("Test 1: Valid Multi-Item Order", [
    { name: "Margherita Pizza", quantity: 2 },
    { name: "Cold Coffee", quantity: 3 },
    { name: "French Fries", quantity: 1 }
]);

// Test Case 2: Order containing an Invalid / Unlisted Item
processCustomerOrder("Test 2: Order with Invalid Menu Item ('Sushi Roll')", [
    { name: "Pasta Alfredo", quantity: 1 },
    { name: "Sushi Roll", quantity: 2 } // Invalid item!
]);

// Test Case 3: Order with Invalid Quantity
processCustomerOrder("Test 3: Order with Negative Quantity", [
    { name: "Paneer Tikka Burger", quantity: -2 }
]);

// Test Case 4: Empty Order
processCustomerOrder("Test 4: Empty Order Array", []);
