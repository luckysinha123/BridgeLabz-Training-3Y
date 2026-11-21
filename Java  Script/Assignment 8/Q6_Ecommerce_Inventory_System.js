"use strict";

/**
 * ==============================================================================
 * ASSIGNMENT 8 - QUESTION 6: E-Commerce Inventory System (Array Methods)
 * ==============================================================================
 * 
 * Problem Statement:
 * You have an array of product objects with:
 * { id, name, category, price, stock }
 * 
 * Write functions using array methods:
 * 1. getLowStockProducts() → using filter()
 * 2. sortProductsByPrice() → using sort()
 * 3. calculateTotalInventoryValue() → using reduce()
 * 4. groupByCategory() → using reduce() + object grouping
 * 
 * Test using multiple category products.
 * 
 * Concepts Demonstrated:
 * - Array Filtering (Array.prototype.filter)
 * - Array Sorting with Immutability Preservation (slice() + sort())
 * - Total Aggregation (Array.prototype.reduce)
 * - Hash Map Grouping by Category Key via Array.prototype.reduce
 * ==============================================================================
 */

console.log("==============================================================================");
console.log("       ASSIGNMENT 8 - Q6: E-COMMERCE INVENTORY SYSTEM                         ");
console.log("==============================================================================\n");

// ==============================================================================
// MASTER INVENTORY DATA (MULTIPLE CATEGORIES)
// ==============================================================================
const inventory = [
    { id: 101, name: "Dell XPS 15 Laptop", category: "Electronics", price: 145000, stock: 4 },
    { id: 102, name: "Wireless Bluetooth Mouse", category: "Accessories", price: 1200, stock: 25 },
    { id: 103, name: "Organic Arabica Coffee (500g)", category: "Groceries", price: 650, stock: 3 },
    { id: 104, name: "Cotton Crewneck T-Shirt", category: "Apparel", price: 899, stock: 15 },
    { id: 105, name: "Mechanical Gaming Keyboard", category: "Accessories", price: 4500, stock: 2 },
    { id: 106, name: "Apple iPad Pro 11\"", category: "Electronics", price: 81900, stock: 6 },
    { id: 107, name: "Dark Chocolate Almonds", category: "Groceries", price: 350, stock: 50 },
    { id: 108, name: "Denim Slim Jeans", category: "Apparel", price: 2199, stock: 1 },
    { id: 109, name: "Noise-Cancelling Earbuds", category: "Electronics", price: 12999, stock: 8 },
    { id: 110, name: "Extra Virgin Olive Oil (1L)", category: "Groceries", price: 1100, stock: 12 }
];

console.log("Master Inventory Catalog (Total Items: " + inventory.length + "):\n");
console.table(inventory);
console.log();

// ==============================================================================
// FUNCTION 1: getLowStockProducts() USING filter()
// ==============================================================================
/**
 * Filters and returns products where stock is below a specified threshold.
 * 
 * @param {Array<Object>} products - Inventory array
 * @param {number} [threshold=5] - Stock re-order point
 * @returns {Array<Object>} Low stock items
 */
function getLowStockProducts(products, threshold = 5) {
    // Array.prototype.filter creates a new array of elements that pass test
    return products.filter(product => product.stock <= threshold);
}

console.log("------------------------------------------------------------------------------");
console.log("1. LOW STOCK PRODUCTS (filter() - Stock <= 5 units)");
console.log("------------------------------------------------------------------------------\n");

const lowStockItems = getLowStockProducts(inventory, 5);
console.log(`Identified ${lowStockItems.length} products requiring immediate restock:\n`);
lowStockItems.forEach(item => {
    console.log(`  [REORDER ALERT] ID: ${item.id} | "${item.name}" | Category: ${item.category} | Stock: ${item.stock} left`);
});
console.log();

// ==============================================================================
// FUNCTION 2: sortProductsByPrice() USING sort()
// ==============================================================================
/**
 * Sorts products by price (ascending or descending) without mutating original array.
 * 
 * @param {Array<Object>} products - Inventory array
 * @param {"asc"|"desc"} [order="asc"] - Sorting order
 * @returns {Array<Object>} Sorted array of products
 */
function sortProductsByPrice(products, order = "asc") {
    // Crucial: Use [...products] or slice() so original inventory is NOT mutated!
    return [...products].sort((a, b) => {
        return order === "desc" ? b.price - a.price : a.price - b.price;
    });
}

console.log("------------------------------------------------------------------------------");
console.log("2. SORT PRODUCTS BY PRICE (sort() - Ascending & Descending)");
console.log("------------------------------------------------------------------------------\n");

const sortedAsc = sortProductsByPrice(inventory, "asc");
console.log("Products Sorted by Price (Ascending - Cheapest to Most Expensive):");
sortedAsc.forEach((p, idx) => {
    console.log(`  ${idx + 1}. ₹${p.price.toLocaleString("en-IN").padEnd(10)} - ${p.name} (${p.category})`);
});
console.log();

// ==============================================================================
// FUNCTION 3: calculateTotalInventoryValue() USING reduce()
// ==============================================================================
/**
 * Calculates the total monetary valuation of all stock in inventory.
 * Formula: sum(price * stock)
 * 
 * @param {Array<Object>} products 
 * @returns {number}
 */
function calculateTotalInventoryValue(products) {
    // Array.prototype.reduce accumulates total monetary asset value
    return products.reduce((accumulatedValue, product) => {
        const itemValuation = product.price * product.stock;
        return accumulatedValue + itemValuation;
    }, 0);
}

console.log("------------------------------------------------------------------------------");
console.log("3. TOTAL INVENTORY ASSET VALUATION (reduce())");
console.log("------------------------------------------------------------------------------\n");

const totalInventoryValue = calculateTotalInventoryValue(inventory);
console.log(`Total Company Inventory Valuation: ₹${totalInventoryValue.toLocaleString("en-IN", { minimumFractionDigits: 2 })}`);
console.log();

// ==============================================================================
// FUNCTION 4: groupByCategory() USING reduce() + OBJECT GROUPING
// ==============================================================================
/**
 * Groups inventory products by their category name using Array.prototype.reduce().
 * 
 * @param {Array<Object>} products 
 * @returns {Object<string, Array<Object>>} Object mapping Category -> Array of Products
 */
function groupByCategory(products) {
    return products.reduce((groupedResult, product) => {
        const categoryKey = product.category;

        // If category key does not exist yet in accumulator object, initialize empty array
        if (!groupedResult[categoryKey]) {
            groupedResult[categoryKey] = [];
        }

        // Push current product into its category bucket
        groupedResult[categoryKey].push(product);

        return groupedResult;
    }, {});
}

console.log("------------------------------------------------------------------------------");
console.log("4. GROUP PRODUCTS BY CATEGORY (reduce() + Object Grouping)");
console.log("------------------------------------------------------------------------------\n");

const groupedInventory = groupByCategory(inventory);

for (const [categoryName, items] of Object.entries(groupedInventory)) {
    const categoryTotalValue = items.reduce((acc, it) => acc + (it.price * it.stock), 0);
    console.log(`📁 Category: "${categoryName}" (${items.length} product(s) | Value: ₹${categoryTotalValue.toLocaleString("en-IN")})`);
    items.forEach(it => {
        console.log(`    - ${it.name.padEnd(30)} | Price: ₹${it.price.toLocaleString("en-IN").padEnd(8)} | Stock: ${it.stock}`);
    });
    console.log();
}
console.log("==============================================================================\n");
