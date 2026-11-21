"use strict";

/**
 * ==============================================================================
 * ASSIGNMENT 7 - QUESTION 1: Dynamic Product List Manager
 * ==============================================================================
 * 
 * Problem Statement:
 * Create a product list application where:
 * ● User can add new products using an input box
 * ● Each product appears with Edit and Delete buttons
 * ● Editing allows inline text editing
 * ● Use event delegation to handle Edit/Delete on parent <ul>
 * ● If user clicks outside the edited item, the edit mode should auto-save
 * 
 * Concepts Demonstrated:
 * - Event Delegation: Single event listener on parent <ul> catching bubbled events
 * - Inline DOM text manipulation and contenteditable / input toggling
 * - Global document click listening for outside click auto-saving
 * - Universal execution (Browser DOM + Node.js simulation suite)
 * ==============================================================================
 */

// ==============================================================================
// IN-MEMORY PRODUCT STORE (STATE MANAGEMENT)
// ==============================================================================
class ProductManager {
    constructor() {
        this.products = [
            { id: 1, name: "Wireless Mechanical Keyboard" },
            { id: 2, name: "Ergonomic Vertical Mouse" },
            { id: 3, name: "4K Ultra-Wide Monitor" }
        ];
        this.nextId = 4;
        this.currentlyEditingId = null;
    }

    addProduct(name) {
        const trimmed = String(name || "").trim();
        if (!trimmed) {
            throw new Error("Product name cannot be empty.");
        }
        const newProduct = { id: this.nextId++, name: trimmed };
        this.products.push(newProduct);
        return newProduct;
    }

    deleteProduct(id) {
        const numId = Number(id);
        const index = this.products.findIndex(p => p.id === numId);
        if (index === -1) {
            return false;
        }
        this.products.splice(index, 1);
        return true;
    }

    updateProduct(id, newName) {
        const numId = Number(id);
        const product = this.products.find(p => p.id === numId);
        if (!product) return false;
        const trimmed = String(newName || "").trim();
        if (trimmed) {
            product.name = trimmed;
        }
        return product;
    }
}

// Instantiate manager instance
const productStore = new ProductManager();

