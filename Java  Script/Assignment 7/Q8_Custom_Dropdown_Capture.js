"use strict";

/**
 * ==============================================================================
 * ASSIGNMENT 7 - QUESTION 8: Custom Dropdown Using Capturing Phase
 * ==============================================================================
 * 
 * Problem Statement:
 * Build a custom dropdown:
 * ● A button shows/hides options
 * ● Clicking an option updates the button text
 * ● Clicking outside closes the dropdown
 * ● Use capturing phase for the closing mechanism
 * 
 * Concepts Demonstrated:
 * - Custom Dropdown Widget (Zero native <select> elements)
 * - Event Dispatch Phases: Capturing Phase (Trickling down) vs Bubbling Phase
 * - Using { capture: true } or true flag in addEventListener
 * ==============================================================================
 */

/**
 * Manages the custom dropdown UI and state.
 */
class CustomDropdown {
    constructor(containerId, optionsList, defaultText = "Select an Option") {
        this.containerId = containerId;
        this.optionsList = optionsList;
        this.selectedOption = defaultText;
        this.isOpen = false;
    }

    toggle() {
        this.isOpen = !this.isOpen;
        return this.isOpen;
    }

    close() {
        this.isOpen = false;
        return this.isOpen;
    }

    select(option) {
        this.selectedOption = option;
        this.close();
        return this.selectedOption;
    }
}

// ==============================================================================
// BROWSER DOM IMPLEMENTATION
// ==============================================================================
function initCustomDropdownDOM() {
    if (typeof document === "undefined") return;

    const dropdownContainer = document.getElementById("customDropdownContainer");
    const toggleBtn = document.getElementById("dropdownToggleBtn");
    const optionsMenu = document.getElementById("dropdownOptionsMenu");
    const selectedTextSpan = document.getElementById("dropdownSelectedText");

    if (!dropdownContainer || !toggleBtn || !optionsMenu) return;

    const dropdown = new CustomDropdown(
        "customDropdownContainer",
        ["JavaScript (ES6+)", "TypeScript", "React.js", "Node.js", "Python", "Go"],
        "Choose Technology..."
    );

    // 1. POPULATE OPTIONS
    optionsMenu.innerHTML = "";
    dropdown.optionsList.forEach(opt => {
        const li = document.createElement("li");
        li.textContent = opt;
        li.className = "dropdown-item";
        li.style.cssText = "padding: 10px 14px; cursor: pointer; border-bottom: 1px solid #f1f5f9; transition: background 0.15s;";

        li.addEventListener("mouseenter", () => { li.style.backgroundColor = "#f1f5f9"; });
        li.addEventListener("mouseleave", () => { li.style.backgroundColor = "#ffffff"; });

        // Click on Option updates button text and closes menu
        li.addEventListener("click", () => {
            dropdown.select(opt);
            if (selectedTextSpan) selectedTextSpan.textContent = opt;
            optionsMenu.style.display = "none";
            console.log(`[Option Selected]: "${opt}"`);
        });

        optionsMenu.appendChild(li);
    });

    // 2. TOGGLE BUTTON SHOW/HIDE
    toggleBtn.addEventListener("click", (e) => {
        e.stopPropagation(); // Avoid triggering document click
        const open = dropdown.toggle();
        optionsMenu.style.display = open ? "block" : "none";
        console.log(`[Dropdown Toggled] State: ${open ? "OPEN" : "CLOSED"}`);
    });

    // 3. CRUCIAL: USE CAPTURING PHASE FOR THE OUTSIDE CLOSING MECHANISM
    // Passing `true` as the third argument triggers the listener during the CAPTURING phase!
    document.addEventListener("click", (event) => {
        // If dropdown is open and the click target is NOT inside the custom dropdown container
        if (dropdown.isOpen && !dropdownContainer.contains(event.target)) {
            dropdown.close();
            optionsMenu.style.display = "none";
            console.log("[Capturing Phase Listener Triggered] Click outside detected -> Dropdown closed!");
        }
    }, true); // <<< CAPTURING PHASE FLAG (true)
}

if (typeof document !== "undefined") {
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initCustomDropdownDOM);
    } else {
        initCustomDropdownDOM();
    }
}

// ==============================================================================
// NODE.JS TEST SUITE
// ==============================================================================
if (typeof module !== "undefined" && typeof window === "undefined") {
    console.log("==============================================================================");
    console.log("   ASSIGNMENT 7 - Q8: CUSTOM DROPDOWN USING CAPTURING PHASE (NODE.JS)         ");
    console.log("==============================================================================\n");

    const testDropdown = new CustomDropdown(
        "testDropdown",
        ["Computer Science", "Information Technology", "Electronics"]
    );

    console.log("Initial State -> Selected:", testDropdown.selectedOption, "| Is Open:", testDropdown.isOpen);

    console.log("Action: User clicks toggle button...");
    testDropdown.toggle();
    console.log("State after toggle -> Is Open:", testDropdown.isOpen);

    console.log("Action: User selects 'Computer Science'...");
    testDropdown.select("Computer Science");
    console.log("State after selection -> Selected:", testDropdown.selectedOption, "| Is Open:", testDropdown.isOpen);

    console.log("\nCapturing Phase Mechanics Note:");
    console.log("`document.addEventListener('click', handler, true)`");
    console.log("The `true` parameter enables capturing phase listening, allowing the document");
    console.log("to intercept the click at the topmost level before it even reaches child nodes!");
    console.log("==============================================================================\n");
}
