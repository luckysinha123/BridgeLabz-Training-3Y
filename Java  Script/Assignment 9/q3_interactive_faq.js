/**
 * ==============================================================================
 * ASSIGNMENT 9 - QUESTION 3: Interactive FAQ (jQuery)
 * ==============================================================================
 * 
 * Requirements:
 * 1. Click on a question → toggle answer visibility.
 * 2. Hover → change question color.
 * 3. Double-click question → collapse all answers.
 * 4. Focus on answer input (if any) → highlight parent question.
 * 5. Blur from input → reset background color.
 * ==============================================================================
 */

$(document).ready(function() {
    console.log("[Q3 Interactive FAQ Initialized]");

    // --------------------------------------------------------------------------
    // REQUIREMENT 1: Click on a question -> toggle answer visibility (.slideToggle)
    // --------------------------------------------------------------------------
    $(".faq-question").on("click", function() {
        // Toggle the corresponding answer block
        const $answer = $(this).next(".faq-answer");
        $answer.stop(true, true).slideToggle(250);

        // Toggle arrow indicator
        const $arrow = $(this).find(".arrow");
        setTimeout(() => {
            $arrow.html($answer.is(":visible") ? "&#9652;" : "&#9662;");
        }, 260);

        console.log(`[FAQ Click] Toggled visibility of: "${$(this).text().trim()}"`);
    });

    // --------------------------------------------------------------------------
    // REQUIREMENT 2: Hover -> change question color (.hover)
    // --------------------------------------------------------------------------
    $(".faq-question").hover(
        function() {
            // Hover In: Change text color and background
            if (!$(this).hasClass("focused-parent")) {
                $(this).css({
                    "color": "#0284c7",
                    "background-color": "#e2e8f0"
                });
            }
        },
        function() {
            // Hover Out: Restore original styling
            if (!$(this).hasClass("focused-parent")) {
                $(this).css({
                    "color": "#1e293b",
                    "background-color": "#f1f5f9"
                });
            }
        }
    );

    // --------------------------------------------------------------------------
    // REQUIREMENT 3: Double-click question -> collapse ALL answers
    // --------------------------------------------------------------------------
    $(".faq-question").on("dblclick", function(event) {
        // Prevent default double-click text selection
        event.preventDefault();

        // Slide up all answers across the entire FAQ list
        $(".faq-answer").stop(true, true).slideUp(300);
        $(".faq-question .arrow").html("&#9662;");

        console.log("[FAQ Double-Click] Collapsed ALL answers across the page!");
    });

    // --------------------------------------------------------------------------
    // REQUIREMENT 4: Focus on answer input -> highlight parent question
    // --------------------------------------------------------------------------
    $(".feedback-input").on("focus", function() {
        // Find the parent .faq-item and its question element
        const $parentQuestion = $(this).closest(".faq-item").find(".faq-question");
        $parentQuestion.addClass("focused-parent");
        console.log(`[Input Focus] Highlighted parent question for input: "${$(this).attr('placeholder')}"`);
    });

    // --------------------------------------------------------------------------
    // REQUIREMENT 5: Blur from input -> reset background color
    // --------------------------------------------------------------------------
    $(".feedback-input").on("blur", function() {
        const $parentQuestion = $(this).closest(".faq-item").find(".faq-question");
        $parentQuestion.removeClass("focused-parent");
        $parentQuestion.css({
            "color": "#1e293b",
            "background-color": "#f1f5f9"
        });
        console.log("[Input Blur] Reset parent question highlight.");
    });
});
