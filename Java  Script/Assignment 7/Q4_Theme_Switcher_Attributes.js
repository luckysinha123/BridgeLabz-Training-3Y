"use strict";

/**
 * ==============================================================================
 * ASSIGNMENT 7 - QUESTION 4: Theme Switcher Using Attribute Manipulation
 * ==============================================================================
 * 
 * Problem Statement:
 * Build a theme switcher with 3 themes: Light, Dark, Blue
 * ● Clicking a button adds a class to <body>
 * ● All themes must be applied using setAttribute()
 * ● Save current theme in a custom attribute: data-theme="dark"
 * 
 * Concepts Demonstrated:
 * - DOM Attribute Manipulation (element.setAttribute("class", ...))
 * - Custom Data Attributes (element.setAttribute("data-theme", ...))
 * - Event-Driven UI Styling
 * - State Persistence in Document Element Attributes
 * ==============================================================================
 */

/**
 * Available theme presets and their CSS class mappings
 */
const THEMES = {
    LIGHT: "light",
    DARK: "dark",
    BLUE: "blue"
};

/**
 * Core function that applies a theme to a target element using setAttribute().
 * 
 * Requirements:
 * - Add a class to <body>
 * - Apply all themes using setAttribute()
 * - Save current theme in custom attribute data-theme="<theme>"
 * 
 * @param {HTMLElement} element - Target DOM element (typically document.body)
 * @param {string} themeName - "light" | "dark" | "blue"
 * @returns {{ appliedClass: string, dataTheme: string }}
 */
function applyThemeUsingSetAttribute(element, themeName) {
    if (!element || typeof element.setAttribute !== "function") {
        throw new Error("Target element must be a valid DOM element supporting setAttribute.");
    }

    const normalizedTheme = String(themeName).toLowerCase();
    const className = `theme-${normalizedTheme}`;

    // Requirement 1 & 2: Apply class to body using setAttribute()
    element.setAttribute("class", className);

    // Requirement 3: Save current theme in custom attribute data-theme="<theme>"
    element.setAttribute("data-theme", normalizedTheme);

    return {
        appliedClass: className,
        dataTheme: normalizedTheme
    };
}

// ==============================================================================
// BROWSER DOM ATTACHMENT
// ==============================================================================
function initThemeSwitcherDOM() {
    if (typeof document === "undefined") return;

    const btnLight = document.getElementById("themeBtnLight");
    const btnDark = document.getElementById("themeBtnDark");
    const btnBlue = document.getElementById("themeBtnBlue");
    const activeThemeLabel = document.getElementById("activeThemeLabel");

    const updateLabel = (theme) => {
        if (activeThemeLabel) {
            activeThemeLabel.textContent = `Current Theme: ${theme.toUpperCase()} (data-theme="${theme}")`;
        }
    };

    if (btnLight) {
        btnLight.addEventListener("click", () => {
            applyThemeUsingSetAttribute(document.body, THEMES.LIGHT);
            updateLabel(THEMES.LIGHT);
            console.log(`[Theme Switcher] Applied Light Theme -> body.getAttribute('data-theme'): "${document.body.getAttribute('data-theme')}"`);
        });
    }

    if (btnDark) {
        btnDark.addEventListener("click", () => {
            applyThemeUsingSetAttribute(document.body, THEMES.DARK);
            updateLabel(THEMES.DARK);
            console.log(`[Theme Switcher] Applied Dark Theme -> body.getAttribute('data-theme'): "${document.body.getAttribute('data-theme')}"`);
        });
    }

    if (btnBlue) {
        btnBlue.addEventListener("click", () => {
            applyThemeUsingSetAttribute(document.body, THEMES.BLUE);
            updateLabel(THEMES.BLUE);
            console.log(`[Theme Switcher] Applied Blue Theme -> body.getAttribute('data-theme'): "${document.body.getAttribute('data-theme')}"`);
        });
    }
}

if (typeof document !== "undefined") {
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initThemeSwitcherDOM);
    } else {
        initThemeSwitcherDOM();
    }
}

// ==============================================================================
// NODE.JS SIMULATION & TEST SUITE
// ==============================================================================
if (typeof module !== "undefined" && typeof window === "undefined") {
    console.log("==============================================================================");
    console.log("       ASSIGNMENT 7 - Q4: THEME SWITCHER USING ATTRIBUTES (NODE.JS)           ");
    console.log("==============================================================================\n");

    // Mock DOM Element for headless Node.js testing
    const mockBody = {
        attributes: {},
        setAttribute(name, value) {
            this.attributes[name] = value;
        },
        getAttribute(name) {
            return this.attributes[name];
        }
    };

    console.log("Testing setAttribute() manipulation across all 3 themes:\n");

    [THEMES.LIGHT, THEMES.DARK, THEMES.BLUE].forEach(theme => {
        const result = applyThemeUsingSetAttribute(mockBody, theme);
        console.log(`>>> Switching to Theme: "${theme.toUpperCase()}"`);
        console.log(`    class attribute set via setAttribute()      : "${mockBody.getAttribute('class')}"`);
        console.log(`    custom data-theme attribute set via setAttribute(): "${mockBody.getAttribute('data-theme')}"`);
        console.log(`    Result Object:`, result);
        console.log();
    });

    console.log("==============================================================================\n");
}
