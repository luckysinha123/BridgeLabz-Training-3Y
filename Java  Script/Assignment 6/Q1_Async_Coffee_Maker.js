"use strict";

/**
 * ==============================================================================
 * ASSIGNMENT 6 - QUESTION 1: The Startup Morning: Async Coffee Maker
 * ==============================================================================
 * 
 * Problem Statement:
 * Every morning, the development team starts with a strong cup of coffee.
 * You've been assigned to automate the process virtually! The coffee preparation
 * involves three asynchronous steps:
 * 1. Boiling water
 * 2. Brewing coffee
 * 3. Pouring into a cup
 * 
 * Tasks:
 * - Each step should be a function returning a Promise that resolves after 1–2 seconds.
 * - Use Promise chaining (.then()) to simulate the process.
 * - Print logs for each step and finally display: "Coffee ready for the team!"
 * - Use .catch() to handle any failure (simulate random failure using Math.random()).
 * 
 * Concepts Demonstrated:
 * - Promise Construction (new Promise(resolve, reject))
 * - Promise Chaining (.then() pipeline)
 * - Error Handling with .catch()
 * - Simulating Real-World Asynchronous Workflows with setTimeout
 * ==============================================================================
 */

console.log("==============================================================================");
console.log("       ASSIGNMENT 6 - Q1: THE STARTUP MORNING: ASYNC COFFEE MAKER             ");
console.log("==============================================================================\n");

// Helper function to generate a random delay between min and max milliseconds
const getRandomDelay = (min = 1000, max = 1500) => 
    Math.floor(Math.random() * (max - min + 1)) + min;

// Failure rate threshold (e.g. 15% chance of simulated appliance glitch)
const FAILURE_RATE = 0.15;

/**
 * Step 1: Asynchronously boils water.
 * @returns {Promise<string>}
 */
function boilWater() {
    return new Promise((resolve, reject) => {
        const delay = getRandomDelay(1000, 1500);
        console.log(`[Step 1] Heating kettle... (Estimated time: ${(delay / 1000).toFixed(1)}s)`);

        setTimeout(() => {
            if (Math.random() < FAILURE_RATE) {
                reject(new Error("Kettle malfunction: Water temperature sensor fault!"));
            } else {
                console.log("  ✔ Water boiled to 95°C.");
                resolve("Hot Boiled Water");
            }
        }, delay);
    });
}

/**
 * Step 2: Asynchronously brews freshly ground coffee.
 * @param {string} water - Ingredient from previous step
 * @returns {Promise<string>}
 */
function brewCoffee(water) {
    return new Promise((resolve, reject) => {
        const delay = getRandomDelay(1000, 1500);
        console.log(`[Step 2] Infusing roasted Arabica grounds with ${water}... (${(delay / 1000).toFixed(1)}s)`);

        setTimeout(() => {
            if (Math.random() < FAILURE_RATE) {
                reject(new Error("Brewing error: Espresso grind was too fine, pump clogged!"));
            } else {
                console.log("  ✔ Rich espresso brewed perfectly.");
                resolve("Freshly Brewed Espresso");
            }
        }, delay);
    });
}

/**
 * Step 3: Asynchronously pours coffee into team mugs.
 * @param {string} coffee - Brewed coffee from previous step
 * @returns {Promise<string>}
 */
function pourIntoCup(coffee) {
    return new Promise((resolve, reject) => {
        const delay = getRandomDelay(1000, 1500);
        console.log(`[Step 3] Pouring ${coffee} into team mugs... (${(delay / 1000).toFixed(1)}s)`);

        setTimeout(() => {
            if (Math.random() < FAILURE_RATE) {
                reject(new Error("Spill error: Mug slipped while pouring!"));
            } else {
                console.log("  ✔ Coffee poured into cups with silky crema.");
                resolve("Poured Coffee");
            }
        }, delay);
    });
}

// ==============================================================================
// SIMULATION EXECUTION: PROMISE CHAINING (.then() -> .then() -> .catch())
// ==============================================================================
console.log("☕ Starting Automated Startup Coffee Maker Pipeline...\n");

boilWater()
    // Chain Step 2: Brewing
    .then((boiledWater) => {
        return brewCoffee(boiledWater);
    })
    // Chain Step 3: Pouring
    .then((brewedCoffee) => {
        return pourIntoCup(brewedCoffee);
    })
    // Final Success Notification
    .then(() => {
        console.log("\n==============================================================================");
        console.log("🎉 SUCCESS: \"Coffee ready for the team!\"");
        console.log("==============================================================================\n");
    })
    // Catch-all error handler for any stage in the chain
    .catch((error) => {
        console.error("\n==============================================================================");
        console.error(`❌ COFFEE PIPELINE FAILED: ${error.message}`);
        console.error("Please clean the machine and restart the brew.");
        console.error("==============================================================================\n");
    });