// ==============================================================================
// BROWSER DOM INTERACTION & EVENT DELEGATION
// ==============================================================================
function initProductListDOM() {
    if (typeof document === "undefined") return;

    const addForm = document.getElementById("addProductForm");
    const productInput = document.getElementById("newProductName");
    const productListUL = document.getElementById("productListUL");

    if (!productListUL) return;

    // Helper to re-render all products
    const renderProducts = () => {
        productListUL.innerHTML = "";

        if (productStore.products.length === 0) {
            productListUL.innerHTML = `<li class="empty-state" style="padding: 12px; color: #64748b; text-align: center;">No products in inventory. Add one above!</li>`;
            return;
        }

        productStore.products.forEach(product => {
            const li = document.createElement("li");
            li.setAttribute("data-id", product.id);
            li.className = "product-item";
            li.style.cssText = "display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; border-bottom: 1px solid #e2e8f0;";

            li.innerHTML = `
                <span class="product-title" style="flex: 1; font-size: 0.95rem; font-weight: 500; padding: 4px 8px; border-radius: 4px;">
                    ${product.name}
                </span>
                <div class="product-actions" style="display: flex; gap: 8px;">
                    <button class="btn-edit" data-action="edit" style="background: #3b82f6; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-size: 0.85rem;">
                        Edit
                    </button>
                    <button class="btn-delete" data-action="delete" style="background: #ef4444; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-size: 0.85rem;">
                        Delete
                    </button>
                </div>
            `;
            productListUL.appendChild(li);
        });
    };

    // Initial render
    renderProducts();

    // 1. ADD NEW PRODUCT (Form Submit)
    if (addForm) {
        addForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const val = productInput.value.trim();
            if (!val) {
                alert("Please enter a valid product name.");
                return;
            }
            productStore.addProduct(val);
            productInput.value = "";
            renderProducts();
        });
    }

    // 2. EVENT DELEGATION ON PARENT <ul> FOR EDIT & DELETE
    productListUL.addEventListener("click", (event) => {
        // Identify which button was clicked using data-action
        const targetBtn = event.target.closest("button[data-action]");
        if (!targetBtn) return;

        const action = targetBtn.getAttribute("data-action");
        const li = targetBtn.closest("li[data-id]");
        if (!li) return;

        const productId = Number(li.getAttribute("data-id"));

        // ACTION: DELETE
        if (action === "delete") {
            productStore.deleteProduct(productId);
            renderProducts();
            return;
        }

        // ACTION: EDIT (INLINE EDITING TOGGLE)
        if (action === "edit") {
            const titleSpan = li.querySelector(".product-title");
            if (!titleSpan) return;

            // Save any previously active edit before opening this one
            autoSaveCurrentEdit();

            // Toggle to inline editing mode
            titleSpan.setAttribute("contenteditable", "true");
            titleSpan.style.border = "2px dashed #3b82f6";
            titleSpan.style.backgroundColor = "#eff6ff";
            titleSpan.focus();
            productStore.currentlyEditingId = productId;

            // Change button label to Save
            targetBtn.textContent = "Save";
            targetBtn.setAttribute("data-action", "save");
            targetBtn.style.backgroundColor = "#10b981";
            return;
        }

        // ACTION: SAVE (Explicit button click)
        if (action === "save") {
            saveItemEdit(li, productId);
        }
    });

    // Helper: Save current edit
    const saveItemEdit = (li, productId) => {
        const titleSpan = li.querySelector(".product-title");
        const editBtn = li.querySelector("button[data-action='save']");
        if (titleSpan) {
            const updatedText = titleSpan.innerText.trim();
            productStore.updateProduct(productId, updatedText);
            titleSpan.removeAttribute("contenteditable");
            titleSpan.style.border = "none";
            titleSpan.style.backgroundColor = "transparent";
        }
        if (editBtn) {
            editBtn.textContent = "Edit";
            editBtn.setAttribute("data-action", "edit");
            editBtn.style.backgroundColor = "#3b82f6";
        }
        productStore.currentlyEditingId = null;
    };

    // Helper: Auto-save when user clicks outside
    const autoSaveCurrentEdit = () => {
        if (productStore.currentlyEditingId == null) return;
        const currentLi = productListUL.querySelector(`li[data-id='${productStore.currentlyEditingId}']`);
        if (currentLi) {
            saveItemEdit(currentLi, productStore.currentlyEditingId);
        }
    };

    // 3. AUTO-SAVE ON OUTSIDE CLICK
    document.addEventListener("click", (event) => {
        if (productStore.currentlyEditingId == null) return;

        // If the click is inside the list item currently being edited, do nothing
        const activeLi = productListUL.querySelector(`li[data-id='${productStore.currentlyEditingId}']`);
        if (activeLi && activeLi.contains(event.target)) {
            return;
        }

        // Clicked outside -> auto-save
        autoSaveCurrentEdit();
    });
}

if (typeof document !== "undefined") {
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initProductListDOM);
    } else {
        initProductListDOM();
    }
}

// ==============================================================================
// NODE.JS SIMULATION TEST SUITE
// ==============================================================================
if (typeof module !== "undefined" && typeof window === "undefined") {
    console.log("==============================================================================");
    console.log("     ASSIGNMENT 7 - Q1: DYNAMIC PRODUCT LIST MANAGER (NODE.JS TEST)           ");
    console.log("==============================================================================\n");

    console.log("Initial Product Inventory Catalog:");
    console.table(productStore.products);

    console.log(">>> Simulation 1: Adding a new product ('4K Gaming Webcam')...");
    const added = productStore.addProduct("4K Gaming Webcam");
    console.log(`Added: [ID: ${added.id}] "${added.name}"`);
    console.log();

    console.log(">>> Simulation 2: Editing product (ID: 2)...");
    productStore.updateProduct(2, "Ergonomic Vertical Mouse (Wireless Bluetooth)");
    console.log("Updated Product ID 2:", productStore.products.find(p => p.id === 2));
    console.log();

    console.log(">>> Simulation 3: Deleting product (ID: 1)...");
    const deleted = productStore.deleteProduct(1);
    console.log("Deleted ID 1 Status:", deleted);
    console.log();

    console.log("Final State of Products Array:");
    console.table(productStore.products);
    console.log("==============================================================================\n");
}
