/**
 * Question 6: Progressive Discount System
 * 
 * Requirements:
 * - Input total purchase amount.
 * - If total >= 10000 -> 25% discount.
 * - Else if >= 5000 -> 15% discount.
 * - Else if >= 2000 -> 5% discount.
 * - Otherwise -> no discount.
 * - Calculate and print:
 *   - Original total
 *   - Discount percentage
 *   - Final price after discount
 * - Use Math.round() for rounding.
 */

// Step 1: Input total purchase amount
const totalPurchaseAmount = 7450.75;

let discountPercentage = 0;

// Step 2: Determine progressive discount tier
if (totalPurchaseAmount >= 10000) {
    discountPercentage = 25;
} else if (totalPurchaseAmount >= 5000) {
    discountPercentage = 15;
} else if (totalPurchaseAmount >= 2000) {
    discountPercentage = 5;
} else {
    discountPercentage = 0;
}

// Step 3: Calculate discount and final amount
const discountAmount = (totalPurchaseAmount * discountPercentage) / 100;
const rawFinalPrice = totalPurchaseAmount - discountAmount;
const finalPrice = Math.round(rawFinalPrice); // Rounded using Math.round()

// Step 4: Display results
console.log(`Original Total Purchase : Rs. ${totalPurchaseAmount.toFixed(2)}`);
console.log(`Discount Percentage     : ${discountPercentage}%`);
console.log(`Discount Amount Saved   : Rs. ${discountAmount.toFixed(2)}`);
console.log(`Final Price After Disc. : Rs. ${finalPrice} (Rounded using Math.round())`);
