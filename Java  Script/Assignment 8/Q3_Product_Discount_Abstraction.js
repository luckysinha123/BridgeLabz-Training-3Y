"use strict";

/**
 * ==============================================================================
 * ASSIGNMENT 8 - QUESTION 3: Product Discount System (Prototypes & Abstraction)
 * ==============================================================================
 * 
 * Problem Statement:
 * Create a Product constructor function with:
 * ● name
 * ● price
 * Add a prototype method applyDiscount(percent) that returns new price.
 * Now create 3 products and apply different discounts.
 * Show how abstraction helps simplify operations.
 * 
 * Concepts Demonstrated:
 * - Constructor Functions & Prototype Methods
 * - Memory Optimization via Shared Prototypes
 * - Principle of Abstraction: Hiding internal calculation, validation, and rounding
 *   complexity behind a clean public interface (applyDiscount).
 * ==============================================================================
 */

console.log("==============================================================================");
console.log("    ASSIGNMENT 8 - Q3: PRODUCT DISCOUNT SYSTEM (Prototypes & Abstraction)     ");
console.log("==============================================================================\n");

/**
 * Constructor function representing an E-Commerce Product.
 * 
 * @param {string} name - Product display name
 * @param {number} price - Original retail price
 */
function Product(name, price) {
    if (!name || typeof name !== "string") {
        throw new Error("Product name must be a valid string.");
    }
    if (typeof price !== "number" || price < 0) {
        throw new TypeError("Product price must be a non-negative number.");
    }

    this.name = name;
    this.price = price;
    this.originalPrice = price; // Kept internally for price history
    this.appliedDiscountPercent = 0;
}

/**
 * Prototype method to apply a discount percentage and return the updated price.
 * 
 * ABSTRACTION IN ACTION:
 * The caller simply invokes `product.applyDiscount(15)`.
 * The caller does NOT need to know:
 * 1. How discount arithmetic is calculated.
 * 2. Boundary validation (rejecting negative or >100% rates).
 * 3. Rounding to 2 decimal places to avoid floating-point inaccuracies.
 * 4. Internal state persistence.
 * 
 * @param {number} percent - Discount rate between 0 and 100
 * @returns {number} The newly calculated price
 */
Product.prototype.applyDiscount = function(percent) {
    // 1. Validation abstraction
    if (typeof percent !== "number" || percent < 0 || percent > 100) {
        console.warn(`[Warning] Invalid discount (${percent}%) for "${this.name}". Must be 0-100%.`);
        return this.price;
    }

    // 2. Arithmetic abstraction
    const discountAmount = (this.price * percent) / 100;
    const newPrice = Math.round((this.price - discountAmount) * 100) / 100;

    // 3. State update
    this.price = newPrice;
    this.appliedDiscountPercent = percent;

    return newPrice;
};

/**
 * Prototype method to display formatted product details.
 * @returns {string}
 */
Product.prototype.getDetails = function() {
    return `"${this.name.padEnd(25)}" | Original: ₹${this.originalPrice.toFixed(2).padEnd(9)} | Discount: ${String(this.appliedDiscountPercent + "%").padEnd(5)} | Final: ₹${this.price.toFixed(2)}`;
};

// ==============================================================================
// CREATING 3 PRODUCTS & APPLYING DIFFERENT DISCOUNTS
// ==============================================================================
console.log("------------------------------------------------------------------------------");
console.log("INITIALIZING 3 PRODUCTS");
console.log("------------------------------------------------------------------------------\n");

const product1 = new Product("Apple iPad Air (M2)", 59900);
const product2 = new Product("Sony Noise-Cancelling Headphones", 19990);
const product3 = new Product("Logitech MX Master 3S Mouse", 8995);

console.log("Products Before Discount:");
console.log("  1.", product1.getDetails());
console.log("  2.", product2.getDetails());
console.log("  3.", product3.getDetails());
console.log();

console.log("------------------------------------------------------------------------------");
console.log("APPLYING DIFFERENT DISCOUNTS (Calling applyDiscount)");
console.log("------------------------------------------------------------------------------\n");

// Product 1: 10% Festive Discount
const newPrice1 = product1.applyDiscount(10);
console.log(`[Applied 10%] iPad Air new price: ₹${newPrice1.toFixed(2)}`);

// Product 2: 25% Flash Sale Discount
const newPrice2 = product2.applyDiscount(25);
console.log(`[Applied 25%] Sony Headphones new price: ₹${newPrice2.toFixed(2)}`);

// Product 3: 15% Member Discount
const newPrice3 = product3.applyDiscount(15);
console.log(`[Applied 15%] Logitech Mouse new price: ₹${newPrice3.toFixed(2)}`);
console.log();

console.log("Products After Discount:");
console.log("  1.", product1.getDetails());
console.log("  2.", product2.getDetails());
console.log("  3.", product3.getDetails());
console.log();

// ==============================================================================
// TECHNICAL EXPLANATION: HOW ABSTRACTION HELPS SIMPLIFY OPERATIONS
// ==============================================================================
console.log("------------------------------------------------------------------------------");
console.log("HOW ABSTRACTION HELPS SIMPLIFY OPERATIONS");
console.log("------------------------------------------------------------------------------");
console.log(`
1. Separation of Concerns (What vs How):
   - Without abstraction, every part of the application that needs to apply a discount
     would repeat:
     let discount = (p.price * rate) / 100;
     p.price = Math.round((p.price - discount) * 100) / 100;
   - If rounding logic changes (e.g. accounting rounding rules), you would have to fix
     it in hundreds of places across the codebase.

2. Code Reusability & Shared Prototype:
   - 'applyDiscount' is defined once on 'Product.prototype'.
   - All 3 instances share the exact same method reference in memory:
     product1.applyDiscount === product2.applyDiscount -> TRUE!

3. Robustness & Defensive Guardrails:
   - Abstraction encapsulates boundary validation (ensuring percent is between 0 and 100).
   - The consumer cannot accidentally set a negative price or apply a 250% discount.
==============================================================================\n`);
