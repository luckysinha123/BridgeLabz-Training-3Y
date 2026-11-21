/**
 * ==============================================================================
 * ASSIGNMENT 9 - QUESTION 5: Team Members Directory (jQuery Traversal)
 * ==============================================================================
 * 
 * Requirements:
 * 1. Click a manager → highlight all direct reports.
 * 2. Hover on an employee → show contact info using .next().
 * 3. Click on a department → change background of all members in that department
 *    using .children().
 * 4. Select an employee → highlight sibling employees.
 * 5. Collapse/expand team using .parent() and .find().
 * ==============================================================================
 */

$(document).ready(function() {
    console.log("[Q5 Team Directory jQuery Initialized]");

    // --------------------------------------------------------------------------
    // REQUIREMENT 1: Click a manager -> highlight all direct reports
    // --------------------------------------------------------------------------
    $(".manager-role").on("click", function(e) {
        e.stopPropagation();

        const $managerItem = $(this).closest(".manager-item");
        const deptKey = $managerItem.data("manager-for");

        // Clear previous highlights
        $(".member-item").removeClass("highlight-report highlight-sibling");

        // Find sibling direct reports within this team and highlight them
        const $reports = $managerItem.siblings(`.report-item[data-team='${deptKey}']`);
        $reports.toggleClass("highlight-report");

        console.log(`[jQuery Traversal] Manager clicked -> Highlighted ${$reports.length} direct report(s).`);
    });

    // --------------------------------------------------------------------------
    // REQUIREMENT 2: Hover on an employee header -> show contact info using .next()
    // --------------------------------------------------------------------------
    $(".member-header, .member-name").hover(
        function() {
            // Traverse to immediately following sibling contact-info block using .next()
            $(this).next(".contact-info").stop(true, true).slideDown(150);
            console.log("[jQuery .next()] Revealed contact info via .next()");
        },
        function() {
            $(this).next(".contact-info").stop(true, true).slideUp(150);
        }
    );

    // --------------------------------------------------------------------------
    // REQUIREMENT 3: Click on a department -> change background of all members using .children()
    // --------------------------------------------------------------------------
    $(".dept-header").on("click", function(e) {
        // Do not trigger if user clicked directly on the collapse button
        if ($(e.target).hasClass("btn-collapse")) return;

        // Traverse to parent section, find the <ul> and get all .children()
        const $deptCard = $(this).closest(".dept-card");
        const $membersList = $deptCard.find(".team-members-list");

        // Using .children() to select all direct <li> children of the <ul>
        const $directChildren = $membersList.children("li");
        $directChildren.toggleClass("dept-highlighted");

        console.log(`[jQuery .children()] Toggled background on ${$directChildren.length} members using .children().`);
    });

    // --------------------------------------------------------------------------
    // REQUIREMENT 4: Select an employee -> highlight sibling employees (.siblings())
    // --------------------------------------------------------------------------
    $(".report-item").on("click", function(e) {
        e.stopPropagation();

        // Clear other highlights
        $(".member-item").removeClass("highlight-report highlight-sibling");

        // Use jQuery .siblings() to highlight peer coworkers
        const $siblings = $(this).siblings(".report-item");
        $siblings.addClass("highlight-sibling");

        console.log(`[jQuery .siblings()] Selected employee -> Highlighted ${$siblings.length} peer sibling(s).`);
    });

    // --------------------------------------------------------------------------
    // REQUIREMENT 5: Collapse/expand team using .parent() and .find()
    // --------------------------------------------------------------------------
    $(".btn-collapse").on("click", function(e) {
        e.stopPropagation();

        // Use .parent() to reach .dept-header, then .parent() to reach .dept-card
        const $deptCard = $(this).parent().parent();

        // Use .find() to locate the team-members-list within this department card
        const $membersList = $deptCard.find(".team-members-list");

        $membersList.slideToggle(300, () => {
            const isVisible = $membersList.is(":visible");
            $(this).text(isVisible ? "Collapse Team" : "Expand Team");
            console.log(`[jQuery .parent() & .find()] Team visibility: ${isVisible ? "EXPANDED" : "COLLAPSED"}`);
        });
    });
});
