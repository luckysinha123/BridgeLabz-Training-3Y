"use strict";

/**
 * ==============================================================================
 * ASSIGNMENT 6 - QUESTION 10: The Final Delivery: Async Pipeline Debugger
 * ==============================================================================
 * 
 * Problem Statement:
 * You are building a food delivery simulation app. Each step of the delivery process
 * happens asynchronously.
 * 
 * Steps:
 * takeOrder → prepare → pack → dispatch → deliver
 * 
 * Tasks:
 * - Each returns a Promise with a random 1–2s delay and success/failure.
 * - Implement runPipeline() using async/await and try/catch.
 * - Log each step clearly:
 *     Start Pipeline
 *     Step 1: Order taken
 *     Step 2: Food prepared
 *     Step 3: Package ready
 *     Step 4: Out for delivery
 *     Delivery completed!
 * - If any step fails, print "Pipeline failed!".
 * - Add detailed comments explaining async behavior and event loop control flow.
 * 
 * Concepts Demonstrated:
 * - Asynchronous Multi-Stage State Machine
 * - async/await Flow Control & try/catch Error Interception
 * - Random Non-Deterministic Delays & Conditional Rejections
 * - Event Loop Lifecycle during Asynchronous Suspension & Resumption
 * ==============================================================================
 */

console.log("==============================================================================");
console.log("    ASSIGNMENT 6 - Q10: THE FINAL DELIVERY: ASYNC PIPELINE DEBUGGER           ");
console.log("==============================================================================\n");

// Helper to generate delay between 1000ms and 2000ms as requested
const getRandomDelay = (min = 1000, max = 2000) => 
    Math.floor(Math.random() * (max - min + 1)) + min;

// Simulated failure threshold (10% chance per step to allow observing both outcomes)
const STEP_FAILURE_RATE = 0.10;

/**
 * Generic step creator returning a Promise with 1-2s delay and success/failure.
 * 
 * @param {string} stepLog - Log text required by the prompt
 * @param {string} stepName - Internal name for debugging
 * @returns {Promise<string>}
 */
function createDeliveryStep(stepLog, stepName) {
    return new Promise((resolve, reject) => {
        const delay = getRandomDelay(1000, 2000);

        setTimeout(() => {
            const hasFailed = Math.random() < STEP_FAILURE_RATE;

            if (hasFailed) {
                reject(new Error(`Failure during stage: "${stepName}" (Simulated incident)`));
            } else {
                console.log(stepLog);
                resolve(stepLog);
            }
        }, delay);
    });
}

// ------------------------------------------------------------------------------
// Individual Pipeline Step Functions
// ------------------------------------------------------------------------------

/** Step 1: takeOrder */
function takeOrder() {
    return createDeliveryStep("Step 1: Order taken", "takeOrder");
}

/** Step 2: prepare */
function prepare() {
    return createDeliveryStep("Step 2: Food prepared", "prepare");
}

/** Step 3: pack */
function pack() {
    return createDeliveryStep("Step 3: Package ready", "pack");
}

/** Step 4: dispatch */
function dispatch() {
    return createDeliveryStep("Step 4: Out for delivery", "dispatch");
}

/** Step 5: deliver */
function deliver() {
    return createDeliveryStep("Delivery completed!", "deliver");
}

// ==============================================================================
// PIPELINE RUNNER: runPipeline() USING async/await AND try/catch
// ==============================================================================

/**
 * Orchestrates the full food delivery pipeline sequentially.
 */
async function runPipeline() {
    // Required initial log
    console.log("Start Pipeline");

    const startTime = Date.now();

    try {
        /**
         * EVENT LOOP & ASYNC BEHAVIOR CONTROL FLOW:
         * 
         * 1. When `await takeOrder()` is called, JavaScript pauses the execution
         *    of the `runPipeline` async function.
         * 2. The single main thread is NOT blocked; it is released to handle other
         *    events and render UI cycles while the timer ticks in the background.
         * 3. When the step's setTimeout callback fires and resolves the promise,
         *    a microtask is enqueued.
         * 4. The Event Loop drains the microtask, resumes `runPipeline` right where
         *    it paused, and proceeds to the next await step.
         */
        await takeOrder();
        await prepare();
        await pack();
        await dispatch();
        await deliver();

        const duration = ((Date.now() - startTime) / 1000).toFixed(1);
        console.log(`\n✔ Order successfully reached customer's doorstep in ${duration}s!`);
    } catch (error) {
        // Required prompt condition: If any step fails, print "Pipeline failed!"
        console.error("\nPipeline failed!");
        console.error(`Reason: ${error.message}`);
        console.error("Emergency Protocol: Customer notified, full refund issued.");
    } finally {
        console.log("\n==============================================================================");
        console.log("Pipeline execution finished.");
        console.log("==============================================================================\n");
    }
}

// Execute the pipeline
runPipeline();
