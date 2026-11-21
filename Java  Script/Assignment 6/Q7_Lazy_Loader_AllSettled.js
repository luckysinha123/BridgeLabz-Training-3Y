"use strict";

/**
 * ==============================================================================
 * ASSIGNMENT 6 - QUESTION 7: The Lazy Loader: Promise Combinator Practice
 * ==============================================================================
 * 
 * Problem Statement:
 * You’re managing a dashboard that loads multiple sections: profile, posts, and
 * messages. Each loads at a different speed.
 * 
 * Given async loaders:
 * function loadProfile()  { return new Promise(r => setTimeout(() => r("Profile Loaded"), 2000)); }
 * function loadPosts()    { return new Promise(r => setTimeout(() => r("Posts Loaded"), 1500)); }
 * function loadMessages() { return new Promise(r => setTimeout(() => r("Messages Loaded"), 1000)); }
 * 
 * Tasks:
 * - Use Promise.allSettled() to handle them together.
 * - Randomly reject one Promise.
 * - Print which modules succeeded or failed.
 * - Calculate total time taken using Date.now() before and after.
 * 
 * Concepts Demonstrated:
 * - Promise.allSettled() Combinator (Never short-circuits on rejection)
 * - Result Object Inspection ({ status: "fulfilled", value } vs { status: "rejected", reason })
 * - Performance & Latency Measurement using Date.now()
 * ==============================================================================
 */

console.log("==============================================================================");
console.log("     ASSIGNMENT 6 - Q7: THE LAZY LOADER: Promise.allSettled() PRACTICE        ");
console.log("==============================================================================\n");

// Randomly choose which section will fail during this execution run (0: Profile, 1: Posts, 2: Messages)
const randomlyRejectedIndex = Math.floor(Math.random() * 3);
const SECTION_NAMES = ["Profile", "Posts", "Messages"];

console.log(`[Simulation Setup] The '${SECTION_NAMES[randomlyRejectedIndex]}' module is designated to fail in this run.\n`);

/**
 * Loads User Profile Section (takes 2000ms).
 * @returns {Promise<string>}
 */
function loadProfile() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (randomlyRejectedIndex === 0) {
                reject(new Error("Profile service timeout: Authentication token expired"));
            } else {
                resolve("Profile Loaded");
            }
        }, 2000);
    });
}

/**
 * Loads User Posts Section (takes 1500ms).
 * @returns {Promise<string>}
 */
function loadPosts() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (randomlyRejectedIndex === 1) {
                reject(new Error("Posts service error: Database read replica offline"));
            } else {
                resolve("Posts Loaded");
            }
        }, 1500);
    });
}

/**
 * Loads User Messages Section (takes 1000ms).
 * @returns {Promise<string>}
 */
function loadMessages() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (randomlyRejectedIndex === 2) {
                reject(new Error("Messages socket disconnected: Network reset"));
            } else {
                resolve("Messages Loaded");
            }
        }, 1000);
    });
}

// ==============================================================================
// ASYNC DASHBOARD LOADER USING Promise.allSettled()
// ==============================================================================
async function loadDashboard() {
    console.log("Starting Dashboard Sections Loading in Parallel...");
    console.log("  - Loading Profile  (Estimated: 2.0s)");
    console.log("  - Loading Posts    (Estimated: 1.5s)");
    console.log("  - Loading Messages (Estimated: 1.0s)\n");

    // Capture starting timestamp
    const startTime = Date.now();

    // Trigger all loader promises concurrently
    const profilePromise = loadProfile();
    const postsPromise = loadPosts();
    const messagesPromise = loadMessages();

    // Use Promise.allSettled() to wait for all loaders to settle regardless of rejection
    const results = await Promise.allSettled([profilePromise, postsPromise, messagesPromise]);

    // Capture ending timestamp
    const endTime = Date.now();
    const totalTimeTaken = endTime - startTime;

    console.log("==============================================================================");
    console.log(">>> DASHBOARD SETTLEMENT REPORT <<<");
    console.log("==============================================================================\n");

    const modules = [
        { name: "User Profile", result: results[0] },
        { name: "User Posts", result: results[1] },
        { name: "Direct Messages", result: results[2] }
    ];

    modules.forEach(({ name, result }, idx) => {
        if (result.status === "fulfilled") {
            console.log(`  ✔ [SUCCEEDED] ${name.padEnd(16)} -> Status: "${result.status}" | Value: "${result.value}"`);
        } else {
            console.log(`  ✖ [FAILED]    ${name.padEnd(16)} -> Status: "${result.status}" | Reason: "${result.reason.message}"`);
        }
    });

    console.log("\n------------------------------------------------------------------------------");
    console.log("EXECUTION TIMING METRICS");
    console.log("------------------------------------------------------------------------------");
    console.log(`  Start Time       : ${new Date(startTime).toLocaleTimeString()}.${startTime % 1000}`);
    console.log(`  End Time         : ${new Date(endTime).toLocaleTimeString()}.${endTime % 1000}`);
    console.log(`  Total Time Taken : ${totalTimeTaken} ms (~${(totalTimeTaken / 1000).toFixed(2)} seconds)`);
    console.log(`  Explanation      : Because all 3 ran concurrently, the total time equals`);
    console.log(`                     the slowest promise (~2000ms), NOT their sum (4500ms)!`);
    console.log("==============================================================================\n");
}

loadDashboard();
