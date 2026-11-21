"use strict";

/**
 * ==============================================================================
 * ASSIGNMENT 4 - QUESTION 2: Student Form Validator (Forms + RegExp)
 * ==============================================================================
 * 
 * Problem Statement:
 * Create a student registration form with fields: Name, Email, Phone, Password.
 * Use JavaScript + RegExp to validate:
 * ● Name: only alphabets
 * ● Email: valid format (example@domain.com)
 * ● Phone: exactly 10 digits
 * ● Password: must contain 1 uppercase, 1 number, and 1 special character
 * 
 * Requirements:
 * - Show red border + error message if invalid, green if valid.
 * - Supports both Node.js console testing and interactive Browser DOM execution.
 * ==============================================================================
 */

// ==============================================================================
// REGULAR EXPRESSIONS SPECIFICATION
// ==============================================================================
const REGEX_RULES = {
    // Name: Only alphabetic characters and spaces allowed, 2 to 50 characters
    NAME: /^[A-Za-z\s]{2,50}$/,

    // Email: Standard RFC-compliant email structure (local-part@domain.tld)
    EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,

    // Phone: Exactly 10 numeric digits (common for mobile numbers)
    PHONE: /^\d{10}$/,

    // Password: Must contain at least 1 uppercase letter, 1 number, and 1 special character
    PASSWORD: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{6,}$/
};

/**
 * Validates a single student registration field against its regular expression rule.
 * 
 * @param {string} fieldName - 'name' | 'email' | 'phone' | 'password'
 * @param {string} value - User-entered value
 * @returns {{ isValid: boolean, message: string }} Validation outcome and feedback message.
 */
function validateStudentField(fieldName, value) {
    const trimmedVal = typeof value === "string" ? value.trim() : "";

    switch (fieldName.toLowerCase()) {
        case "name":
            if (!trimmedVal) return { isValid: false, message: "Name is required." };
            if (!REGEX_RULES.NAME.test(trimmedVal)) {
                return { isValid: false, message: "Name must contain alphabets only (no numbers or symbols)." };
            }
            return { isValid: true, message: "Valid name." };

        case "email":
            if (!trimmedVal) return { isValid: false, message: "Email is required." };
            if (!REGEX_RULES.EMAIL.test(trimmedVal)) {
                return { isValid: false, message: "Invalid email format (e.g., student@college.edu)." };
            }
            return { isValid: true, message: "Valid email format." };

        case "phone":
            if (!trimmedVal) return { isValid: false, message: "Phone number is required." };
            if (!REGEX_RULES.PHONE.test(trimmedVal)) {
                return { isValid: false, message: "Phone number must be exactly 10 digits." };
            }
            return { isValid: true, message: "Valid 10-digit phone number." };

        case "password":
            if (!trimmedVal) return { isValid: false, message: "Password is required." };
            if (!REGEX_RULES.PASSWORD.test(trimmedVal)) {
                return {
                    isValid: false,
                    message: "Password must contain at least 1 uppercase letter, 1 digit, and 1 special character."
                };
            }
            return { isValid: true, message: "Strong password accepted." };

        default:
            return { isValid: false, message: `Unknown field '${fieldName}'.` };
    }
}

/**
 * Validates an entire student registration dataset.
 * 
 * @param {Object} studentData - Object with { name, email, phone, password }
 * @returns {{ isFormValid: boolean, errors: Object, results: Object }}
 */
function validateStudentForm(studentData) {
    const results = {};
    const errors = {};
    let isFormValid = true;

    for (const field of ["name", "email", "phone", "password"]) {
        const check = validateStudentField(field, studentData[field]);
        results[field] = check;
        if (!check.isValid) {
            errors[field] = check.message;
            isFormValid = false;
        }
    }

    return { isFormValid, errors, results };
}

