"use strict";

/**
 * ==============================================================================
 * ASSIGNMENT 6 - QUESTION 6: E-Commerce Dashboard: Product Card Fetcher
 * ==============================================================================
 * 
 * Problem Statement:
 * Your company is testing a new mock API for product listings. You need to display
 * product data dynamically using the Fake Store API.
 * 
 * Tasks:
 * - Use the Fake Store API: https://fakestoreapi.com/products
 * - Fetch product data using either fetch().then() or async/await.
 * - For each product, log:
 *   ○ Product Title
 *   ○ Price (with $ prefix)
 *   ○ Image URL
 * - Handle errors using try/catch and display "Failed to load products. Please try again."
 *   if the request fails.
 * - Bonus (Optional): Create HTML product cards dynamically using
 *   document.createElement() and append to the page.
 * 
 * Concepts Demonstrated:
 * - Native Fetch API & Asynchronous Network Requests
 * - async/await with try/catch Error Handling & Graceful Fallbacks
 * - Dynamic DOM Element Creation (document.createElement)
 * ==============================================================================
 */

const FAKE_STORE_API_URL = "https://fakestoreapi.com/products";

/**
 * Fetches products from the Fake Store API and logs product cards.
 * @param {string} [apiUrl=FAKE_STORE_API_URL]
 * @returns {Promise<Array<Object>>}
 */
async function fetchAndDisplayProducts(apiUrl = FAKE_STORE_API_URL) {
    console.log("------------------------------------------------------------------------------");
    console.log(`[HTTP Request] Fetching product data from: ${apiUrl}...`);
    console.log("------------------------------------------------------------------------------\n");

    try {
        // Fetch from API with a 5-second timeout controller
        const controller = typeof AbortController !== "undefined" ? new AbortController() : null;
        const timeoutId = controller ? setTimeout(() => controller.abort(), 6000) : null;

        const response = await fetch(apiUrl, {
            signal: controller ? controller.signal : undefined
        });

        if (timeoutId) clearTimeout(timeoutId);

        if (!response.ok) {
            throw new Error(`HTTP Error Status: ${response.status} ${response.statusText}`);
        }

        const products = await response.json();

        if (!Array.isArray(products) || products.length === 0) {
            throw new Error("No products returned by API.");
        }

        console.log(`✔ Successfully retrieved ${products.length} products from Fake Store API!\n`);

        // Log required details for each product (limiting to first 5 in console for clean viewing)
        const displayLimit = 5;
        console.log(`Displaying first ${displayLimit} products:\n`);

        products.slice(0, displayLimit).forEach((product, idx) => {
            console.log(`--- [Product #${idx + 1}] ---`);
            console.log(`Product: ${product.title}`);
            console.log(`Price: $${typeof product.price === "number" ? product.price.toFixed(2) : product.price}`);
            console.log(`Image: ${product.image}`);
            console.log();
        });

        // Bonus: If running in a browser DOM environment, append cards to the page
        if (typeof document !== "undefined") {
            renderHTMLProductCards(products);
        }

        return products;
    } catch (error) {
        // Prompt requirement: display "Failed to load products. Please try again." if the request fails
        console.error("==============================================================================");
        console.error("Failed to load products. Please try again.");
        console.error(`Technical Error Details: ${error.message}`);
        console.error("==============================================================================\n");

        // Optional local fallback simulation for offline testing
        console.log("[Fallback Simulation] Displaying cached mock catalog for testing purposes:\n");
        const mockProducts = [
            {
                id: 1,
                title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
                price: 109.95,
                image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
            },
            {
                id: 2,
                title: "Mens Casual Premium Slim Fit T-Shirts",
                price: 22.30,
                image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg"
            }
        ];

        mockProducts.forEach((product, idx) => {
            console.log(`Product: ${product.title}`);
            console.log(`Price: $${product.price.toFixed(2)}`);
            console.log(`Image: ${product.image}\n`);
        });

        return null;
    }
}

/**
 * BONUS IMPLEMENTATION:
 * Creates dynamic HTML product cards using document.createElement() and appends to the DOM.
 * @param {Array<Object>} products 
 */
function renderHTMLProductCards(products) {
    const container = document.getElementById("productCardsContainer");
    if (!container) return;

    container.innerHTML = ""; // Clear existing

    products.forEach(product => {
        // 1. Create outer card element
        const card = document.createElement("div");
        card.className = "product-card";
        card.style.border = "1px solid #e2e8f0";
        card.style.borderRadius = "8px";
        card.style.padding = "16px";
        card.style.background = "#ffffff";
        card.style.boxShadow = "0 2px 4px rgba(0,0,0,0.05)";
        card.style.display = "flex";
        card.style.flexDirection = "column";
        card.style.justifyContent = "space-between";
        card.style.transition = "transform 0.2s, box-shadow 0.2s";

        // 2. Product Image
        const img = document.createElement("img");
        img.src = product.image;
        img.alt = product.title;
        img.style.width = "100%";
        img.style.height = "160px";
        img.style.objectFit = "contain";
        img.style.marginBottom = "12px";

        // 3. Product Title
        const title = document.createElement("h4");
        title.textContent = product.title;
        title.style.fontSize = "0.95rem";
        title.style.margin = "0 0 8px";
        title.style.color = "#1e293b";
        title.style.lineHeight = "1.3";

        // 4. Product Price
        const price = document.createElement("div");
        price.textContent = `$${typeof product.price === "number" ? product.price.toFixed(2) : product.price}`;
        price.style.fontSize = "1.1rem";
        price.style.fontWeight = "bold";
        price.style.color = "#16a34a";
        price.style.marginTop = "auto";

        // Append children
        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(price);

        // Append card to container
        container.appendChild(card);
    });

    console.log(`[DOM Bonus] Rendered ${products.length} product cards using document.createElement()!`);
}

// ==============================================================================
// EXECUTION
// ==============================================================================
console.log("==============================================================================");
console.log("      ASSIGNMENT 6 - Q6: E-COMMERCE DASHBOARD: PRODUCT CARD FETCHER           ");
console.log("==============================================================================\n");

// Execute the fetcher
fetchAndDisplayProducts();
