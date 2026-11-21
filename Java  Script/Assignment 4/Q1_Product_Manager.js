"use strict";

/**
 * ==============================================================================
 * ASSIGNMENT 4 - QUESTION 1: E-Commerce Product Manager (Classes + Objects)
 * ==============================================================================
 * 
 * Problem Statement:
 * You’re building an E-commerce Admin Panel. Create a Product class with properties
 * like id, name, price, and category.
 * 
 * Tasks:
 * 1. Add methods to:
 *    - Apply a discount (e.g., 10%)
 *    - Display product details in a formatted string
 * 2. Create multiple product objects and store them in an array.
 * 3. Display products with price > 1000 in the console using a filter.
 * 
 * Concepts Demonstrated:
 * - ES6 Classes, Constructors, and Methods
 * - Encapsulation and Data Validation
 * - Array.prototype.filter() Higher-Order Function
 * - Formatted String Interpolation & Currency Representation
 * ==============================================================================
 */

console.log("==============================================================================");
console.log("          ASSIGNMENT 4 - Q1: E-COMMERCE PRODUCT MANAGER                       ");
console.log("==============================================================================\n");

/**
 * Class representing an E-Commerce Product.
 */
class Product {
    /**
     * Creates a new Product instance.
     * @param {string|number} id - Unique product identifier.
     * @param {string} name - Product display name.
     * @param {number} price - Original product price in INR / USD.
     * @param {string} category - Product department / category.
     */
    constructor(id, name, price, category) {
        if (!id || !name || price == null || !category) {
            throw new Error("All product fields (id, name, price, category) are required.");
        }
        if (typeof price !== "number" || price < 0) {
            throw new TypeError("Product price must be a non-negative number.");
        }

        this.id = id;
        this.name = name;
        this.price = price;
        this.category = category;
        this.appliedDiscount = 0; // Tracks percentage discount applied
    }

    /**
     * Applies a percentage discount to the product price.
     * @param {number} discountPercent - Discount rate between 0 and 100.
     * @returns {number} The updated discounted price.
     */
    applyDiscount(discountPercent) {
        if (typeof discountPercent !== "number" || discountPercent < 0 || discountPercent > 100) {
            console.warn(`[Warning] Invalid discount percentage (${discountPercent}%) for "${this.name}". Must be between 0 and 100.`);
            return this.price;
        }

        const discountAmount = (this.price * discountPercent) / 100;
        this.price = Math.round((this.price - discountAmount) * 100) / 100; // Round to 2 decimal places
        this.appliedDiscount = discountPercent;

        console.log(`[Discount Applied] ${discountPercent}% off applied to "${this.name}". Saved: ₹${discountAmount.toFixed(2)}. New Price: ₹${this.price.toFixed(2)}`);
        return this.price;
    }

    /**
     * Returns product details as a clean formatted string.
     * @returns {string} Formatted product specification.
     */
    getDetails() {
        const discountTag = this.appliedDiscount > 0 ? ` (${this.appliedDiscount}% OFF applied)` : "";
        return `[ID: ${this.id}] ${this.name.padEnd(20)} | Category: ${this.category.padEnd(14)} | Price: ₹${this.price.toLocaleString("en-IN", { minimumFractionDigits: 2 })}${discountTag}`;
    }
}

// ==============================================================================
// STEP 1: Create Multiple Product Objects and Store in an Array
// ==============================================================================
console.log("------------------------------------------------------------------------------");
console.log("STEP 1: CREATING PRODUCT CATALOG ARRAY");
console.log("------------------------------------------------------------------------------\n");

const productCatalog = [
    new Product("P101", "MacBook Air M2", 114900, "Electronics"),
    new Product("P102", "Wireless Mouse", 850, "Accessories"),
    new Product("P103", "Mechanical Keyboard", 3500, "Accessories"),
    new Product("P104", "Gaming Monitor 27\"", 24999, "Electronics"),
    new Product("P105", "USB-C Cable (2m)", 499, "Accessories"),
    new Product("P106", "Noise-Cancelling Headphones", 14500, "Audio"),
    new Product("P107", "Laptop Stand", 999, "Furniture"),
    new Product("P108", "Ergonomic Chair", 12500, "Furniture")
];

console.log(`Successfully initialized product catalog with ${productCatalog.length} items:\n`);
productCatalog.forEach(p => console.log(p.getDetails()));
console.log();

// ==============================================================================
// STEP 2: Applying Discounts
// ==============================================================================
console.log("------------------------------------------------------------------------------");
console.log("STEP 2: APPLYING DISCOUNTS TO SELECTED PRODUCTS");
console.log("------------------------------------------------------------------------------\n");

// Apply 10% discount on MacBook Air
productCatalog[0].applyDiscount(10);

// Apply 15% discount on Gaming Monitor
productCatalog[3].applyDiscount(15);

// Apply 20% discount on Ergonomic Chair
productCatalog[7].applyDiscount(20);

// Try invalid discount
productCatalog[1].applyDiscount(-5);
console.log();

// ==============================================================================
// STEP 3: Filter and Display Products with Price > 1000
// ==============================================================================
console.log("------------------------------------------------------------------------------");
console.log("STEP 3: FILTER PRODUCTS WITH PRICE > ₹1,000");
console.log("------------------------------------------------------------------------------\n");

const PRICE_THRESHOLD = 1000;
const premiumProducts = productCatalog.filter(product => product.price > PRICE_THRESHOLD);

console.log(`Found ${premiumProducts.length} products with price strictly greater than ₹${PRICE_THRESHOLD}:\n`);
premiumProducts.forEach((product, index) => {
    console.log(`  ${index + 1}. ${product.getDetails()}`);
});
console.log();

// ==============================================================================
// SUMMARY TABLE
// ==============================================================================
console.log("------------------------------------------------------------------------------");
console.log("SUMMARY REPORT TABLE (Price > ₹1,000)");
console.log("------------------------------------------------------------------------------");
console.table(premiumProducts.map(p => ({
    ID: p.id,
    Name: p.name,
    Category: p.category,
    "Final Price (INR)": `₹${p.price.toFixed(2)}`,
    "Discount %": `${p.appliedDiscount}%`
})));
console.log("==============================================================================\n");
