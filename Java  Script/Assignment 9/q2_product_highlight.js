/**
 * ==============================================================================
 * ASSIGNMENT 9 - QUESTION 2: Product Highlight (jQuery)
 * ==============================================================================
 * 
 * Requirements:
 * 1. Click on a product → highlight background.
 * 2. Hover over a product → show additional product details.
 * 3. Clicking a “Favorite” icon → toggles a “selected” class.
 * 4. Apply different styles to products with discounts using attribute selector.
 * 5. Show an alert if a product is out of stock (using data attribute).
 * ==============================================================================
 */

$(document).ready(function() {
    console.log("[Q2 Product Highlight jQuery Initialized]");

    // --------------------------------------------------------------------------
    // REQUIREMENT 4: Apply styles to products with discounts using attribute selector
    // --------------------------------------------------------------------------
    // jQuery attribute selector: [data-discount="true"]
    $(".product-card[data-discount='true']").css({
        "box-shadow": "0 6px 12px -2px rgba(22, 163, 74, 0.15)"
    });
    console.log("[jQuery] Highlighted discounted products via [data-discount='true'] attribute selector.");

    // --------------------------------------------------------------------------
    // REQUIREMENT 1 & 5: Click on product -> highlight background & alert if out of stock
    // --------------------------------------------------------------------------
    $(".product-card").on("click", function(event) {
        // Do not trigger product card click if user clicked directly on the Favorite button
        if ($(event.target).hasClass("favorite-btn")) {
            return;
        }

        // Toggle highlight class on the clicked product
        $(this).toggleClass("highlighted");

        // REQUIREMENT 5: Check if out of stock using jQuery data() attribute
        const stockCount = $(this).data("stock");
        const productName = $(this).find("h3").text();

        if (stockCount === 0) {
            // Out of stock alert
            alert(`⚠️ Out of Stock Alert!\n\nSorry, "${productName}" is currently out of stock. Please check back next week.`);
            console.warn(`[Out of Stock] Triggered alert for: ${productName} (data-stock = 0)`);
        } else {
            console.log(`[Product Clicked] ${productName} highlighted (Stock: ${stockCount})`);
        }
    });

    // --------------------------------------------------------------------------
    // REQUIREMENT 2: Hover over product -> show additional product details
    // --------------------------------------------------------------------------
    // Using jQuery .hover(handlerIn, handlerOut)
    $(".product-card").hover(
        function() {
            // Mouse Enter: Slide down the hidden extra details panel
            $(this).find(".extra-details").stop(true, true).slideDown(200);
            $(this).css("border-color", "#3b82f6");
        },
        function() {
            // Mouse Leave: Slide up the extra details panel
            $(this).find(".extra-details").stop(true, true).slideUp(200);
            if (!$(this).hasClass("highlighted")) {
                $(this).css("border-color", "#e2e8f0");
            }
        }
    );

    // --------------------------------------------------------------------------
    // REQUIREMENT 3: Clicking a "Favorite" icon -> toggles a "selected" class
    // --------------------------------------------------------------------------
    $(".favorite-btn").on("click", function(e) {
        e.stopPropagation(); // Stop event bubbling so card click handler doesn't fire

        // Toggle the 'selected' class
        $(this).toggleClass("selected");

        const isFavorited = $(this).hasClass("selected");
        // Update heart icon symbol dynamically
        $(this).html(isFavorited ? "&#9829;" : "&#9825;"); // Filled heart vs Outline heart

        const productName = $(this).closest(".product-card").find("h3").text();
        console.log(`[Favorite Toggled] "${productName}" favorited status: ${isFavorited}`);
    });
});
