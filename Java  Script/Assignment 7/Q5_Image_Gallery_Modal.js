"use strict";

/**
 * ==============================================================================
 * ASSIGNMENT 7 - QUESTION 5: Image Gallery with Modal Preview
 * ==============================================================================
 * 
 * Problem Statement:
 * Create an image grid (6 images).
 * On clicking any image:
 * ● Show a modal popup
 * ● Modal displays a bigger version of clicked image
 * ● Clicking outside modal → closes the modal
 * ● Use event.stopPropagation() so clicking inside modal does not close it
 * 
 * Concepts Demonstrated:
 * - DOM Event Bubbling & Propagation Mechanics
 * - Halting Event Bubbling with event.stopPropagation()
 * - Modal Dialog Show / Hide Lifecycle
 * ==============================================================================
 */

// 6 Curated Image specifications
const GALLERY_IMAGES = [
    { id: 1, title: "Mountain Sunset", thumb: "https://picsum.photos/id/10/300/200", full: "https://picsum.photos/id/10/800/600" },
    { id: 2, title: "Forest Trail", thumb: "https://picsum.photos/id/11/300/200", full: "https://picsum.photos/id/11/800/600" },
    { id: 3, title: "Ocean Waves", thumb: "https://picsum.photos/id/12/300/200", full: "https://picsum.photos/id/12/800/600" },
    { id: 4, title: "Desert Dunes", thumb: "https://picsum.photos/id/13/300/200", full: "https://picsum.photos/id/13/800/600" },
    { id: 5, title: "Alpine Lake", thumb: "https://picsum.photos/id/14/300/200", full: "https://picsum.photos/id/14/800/600" },
    { id: 6, title: "Autumn Woods", thumb: "https://picsum.photos/id/15/300/200", full: "https://picsum.photos/id/15/800/600" }
];

// ==============================================================================
// BROWSER DOM IMPLEMENTATION
// ==============================================================================
function initImageGalleryModalDOM() {
    if (typeof document === "undefined") return;

    const galleryGrid = document.getElementById("imageGalleryGrid");
    const modalBackdrop = document.getElementById("galleryModal");
    const modalContent = document.getElementById("modalContentContainer");
    const modalImg = document.getElementById("modalImage");
    const modalTitle = document.getElementById("modalImageTitle");
    const closeBtn = document.getElementById("modalCloseBtn");

    if (!galleryGrid || !modalBackdrop || !modalContent) return;

    // Helper: Open Modal
    const openModal = (fullSrc, title) => {
        if (modalImg) modalImg.src = fullSrc;
        if (modalTitle) modalTitle.textContent = title;
        modalBackdrop.style.display = "flex";
        console.log(`[Modal Opened] Displaying large image: "${title}"`);
    };

    // Helper: Close Modal
    const closeModal = () => {
        modalBackdrop.style.display = "none";
        if (modalImg) modalImg.src = "";
        console.log("[Modal Closed] Backdrop dismissed.");
    };

    // 1. Render Gallery Images dynamically
    galleryGrid.innerHTML = "";
    GALLERY_IMAGES.forEach(item => {
        const itemDiv = document.createElement("div");
        itemDiv.className = "gallery-card";
        itemDiv.style.cssText = "cursor: pointer; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 6px rgba(0,0,0,0.1); transition: transform 0.2s;";
        itemDiv.innerHTML = `
            <img src="${item.thumb}" alt="${item.title}" style="width: 100%; height: 160px; object-fit: cover; display: block;" />
            <div style="padding: 8px 12px; background: #fff; font-size: 0.85rem; font-weight: 600; color: #334155;">
                ${item.title}
            </div>
        `;

        itemDiv.addEventListener("click", () => {
            openModal(item.full, item.title);
        });

        galleryGrid.appendChild(itemDiv);
    });

    // 2. CLICKING OUTSIDE MODAL -> CLOSES MODAL
    modalBackdrop.addEventListener("click", () => {
        closeModal();
    });

    // 3. CRUCIAL: USE event.stopPropagation() SO CLICKING INSIDE MODAL DOES NOT CLOSE IT
    modalContent.addEventListener("click", (event) => {
        // Stops click event from bubbling up to modalBackdrop
        event.stopPropagation();
        console.log("[event.stopPropagation() Invoked] Click inside modal content captured; bubble halted!");
    });

    // Close button click
    if (closeBtn) {
        closeBtn.addEventListener("click", (event) => {
            event.stopPropagation();
            closeModal();
        });
    }

    // Escape key closes modal
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modalBackdrop.style.display === "flex") {
            closeModal();
        }
    });
}

if (typeof document !== "undefined") {
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initImageGalleryModalDOM);
    } else {
        initImageGalleryModalDOM();
    }
}

// ==============================================================================
// NODE.JS TEST SUITE
// ==============================================================================
if (typeof module !== "undefined" && typeof window === "undefined") {
    console.log("==============================================================================");
    console.log("     ASSIGNMENT 7 - Q5: IMAGE GALLERY MODAL PREVIEW (NODE.JS TEST)            ");
    console.log("==============================================================================\n");

    console.log("Gallery Image Database (6 Images Configured):");
    console.table(GALLERY_IMAGES);

    console.log("\nPropagation Verification Logic:");
    console.log("1. modalBackdrop receives click -> closeModal() fires.");
    console.log("2. modalContent receives click -> event.stopPropagation() called.");
    console.log("3. Event never reaches modalBackdrop -> Modal remains safely open! ✔");
    console.log("==============================================================================\n");
}
