"use strict";

/**
 * ==============================================================================
 * ASSIGNMENT 4 - QUESTION 7: Login Form Validation using RegExp
 * ==============================================================================
 * 
 * Problem Statement:
 * Create a login form with username & password.
 * Use RegExp to check:
 * ● Username: at least 5 characters
 * ● Password: at least 8 characters, must include number, uppercase, lowercase,
 *   special character
 * 
 * If validation passes → show success message; else → show specific error messages.
 * 
 * Concepts Demonstrated:
 * - Granular RegExp Lookaheads for Password Strength Verification
 * - Comprehensive Error Classification (Specific feedback per rule violation)
 * - Isomorphic Validation Logic (Node.js Test Suite + Browser DOM)
 * ==============================================================================
 */

// ==============================================================================
// REGULAR EXPRESSION RULES
// ==============================================================================
const LOGIN_RULES = {
    // Username: At least 5 alphanumeric characters or underscores
    USERNAME_MIN_LENGTH: /^.{5,}$/,
    USERNAME_PATTERN: /^[a-zA-Z0-9_]{5,}$/,

    // Granular Password Checks
    PASSWORD_LENGTH: /^.{8,}$/,
    PASSWORD_UPPERCASE: /[A-Z]/,
    PASSWORD_LOWERCASE: /[a-z]/,
    PASSWORD_NUMBER: /[0-9]/,
    PASSWORD_SPECIAL: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/
};

/**
 * Validates login credentials and returns granular error messages.
 * 
 * @param {string} username - User entered username
 * @param {string} password - User entered password
 * @returns {{ isValid: boolean, successMessage?: string, errors: string[] }}
 */
function validateLoginForm(username, password) {
    const errors = [];
    const trimmedUsername = typeof username === "string" ? username.trim() : "";
    const strPassword = typeof password === "string" ? password : "";

    // 1. Username Validation
    if (!trimmedUsername) {
        errors.push("Username is required.");
    } else if (!LOGIN_RULES.USERNAME_MIN_LENGTH.test(trimmedUsername)) {
        errors.push(`Username must be at least 5 characters long (currently ${trimmedUsername.length} characters).`);
    }

    // 2. Password Validation (Granular Error Reporting)
    if (!strPassword) {
        errors.push("Password is required.");
    } else {
        if (!LOGIN_RULES.PASSWORD_LENGTH.test(strPassword)) {
            errors.push(`Password must be at least 8 characters long (currently ${strPassword.length} characters).`);
        }
        if (!LOGIN_RULES.PASSWORD_UPPERCASE.test(strPassword)) {
            errors.push("Password must contain at least one uppercase letter (A-Z).");
        }
        if (!LOGIN_RULES.PASSWORD_LOWERCASE.test(strPassword)) {
            errors.push("Password must contain at least one lowercase letter (a-z).");
        }
        if (!LOGIN_RULES.PASSWORD_NUMBER.test(strPassword)) {
            errors.push("Password must contain at least one numeric digit (0-9).");
        }
        if (!LOGIN_RULES.PASSWORD_SPECIAL.test(strPassword)) {
            errors.push("Password must contain at least one special character (!@#$%^&* etc.).");
        }
    }

    const isValid = errors.length === 0;

    return {
        isValid,
        successMessage: isValid ? `✔ Authentication Successful! Welcome back, ${trimmedUsername}.` : null,
        errors
    };
}

// ==============================================================================
// BROWSER DOM ATTACHMENT
// ==============================================================================
if (typeof document !== "undefined") {
    document.addEventListener("DOMContentLoaded", () => {
        const form = document.getElementById("loginValidationForm");
        if (!form) return;

        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const usernameInput = document.getElementById("loginUsername");
            const passwordInput = document.getElementById("loginPassword");
            const resultBox = document.getElementById("loginResult");

            const outcome = validateLoginForm(usernameInput.value, passwordInput.value);

            if (outcome.isValid) {
                resultBox.innerHTML = `
                <div style="background: #d4edda; border: 1px solid #c3e6cb; color: #155724; padding: 12px; border-radius: 6px; margin-top: 15px;">
                    <strong>🎉 Login Success!</strong><br>
                    ${outcome.successMessage}
                </div>`;
                usernameInput.style.border = "2px solid #28a745";
                passwordInput.style.border = "2px solid #28a745";
            } else {
                const errorListHTML = outcome.errors.map(err => `<li>${err}</li>`).join("");
                resultBox.innerHTML = `
                <div style="background: #f8d7da; border: 1px solid #f5c6cb; color: #721c24; padding: 12px; border-radius: 6px; margin-top: 15px;">
                    <strong>❌ Login Validation Failed:</strong>
                    <ul style="margin: 8px 0 0; padding-left: 20px;">
                        ${errorListHTML}
                    </ul>
                </div>`;
                usernameInput.style.border = "2px solid #dc3545";
                passwordInput.style.border = "2px solid #dc3545";
            }
        });
    });
}

// ==============================================================================
// NODE.JS TEST SUITE
// ==============================================================================
if (typeof module !== "undefined" && typeof window === "undefined") {
    console.log("==============================================================================");
    console.log("          ASSIGNMENT 4 - Q7: LOGIN FORM VALIDATION (TEST SUITE)               ");
    console.log("==============================================================================\n");

    const testCredentials = [
        {
            testTitle: "Case 1: Fully Valid Credentials",
            user: "john_doe",
            pass: "StrongP@ssw0rd!"
        },
        {
            testTitle: "Case 2: Username Too Short (< 5 characters)",
            user: "raj",
            pass: "StrongP@ssw0rd!"
        },
        {
            testTitle: "Case 3: Password Missing Uppercase & Special Char",
            user: "super_user",
            pass: "password123"
        },
        {
            testTitle: "Case 4: Password Missing Number & Too Short (< 8)",
            user: "admin_user",
            pass: "Short!"
        },
        {
            testTitle: "Case 5: Empty Submission",
            user: "",
            pass: ""
        }
    ];

    testCredentials.forEach((test, index) => {
        console.log(`------------------------------------------------------------------------------`);
        console.log(`>>> ${test.testTitle}`);
        console.log(`    Username: "${test.user}" | Password: "${test.pass}"`);
        console.log(`------------------------------------------------------------------------------`);

        const result = validateLoginForm(test.user, test.pass);

        if (result.isValid) {
            console.log(`SUCCESS STATUS: ${result.successMessage}`);
        } else {
            console.log(`FAILURE STATUS: Validation failed with ${result.errors.length} specific error(s):`);
            result.errors.forEach(err => console.log(`  ✖ ${err}`));
        }
        console.log();
    });

    console.log("==============================================================================\n");
}
