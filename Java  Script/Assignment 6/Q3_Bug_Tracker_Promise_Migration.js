"use strict";

/**
 * ==============================================================================
 * ASSIGNMENT 6 - QUESTION 3: Bug Tracker: Callback to Promise Migration
 * ==============================================================================
 * 
 * Problem Statement:
 * Your old bug-tracking code still relies on callbacks. The QA team wants a cleaner,
 * Promise-based solution.
 * 
 * Original function:
 * function fetchBugs(callback) {
 *     setTimeout(() => callback(["UI glitch", "API timeout", "Login failure"]), 1000);
 * }
 * 
 * Tasks:
 * - Convert it into a Promise-based version named getBugs().
 * - Log all bugs neatly using console.table().
 * - Simulate random API failure using a boolean and handle it using .catch().
 * 
 * Concepts Demonstrated:
 * - Refactoring Callback-based APIs into Promises (Promisification)
 * - Handling Conditional Rejections (reject(new Error(...)))
 * - Visualizing Array Data with console.table()
 * - Clean Asynchronous Consumption with .then() and .catch()
 * ==============================================================================
 */

console.log("==============================================================================");
console.log("       ASSIGNMENT 6 - Q3: BUG TRACKER: CALLBACK TO PROMISE MIGRATION          ");
console.log("==============================================================================\n");

// ------------------------------------------------------------------------------
// 1. ORIGINAL LEGACY CALLBACK IMPLEMENTATION (FOR REFERENCE)
// ------------------------------------------------------------------------------
/**
 * Legacy Callback-based bug fetcher.
 * @param {Function} callback 
 */
function fetchBugs(callback) {
    console.log("[Legacy fetchBugs] Querying bug database via callback pattern...");
    setTimeout(() => {
        callback(["UI glitch", "API timeout", "Login failure"]);
    }, 1000);
}

// ------------------------------------------------------------------------------
// 2. MODERN PROMISE-BASED IMPLEMENTATION: getBugs()
// ------------------------------------------------------------------------------
/**
 * Fetches the current active bug tickets from the QA tracker.
 * Returns a Promise that resolves with formatted bug objects or rejects on failure.
 * 
 * @param {boolean} [shouldSimulateFailure=false] - Optional flag to force failure simulation
 * @returns {Promise<Array<{ bugId: string, title: string, severity: string, status: string }>>}
 */
function getBugs(shouldSimulateFailure = false) {
    return new Promise((resolve, reject) => {
        console.log("[getBugs] Initiating asynchronous request to Bug Database...");

        setTimeout(() => {
            // Determine failure either by parameter or random probability (30% chance)
            const isApiFailing = shouldSimulateFailure || Math.random() < 0.3;

            if (isApiFailing) {
                // Reject with a descriptive Error object
                reject(new Error("503 Service Unavailable: QA Bug Database connection timed out!"));
            } else {
                // Resolve with structured bug objects
                const bugs = [
                    { bugId: "BUG-101", title: "UI glitch on checkout button hover", severity: "Low", status: "Open" },
                    { bugId: "BUG-102", title: "API timeout on large CSV report export", severity: "High", status: "In Progress" },
                    { bugId: "BUG-103", title: "Login failure when special characters in password", severity: "Critical", status: "Investigating" },
                    { bugId: "BUG-104", title: "Memory leak in real-time notification socket", severity: "Medium", status: "Assigned" }
                ];
                resolve(bugs);
            }
        }, 1000);
    });
}

// ==============================================================================
// DEMONSTRATION 1: SUCCESSFUL EXECUTION WITH console.table()
// ==============================================================================
console.log(">>> DEMONSTRATION 1: Successful Fetch (shouldSimulateFailure = false) <<<\n");

getBugs(false)
    .then((bugList) => {
        console.log(`✔ Successfully fetched ${bugList.length} active bug reports from tracker:`);
        console.table(bugList);
        console.log();
    })
    .catch((err) => {
        console.error(`✖ Fetch failed: ${err.message}`);
    })
    .finally(() => {
        // Run Demonstration 2 after Demonstration 1 finishes
        runFailureDemonstration();
    });

// ==============================================================================
// DEMONSTRATION 2: SIMULATED API FAILURE HANDLED BY .catch()
// ==============================================================================
function runFailureDemonstration() {
    console.log("------------------------------------------------------------------------------");
    console.log(">>> DEMONSTRATION 2: Simulated API Failure (shouldSimulateFailure = true) <<<");
    console.log("------------------------------------------------------------------------------\n");

    getBugs(true)
        .then((bugList) => {
            console.log("Unexpected success:", bugList);
        })
        .catch((error) => {
            console.error(`[Error Caught by .catch()]:`);
            console.error(`  Status Code : 503`);
            console.error(`  Reason      : ${error.message}`);
            console.error("  Action Taken: Automatic alert dispatched to QA On-Call Engineer.\n");
        })
        .finally(() => {
            console.log("==============================================================================\n");
        });
}
