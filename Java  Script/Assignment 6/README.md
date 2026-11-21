# ASSIGNMENT 6 - ASYNCHRONOUS PROGRAMMING IN JAVASCRIPT
## BridgeLabz Training - 3rd Year Full Stack Curriculum

---

### Overview
This repository contains the verified solutions for **Assignment 6**, focusing on **Asynchronous Programming with Core JavaScript (ES6+)**. The questions cover **Promises, Promise Chaining (`.then()`, `.catch()`), Promise Combinators (`Promise.all()`, `Promise.race()`, `Promise.allSettled()`), `async/await`, Event Loop Execution Order (Microtasks vs Macrotasks), Async Retry Logic, and Real-world Pipeline Implementations**.

All solutions adhere to strict ES6+ coding standards, require no external dependencies or frameworks, and include descriptive comments and formatted console output.

---

### File Index & Question Mapping

| File Name | Question | Concepts Covered |
| :--- | :--- | :--- |
| [`Q1_Async_Coffee_Maker.js`](./Q1_Async_Coffee_Maker.js) | **Q1: The Startup Morning: Async Coffee Maker** | Multi-step Promise Chaining (`.then()`), Random Failure Simulation, `.catch()` Error Recovery |
| [`Q2_Micro_vs_Macro_Scheduler.js`](./Q2_Micro_vs_Macro_Scheduler.js) | **Q2: Task Scheduler: Micro vs Macro Challenge** | Event Loop Prioritization, Call Stack $\rightarrow$ Microtask Queue $\rightarrow$ Macrotask Queue |
| [`Q3_Bug_Tracker_Promise_Migration.js`](./Q3_Bug_Tracker_Promise_Migration.js) | **Q3: Bug Tracker: Callback to Promise Migration** | Promisification of Legacy Callback Code, `console.table()` Output, Conditional Rejections |
| [`Q4_DevOps_Delay_Race.js`](./Q4_DevOps_Delay_Race.js) | **Q4: DevOps Delay: Async Timeout Race** | `Promise.race()` (Fastest Responder) vs `Promise.all()` (Full Cluster Completion), Error Handling |
| [`Q5_Avoiding_Callback_Hell.js`](./Q5_Avoiding_Callback_Hell.js) | **Q5: Frontend Rush: Avoiding Callback Hell** | Refactoring 5-Stage Callback Pyramid into Clean `async/await` Pipeline with Readability Notes |
| [`Q6_Product_Card_Fetcher.js`](./Q6_Product_Card_Fetcher.js) | **Q6: E-Commerce Dashboard: Product Card Fetcher** | Fetching Real API Data (`https://fakestoreapi.com/products`), `try/catch` Fallbacks, Dynamic HTML Card Generation |
| [`Q7_Lazy_Loader_AllSettled.js`](./Q7_Lazy_Loader_AllSettled.js) | **Q7: The Lazy Loader: Promise Combinator Practice** | `Promise.allSettled()` Handling Concurrent Async Loaders, Status Inspection, `Date.now()` Latency Metrics |
| [`Q8_Order_Processing_Retry.js`](./Q8_Order_Processing_Retry.js) | **Q8: Order Processing Flow: Async Retry Mechanism** | 3-Attempt Retry Policy via `for` Loop + `await`, Exponential Backoff, Graceful `try/catch` Interception |
| [`Q9_Event_Loop_Debugging.js`](./Q9_Event_Loop_Debugging.js) | **Q9: Debugging the Event Loop** | Output Prediction, Execution Verification, Microtask/Macrotask Queue Drain Mechanics |
| [`Q10_Delivery_Pipeline_Debugger.js`](./Q10_Delivery_Pipeline_Debugger.js) | **Q10: The Final Delivery: Async Pipeline Debugger** | 5-Stage Delivery State Machine (`takeOrder → prepare → pack → dispatch → deliver`), `try/catch` Pipeline Recovery |
| [`index.html`](./index.html) | **Browser Interactive Test Dashboard** | Live Web Page for Visual Testing of Dynamic HTML Product Cards, Coffee Maker, and Delivery Pipelines |

---

### Detailed Question Summaries

#### Q 1: Async Coffee Maker (`Q1_Async_Coffee_Maker.js`)
- **Objective**: Automate coffee preparation: `boilWater` (1-1.5s) $\rightarrow$ `brewCoffee` (1-1.5s) $\rightarrow$ `pourIntoCup` (1-1.5s).
- **Key Flow**:
  - Uses `.then()` chaining.
  - On complete success, prints: `"Coffee ready for the team!"`.
  - Uses `.catch()` to capture any appliance glitches simulated with `Math.random()`.