// ==============================================================================
// BROWSER DOM INTEGRATION (UI FEEDBACK: RED / GREEN BORDERS + ERROR MESSAGES)
// ==============================================================================
function setupStudentFormDOM() {
    if (typeof document === "undefined") return;

    const form = document.getElementById("studentRegistrationForm");
    if (!form) return;

    const fields = ["name", "email", "phone", "password"];

    fields.forEach(fieldId => {
        const inputEl = document.getElementById(fieldId);
        const errorEl = document.getElementById(`${fieldId}Error`);
        if (!inputEl || !errorEl) return;

        // Real-time validation on input and blur events
        const handleValidation = () => {
            const check = validateStudentField(fieldId, inputEl.value);
            if (check.isValid) {
                inputEl.style.border = "2px solid #28a745"; // Green border for valid
                inputEl.style.backgroundColor = "#f4fff4";
                errorEl.textContent = "✔ " + check.message;
                errorEl.style.color = "#28a745";
            } else {
                inputEl.style.border = "2px solid #dc3545"; // Red border for invalid
                inputEl.style.backgroundColor = "#fff4f4";
                errorEl.textContent = "✖ " + check.message;
                errorEl.style.color = "#dc3545";
            }
        };

        inputEl.addEventListener("input", handleValidation);
        inputEl.addEventListener("blur", handleValidation);
    });

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const data = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            phone: document.getElementById("phone").value,
            password: document.getElementById("password").value
        };

        const formValidation = validateStudentForm(data);
        const statusBox = document.getElementById("formStatus");

        if (formValidation.isFormValid) {
            if (statusBox) {
                statusBox.innerHTML = `
                    <div style="padding: 12px; background: #d4edda; color: #155724; border-radius: 6px; border: 1px solid #c3e6cb;">
                        <strong>🎉 Registration Successful!</strong><br>
                        Student <em>${data.name}</em> (${data.email}) is successfully validated!
                    </div>`;
            }
        } else {
            if (statusBox) {
                statusBox.innerHTML = `
                    <div style="padding: 12px; background: #f8d7da; color: #721c24; border-radius: 6px; border: 1px solid #f5c6cb;">
                        <strong>❌ Form Submission Failed:</strong> Please fix the highlighted errors above.
                    </div>`;
            }
        }
    });
}

// Automatically attach listeners if running inside a browser
if (typeof document !== "undefined") {
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", setupStudentFormDOM);
    } else {
        setupStudentFormDOM();
    }
}

// ==============================================================================
// NODE.JS CONSOLE DEMONSTRATION & TEST SUITE
// ==============================================================================
if (typeof module !== "undefined" && typeof window === "undefined") {
    console.log("==============================================================================");
    console.log("          ASSIGNMENT 4 - Q2: STUDENT FORM VALIDATOR (TEST SUITE)              ");
    console.log("==============================================================================\n");

    const testSubmissions = [
        {
            testCase: "Case 1: Fully Valid Student",
            data: {
                name: "Rohit Sharma",
                email: "rohit.sharma@example.com",
                phone: "9876543210",
                password: "SecurePassword123!"
            }
        },
        {
            testCase: "Case 2: Invalid Name (Contains Digits) & Invalid Phone (Only 8 digits)",
            data: {
                name: "John123",
                email: "john@domain.com",
                phone: "98765432",
                password: "MyPassword#99"
            }
        },
        {
            testCase: "Case 3: Invalid Email & Weak Password (Missing special character and digit)",
            data: {
                name: "Priya Nair",
                email: "priya_without_domain",
                phone: "9898989898",
                password: "OnlyLetters"
            }
        },
        {
            testCase: "Case 4: Empty Fields",
            data: {
                name: "",
                email: "",
                phone: "",
                password: ""
            }
        }
    ];

    testSubmissions.forEach((test, idx) => {
        console.log(`------------------------------------------------------------------------------`);
        console.log(`>>> ${test.testCase}`);
        console.log(`------------------------------------------------------------------------------`);
        console.log("Input Form Payload:", test.data);

        const outcome = validateStudentForm(test.data);

        console.log(`Form Overall Status : ${outcome.isFormValid ? "✔ VALID (GREEN BORDER APPLIED)" : "✖ INVALID (RED BORDER APPLIED)"}`);
        console.log("Granular Field Reports:");
        for (const [field, res] of Object.entries(outcome.results)) {
            const symbol = res.isValid ? "[GREEN BORDER ✔]" : "[RED BORDER ✖]";
            console.log(`  - ${field.padEnd(8)}: ${symbol} ${res.message}`);
        }
        console.log();
    });

    console.log("==============================================================================\n");
}
