"use strict";

/**
 * ==============================================================================
 * ASSIGNMENT 6 - QUESTION 9: Debugging the Event Loop
 * ==============================================================================
 * 
 * Problem Statement:
 * You’re analyzing async behavior in JavaScript and want to confirm how microtasks
 * and macrotasks execute.
 * 
 * Task: Predict and Explain Execution Order
 * Run:
 * console.log("Script start");
 * setTimeout(() => console.log("Timeout callback"), 0);
 * Promise.resolve().then(() => console.log("Promise callback"));
 * console.log("Script end");
 * 
 * Requirements:
 * - Before running, write your predicted output order in comments.
 * - Then execute and compare actual results.
 * - Explain why Promises (microtasks) execute before setTimeout (macrotasks).
 * 
 * Concepts Demonstrated:
 * - JavaScript Concurrency Model & Event Loop
 * - Call Stack Execution
 * - Microtask Queue (Job Queue) vs Macrotask Queue (Task Queue)
 * - Event Loop Queue Draining Rules
 * ==============================================================================
 */

console.log("==============================================================================");
console.log("             ASSIGNMENT 6 - Q9: DEBUGGING THE EVENT LOOP                      ");
console.log("==============================================================================\n");

/**
 * ==============================================================================
 * PREDICTED OUTPUT ORDER (WRITTEN BEFORE EXECUTION):
 * ==============================================================================
 * 
 * Prediction:
 * 1. "Script start"       -> Synchronous log executed immediately on Call Stack.
 * 2. "Script end"         -> Synchronous log executed immediately on Call Stack.
 * 3. "Promise callback"   -> Microtask queue callback drained right after Call Stack empties.
 * 4. "Timeout callback"   -> Macrotask queue callback executed in subsequent event loop cycle.
 * ==============================================================================
 */

console.log("------------------------------------------------------------------------------");
console.log("RUNNING CODE FROM ASSIGNMENT SPECIFICATION:");
console.log("------------------------------------------------------------------------------\n");

// Code specified in Assignment:
console.log("Script start");

setTimeout(() => console.log("Timeout callback"), 0);

Promise.resolve().then(() => console.log("Promise callback"));

console.log("Script end");

/**
 * ==============================================================================
 * DETAILED EXPLANATION: WHY PROMISES (MICROTASKS) EXECUTE BEFORE SETTIMEOUT (MACROTASKS)
 * ==============================================================================
 * 
 * 1. Single Threaded Engine & The Call Stack:
 *    - JavaScript engines (like V8 in Node.js and Chrome) possess a single Call Stack.
 *    - Code running currently occupies the Call Stack. While synchronous code is
 *      executing, nothing else can run.
 * 
 * 2. Chronological Walkthrough:
 *    - Line 1: `console.log("Script start")` pushes to Call Stack -> prints -> pops.
 *    - Line 2: `setTimeout(..., 0)` calls Host Timer API. A timer for 0ms is registered.
 *              The browser/Node timer subsystem places the timer callback into the
 *              MACROTASK QUEUE (Task Queue).
 *    - Line 3: `Promise.resolve().then(...)` creates an already fulfilled promise.
 *              Its `.then()` reaction callback is enqueued into the MICROTASK QUEUE.
 *    - Line 4: `console.log("Script end")` pushes to Call Stack -> prints -> pops.
 *    - The main script file completes; the Call Stack is now completely EMPTY.
 * 
 * 3. Event Loop Priority Specification:
 *    - When the Call Stack empties, the Event Loop checks the MICROTASK QUEUE first.
 *    - The ECMAScript specification mandates:
 *      "All pending jobs in the Microtask Queue MUST be processed and drained completely
 *       before control yields to the Macrotask Queue or rendering."
 *    - Therefore, `console.log("Promise callback")` is dequeued and executed first.
 *    - Only when the Microtask Queue is completely empty does the Event Loop proceed
 *      to the Macrotask Queue, dequeuing and executing `console.log("Timeout callback")`.
 * 
 * 4. Summary Table of Queue Categories:
 *    ┌──────────────────┬────────────────────────────────────────────────────────┐
 *    │ Queue Type       │ Operations                                             │
 *    ├──────────────────┼────────────────────────────────────────────────────────┤
 *    │ Synchronous Code │ Direct function calls, arithmetic, variable assignment │
 *    │ Microtask Queue  │ Promise.then(), Promise.catch(), queueMicrotask()      │
 *    │ Macrotask Queue  │ setTimeout, setInterval, setImmediate, I/O, UI Events  │
 *    └──────────────────┴────────────────────────────────────────────────────────┘
 * ==============================================================================
 */
