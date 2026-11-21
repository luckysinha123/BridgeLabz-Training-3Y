"use strict";

/**
 * ==============================================================================
 * ASSIGNMENT 6 - QUESTION 4: DevOps Delay: Async Timeout Race
 * ==============================================================================
 * 
 * Problem Statement:
 * Two deployment servers respond at different times. You must track both completion
 * and the first responder.
 * 
 * Tasks:
 * - Server A responds in 2 seconds.
 * - Server B responds in 3 seconds.
 * - Use Promise.all() to show: "Deployment completed for all servers".
 * - Use Promise.race() to show: "Fastest response:" for whichever server finishes first.
 * - Simulate random failure using Math.random() and handle with .catch().
 * 
 * Concepts Demonstrated:
 * - Promise Combinator: Promise.all() (All must succeed; rejects on first failure)
 * - Promise Combinator: Promise.race() (Settles as soon as any promise settles)
 * - Simulating Independent Microservices / Concurrent Network Latency
 * - Robust Error Handling with .catch()
 * ==============================================================================
 */

console.log("==============================================================================");
console.log("        ASSIGNMENT 6 - Q4: DEVOPS DELAY: ASYNC TIMEOUT RACE                   ");
console.log("==============================================================================\n");

/**
 * Simulates a deployment request to an independent server.
 * 
 * @param {string} serverName - Server Identifier (e.g., "Server A")
 * @param {number} delayMs - Response latency in milliseconds
 * @param {boolean} [allowFailure=true] - Whether random failure is enabled
 * @returns {Promise<{ server: string, status: string, durationMs: number }>}
 */
function deployToServer(serverName, delayMs, allowFailure = true) {
    return new Promise((resolve, reject) => {
        console.log(`[DevOps Trigger] Deploying Docker build container to ${serverName}... (Latency: ${delayMs / 1000}s)`);

        setTimeout(() => {
            // 20% random failure chance if failure simulation is allowed
            const hasCrashed = allowFailure && Math.random() < 0.2;

            if (hasCrashed) {
                reject(new Error(`${serverName} deployment failed due to Out-Of-Memory (OOM) error!`));
            } else {
                resolve({
                    server: serverName,
                    status: "DEPLOYED_SUCCESSFULLY",
                    durationMs: delayMs,
                    timestamp: new Date().toLocaleTimeString()
                });
            }
        }, delayMs);
    });
}

// ==============================================================================
// STEP 1: Promise.race() - Determine the Fastest Responder
// ==============================================================================
console.log("------------------------------------------------------------------------------");
console.log("STEP 1: DETERMINING FASTEST RESPONDER USING Promise.race()");
console.log("------------------------------------------------------------------------------\n");

// Server A takes 2000ms, Server B takes 3000ms
const raceServerA = deployToServer("Server A (US-East)", 2000, false);
const raceServerB = deployToServer("Server B (EU-Central)", 3000, false);

Promise.race([raceServerA, raceServerB])
    .then((fastestServer) => {
        console.log("\n>>> Promise.race() Winner Determined! <<<");
        console.log(`Fastest response: ${fastestServer.server} finished in ${fastestServer.durationMs / 1000}s with status "${fastestServer.status}".\n`);
    })
    .catch((error) => {
        console.error(`[Promise.race() Error]: ${error.message}\n`);
    })
    .finally(() => {
        // Proceed to Step 2 after race demonstration completes
        runAllServersDeployment();
    });

// ==============================================================================
// STEP 2: Promise.all() - Track Total Completion & Handle Random Failures
// ==============================================================================
function runAllServersDeployment() {
    console.log("------------------------------------------------------------------------------");
    console.log("STEP 2: FULL CLUSTER DEPLOYMENT USING Promise.all()");
    console.log("------------------------------------------------------------------------------\n");

    const clusterServerA = deployToServer("Server A (US-East)", 2000, true);
    const clusterServerB = deployToServer("Server B (EU-Central)", 3000, true);

    console.log("Waiting for all servers to complete their deployment cycle...\n");

    Promise.all([clusterServerA, clusterServerB])
        .then((deploymentResults) => {
            console.log("\n==============================================================================");
            console.log("✔ SUCCESS: \"Deployment completed for all servers\"");
            console.log("==============================================================================");
            console.log("Cluster Deployment Status Report:");
            deploymentResults.forEach(res => {
                console.log(`  - ${res.server.padEnd(24)}: ${res.status} (${res.durationMs / 1000}s) at ${res.timestamp}`);
            });
            console.log("==============================================================================\n");
        })
        .catch((error) => {
            console.error("\n==============================================================================");
            console.error(`❌ CLUSTER ROLLBACK TRIGGERED: ${error.message}`);
            console.error("Promise.all() failed because at least one server did not respond successfully.");
            console.error("==============================================================================\n");
        });
}
