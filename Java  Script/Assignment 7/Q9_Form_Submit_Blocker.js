"use strict";

/**
 * ==============================================================================
 * ASSIGNMENT 7 - QUESTION 9: Form Submit Blocker with preventDefault() and Live Errors
 * ==============================================================================
 * 
 * Problem Statement:
 * Build a form:
 * ● Name (required)
 * ● Email (required, must contain @)
 * ● Password (min 6 chars)
 * 
 * Requirements:
 * ● On submit: if any field invalid → show inline errors
 * ● Use preventDefault() to stop form submission
 * ● On correcting input → errors disappear automatically
 * ● Show a final “Form Submitted Successfully” message
 * 
 * Concepts Demonstrated:
 * - Intercepting Form Submissions via event.preventDefault()
 * - Inline Dynamic Error Rendering and Border Highlighting
 * - Real-Time Error Clearing via 'input' Events
 * ==============================================================================
 */

/**
 * Validates a single field according to specification.
 * 
 * @param {"name"|"email"|"password"} fieldName 
 * @param {string} value 
 * @returns {{ isValid: boolean, error: string }}
 */
function validateFormField(fieldName, value) {
    const val = String(value || "").trim();

    if (fieldName === "name") {
        if (!val) return { isValid: false, error: "Name is required." };
        if (val.length < 2) return { isValid: false, error: "Name must be at least 2 characters." };
        return { isValid: true, error: "" };
    }

    if (fieldName === "email") {
        if (!val) return { isValid: false, error: "Email is required." };
        // Prompt requirement: "must contain @"
        if (!val.includes("@") || !val.includes(".")) {
            return { isValid: false, error: "Email must be valid and contain '@' and domain." };
        }
        return { isValid: true, error: "" };
    }

    if (fieldName === "password") {
        if (!val) return { isValid: false, error: "Password is required." };
        // Prompt requirement: "min 6 chars"
        if (val.length < 6) {
            return { isValid: false, error: "Password must be at least 6 characters long." };
        }
        return { isValid: true, error: "" };
    }

    return { isValid: false, error: "Unknown field." };
}

/**
 * Validates the full form payload.
 * @param {Object} data - { name, email, password }
 * @returns {{ isFormValid: boolean, errors: Object }}
 */
function validateFullForm(data) {
    const errors = {};
    let isFormValid = true;

    for (const field of ["name", "email", "password"]) {
        const check = validateFormField(field, data[field]);
        if (!check.isValid) {
            errors[field] = check.error;
            isFormValid = false;
        }
    }

    return { isFormValid, errors };
}

// ==============================================================================
// BROWSER DOM INTERACTION
// ==============================================================================
function initFormSubmitBlockerDOM() {
    if (typeof document === "undefined") return;

    const form = document.getElementById("submitBlockerForm");
    const nameInput = document.getElementById("blockerName");
    const emailInput = document.getElementById("blockerEmail");
    const passwordInput = document.getElementById("blockerPassword");

    const nameError = document.getElementById("blockerNameError");
    const emailError = document.getElementById("blockerEmailError");
    const passwordError = document.getElementById("blockerPasswordError");

    const statusMessage = document.getElementById("blockerSuccessMessage");

    if (!form || !nameInput || !emailInput || !passwordInput) return;

    // Helper: Wire live error clearing on correction
    const wireLiveErrorClearing = (inputEl, errorEl, fieldName) => {
        inputEl.addEventListener("input", () => {
            const check = validateFormField(fieldName, inputEl.value);
            // Requirement: "On correcting input → errors disappear automatically"
            if (check.isValid) {
                errorEl.textContent = "";
                inputEl.style.borderColor = "#16a34a"; // Green border when valid
                inputEl.style.backgroundColor = "#f0fdf4";
            } else {
                errorEl.textContent = check.error;
                inputEl.style.borderColor = "#ef4444";
                inputEl.style.backgroundColor = "#fef2f2";
            }
        });
    };

    wireLiveErrorClearing(nameInput, nameError, "name");
    wireLiveErrorClearing(emailInput, emailError, "email");
    wireLiveErrorClearing(passwordInput, passwordError, "password");

    // FORM SUBMIT HANDLER
    form.addEventListener("submit", (event) => {
        // ALWAYS use preventDefault() to stop default HTTP page reload submission
        event.preventDefault();

        const formData = {
            name: nameInput.value,
            email: emailInput.value,
            password: passwordInput.value
        };

        const result = validateFullForm(formData);

        if (!result.isFormValid) {
            console.warn("[Form Submission Blocked via preventDefault()] Validation errors detected.");

            // Display inline error messages
            if (nameError) nameError.textContent = result.errors.name || "";
            if (emailError) emailError.textContent = result.errors.email || "";
            if (passwordError) passwordError.textContent = result.errors.password || "";

            // Highlight invalid fields with red border
            if (result.errors.name) nameInput.style.borderColor = "#ef4444";
            if (result.errors.email) emailInput.style.borderColor = "#ef4444";
            if (result.errors.password) passwordInput.style.borderColor = "#ef4444";

            if (statusMessage) {
                statusMessage.style.display = "none";
            }
        } else {
            console.log("[Form Submission Approved]:", formData);

            // Clear errors
            if (nameError) nameError.textContent = "";
            if (emailError) emailError.textContent = "";
            if (passwordError) passwordError.textContent = "";

            // Required Message: "Form Submitted Successfully"
            if (statusMessage) {
                statusMessage.style.display = "block";
                statusMessage.innerHTML = `
                    <div style="background: #dcfce7; border: 1px solid #86efac; color: #166534; padding: 12px; border-radius: 6px; font-weight: bold; text-align: center;">
                        🎉 Form Submitted Successfully!
                    </div>`;
            }
        }
    });
}

if (typeof document !== "undefined") {
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initFormSubmitBlockerDOM);
    } else {
        initFormSubmitBlockerDOM();
    }
}

// ==============================================================================
// NODE.JS TEST SUITE
// ==============================================================================
if (typeof module !== "undefined" && typeof window === "undefined") {
    console.log("==============================================================================");
    console.log("    ASSIGNMENT 7 - Q9: FORM SUBMIT BLOCKER WITH ERRORS (NODE.JS TEST)         ");
    console.log("==============================================================================\n");

    const testPayloads = [
        {
            caseTitle: "Case 1: All Empty Fields (Blocked)",
            payload: { name: "", email: "", password: "" }
        },
        {
            caseTitle: "Case 2: Invalid Email (Missing @) & Password Too Short (Blocked)",
            payload: { name: "Lucky Sinha", email: "luckysinha.com", password: "123" }
        },
        {
            caseTitle: "Case 3: All Fields Fully Valid (Accepted)",
            payload: { name: "Lucky Sinha", email: "lucky@domain.com", password: "SecretPassword123" }
        }
    ];

    testPayloads.forEach((test, idx) => {
        console.log(`>>> ${test.caseTitle}`);
        console.log("    Payload:", test.payload);
        const check = validateFullForm(test.payload);
        if (check.isFormValid) {
            console.log("    ✔ STATUS: \"Form Submitted Successfully\"");
        } else {
            console.log("    ✖ STATUS: Form blocked via preventDefault(). Active errors:");
            for (const [k, msg] of Object.entries(check.errors)) {
                console.log(`       - ${k}: ${msg}`);
            }
        }
        console.log();
    });

    console.log("==============================================================================\n");
}
