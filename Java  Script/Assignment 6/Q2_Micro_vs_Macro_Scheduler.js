"use strict";

/**
 * ==============================================================================
 * ASSIGNMENT 6 - QUESTION 2: Task Scheduler: Micro vs Macro Challenge
 * ==============================================================================
 * 
 * Problem Statement:
 * You’ve been debugging a frontend lag issue and need to visualize how the
 * JavaScript Event Loop prioritizes tasks.
 * 
 * Tasks:
 * - Log "Start".
 * - Add:
 *   ○ One setTimeout() callback (macrotask).
 *   ○ One resolved Promise.then() callback (microtask).
 *   ○ One synchronous log.
 * - Finally, log "End".
 * - Run the program and explain (in comments) why microtasks run before macrotasks.
 * 
 * Concepts Demonstrated:
 * - JavaScript Concurrency Model & Event Loop
 * - Call Stack vs Microtask Queue (Jobs) vs Macrotask/Task Queue
 * - Prioritization: Synchronous Code -> Microtasks -> Macrotasks
 * ==============================================================================
 */

console.log("==============================================================================");
console.log("     ASSIGNMENT 6 - Q2: TASK SCHEDULER: MICRO VS MACRO CHALLENGE              ");
console.log("==============================================================================\n");

// ------------------------------------------------------------------------------
// PROGRAM EXECUTION ORDER DEMONSTRATION
// ------------------------------------------------------------------------------

// 1. Initial Synchronous Log
console.log("Start");

// 2. Macrotask (Task Queue)
// setTimeout schedules its callback into the Macrotask Queue (Timer API)
setTimeout(() => {
    console.log("Macrotask Callback: [setTimeout (0ms)]");
}, 0);

// 3. Microtask (Microtask Queue)
// Promise.resolve().then schedules its callback into the Microtask Queue
Promise.resolve().then(() => {
    console.log("Microtask Callback: [Promise.then()]");
});

// 4. Synchronous Log
console.log("Intermediate Synchronous Log: Processing UI frames...");

// 5. Final Synchronous Log
console.log("End");

/**
 * ==============================================================================
 * IN-DEPTH TECHNICAL EXPLANATION: WHY MICROTASKS RUN BEFORE MACROTASKS
 * ==============================================================================
 * 
 * 1. The Call Stack & Synchronous Execution:
 *    - JavaScript is single-threaded. Synchronous code executes immediately on
 *      the Call Stack from top to bottom.
 *    - When `console.log("Start")` is encountered, it is pushed to the stack,
 *      prints, and is popped off.
 *    - Next, `setTimeout(..., 0)` is invoked. Node.js/Browser Web APIs register
 *      the timer and immediately enqueue the callback into the MACROTASK QUEUE.
 *    - Then, `Promise.resolve().then(...)` is invoked. Because the promise is
 *      already resolved, its reaction job is enqueued into the MICROTASK QUEUE.
 *    - The stack continues with the synchronous log and finally `console.log("End")`.
 * 
 * 2. Event Loop Priority Rule (The "Tick" Cycle):
 *    - The Event Loop continuously monitors the Call Stack.
 *    - Once the Call Stack becomes completely EMPTY (after `console.log("End")`),
 *      the Event Loop checks the queues.
 *    - SPECIFICATION RULE (HTML / ECMAScript specs):
 *      "Before picking the next Macrotask, the engine MUST completely drain all
 *       pending jobs in the Microtask Queue until it is 100% empty."
 * 
 * 3. Step-by-Step Output Timeline:
 *    ┌───────┬──────────────────────────────────┬─────────────────────────────┐
 *    │ Step  │ Action                           │ Reason                      │
 *    ├───────┼──────────────────────────────────┼─────────────────────────────┤
 *    │ 1     │ "Start"                          │ Synchronous (Stack top)     │
 *    │ 2     │ "Intermediate Synchronous Log"   │ Synchronous (Stack top)     │
 *    │ 3     │ "End"                            │ Synchronous (Stack top)     │
 *    │ 4     │ "Microtask Callback: ..."        │ Microtask Queue drained 1st │
 *    │ 5     │ "Macrotask Callback: ..."        │ Macrotask Queue dequeued 2nd│
 *    └───────┴──────────────────────────────────┴─────────────────────────────┘
 * 
 * 4. Why Was This Designed This Way?
 *    Microtasks (like Promises, MutationObserver, queueMicrotask, process.nextTick)
 *    are intended for short, high-priority state reactions that must be committed
 *    before user interface rendering or subsequent I/O events (macrotasks) occur.
 * ==============================================================================
 */
