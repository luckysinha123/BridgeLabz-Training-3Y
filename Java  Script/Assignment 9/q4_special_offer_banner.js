/**
 * ==============================================================================
 * ASSIGNMENT 9 - QUESTION 4: Special Offer Banner (jQuery)
 * ==============================================================================
 * 
 * Requirements:
 * 1. “Hide” button → hide specific banners.
 * 2. “Show” button → show hidden banners.
 * 3. “Slide Up/Down” buttons → toggle banners.
 * 4. “Fade In/Fade Out” → show/hide banners gradually.
 * 5. Automatically rotate through banners every 5 seconds using .fadeIn()/.fadeOut().
 * ==============================================================================
 */

$(document).ready(function() {
    console.log("[Q4 Special Offer Banners Initialized]");

    const $banners = $(".banner-card");
    const totalBanners = $banners.length;
    let currentBannerIndex = 0;
    let rotationIntervalId = null;
    let isAutoRotating = true;

    // --------------------------------------------------------------------------
    // REQUIREMENT 5: Automatically rotate through banners every 5 seconds using .fadeIn()/.fadeOut()
    // --------------------------------------------------------------------------
    function rotateToNextBanner() {
        const $current = $banners.eq(currentBannerIndex);
        currentBannerIndex = (currentBannerIndex + 1) % totalBanners;
        const $next = $banners.eq(currentBannerIndex);

        // Fade out current banner smoothly
        $current.fadeOut(600, function() {
            // Fade in the next banner
            $next.fadeIn(600);
        });

        console.log(`[Banner Auto-Rotate] Transitioned from Banner #${$current.index() + 1} to #${currentBannerIndex + 1}`);
    }

    // Start 5-second automatic rotation cycle
    function startAutoRotation() {
        if (!rotationIntervalId) {
            rotationIntervalId = setInterval(rotateToNextBanner, 5000);
            $("#rotationStatusBadge").html("🔄 Auto-Rotating Banners (Every 5 seconds using fadeIn/fadeOut)");
            $("#btnToggleAutoRotate").text("Pause Auto-Rotate").css("background", "#d97706");
            isAutoRotating = true;
            console.log("[Auto-Rotate Started] Interval set to 5000ms.");
        }
    }

    function stopAutoRotation() {
        if (rotationIntervalId) {
            clearInterval(rotationIntervalId);
            rotationIntervalId = null;
            $("#rotationStatusBadge").html("⏸️ Auto-Rotation Paused");
            $("#btnToggleAutoRotate").text("Resume Auto-Rotate").css("background", "#16a34a");
            isAutoRotating = false;
            console.log("[Auto-Rotate Paused]");
        }
    }

    startAutoRotation();

    // Toggle Auto-Rotate button
    $("#btnToggleAutoRotate").on("click", function() {
        if (isAutoRotating) {
            stopAutoRotation();
        } else {
            startAutoRotation();
        }
    });

    // --------------------------------------------------------------------------
    // REQUIREMENT 1: "Hide" button -> hide specific banners using .hide()
    // --------------------------------------------------------------------------
    $("#btnHideBanners").on("click", function() {
        stopAutoRotation();
        const $visibleBanner = $banners.filter(":visible");
        $visibleBanner.hide();
        console.log(`[jQuery .hide()] Hid active banner.`);
    });

    // --------------------------------------------------------------------------
    // REQUIREMENT 2: "Show" button -> show hidden banners using .show()
    // --------------------------------------------------------------------------
    $("#btnShowBanners").on("click", function() {
        stopAutoRotation();
        $banners.eq(currentBannerIndex).show();
        console.log(`[jQuery .show()] Displayed Banner #${currentBannerIndex + 1}.`);
    });

    // --------------------------------------------------------------------------
    // REQUIREMENT 3: "Slide Up/Down" buttons -> toggle banners (.slideToggle)
    // --------------------------------------------------------------------------
    $("#btnSlideToggle").on("click", function() {
        stopAutoRotation();
        const $target = $banners.eq(currentBannerIndex);
        $target.slideToggle(400, function() {
            console.log(`[jQuery .slideToggle()] Banner #${currentBannerIndex + 1} is now ${$target.is(":visible") ? "VISIBLE" : "HIDDEN"}`);
        });
    });

    // --------------------------------------------------------------------------
    // REQUIREMENT 4: "Fade In/Fade Out" -> show/hide banners gradually (.fadeToggle)
    // --------------------------------------------------------------------------
    $("#btnFadeToggle").on("click", function() {
        stopAutoRotation();
        const $target = $banners.eq(currentBannerIndex);
        $target.fadeToggle(600, function() {
            console.log(`[jQuery .fadeToggle()] Banner #${currentBannerIndex + 1} gradual fade transition complete.`);
        });
    });
});
