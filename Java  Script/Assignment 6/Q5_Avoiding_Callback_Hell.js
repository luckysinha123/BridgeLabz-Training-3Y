"use strict";

/**
 * ==============================================================================
 * ASSIGNMENT 6 - QUESTION 5: Frontend Rush: Avoiding Callback Hell
 * ==============================================================================
 * 
 * Problem Statement:
 * Your UI team has a messy callback chain for its build pipeline.
 * You must rewrite it to improve readability.
 * 
 * Tasks:
 * - The pipeline includes 5 async stages:
 *   design → build → test → deploy → celebrate.
 * - Each stage takes 1 second and logs its step.
 * - Implement first using nested callbacks (to show callback hell / pyramid of doom).
 * - Then rewrite using async/await for cleaner flow.
 * - Comment on why async/await improves readability.
 * 
 * Concepts Demonstrated:
 * - Callback Hell (Pyramid of Doom, high indentation, tight coupling)
 * - Refactoring to Promises + async/await (linear, readable asynchronous code)
 * - Error propagation comparison between callback pyramids and try/catch blocks
 * ==============================================================================
 */

console.log("==============================================================================");
console.log("        ASSIGNMENT 6 - Q5: FRONTEND RUSH: AVOIDING CALLBACK HELL              ");
console.log("==============================================================================\n");

// ==============================================================================
// PART 1: THE PROBLEMATIC IMPLEMENTATION - NESTED CALLBACKS (CALLBACK HELL)
// ==============================================================================
console.log("------------------------------------------------------------------------------");
console.log("PART 1: DEMONSTRATING CALLBACK HELL (PYRAMID OF DOOM)");
console.log("------------------------------------------------------------------------------\n");

// Callback-style functions
function stepDesignCallback(next) {
    setTimeout(() => {
        console.log("  [Callback Hell Step 1] Design finalized.");
        next();
    }, 1000);
}

function stepBuildCallback(next) {
    setTimeout(() => {
        console.log("  [Callback Hell Step 2] Build assets compiled.");
        next();
    }, 1000);
}

function stepTestCallback(next) {
    setTimeout(() => {
        console.log("  [Callback Hell Step 3] Automated test suites passed.");
        next();
    }, 1000);
}

function stepDeployCallback(next) {
    setTimeout(() => {
        console.log("  [Callback Hell Step 4] Deployed to production CDN.");
        next();
    }, 1000);
}

function stepCelebrateCallback() {
    setTimeout(() => {
        console.log("  [Callback Hell Step 5] 🎉 Team celebration: Cake & Coffee ready!");
        console.log("\n------------------------------------------------------------------------------");
        console.log("Callback Hell demonstration completed. Starting Modern async/await...");
        console.log("------------------------------------------------------------------------------\n");
        // Trigger Modern async/await pipeline
        runModernAsyncPipeline();
    }, 1000);
}

// Running the nested callback pyramid:
console.log("Starting Callback Hell Pipeline (Notice horizontal indentation growth):\n");
stepDesignCallback(() => {
    stepBuildCallback(() => {
        stepTestCallback(() => {
            stepDeployCallback(() => {
                stepCelebrateCallback();
            });
        });
    });
});

// ==============================================================================
// PART 2: THE MODERN SOLUTION - async/await REWRITE
// ==============================================================================

/**
 * Generic Promise-based delay helper representing each stage cleanly.
 * @param {string} stepName - Description of the stage
 * @param {number} [duration=1000] - Duration in ms
 * @returns {Promise<string>}
 */
function runStage(stepName, duration = 1000) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`  [async/await] ${stepName}`);
            resolve(stepName);
        }, duration);
    });
}

/**
 * Clean, readable async/await pipeline implementation.
 */
async function runModernAsyncPipeline() {
    console.log(">>> PART 2: MODERN PIPELINE REWRITTEN WITH async/await <<<\n");
    console.log("Pipeline starting in clean synchronous-looking sequential code:\n");

    const startTime = Date.now();

    try {
        await runStage("Stage 1/5: Design finalized (Figma mocks approved)");
        await runStage("Stage 2/5: Build compiled (Vite bundles optimized)");
        await runStage("Stage 3/5: Tests passed (100% unit & E2E coverage)");
        await runStage("Stage 4/5: Deployed (Live on production servers)");
        await runStage("Stage 5/5: 🎉 Celebrate: Frontend launch successful!");

        const totalTime = ((Date.now() - startTime) / 1000).toFixed(1);
        console.log(`\n✔ Full pipeline successfully executed in ${totalTime} seconds!\n`);
    } catch (error) {
        console.error("Pipeline crashed at step:", error.message);
    }

    printComparisonExplanation();
}

// ==============================================================================
// PART 3: DETAILED EXPLANATION: WHY async/await IMPROVES READABILITY
// ==============================================================================
function printComparisonExplanation() {
    console.log("------------------------------------------------------------------------------");
    console.log("WHY async/await DRAMATICALLY IMPROVES CODE QUALITY & READABILITY");
    console.log("------------------------------------------------------------------------------");
    console.log(`
1. Linear Flow vs Inverted Control:
   - Nested callbacks invert control and force logic to grow horizontally (to the right),
     creating the dreaded "Pyramid of Doom".
   - 'async/await' allows developers to write asynchronous code that reads sequentially
     from top to bottom, identical to standard synchronous code.

2. Unified Error Handling:
   - In callbacks, each nested level requires repetitive manual error handling:
     if (err) return handleError(err);
   - With 'async/await', standard 'try/catch' blocks catch any failure across the entire
     chain, making maintenance and debugging straightforward.

3. Variable Scoping & Closures:
   - In callback pyramids, intermediate variables remain tangled in nested closure scopes.
   - With 'async/await', variables can be declared cleanly with 'const' or 'let' in the
     function scope without nested function wrapping.

4. Stack Traces & Debugging:
   - Native 'async/await' preserves clean Call Stack traces across asynchronous boundaries,
     making breakpoint debugging in Chrome DevTools or Node.js effortless.
==============================================================================\n`);
}
