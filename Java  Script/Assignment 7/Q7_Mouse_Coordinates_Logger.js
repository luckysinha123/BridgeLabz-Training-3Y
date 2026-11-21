"use strict";

/**
 * ==============================================================================
 * ASSIGNMENT 7 - QUESTION 7: Detect Mouse Path & Coordinates Logger
 * ==============================================================================
 * 
 * Problem Statement:
 * Create a box <div> (400×400).
 * Track:
 * ● Mouse move inside the box
 * ● Show live clientX, clientY
 * ● On double-click inside, drop a red dot at the click position
 * 
 * Concepts Demonstrated:
 * - Mouse Events (mousemove, dblclick)
 * - Mouse Coordinates (clientX, clientY, offsetX, offsetY)
 * - Dynamic Marker Injection into Relative-Positioned Canvas Container
 * ==============================================================================
 */

/**
 * Coordinates calculation and red dot marker creator.
 * 
 * @param {number} x - Click coordinate X
 * @param {number} y - Click coordinate Y
 * @returns {Object} Marker style descriptor
 */
function createRedDotMarkerData(x, y) {
    const dotDiameter = 12; // pixels
    return {
        x,
        y,
        diameter: dotDiameter,
        top: `${y - dotDiameter / 2}px`,
        left: `${x - dotDiameter / 2}px`,
        style: "position: absolute; width: 12px; height: 12px; background: #ef4444; border-radius: 50%; box-shadow: 0 0 4px rgba(0,0,0,0.4);"
    };
}

// ==============================================================================
// BROWSER DOM INTERACTION
// ==============================================================================
function initMouseCoordinatesLoggerDOM() {
    if (typeof document === "undefined") return;

    const mouseBox = document.getElementById("mouseTrackerBox");
    const clientXDisplay = document.getElementById("liveClientX");
    const clientYDisplay = document.getElementById("liveClientY");
    const offsetXDisplay = document.getElementById("liveOffsetX");
    const offsetYDisplay = document.getElementById("liveOffsetY");
    const dotsCountDisplay = document.getElementById("dotsDroppedCount");

    if (!mouseBox) return;

    let dotCounter = 0;

    // 1. TRACK MOUSE MOVE INSIDE 400x400 BOX
    mouseBox.addEventListener("mousemove", (event) => {
        // Global viewport coordinates
        if (clientXDisplay) clientXDisplay.textContent = event.clientX;
        if (clientYDisplay) clientYDisplay.textContent = event.clientY;

        // Container-relative coordinates (offsetX, offsetY)
        if (offsetXDisplay) offsetXDisplay.textContent = event.offsetX;
        if (offsetYDisplay) offsetYDisplay.textContent = event.offsetY;
    });

    // Reset displays on mouse leave
    mouseBox.addEventListener("mouseleave", () => {
        if (clientXDisplay) clientXDisplay.textContent = "--";
        if (clientYDisplay) clientYDisplay.textContent = "--";
        if (offsetXDisplay) offsetXDisplay.textContent = "--";
        if (offsetYDisplay) offsetYDisplay.textContent = "--";
    });

    // 2. ON DOUBLE-CLICK: DROP A RED DOT AT CLICK POSITION
    mouseBox.addEventListener("dblclick", (event) => {
        const dotData = createRedDotMarkerData(event.offsetX, event.offsetY);

        const redDot = document.createElement("div");
        redDot.className = "red-marker-dot";
        redDot.style.cssText = `
            position: absolute;
            left: ${dotData.left};
            top: ${dotData.top};
            width: ${dotData.diameter}px;
            height: ${dotData.diameter}px;
            background-color: #ef4444;
            border-radius: 50%;
            pointer-events: none;
            box-shadow: 0 0 6px rgba(239, 68, 68, 0.7);
            transform: scale(0);
            transition: transform 0.15s ease-out;
        `;

        mouseBox.appendChild(redDot);
        // Trigger pop animation
        setTimeout(() => { redDot.style.transform = "scale(1)"; }, 10);

        dotCounter++;
        if (dotsCountDisplay) dotsCountDisplay.textContent = dotCounter;

        console.log(`[Double Click Marker Placed] Dropped red dot at (X: ${event.offsetX}, Y: ${event.offsetY})`);
    });
}

if (typeof document !== "undefined") {
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initMouseCoordinatesLoggerDOM);
    } else {
        initMouseCoordinatesLoggerDOM();
    }
}

// ==============================================================================
// NODE.JS TEST SUITE
// ==============================================================================
if (typeof module !== "undefined" && typeof window === "undefined") {
    console.log("==============================================================================");
    console.log("       ASSIGNMENT 7 - Q7: MOUSE COORDINATES LOGGER (NODE.JS TEST)             ");
    console.log("==============================================================================\n");

    console.log("400x400 Canvas Box Geometry & Double-Click Logic Verification:");
    const simulatedClicks = [
        { x: 200, y: 200, label: "Center of Canvas" },
        { x: 50, y: 50, label: "Top-Left Region" },
        { x: 380, y: 390, label: "Bottom-Right Region" }
    ];

    simulatedClicks.forEach(click => {
        const marker = createRedDotMarkerData(click.x, click.y);
        console.log(`>>> Double-Click Event at: [${click.label}]`);
        console.log(`    Input (X, Y)  : (${click.x}, ${click.y})`);
        console.log(`    Computed Left : ${marker.left} (Centered offset)`);
        console.log(`    Computed Top  : ${marker.top} (Centered offset)`);
        console.log();
    });

    console.log("==============================================================================\n");
}
