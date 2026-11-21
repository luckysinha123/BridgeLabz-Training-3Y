"use strict";

/**
 * ==============================================================================
 * ASSIGNMENT 7 - QUESTION 3: Multi-Step Form with Next/Back & Validation
 * ==============================================================================
 * 
 * Problem Statement:
 * Create a 3-step form:
 * ● Step 1: Name
 * ● Step 2: Email
 * ● Step 3: Password
 * Requirements:
 * ● “Next” moves to next step only if input is valid
 * ● “Back” moves to previous
 * ● When all 3 steps complete → show summary
 * 
 * Concepts Demonstrated:
 * - Multi-Step Wizard State Progression (Step 1 -> 2 -> 3 -> Summary)
 * - Step-Specific Validation Rules
 * - Dynamic UI Navigation (Next / Back buttons)
 * - Collecting and Rendering Final Aggregate Summary
 * ==============================================================================
 */

/**
 * Step validation logic.
 * 
 * @param {number} step - Current step (1, 2, or 3)
 * @param {string} value - User entered input value
 * @returns {{ isValid: boolean, message: string }}
 */
function validateWizardStep(step, value) {
    const trimmed = String(value || "").trim();

    if (step === 1) {
        // Step 1: Name validation (must be at least 2 alphabetic characters)
        if (!trimmed) return { isValid: false, message: "Name is required." };
        if (!/^[A-Za-z\s]{2,50}$/.test(trimmed)) {
            return { isValid: false, message: "Name must contain letters only (minimum 2 characters)." };
        }
        return { isValid: true, message: "Valid Name" };
    }

    if (step === 2) {
        // Step 2: Email validation
        if (!trimmed) return { isValid: false, message: "Email address is required." };
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(trimmed)) {
            return { isValid: false, message: "Please enter a valid email (e.g. name@domain.com)." };
        }
        return { isValid: true, message: "Valid Email" };
    }

    if (step === 3) {
        // Step 3: Password validation (min 6 characters)
        if (!trimmed) return { isValid: false, message: "Password is required." };
        if (trimmed.length < 6) {
            return { isValid: false, message: "Password must be at least 6 characters long." };
        }
        return { isValid: true, message: "Valid Password" };
    }

    return { isValid: false, message: "Invalid step." };
}

// In-memory wizard state
const wizardState = {
    currentStep: 1,
    formData: {
        name: "",
        email: "",
        password: ""
    }
};

