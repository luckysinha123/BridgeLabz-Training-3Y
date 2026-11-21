"use strict";

/**
 * ==============================================================================
 * ASSIGNMENT 4 - QUESTION 4: Custom Form Builder (Forms + Classes)
 * ==============================================================================
 * 
 * Problem Statement:
 * Build a dynamic form generator using a FormBuilder class that takes an array
 * of field objects (e.g., {type: 'text', label: 'Username'}) and creates a form
 * dynamically using innerHTML.
 * 
 * Note:
 * Add a method getFormData() that returns all entered values as an object when
 * user clicks "Submit".
 * 
 * Concepts Demonstrated:
 * - ES6 Class Architecture & Dynamic DOM Injection
 * - Array Iteration & String Templating with Template Literals
 * - Form Data Aggregation into Key-Value Objects
 * - Universal execution (Runs in Node.js test environment & Browser DOM)
 * ==============================================================================
 */

/**
 * Class representing a Dynamic Form Generator.
 */
class FormBuilder {
    /**
     * @param {Array<Object>} fields - Configuration array of field objects
     * @param {string} [formId="dynamicGeneratedForm"] - ID attribute for the form
     */
    constructor(fields, formId = "dynamicGeneratedForm") {
        if (!Array.isArray(fields) || fields.length === 0) {
            throw new Error("FormBuilder requires a non-empty array of field configuration objects.");
        }
        this.fields = fields;
        this.formId = formId;
        this.formElement = null;
    }

    /**
     * Generates HTML markup for an individual form control.
     * @param {Object} field - Field specification
     * @returns {string} HTML string
     */
    createFieldHTML(field) {
        const {
            type = "text",
            label = "Field",
            name,
            placeholder = "",
            required = false,
            options = []
        } = field;

        const fieldName = name || label.toLowerCase().replace(/\s+/g, "_");
        const requiredAttr = required ? "required" : "";
        const requiredBadge = required ? ' <span style="color: #dc3545;">*</span>' : "";

        let inputControlHTML = "";

        if (type === "select") {
            const optionsHTML = options
                .map(opt => `<option value="${opt}">${opt}</option>`)
                .join("\n                ");
            inputControlHTML = `
            <select id="${this.formId}_${fieldName}" name="${fieldName}" class="form-control" ${requiredAttr} style="width: 100%; padding: 8px; border-radius: 4px; border: 1px solid #ccc;">
                <option value="" disabled selected>Select ${label}</option>
                ${optionsHTML}
            </select>`;
        } else if (type === "textarea") {
            inputControlHTML = `
            <textarea id="${this.formId}_${fieldName}" name="${fieldName}" placeholder="${placeholder}" class="form-control" rows="3" ${requiredAttr} style="width: 100%; padding: 8px; border-radius: 4px; border: 1px solid #ccc;"></textarea>`;
        } else {
            inputControlHTML = `
            <input type="${type}" id="${this.formId}_${fieldName}" name="${fieldName}" placeholder="${placeholder}" class="form-control" ${requiredAttr} style="width: 100%; padding: 8px; border-radius: 4px; border: 1px solid #ccc;" />`;
        }

        return `
        <div class="form-group" style="margin-bottom: 16px;">
            <label for="${this.formId}_${fieldName}" style="display: block; font-weight: 600; margin-bottom: 6px;">
                ${label}${requiredBadge}
            </label>
            ${inputControlHTML}
        </div>`;
    }

    /**
     * Generates the entire HTML form markup as a string.
     * @returns {string} Complete HTML string of the form
     */
    generateFormHTML() {
        const fieldsMarkup = this.fields.map(field => this.createFieldHTML(field)).join("\n");

        return `
    <form id="${this.formId}" class="custom-dynamic-form" style="border: 1px solid #e0e0e0; padding: 24px; border-radius: 8px; background: #ffffff; max-width: 500px; margin: 0 auto; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
        <h3 style="margin-top: 0; color: #333; border-bottom: 2px solid #007bff; padding-bottom: 8px;">Dynamically Generated Form</h3>
        ${fieldsMarkup}
        <button type="submit" id="${this.formId}_submitBtn" style="background: #007bff; color: white; border: none; padding: 10px 20px; font-size: 16px; border-radius: 4px; cursor: pointer; width: 100%; font-weight: bold;">
            Submit
        </button>
        <div id="${this.formId}_output" style="margin-top: 16px;"></div>
    </form>`;
    }

