/**
 * ==============================================================================
 * ASSIGNMENT 9 - QUESTION 9: Multi-JQuery Widgets via jQuery.noConflict()
 * ==============================================================================
 * 
 * Requirements:
 * 1. Version 1 → handles carousel slider rotation.
 * 2. Version 2 → manages modal popups for notifications.
 * 3. Version 1 → highlights active widget.
 * 4. Version 2 → attaches tooltips on hover.
 * 5. Use jQuery.noConflict() → ensure both versions operate simultaneously.
 * ==============================================================================
 */

// Verify that both versions are loaded into separate variables via noConflict
const v1VersionString = (typeof $jqV1 !== "undefined" && $jqV1.fn) ? $jqV1.fn.jquery : "Not Loaded";
const v2VersionString = (typeof $jqV2 !== "undefined" && $jqV2.fn) ? $jqV2.fn.jquery : "Not Loaded";

console.log(`[jQuery noConflict Check] Version 1: ${v1VersionString} | Version 2: ${v2VersionString}`);

// ==============================================================================
// 1. MODULE POWERED BY JQUERY VERSION 1 ($jqV1)
// ==============================================================================
$jqV1(document).ready(function() {
    $jqV1("#v1Badge").text(`jQuery v1: ${$jqV1.fn.jquery}`);

    const $slides = $jqV1(".carousel-slide");
    let currentSlide = 0;

    function showSlide(index) {
        $slides.hide().removeClass("active-slide");
        $slides.eq(index).fadeIn(200).addClass("active-slide");
    }

    // REQUIREMENT 1: Version 1 handles carousel slider rotation
    $jqV1("#btnNextSlide").on("click", function() {
        currentSlide = (currentSlide + 1) % $slides.length;
        showSlide(currentSlide);
        console.log(`[jQuery v1 Carousel] Rotated to Slide #${currentSlide + 1}`);
    });

    $jqV1("#btnPrevSlide").on("click", function() {
        currentSlide = (currentSlide - 1 + $slides.length) % $slides.length;
        showSlide(currentSlide);
        console.log(`[jQuery v1 Carousel] Rotated to Slide #${currentSlide + 1}`);
    });

    // REQUIREMENT 3: Version 1 highlights active widget
    $jqV1("#btnHighlightV1").on("click", function() {
        $jqV1(".widget-card").removeClass("active-widget");
        $jqV1("#widgetV1").addClass("active-widget");
        console.log("[jQuery v1] Highlighted Widget A as active widget.");
    });
});

// ==============================================================================
// 2. MODULE POWERED BY JQUERY VERSION 2 ($jqV2)
// ==============================================================================
$jqV2(document).ready(function() {
    $jqV2("#v2Badge").text(`jQuery v2: ${$jqV2.fn.jquery}`);

    // REQUIREMENT 2: Version 2 manages modal popups for notifications
    $jqV2("#btnOpenModalV2").on("click", function() {
        $jqV2("#v2NotificationModal").css("display", "flex").hide().fadeIn(250);
        console.log("[jQuery v2 Modal] Opened notification dialog.");
    });

    $jqV2("#btnCloseModalV2").on("click", function() {
        $jqV2("#v2NotificationModal").fadeOut(200);
        console.log("[jQuery v2 Modal] Dismissed notification dialog.");
    });

    // Close on background click
    $jqV2("#v2NotificationModal").on("click", function(e) {
        if (e.target === this) {
            $jqV2(this).fadeOut(200);
        }
    });

    // REQUIREMENT 4: Version 2 attaches tooltips on hover
    // Create tooltip popup element dynamically using Version 2
    const $tooltipBox = $jqV2("<div class='custom-tooltip-popup'></div>").appendTo("body");

    $jqV2(".tooltip-target").hover(
        function() {
            const tipText = $jqV2(this).data("tooltip");
            const offset = $jqV2(this).offset();

            $tooltipBox.text(tipText)
                .css({
                    top: offset.top - 32,
                    left: offset.left,
                    display: "block"
                })
                .stop(true, true)
                .fadeIn(150);

            console.log(`[jQuery v2 Tooltip] Displayed tooltip: "${tipText}"`);
        },
        function() {
            $tooltipBox.stop(true, true).fadeOut(100);
        }
    );
});
