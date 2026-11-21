"use strict";

/**
 * ==============================================================================
 * ASSIGNMENT 7 - QUESTION 2: Live Character Counter with Warning Behavior
 * ==============================================================================
 * 
 * Problem Statement:
 * Build a text area that:
 * ● Shows remaining characters (max 100 char)
 * ● Turns the counter yellow at 20 chars left
 * ● Turns red at 0 and prevents further typing using preventDefault()
 * ● A button “Reset” clears everything
 * 
 * Concepts Demonstrated:
 * - Keyboard & Input Events (input, keydown)
 * - Threshold State Machine (Normal -> Yellow Warning -> Red Limit)
 * - Event Cancellation via event.preventDefault()
 * - Form Field Resetting
 * ==============================================================================
 */

const MAX_CHARACTERS = 100;
const WARNING_THRESHOLD = 20;

/**
 * Evaluates text length and returns remaining character metrics and color state.
 * 
 * @param {string} text - Current string content in textarea
 * @returns {{ length: number, remaining: number, state: "normal"|"warning"|"limit" }}
 */
function evaluateCharacterCount(text) {
    const length = typeof text === "string" ? text.length : 0;
    const remaining = Math.max(0, MAX_CHARACTERS - length);

    let state = "normal";
    if (remaining === 0) {
        state = "limit";   // Turns red at 0
    } else if (remaining <= WARNING_THRESHOLD) {
        state = "warning"; // Turns yellow at 20 chars left
    }

    return { length, remaining, state };
}

// ==============================================================================
// BROWSER DOM IMPLEMENTATION
// ==============================================================================
function initLiveCharacterCounterDOM() {
    if (typeof document === "undefined") return;

    const textarea = document.getElementById("liveCounterTextarea");
    const countDisplay = document.getElementById("remainingCharsCount");
    const counterBadge = document.getElementById("counterBadge");
    const resetBtn = document.getElementById("resetCounterBtn");

    if (!textarea || !countDisplay) return;

    // Helper to update counter UI
    const updateCounterUI = () => {
        const text = textarea.value;
        const info = evaluateCharacterCount(text);

        countDisplay.textContent = info.remaining;

        // Reset styling
        if (counterBadge) {
            counterBadge.style.transition = "all 0.2s ease";
            if (info.state === "limit") {
                // RED at 0 chars left
                counterBadge.style.color = "#dc2626";
                counterBadge.style.backgroundColor = "#fee2e2";
                counterBadge.style.borderColor = "#f87171";
                textarea.style.borderColor = "#dc2626";
            } else if (info.state === "warning") {
                // YELLOW at <= 20 chars left
                counterBadge.style.color = "#b45309";
                counterBadge.style.backgroundColor = "#fef3c7";
                counterBadge.style.borderColor = "#fcd34d";
                textarea.style.borderColor = "#f59e0b";
            } else {
                // NORMAL
                counterBadge.style.color = "#16a34a";
                counterBadge.style.backgroundColor = "#dcfce7";
                counterBadge.style.borderColor = "#86efac";
                textarea.style.borderColor = "#cbd5e1";
            }
        }
    };

    // 1. KEYDOWN EVENT: Prevent typing when 0 characters remain
    textarea.addEventListener("keydown", (event) => {
        // Allowed keys even at 0 characters left (so user can edit/delete)
        const allowedKeys = [
            "Backspace", "Delete", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown",
            "Home", "End", "Tab"
        ];

        // Allow Ctrl+A, Ctrl+C, Ctrl+X, Ctrl+Z
        if (event.ctrlKey || event.metaKey || allowedKeys.includes(event.key)) {
            return;
        }

        // If length has reached MAX_CHARACTERS, prevent further character typing
        if (textarea.value.length >= MAX_CHARACTERS) {
            // Requirement: Turns red at 0 and prevents further typing using preventDefault()
            event.preventDefault();
            console.log("[Counter Limit Reached] preventDefault() blocked extra keystroke.");
        }
    });

    // 2. INPUT EVENT: Live count update
    textarea.addEventListener("input", () => {
        // Enforce hard clamp in case user pastes text longer than 100 characters
        if (textarea.value.length > MAX_CHARACTERS) {
            textarea.value = textarea.value.substring(0, MAX_CHARACTERS);
        }
        updateCounterUI();
    });

    // 3. RESET BUTTON: Clears everything
    if (resetBtn) {
        resetBtn.addEventListener("click", () => {
            textarea.value = "";
            updateCounterUI();
            textarea.focus();
            console.log("[Counter Reset] Text cleared and counter restored to 100.");
        });
    }

    // Initialize display
    updateCounterUI();
}

if (typeof document !== "undefined") {
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initLiveCharacterCounterDOM);
    } else {
        initLiveCharacterCounterDOM();
    }
}

// ==============================================================================
// NODE.JS TEST SUITE
// ==============================================================================
if (typeof module !== "undefined" && typeof window === "undefined") {
    console.log("==============================================================================");
    console.log("   ASSIGNMENT 7 - Q2: LIVE CHARACTER COUNTER WITH WARNING (NODE.JS TEST)      ");
    console.log("==============================================================================\n");

    const sampleTexts = [
        { label: "Empty Input (Initial)", text: "" },
        { label: "Normal Length (45 chars)", text: "JavaScript event handling is flexible and clean." },
        { label: "Warning Threshold (82 chars - 18 left)", text: "This is a detailed review message that is approaching the twenty character warning." },
        { label: "Full Limit (100 chars - 0 left)", text: "1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890" }
    ];

    sampleTexts.forEach((test, idx) => {
        const metrics = evaluateCharacterCount(test.text);
        console.log(`[Test #${idx + 1}] ${test.label}`);
        console.log(`  Length    : ${metrics.length} / ${MAX_CHARACTERS}`);
        console.log(`  Remaining : ${metrics.remaining}`);
        console.log(`  UI State  : ${metrics.state.toUpperCase()} (${metrics.state === "limit" ? "RED - preventDefault()" : metrics.state === "warning" ? "YELLOW" : "GREEN/NORMAL"})`);
        console.log();
    });

    console.log("==============================================================================\n");
}
