"use strict";

/**
 * ==============================================================================
 * ASSIGNMENT 4 - QUESTION 9: Shopping Cart Total (Classes + RegExp for Coupon)
 * ==============================================================================
 * 
 * Problem Statement:
 * Build a shopping cart system using a Cart class.
 * ● Add items with name, price, quantity.
 * ● Calculate total using getTotal().
 * ● Apply coupon validation using RegExp:
 *   ○ Coupon format must be like SAVE20 or DISC10.
 * ● If valid, apply corresponding % discount and show final total.
 * 
 * Concepts Demonstrated:
 * - ES6 Class Architecture & Collection Management
 * - Subtotal Calculation using Array.prototype.reduce()
 * - RegExp Capture Groups to extract coupon prefix and percentage
 * - Discount Arithmetic & Formatted Invoice Breakdown
 * ==============================================================================
 */

console.log("==============================================================================");
console.log("        ASSIGNMENT 4 - Q9: SHOPPING CART TOTAL & COUPON SYSTEM                ");
console.log("==============================================================================\n");

/**
 * Class representing a Shopping Cart.
 */
class Cart {
    constructor() {
        /** @type {Array<{ name: string, price: number, quantity: number }>} */
        this.items = [];
        this.appliedCoupon = null;
        this.discountPercent = 0;
    }

    /**
     * Adds an item to the shopping cart.
     * 
     * @param {string} name - Product Name
     * @param {number} price - Unit Price
     * @param {number} [quantity=1] - Quantity purchased
     */
    addItem(name, price, quantity = 1) {
        if (!name || typeof price !== "number" || price < 0 || quantity <= 0) {
            throw new Error(`Invalid item details: ${name}, price: ${price}, quantity: ${quantity}`);
        }

        // Check if item already exists in cart; if so, increment quantity
        const existingItem = this.items.find(item => item.name.toLowerCase() === name.toLowerCase());
        if (existingItem) {
            existingItem.quantity += quantity;
            console.log(`[Item Updated] Incremented quantity of "${name}" by ${quantity} (Total: ${existingItem.quantity}).`);
        } else {
            this.items.push({
                name: name.trim(),
                price: Math.round(price * 100) / 100,
                quantity: Math.floor(quantity)
            });
            console.log(`[Item Added] "${name}" (Price: ₹${price.toFixed(2)}, Qty: ${quantity}) added to cart.`);
        }
    }

    /**
     * Calculates the subtotal of all items in the cart before any discounts.
     * @returns {number} Subtotal
     */
    getSubtotal() {
        return this.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    }

    /**
     * Validates and applies a discount coupon code using Regular Expressions.
     * Allowed formats: SAVE20, DISC10, SAVE50, DISC5, etc.
     * 
     * @param {string} couponCode - Coupon string (e.g. "SAVE20", "DISC10")
     * @returns {{ success: boolean, message: string, discountPercent: number }}
     */
    applyCoupon(couponCode) {
        if (!couponCode || typeof couponCode !== "string") {
            return {
                success: false,
                message: "Please enter a coupon code.",
                discountPercent: 0
            };
        }

        const trimmedCode = couponCode.trim().toUpperCase();

        /**
         * REGEXP BREAKDOWN:
         * ^(SAVE|DISC) -> Must begin with either "SAVE" or "DISC"
         * (\d{1,2})$   -> Followed by 1 or 2 numeric digits (representing % discount from 1 to 99)
         */
        const couponRegex = /^(SAVE|DISC)(\d{1,2})$/;
        const match = trimmedCode.match(couponRegex);

        if (!match) {
            console.log(`[COUPON REJECTED] "${couponCode}" is invalid. Format must be like 'SAVE20' or 'DISC10'.`);
            return {
                success: false,
                message: `Invalid coupon format "${couponCode}". Valid examples: SAVE20, DISC10.`,
                discountPercent: 0
            };
        }

        const prefix = match[1]; // "SAVE" or "DISC"
        const percent = parseInt(match[2], 10); // Extracted percentage

        if (percent <= 0 || percent > 90) {
            console.log(`[COUPON REJECTED] Discount rate (${percent}%) is outside valid promotional range (1-90%).`);
            return {
                success: false,
                message: `Discount percentage (${percent}%) is out of bounds.`,
                discountPercent: 0
            };
        }

        this.appliedCoupon = trimmedCode;
        this.discountPercent = percent;

        console.log(`[COUPON APPLIED] Valid coupon "${trimmedCode}" applied! You get ${percent}% OFF.`);
        return {
            success: true,
            message: `Coupon "${trimmedCode}" applied successfully (${percent}% OFF).`,
            discountPercent: percent
        };
    }

