/**
 * ==============================================================================
 * ASSIGNMENT 9 - QUESTION 10: Registration Form Validation (jQuery)
 * ==============================================================================
 * 
 * Requirements:
 * 1. Check Name field → not empty.
 * 2. Check Email field → valid format and uniqueness.
 * 3. Check Password → minimum 8 characters.
 * 4. Show success message if all fields valid.
 * 5. Highlight invalid fields dynamically with red border using .css().
 * ==============================================================================
 */

// Simulated pre-existing user email database for uniqueness checking (Requirement 2)
const existingRegisteredEmails = [
    "alice@example.com",
    "john.doe@company.org",
    "admin@techpulse.io",
    "rohit.sharma@domain.in",
    "lucky.sinha@example.com"
];

$(document).ready(function() {
    console.log("[Q10 Registration Validation Initialized]");

    const $form = $("#registrationForm");
    const $name = $("#regName");
    const $email = $("#regEmail");
    const $password = $("#regPassword");
    const $successBox = $("#registrationSuccess");

    // Email regex pattern
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Helper to set error on field using jQuery .css() (Requirement 5)
    function setFieldError($field, $errorEl, message) {
        // REQUIREMENT 5: Highlight invalid fields dynamically with red border using .css()
        $field.css({
            "border-color": "#dc2626",
            "background-color": "#fef2f2"
        });
        $errorEl.text(message).fadeIn(150);
    }

    // Helper to clear error on field using jQuery .css()
    function setFieldValid($field, $errorEl) {
        $field.css({
            "border-color": "#16a34a",
            "background-color": "#f0fdf4"
        });
        $errorEl.fadeOut(150);
    }

    // Live error clearance on input
    $name.on("input", function() {
        if ($(this).val().trim().length > 0) {
            setFieldValid($(this), $("#nameError"));
        }
    });

    $email.on("input", function() {
        const val = $(this).val().trim().toLowerCase();
        if (emailPattern.test(val) && !existingRegisteredEmails.includes(val)) {
            setFieldValid($(this), $("#emailError"));
        }
    });

    $password.on("input", function() {
        if ($(this).val().length >= 8) {
            setFieldValid($(this), $("#passwordError"));
        }
    });

    // --------------------------------------------------------------------------
    // Form Submit Event Handler
    // --------------------------------------------------------------------------
    $form.on("submit", function(event) {
        // Prevent default browser form submission
        event.preventDefault();

        let isFormValid = true;

        // 1. Check Name Field -> Not empty
        const nameVal = $name.val().trim();
        if (nameVal === "") {
            setFieldError($name, $("#nameError"), "Name is required and cannot be empty.");
            isFormValid = false;
        } else {
            setFieldValid($name, $("#nameError"));
        }

        // 2. Check Email Field -> Valid format AND uniqueness
        const emailVal = $email.val().trim().toLowerCase();
        if (emailVal === "") {
            setFieldError($email, $("#emailError"), "Email address is required.");
            isFormValid = false;
        } else if (!emailPattern.test(emailVal)) {
            setFieldError($email, $("#emailError"), "Please enter a valid email format (e.g. user@domain.com).");
            isFormValid = false;
        } else if (existingRegisteredEmails.includes(emailVal)) {
            // Uniqueness validation failed!
            setFieldError($email, $("#emailError"), `Email "${emailVal}" is already registered. Please choose another.`);
            isFormValid = false;
        } else {
            setFieldValid($email, $("#emailError"));
        }

        // 3. Check Password Field -> Minimum 8 characters
        const passwordVal = $password.val();
        if (passwordVal === "") {
            setFieldError($password, $("#passwordError"), "Password is required.");
            isFormValid = false;
        } else if (passwordVal.length < 8) {
            setFieldError($password, $("#passwordError"), `Password must be at least 8 characters long (currently ${passwordVal.length} chars).`);
            isFormValid = false;
        } else {
            setFieldValid($password, $("#passwordError"));
        }

        // 4. Show success message if all fields are valid
        if (isFormValid) {
            console.log(`[Registration Approved] User: ${nameVal} | Email: ${emailVal}`);

            // Add email to local list to enforce immediate subsequent uniqueness
            existingRegisteredEmails.push(emailVal);

            // Display success message banner
            $successBox.slideDown(300);

            // Disable form inputs to signify completion
            $form.find("input, button").prop("disabled", true);
        } else {
            $successBox.slideUp(200);
            console.warn("[Validation Blocked] Fix highlighted form errors.");
        }
    });
});
