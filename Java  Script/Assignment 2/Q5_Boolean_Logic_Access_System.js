/**
 * ==============================================================================
 * QUESTION 5: Boolean Logic Access System
 * ==============================================================================
 * Requirements:
 * - Variables: isDoorLocked, isWindowClosed, isAlarmOn, isOwnerInside.
 * - Access is granted only if:
 *   - Alarm is on
 *   - Door and window are closed (locked/closed)
 *   - Owner is inside
 * - Use Boolean logic (&&, ||, !) to print "Secure" or "Unsafe".
 * - Change values and test multiple outcomes.
 * ==============================================================================
 */

console.log("==============================================================================");
console.log("QUESTION 5: SMART HOME SECURITY & ACCESS EVALUATION SYSTEM");
console.log("==============================================================================");

/**
 * Evaluates smart home security status using Boolean operators (&&, ||, !).
 * 
 * @param {boolean} isDoorLocked - Whether front/back doors are locked
 * @param {boolean} isWindowClosed - Whether all windows are closed
 * @param {boolean} isAlarmOn - Whether security alarm system is active
 * @param {boolean} isOwnerInside - Whether authorized homeowner is verified inside
 * @returns {object} Status object containing classification and diagnostic flags
 */
function evaluateSecurityStatus(isDoorLocked, isWindowClosed, isAlarmOn, isOwnerInside) {
    // Primary Condition:
    // Secure ONLY IF Alarm is ON AND Door is locked AND Window is closed AND Owner is inside
    const isSecure = isAlarmOn && isDoorLocked && isWindowClosed && isOwnerInside;

    // Alternative Boolean representation using De Morgan's Law with NOT (!) and OR (||):
    // The house is unsafe if ANY single required security condition is violated:
    const isUnsafe = !isAlarmOn || !isDoorLocked || !isWindowClosed || !isOwnerInside;

    // Determine security classification string
    let systemStatus = "";
    if (isSecure && !isUnsafe) {
        systemStatus = "Secure";
    } else {
        systemStatus = "Unsafe";
    }

    return {
        doorLocked: isDoorLocked,
        windowClosed: isWindowClosed,
        alarmOn: isAlarmOn,
        ownerInside: isOwnerInside,
        status: systemStatus
    };
}

// Step 1: Base Test Case (All optimal parameters)
let isDoorLocked = true;
let isWindowClosed = true;
let isAlarmOn = true;
let isOwnerInside = true;

console.log("Initial Smart Home System State:");
console.log(`- Door Locked   : ${isDoorLocked}`);
console.log(`- Window Closed : ${isWindowClosed}`);
console.log(`- Alarm Active  : ${isAlarmOn}`);
console.log(`- Owner Inside  : ${isOwnerInside}`);

const initialResult = evaluateSecurityStatus(isDoorLocked, isWindowClosed, isAlarmOn, isOwnerInside);
console.log(`=> Security Evaluation Result: "${initialResult.status}"\n`);

// Step 2: Test Multiple Scenarios by changing variable values
console.log("------------------------------------------------------------------------------");
console.log("TESTING MULTIPLE SECURITY SCENARIOS");
console.log("------------------------------------------------------------------------------");

const testScenarios = [
    {
        scenario: "All Conditions Met",
        door: true, window: true, alarm: true, owner: true
    },
    {
        scenario: "Door Left Unlocked",
        door: false, window: true, alarm: true, owner: true
    },
    {
        scenario: "Window Left Open",
        door: true, window: false, alarm: true, owner: true
    },
    {
        scenario: "Alarm Disabled",
        door: true, window: true, alarm: false, owner: true
    },
    {
        scenario: "Owner Not Inside",
        door: true, window: true, alarm: true, owner: false
    },
    {
        scenario: "Severe Breach (Door Unlocked & Alarm Off)",
        door: false, window: true, alarm: false, owner: false
    }
];

const testResultsTable = [];

testScenarios.forEach((test, idx) => {
    const res = evaluateSecurityStatus(test.door, test.window, test.alarm, test.owner);
    console.log(`Test Case ${idx + 1}: [${test.scenario}] -> Status: ${res.status}`);
    
    testResultsTable.push({
        Case: `#${idx + 1}`,
        Scenario: test.scenario,
        "Door Locked": test.door ? "Yes" : "NO",
        "Window Closed": test.window ? "Yes" : "NO",
        "Alarm On": test.alarm ? "Yes" : "NO",
        "Owner Inside": test.owner ? "Yes" : "NO",
        Result: res.status
    });
});

console.log("\nSummary Test Table:");
console.table(testResultsTable);
console.log("==============================================================================\n");