    /**
     * Computes the final total after applying validated coupon discount.
     * @returns {number} Final amount payable
     */
    getTotal() {
        const subtotal = this.getSubtotal();
        const discountAmount = (subtotal * this.discountPercent) / 100;
        const finalTotal = subtotal - discountAmount;
        return Math.round(finalTotal * 100) / 100;
    }

    /**
     * Prints an itemized invoice summary of the cart.
     */
    displayInvoice() {
        const subtotal = this.getSubtotal();
        const discountAmount = (subtotal * this.discountPercent) / 100;
        const total = this.getTotal();

        console.log("\n======================== INVOICE BREAKDOWN ========================");
        console.log("Items in Cart:");
        this.items.forEach((item, idx) => {
            const itemTotal = item.price * item.quantity;
            console.log(`  ${idx + 1}. ${item.name.padEnd(20)} | Qty: ${String(item.quantity).padEnd(3)} | Unit: ₹${item.price.toFixed(2).padEnd(8)} | Total: ₹${itemTotal.toFixed(2)}`);
        });
        console.log("-------------------------------------------------------------------");
        console.log(`  Subtotal                 : ₹${subtotal.toFixed(2)}`);
        if (this.appliedCoupon) {
            console.log(`  Coupon Applied           : ${this.appliedCoupon} (${this.discountPercent}% OFF)`);
            console.log(`  Discount Savings         : -₹${discountAmount.toFixed(2)}`);
        } else {
            console.log("  Coupon Applied           : None");
        }
        console.log("-------------------------------------------------------------------");
        console.log(`  FINAL TOTAL PAYABLE      : ₹${total.toFixed(2)}`);
        console.log("===================================================================\n");
    }
}

// ==============================================================================
// DEMONSTRATION & TEST CASES
// ==============================================================================

// 1. Initializing cart and adding items
const myCart = new Cart();
console.log("Adding items to the cart:\n");
myCart.addItem("Wireless Headphones", 2500, 1);
myCart.addItem("USB-C Hub", 1200, 2);
myCart.addItem("Laptop Backpack", 1800, 1);
console.log();

// 2. Checking subtotal before any coupon
console.log("Subtotal before coupon:", `₹${myCart.getSubtotal().toFixed(2)}`);
console.log();

// 3. Testing Coupon Validations with RegExp
console.log("------------------------------------------------------------------------------");
console.log("TESTING COUPON REGEXP VALIDATION");
console.log("------------------------------------------------------------------------------\n");

// Invalid coupon test 1: Wrong prefix
myCart.applyCoupon("OFF20");

// Invalid coupon test 2: Non-numeric suffix
myCart.applyCoupon("SAVETEN");

// Invalid coupon test 3: Percentage > 90%
myCart.applyCoupon("SAVE99");
console.log();

// Valid coupon test 1: DISC10 (10% discount)
console.log(">>> Applying Coupon 1: DISC10 <<<");
myCart.applyCoupon("DISC10");
myCart.displayInvoice();

// Valid coupon test 2: SAVE20 (20% discount)
console.log(">>> Applying Coupon 2: SAVE20 <<<");
myCart.applyCoupon("SAVE20");
myCart.displayInvoice();