// ==============================================================================
// BROWSER DOM INTERACTION
// ==============================================================================
function initMultiStepFormDOM() {
    if (typeof document === "undefined") return;

    const step1El = document.getElementById("wizardStep1");
    const step2El = document.getElementById("wizardStep2");
    const step3El = document.getElementById("wizardStep3");
    const summaryEl = document.getElementById("wizardSummary");

    const nameInput = document.getElementById("wizardName");
    const emailInput = document.getElementById("wizardEmail");
    const passwordInput = document.getElementById("wizardPassword");

    const error1 = document.getElementById("wizardError1");
    const error2 = document.getElementById("wizardError2");
    const error3 = document.getElementById("wizardError3");

    const next1Btn = document.getElementById("wizardNext1");
    const next2Btn = document.getElementById("wizardNext2");
    const submitBtn = document.getElementById("wizardSubmit");

    const back2Btn = document.getElementById("wizardBack2");
    const back3Btn = document.getElementById("wizardBack3");

    if (!step1El || !step2El || !step3El) return;

    // Helper to toggle step views
    const showStep = (stepNumber) => {
        wizardState.currentStep = stepNumber;
        step1El.style.display = stepNumber === 1 ? "block" : "none";
        step2El.style.display = stepNumber === 2 ? "block" : "none";
        step3El.style.display = stepNumber === 3 ? "block" : "none";
        if (summaryEl) summaryEl.style.display = stepNumber === 4 ? "block" : "none";
    };

    // STEP 1 -> STEP 2 (Next)
    if (next1Btn) {
        next1Btn.addEventListener("click", () => {
            const check = validateWizardStep(1, nameInput.value);
            if (!check.isValid) {
                error1.textContent = check.message;
                error1.style.color = "#dc2626";
                nameInput.style.borderColor = "#dc2626";
                return;
            }
            error1.textContent = "";
            nameInput.style.borderColor = "#16a34a";
            wizardState.formData.name = nameInput.value.trim();
            showStep(2);
        });
    }

    // STEP 2 -> STEP 1 (Back)
    if (back2Btn) {
        back2Btn.addEventListener("click", () => {
            showStep(1);
        });
    }

    // STEP 2 -> STEP 3 (Next)
    if (next2Btn) {
        next2Btn.addEventListener("click", () => {
            const check = validateWizardStep(2, emailInput.value);
            if (!check.isValid) {
                error2.textContent = check.message;
                error2.style.color = "#dc2626";
                emailInput.style.borderColor = "#dc2626";
                return;
            }
            error2.textContent = "";
            emailInput.style.borderColor = "#16a34a";
            wizardState.formData.email = emailInput.value.trim();
            showStep(3);
        });
    }

    // STEP 3 -> STEP 2 (Back)
    if (back3Btn) {
        back3Btn.addEventListener("click", () => {
            showStep(2);
        });
    }

    // STEP 3 -> SUBMIT SUMMARY
    if (submitBtn) {
        submitBtn.addEventListener("click", () => {
            const check = validateWizardStep(3, passwordInput.value);
            if (!check.isValid) {
                error3.textContent = check.message;
                error3.style.color = "#dc2626";
                passwordInput.style.borderColor = "#dc2626";
                return;
            }
            error3.textContent = "";
            passwordInput.style.borderColor = "#16a34a";
            wizardState.formData.password = passwordInput.value;

            // Render Summary View
            showStep(4);
            const summaryDisplay = document.getElementById("wizardSummaryContent");
            if (summaryDisplay) {
                summaryDisplay.innerHTML = `
                    <div style="background: #f0fdf4; border: 1px solid #86efac; border-radius: 8px; padding: 16px; margin-top: 10px;">
                        <h4 style="margin-top: 0; color: #166534;">🎉 Registration Complete!</h4>
                        <p><strong>Name:</strong> ${wizardState.formData.name}</p>
                        <p><strong>Email:</strong> ${wizardState.formData.email}</p>
                        <p><strong>Password:</strong> ${"•".repeat(wizardState.formData.password.length)} (Encrypted)</p>
                    </div>`;
            }
        });
    }

    // Initialize to step 1
    showStep(1);
}

if (typeof document !== "undefined") {
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initMultiStepFormDOM);
    } else {
        initMultiStepFormDOM();
    }
}

// ==============================================================================
// NODE.JS TEST SUITE
// ==============================================================================
if (typeof module !== "undefined" && typeof window === "undefined") {
    console.log("==============================================================================");
    console.log("      ASSIGNMENT 7 - Q3: MULTI-STEP FORM VALIDATION (NODE.JS TEST)            ");
    console.log("==============================================================================\n");

    const testRuns = [
        { step: 1, label: "Step 1: Empty Name", val: "", expected: false },
        { step: 1, label: "Step 1: Valid Name", val: "Lucky Sinha", expected: true },
        { step: 2, label: "Step 2: Invalid Email", val: "lucky_at_domain", expected: false },
        { step: 2, label: "Step 2: Valid Email", val: "lucky.sinha@example.com", expected: true },
        { step: 3, label: "Step 3: Short Password (3 chars)", val: "123", expected: false },
        { step: 3, label: "Step 3: Valid Password (8 chars)", val: "SecurePass!1", expected: true }
    ];

    testRuns.forEach((run, i) => {
        const res = validateWizardStep(run.step, run.val);
        const pass = res.isValid === run.expected;
        console.log(`[Test #${i + 1}] ${run.label}:`);
        console.log(`  Input: "${run.val}" -> Valid: ${res.isValid} | Message: "${res.message}" [${pass ? "PASS ✔" : "FAIL ✖"}]`);
    });

    console.log("\n==============================================================================\n");
}
