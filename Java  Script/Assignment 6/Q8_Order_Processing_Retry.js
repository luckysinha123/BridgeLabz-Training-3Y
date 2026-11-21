"use strict";

/**
 * ==============================================================================
 * ASSIGNMENT 6 - QUESTION 8: Order Processing Flow: Async Retry Mechanism
 * ==============================================================================
 * 
 * Problem Statement:
 * Your order submission API often fails randomly. Implement a retry system that
 * attempts multiple times before giving up.
 * 
 * Tasks:
 * - Create submitOrder() returning a Promise that fails 50% of the time.
 * - Create an async function processOrder() that:
 *   ○ Tries up to 3 times using a loop + await.
 *   ○ Logs "Attempt X: Success" or "Attempt X: Failed".
 *   ○ Throws "Order could not be processed" if all fail.
 * - Use try/catch to handle final failure gracefully.
 * 
 * Concepts Demonstrated:
 * - Asynchronous Retry Pattern with Exponential/Linear Backoff
 * - async/await Loop Control Flow
 * - Propagating and Catching Failures Gracefully
 * ==============================================================================
 */

console.log("==============================================================================");
console.log("     ASSIGNMENT 6 - Q8: ORDER PROCESSING FLOW: ASYNC RETRY MECHANISM          ");
console.log("==============================================================================\n");

/**
 * Simulates placing an order to an unstable gateway.
 * Resolves with order details or rejects with 50% probability.
 * 
 * @param {Object} orderDetails - The order payload
 * @returns {Promise<{ orderId: string, status: string }>}
 */
function submitOrder(orderDetails) {
    return new Promise((resolve, reject) => {
        // Latency simulation (300ms)
        setTimeout(() => {
            const isFailure = Math.random() < 0.5; // 50% chance of failure

            if (isFailure) {
                reject(new Error("504 Gateway Timeout: Payment gateway dropped connection."));
            } else {
                resolve({
                    orderId: "ORD-" + Math.floor(100000 + Math.random() * 900000),
                    status: "CONFIRMED",
                    item: orderDetails.item,
                    amount: orderDetails.amount
                });
            }
        }, 300);
    });
}

/**
 * Processes the order with an automatic retry policy (up to 3 attempts).
 * 
 * @param {Object} orderData - Information about the order
 * @param {number} [maxAttempts=3] - Maximum retry attempts
 * @returns {Promise<Object>} Confirmed order object
 * @throws {Error} If all retry attempts are exhausted
 */
async function processOrder(orderData, maxAttempts = 3) {
    console.log(`Processing Order for: "${orderData.item}" (₹${orderData.amount}). Maximum attempts allowed: ${maxAttempts}\n`);

    let lastError = null;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            console.log(`[Transaction] Initiating payment request... (Attempt ${attempt}/${maxAttempts})`);

            // Await order submission promise
            const confirmedOrder = await submitOrder(orderData);

            // Log required exact message: "Attempt X: Success"
            console.log(`  ✔ Attempt ${attempt}: Success`);
            console.log(`    Order Confirmation: ${confirmedOrder.orderId} (Status: ${confirmedOrder.status})\n`);

            return confirmedOrder;
        } catch (error) {
            // Log required exact message: "Attempt X: Failed"
            console.log(`  ✖ Attempt ${attempt}: Failed (${error.message})`);
            lastError = error;

            // If attempts remain, wait briefly before retrying
            if (attempt < maxAttempts) {
                console.log(`    Retrying in 400ms...\n`);
                await new Promise(resolve => setTimeout(resolve, 400));
            }
        }
    }

    // Required prompt condition: Throws "Order could not be processed" if all fail
    console.log();
    throw new Error("Order could not be processed");
}

// ==============================================================================
// RUNNING AND HANDLING FINAL SUCCESS OR FAILURE GRACEFULLY WITH try/catch
// ==============================================================================
async function executeOrderWorkflow() {
    const sampleOrder = {
        item: "Sony WH-1000XM5 Wireless Headphones",
        amount: 29990
    };

    try {
        console.log("------------------------------------------------------------------------------");
        console.log("STARTING ORDER CHECKOUT PIPELINE");
        console.log("------------------------------------------------------------------------------\n");

        const result = await processOrder(sampleOrder, 3);

        console.log("==============================================================================");
        console.log("🎉 ORDER PROCESSED SUCCESSFULLY!");
        console.log(`Receipt: Your order for "${result.item}" was placed successfully.`);
        console.log(`Booking Reference: ${result.orderId}`);
        console.log("==============================================================================\n");
    } catch (finalError) {
        // Graceful handling of final failure
        console.error("==============================================================================");
        console.error(`❌ CHECKOUT FAILED: "${finalError.message}"`);
        console.error("Notice: All 3 retry attempts have been exhausted.");
        console.error("Action: Your card has NOT been charged. Please check your network and try again.");
        console.error("==============================================================================\n");
    }
}

executeOrderWorkflow();