#### Q 2: Micro vs Macro Scheduler (`Q2_Micro_vs_Macro_Scheduler.js`)
- **Objective**: Visualize JavaScript Event Loop prioritization across task queues.
- **Execution Order**:
  1. `Start` (Synchronous log)
  2. `Intermediate Synchronous Log` (Synchronous log)
  3. `End` (Synchronous log)
  4. `Microtask Callback: [Promise.then()]` (Microtask queue drained first)
  5. `Macrotask Callback: [setTimeout (0ms)]` (Macrotask queue executed afterwards)
- **Why Microtasks Run First**: The HTML / ECMAScript specifications dictate that before the event loop can process the next macrotask, it must completely empty all jobs in the microtask queue.

#### Q 3: Callback to Promise Migration (`Q3_Bug_Tracker_Promise_Migration.js`)
- **Objective**: Convert `fetchBugs(callback)` to `getBugs()` returning a Promise.
- **Output**: Formatted table using `console.table()`.
- **Error Handling**: Simulates API failures and catches them cleanly with `.catch()`.

#### Q 4: DevOps Delay Race (`Q4_DevOps_Delay_Race.js`)
- **Objective**: Server A (2s) and Server B (3s) deployments.
- **Combinators**:
  - `Promise.race()`: Identifies the fastest responding server (`"Fastest response: Server A finished in 2s"`).
  - `Promise.all()`: Waits for both servers to conclude (`"Deployment completed for all servers"`).

#### Q 5: Avoiding Callback Hell (`Q5_Avoiding_Callback_Hell.js`)
- **Objective**: Refactor 5 build stages (`design → build → test → deploy → celebrate`) from nested callbacks to `async/await`.
- **Readability**: Explains elimination of horizontal indentation drift, unified `try/catch` error handling, and clean stack traces.

#### Q 6: Product Card Fetcher (`Q6_Product_Card_Fetcher.js`)
- **Objective**: Fetch product catalog from `https://fakestoreapi.com/products`.
- **Logs**: Product Title, Price (`$XX.XX`), and Image URL.
- **Bonus**: Dynamically creates HTML cards with `document.createElement()` inside `index.html`.
- **Error Handling**: `try/catch` displays `"Failed to load products. Please try again."` if network fails, with offline mock fallback.

#### Q 7: Lazy Loader AllSettled (`Q7_Lazy_Loader_AllSettled.js`)
- **Objective**: Load profile (2000ms), posts (1500ms), and messages (1000ms) with `Promise.allSettled()`.
- **Features**:
  - Randomly rejects one module to demonstrate non-short-circuiting behavior.
  - Calculates total execution duration using `Date.now()`, showing concurrent parallel execution (~2000ms total).

#### Q 8: Async Retry Mechanism (`Q8_Order_Processing_Retry.js`)
- **Objective**: Robust checkout gateway with up to 3 automatic retry attempts.
- **Features**:
  - Logs `"Attempt X: Success"` or `"Attempt X: Failed"`.
  - Throws `"Order could not be processed"` if all 3 attempts fail.
  - Final error handled gracefully via `try/catch`.

#### Q 9: Event Loop Debugging (`Q9_Event_Loop_Debugging.js`)
- **Objective**: Predict and verify execution order of `setTimeout(..., 0)` vs `Promise.resolve().then(...)`.
- **Output**:
  ```
  Script start
  Script end
  Promise callback
  Timeout callback
  ```

#### Q 10: Food Delivery Simulation Pipeline (`Q10_Delivery_Pipeline_Debugger.js`)
- **Objective**: 5-step asynchronous state machine (`takeOrder → prepare → pack → dispatch → deliver`).
- **Logs**:
  ```
  Start Pipeline
  Step 1: Order taken
  Step 2: Food prepared
  Step 3: Package ready
  Step 4: Out for delivery
  Delivery completed!
  ```
- **Error Handling**: Prints `"Pipeline failed!"` if any step rejects, with complete event loop control flow explanations.

---

### How to Run

#### In Node.js Console:
```powershell
cd "d:\College #3rd year\Full Stack\BridgeLabz-Training-3Y\Java  Script\Assignment 6"

node Q1_Async_Coffee_Maker.js
node Q2_Micro_vs_Macro_Scheduler.js
node Q3_Bug_Tracker_Promise_Migration.js
node Q4_DevOps_Delay_Race.js
node Q5_Avoiding_Callback_Hell.js
node Q6_Product_Card_Fetcher.js
node Q7_Lazy_Loader_AllSettled.js
node Q8_Order_Processing_Retry.js
node Q9_Event_Loop_Debugging.js
node Q10_Delivery_Pipeline_Debugger.js
```

#### In Web Browser:
Open [index.html](file:///d:/College%20#3rd%20year/Full%20Stack/BridgeLabz-Training-3Y/Java%20%20Script/Assignment%206/index.html) in any modern browser to interactively test product card rendering, coffee maker simulation, and delivery pipeline triggers.
