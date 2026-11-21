/**
 * ==============================================================================
 * ASSIGNMENT 9 - QUESTION 7: Search & Filter Courses (jQuery)
 * ==============================================================================
 * 
 * Requirements:
 * 1. Search input filters courses in real-time using .keyup().
 * 2. Highlight matched text using .css().
 * 3. Toggle visibility of courses not matching search.
 * 4. Show count of matched courses dynamically.
 * 5. Clear search → reset list to show all courses.
 * ==============================================================================
 */

$(document).ready(function() {
    console.log("[Q7 Course Search Initialized]");

    const $cards = $(".course-card");
    const totalCount = $cards.length;

    // --------------------------------------------------------------------------
    // Helper to update the dynamic course count badge
    // --------------------------------------------------------------------------
    function updateCourseCount(matchedCount) {
        $("#courseCountBadge").text(`Showing ${matchedCount} of ${totalCount} courses`);
        if (matchedCount === 0) {
            $("#noMatchAlert").show();
        } else {
            $("#noMatchAlert").hide();
        }
    }

    // --------------------------------------------------------------------------
    // REQUIREMENT 1, 2, 3 & 4: Real-time filtering using .keyup()
    // --------------------------------------------------------------------------
    $("#courseSearchInput").on("keyup", function() {
        const query = $(this).val().trim().toLowerCase();

        let visibleCount = 0;

        $cards.each(function() {
            const $card = $(this);
            const titleText = $card.find(".course-title").text();
            const descText = $card.find(".course-desc").text();
            const catText = $card.find(".course-category").text();
            const fullContent = (titleText + " " + descText + " " + catText).toLowerCase();

            if (query === "") {
                // Reset card visibility & styling
                $card.show();
                // REQUIREMENT 2: Reset .css() highlight
                $card.css({
                    "border-color": "#e2e8f0",
                    "background-color": "#ffffff"
                });
                $card.find(".course-title").css("color", "#0f172a");
                visibleCount++;
            } else if (fullContent.indexOf(query) !== -1) {
                // REQUIREMENT 3: Matching course stays visible
                $card.show();

                // REQUIREMENT 2: Highlight matched text card using jQuery .css()
                $card.css({
                    "border-color": "#7c3aed",
                    "background-color": "#faf5ff" // soft purple highlight
                });
                $card.find(".course-title").css("color", "#6d28d9");

                visibleCount++;
            } else {
                // REQUIREMENT 3: Toggle visibility off for non-matching courses
                $card.hide();
                $card.css({
                    "border-color": "#e2e8f0",
                    "background-color": "#ffffff"
                });
            }
        });

        // REQUIREMENT 4: Show count of matched courses dynamically
        updateCourseCount(visibleCount);
        console.log(`[jQuery .keyup()] Query: "${query}" | Matched: ${visibleCount}/${totalCount}`);
    });

    // --------------------------------------------------------------------------
    // REQUIREMENT 5: Clear search -> reset list to show all courses
    // --------------------------------------------------------------------------
    $("#btnClearSearch").on("click", function() {
        // Clear input value
        $("#courseSearchInput").val("");

        // Reset all cards
        $cards.show().css({
            "border-color": "#e2e8f0",
            "background-color": "#ffffff"
        });
        $cards.find(".course-title").css("color", "#0f172a");

        updateCourseCount(totalCount);
        $("#courseSearchInput").focus();
        console.log("[jQuery Reset] Search input cleared and all courses restored.");
    });
});
