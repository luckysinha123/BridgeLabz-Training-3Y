"use strict";

/**
 * ==============================================================================
 * ASSIGNMENT 4 - QUESTION 8: Dynamic Object Updater
 * ==============================================================================
 * 
 * Problem Statement:
 * Create an object user = { name: "John", email: "john@mail.com", age: 21 }.
 * Build a form that allows editing these values.
 * On submit, the form should update the user object in real time.
 * Show updated object details below the form using DOM.
 * 
 * Concepts Demonstrated:
 * - Real-Time In-Place Object Mutation
 * - Two-Way Form Data Synchronization
 * - DOM Manipulation & Reactive View Rendering
 * - Console Simulation of Object State Lifecycle
 * ==============================================================================
 */

// ==============================================================================
// STEP 1: Initial User Object
// ==============================================================================
const user = {
    name: "John",
    email: "john@mail.com",
    age: 21
};

/**
 * Updates the user object properties dynamically.
 * 
 * @param {Object} targetObject - The object to update (user)
 * @param {Object} updates - New properties { name, email, age }
 * @returns {Object} Updated targetObject
 */
function updateUser(targetObject, updates) {
    if (!targetObject || typeof targetObject !== "object") {
        throw new Error("Target object must be a valid object.");
    }

    if (updates.name !== undefined && String(updates.name).trim() !== "") {
        targetObject.name = String(updates.name).trim();
    }
    if (updates.email !== undefined && String(updates.email).trim() !== "") {
        targetObject.email = String(updates.email).trim();
    }
    if (updates.age !== undefined && updates.age !== "") {
        const parsedAge = parseInt(updates.age, 10);
        if (!isNaN(parsedAge) && parsedAge > 0) {
            targetObject.age = parsedAge;
        }
    }

    return targetObject;
}

/**
 * Generates formatted display string of the user object.
 * @param {Object} userObj 
 * @returns {string}
 */
function formatUserCard(userObj) {
    return `User State -> Name: "${userObj.name}" | Email: "${userObj.email}" | Age: ${userObj.age}`;
}

// ==============================================================================
// BROWSER DOM IMPLEMENTATION
// ==============================================================================
function initDynamicObjectUpdaterDOM() {
    if (typeof document === "undefined") return;

    const form = document.getElementById("objectUpdaterForm");
    const nameInput = document.getElementById("updateName");
    const emailInput = document.getElementById("updateEmail");
    const ageInput = document.getElementById("updateAge");
    const outputDisplay = document.getElementById("userObjectOutput");

    if (!form || !nameInput || !emailInput || !ageInput || !outputDisplay) return;

    // Helper to render current user state into DOM
    const renderDOMView = () => {
        outputDisplay.innerHTML = `
        <div style="background: #eef2f7; border: 1px solid #b8c7db; border-radius: 6px; padding: 16px; margin-top: 15px;">
            <h4 style="margin-top: 0; color: #1e3a8a;">Current 'user' Object State (In-Memory)</h4>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 12px;">
                <tr><td style="padding: 4px; font-weight: bold; width: 80px;">Name:</td><td>${user.name}</td></tr>
                <tr><td style="padding: 4px; font-weight: bold;">Email:</td><td>${user.email}</td></tr>
                <tr><td style="padding: 4px; font-weight: bold;">Age:</td><td>${user.age}</td></tr>
            </table>
            <strong style="font-size: 13px; color: #555;">JSON Representation:</strong>
            <pre style="background: #fff; padding: 8px; border: 1px solid #ddd; border-radius: 4px; margin: 4px 0 0;">${JSON.stringify(user, null, 2)}</pre>
        </div>`;
    };

    // Populate initial values into form inputs
    nameInput.value = user.name;
    emailInput.value = user.email;
    ageInput.value = user.age;
    renderDOMView();

    // On submit: update user object in real time
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        // Mutate the user object with new input values
        updateUser(user, {
            name: nameInput.value,
            email: emailInput.value,
            age: ageInput.value
        });

        console.log("[Object Updated in Real Time]:", user);
        renderDOMView();

        const toast = document.getElementById("updaterToast");
        if (toast) {
            toast.textContent = "✔ Object updated in real time!";
            toast.style.display = "block";
            setTimeout(() => { toast.style.display = "none"; }, 2500);
        }
    });
}

if (typeof document !== "undefined") {
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initDynamicObjectUpdaterDOM);
    } else {
        initDynamicObjectUpdaterDOM();
    }
}

// ==============================================================================
// NODE.JS TEST SUITE & CONSOLE DEMONSTRATION
// ==============================================================================
if (typeof module !== "undefined" && typeof window === "undefined") {
    console.log("==============================================================================");
    console.log("          ASSIGNMENT 4 - Q8: DYNAMIC OBJECT UPDATER (NODE.JS)                 ");
    console.log("==============================================================================\n");

    console.log("Original 'user' Object:");
    console.log(formatUserCard(user));
    console.log("Raw Object:", user);
    console.log();

    console.log(">>> Simulation 1: User edits name and age via form submit...");
    updateUser(user, { name: "Jonathan Doe", age: 25 });
    console.log(formatUserCard(user));
    console.log("Raw Object:", user);
    console.log();

    console.log(">>> Simulation 2: User edits email via form submit...");
    updateUser(user, { email: "j.doe.updated@domain.com" });
    console.log(formatUserCard(user));
    console.log("Raw Object:", user);
    console.log();

    console.log(">>> Simulation 3: Complete update cycle...");
    updateUser(user, { name: "Lucky Sinha", email: "lucky@techcorp.io", age: 22 });
    console.log(formatUserCard(user));
    console.log("Raw Object:", user);
    console.log("\n==============================================================================\n");
}