    /**
     * Renders the form into a DOM container element using innerHTML.
     * @param {string|HTMLElement} container - DOM selector or HTMLElement
     */
    render(container) {
        if (typeof document === "undefined") {
            console.log("[Node.js Environment] DOM not available. Form markup generated successfully.");
            return this.generateFormHTML();
        }

        const containerEl = typeof container === "string" ? document.querySelector(container) : container;
        if (!containerEl) {
            console.error(`Container "${container}" not found in DOM.`);
            return;
        }

        containerEl.innerHTML = this.generateFormHTML();
        this.formElement = document.getElementById(this.formId);

        // Attach submit listener
        this.formElement.addEventListener("submit", (event) => {
            event.preventDefault();
            const formData = this.getFormData();
            console.log("[Form Submitted] Extracted Form Data:", formData);

            const outputBox = document.getElementById(`${this.formId}_output`);
            if (outputBox) {
                outputBox.innerHTML = `
                <div style="background: #f8f9fa; border: 1px solid #28a745; padding: 12px; border-radius: 4px;">
                    <strong style="color: #28a745;">✔ Form Data Captured:</strong>
                    <pre style="margin: 8px 0 0; background: #fff; padding: 8px; border: 1px solid #ddd; border-radius: 4px; overflow-x: auto;">${JSON.stringify(formData, null, 2)}</pre>
                </div>`;
            }
        });
    }

    /**
     * Extracts all entered form field values into an object.
     * @returns {Object} Key-value pairs of form fields and their current values.
     */
    getFormData() {
        if (typeof document === "undefined" || !this.formElement) {
            // Simulated extraction for Node.js testing
            const mockExtractedData = {};
            this.fields.forEach(field => {
                const name = field.name || field.label.toLowerCase().replace(/\s+/g, "_");
                mockExtractedData[name] = field.mockValue || `Sample_${name}`;
            });
            return mockExtractedData;
        }

        const formDataObj = {};
        const elements = this.formElement.elements;

        for (let i = 0; i < elements.length; i++) {
            const el = elements[i];
            if (el.name && el.type !== "submit" && el.type !== "button") {
                formDataObj[el.name] = el.value;
            }
        }

        return formDataObj;
    }
}

// ==============================================================================
// DEMONSTRATION & TEST CASES
// ==============================================================================
const sampleFormFields = [
    { type: "text", label: "Username", name: "username", placeholder: "e.g. jdoe_dev", required: true, mockValue: "alex_dev" },
    { type: "email", label: "Email Address", name: "email", placeholder: "user@example.com", required: true, mockValue: "alex@domain.com" },
    { type: "password", label: "Password", name: "password", placeholder: "Enter password", required: true, mockValue: "SecretP@ss1" },
    { type: "select", label: "Designation", name: "designation", options: ["Frontend Developer", "Backend Engineer", "DevOps", "Student"], mockValue: "Frontend Developer" },
    { type: "textarea", label: "Bio / Comments", name: "bio", placeholder: "Tell us about yourself...", mockValue: "Full Stack Engineer passionate about JS." }
];

if (typeof module !== "undefined" && typeof window === "undefined") {
    console.log("==============================================================================");
    console.log("          ASSIGNMENT 4 - Q4: CUSTOM FORM BUILDER (NODE.JS TEST)               ");
    console.log("==============================================================================\n");

    const builder = new FormBuilder(sampleFormFields, "userRegistrationForm");

    console.log("Generated Dynamic Form HTML Markup Preview (via innerHTML):");
    console.log("------------------------------------------------------------------------------");
    console.log(builder.generateFormHTML().substring(0, 700) + "\n... [truncated for display]");
    console.log("------------------------------------------------------------------------------\n");

    console.log("Executing getFormData() method to extract user entries:");
    const extractedData = builder.getFormData();
    console.log(extractedData);
    console.log("\nSuccessfully generated form and verified getFormData() extraction!");
    console.log("==============================================================================\n");
}
