/**
 * ==============================================================================
 * QUESTION 8: Dynamic Discount Evaluator
 * ==============================================================================
 * Requirements:
 * - Use an array of objects:
 *   const cart = [
 *     { item: "Laptop", category: "electronics", price: 45000 },
 *     { item: "Shoes", category: "fashion", price: 2500 },
 *     { item: "Book", category: "education", price: 600 }
 *   ];
 * - If category = "electronics" -> 10% discount
 * - If category = "fashion" -> 5% discount
 * - If total cart value > 50000 -> apply extra 5% overall discount.
 * - Use loops, conditionals, and reduce() to calculate the final total.
 * ==============================================================================
 */

console.log("==============================================================================");
console.log("QUESTION 8: E-COMMERCE DYNAMIC DISCOUNT & CART EVALUATOR");
console.log("==============================================================================");

// Step 1: Initialize the cart array of objects
const initialCart = [
    { item: "Laptop", category: "electronics", price: 45000 },
    { item: "Shoes", category: "fashion", price: 2500 },
    { item: "Book", category: "education", price: 600 }
];

/**
 * Calculates discounts and final bill using loops, conditionals, and reduce().
 * 
 * @param {Array<object>} cartItems - Array of product items in cart
 * @param {string} cartLabel - Label for reporting purposes
 */
function evaluateCart(cartItems, cartLabel = "Standard Cart") {
    console.log(`\n================== ${cartLabel.toUpperCase()} ==================`);

    // Step 2: Use a loop and conditionals to determine category discounts for each item
    const itemizedDetails = [];
    
    // For loop to process individual items and calculate itemized discounts
    for (let i = 0; i < cartItems.length; i++) {
        const product = cartItems[i];
        let discountRate = 0;

        // Conditionals checking product category
        if (product.category.toLowerCase() === "electronics") {
            discountRate = 0.10; // 10% discount
        } else if (product.category.toLowerCase() === "fashion") {
            discountRate = 0.05; // 5% discount
        } else {
            discountRate = 0.00; // No category discount for other categories
        }

        const discountAmount = product.price * discountRate;
        const finalItemPrice = product.price - discountAmount;

        itemizedDetails.push({
            Item: product.item,
            Category: product.category,
            "Original Price (₹)": product.price,
            "Discount %": `${discountRate * 100}%`,
            "Discount (₹)": discountAmount,
            "Price After Discount (₹)": finalItemPrice
        });
    }

    console.table(itemizedDetails);

    // Step 3: Use reduce() to calculate raw subtotal and total after category discounts
    const rawTotal = cartItems.reduce((acc, curr) => acc + curr.price, 0);

    const afterCategoryDiscountTotal = itemizedDetails.reduce((acc, curr) => {
        return acc + curr["Price After Discount (₹)"];
    }, 0);

    const totalCategorySavings = rawTotal - afterCategoryDiscountTotal;

    // Step 4: Conditionals to check if cart value exceeds ₹50,000 for extra 5% discount
    let extraDiscountRate = 0;
    let extraDiscountAmount = 0;
    let finalPayable = afterCategoryDiscountTotal;

    if (afterCategoryDiscountTotal > 50000) {
        extraDiscountRate = 0.05; // Additional 5% discount
        extraDiscountAmount = afterCategoryDiscountTotal * extraDiscountRate;
        finalPayable = afterCategoryDiscountTotal - extraDiscountAmount;
    }

    const totalOverallSavings = totalCategorySavings + extraDiscountAmount;

    // Step 5: Output structured checkout summary
    console.log("------------------------------------------------------------------------------");
    console.log("CHECKOUT SUMMARY & INVOICE BREAKDOWN");
    console.log("------------------------------------------------------------------------------");
    console.log(`Raw Cart Subtotal        : ₹${rawTotal.toFixed(2)}`);
    console.log(`Category Discount Savings: -₹${totalCategorySavings.toFixed(2)}`);
    console.log(`Subtotal After Category  : ₹${afterCategoryDiscountTotal.toFixed(2)}`);

    if (extraDiscountRate > 0) {
        console.log(`Extra 5% Threshold Bonus : -₹${extraDiscountAmount.toFixed(2)} (Applied: Cart > ₹50,000)`);
    } else {
        console.log(`Extra 5% Threshold Bonus : ₹0.00 (Not eligible: Cart <= ₹50,000)`);
    }

    console.log(`Total Savings            : ₹${totalOverallSavings.toFixed(2)}`);
    console.log(`FINAL PAYABLE AMOUNT     : ₹${finalPayable.toFixed(2)}`);
    console.log("------------------------------------------------------------------------------");

    return {
        rawTotal,
        afterCategoryDiscountTotal,
        extraDiscountAmount,
        finalPayable
    };
}

// Step 6: Test Case 1 - Default Cart from Assignment
evaluateCart(initialCart, "Cart 1 (Standard Items)");

// Step 7: Test Case 2 - Cart exceeding ₹50,000 to trigger the extra 5% overall discount
const highValueCart = [
    { item: "Gaming Laptop", category: "electronics", price: 65000 },
    { item: "Leather Boots", category: "fashion", price: 4000 },
    { item: "Smart Watch", category: "electronics", price: 8000 }
];

evaluateCart(highValueCart, "Cart 2 (High Value > ₹50,000)");

console.log("==============================================================================\n");
