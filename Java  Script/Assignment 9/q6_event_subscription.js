/**
 * ==============================================================================
 * ASSIGNMENT 9 - QUESTION 6: Event Subscription Panel (jQuery)
 * ==============================================================================
 * 
 * Requirements:
 * 1. Subscribe → enable notifications (UI state update).
 * 2. Unsubscribe → disable notifications.
 * 3. Dynamically add new subscription topics → attach .on() click events.
 * 4. Remove specific subscription → detach .off() event.
 * 5. Show success message → dynamically inserted into DOM on action.
 * ==============================================================================
 */

$(document).ready(function() {
    console.log("[Q6 Event Subscription Panel Initialized]");

    // --------------------------------------------------------------------------
    // REQUIREMENT 5: Dynamic message inserter helper
    // --------------------------------------------------------------------------
    function showDynamicNotice(message, alertClass = "alert-success") {
        const $msgBox = $("<div>")
            .addClass(`dynamic-alert ${alertClass}`)
            .html(message);

        // Dynamically insert into the DOM
        $("#messageArea").prepend($msgBox);
        $msgBox.fadeIn(300);

        // Auto-remove after 4 seconds with fadeOut
        setTimeout(() => {
            $msgBox.fadeOut(300, function() {
                $(this).remove();
            });
        }, 4000);
    }

    // --------------------------------------------------------------------------
    // Helper to attach event handlers to an item
    // --------------------------------------------------------------------------
    function attachTopicEvents($item) {
        const topicName = $item.data("topic");

        // REQUIREMENT 1 & 2: Subscribe & Unsubscribe buttons
        $item.find(".btn-sub").on("click", function() {
            const isSubscribed = $item.hasClass("subscribed");

            if (!isSubscribed) {
                // Subscribe action
                $item.addClass("subscribed");
                $item.find(".sub-status-badge")
                    .removeClass("badge-inactive")
                    .addClass("badge-active")
                    .text("Subscribed ✔");
                $(this).removeClass("btn-sub").addClass("btn-unsub").text("Unsubscribe");

                showDynamicNotice(`🔔 Subscribed! You will now receive notifications for <strong>${topicName}</strong>.`, "alert-success");
                console.log(`[jQuery .on()] Subscribed to topic: "${topicName}"`);
            } else {
                // Unsubscribe action
                $item.removeClass("subscribed");
                $item.find(".sub-status-badge")
                    .removeClass("badge-active")
                    .addClass("badge-inactive")
                    .text("Inactive");
                $(this).removeClass("btn-unsub").addClass("btn-sub").text("Subscribe");

                showDynamicNotice(`🔕 Unsubscribed from <strong>${topicName}</strong>. Notifications disabled.`, "alert-warning");
                console.log(`[jQuery .on()] Unsubscribed from topic: "${topicName}"`);
            }
        });

        // REQUIREMENT 4: Remove subscription -> detach with .off() and remove from DOM
        $item.find(".btn-remove").on("click", function() {
            // Detach event listeners explicitly using jQuery .off()
            $item.find(".btn-sub, .btn-unsub, .btn-remove").off("click");
            console.log(`[jQuery .off()] Detached all click handlers from: "${topicName}"`);

            // Animate removal from DOM
            $item.slideUp(300, function() {
                $(this).remove();
            });

            showDynamicNotice(`🗑️ Removed topic <strong>${topicName}</strong> from your subscription panel.`, "alert-danger");
        });
    }

    // Attach to initial 5 elements
    $("#subscriptionList .subscription-item").each(function() {
        attachTopicEvents($(this));
    });

    // --------------------------------------------------------------------------
    // REQUIREMENT 3: Dynamically add new subscription topics -> attach .on() click events
    // --------------------------------------------------------------------------
    $("#addTopicForm").on("submit", function(e) {
        e.preventDefault();

        const newTopicName = $("#topicInput").val().trim();
        if (!newTopicName) {
            alert("Please enter a valid topic name.");
            return;
        }

        // Create new list item dynamically using jQuery
        const $newItem = $("<li>")
            .addClass("subscription-item")
            .attr("data-topic", newTopicName)
            .hide();

        $newItem.html(`
            <div>
                <strong>${newTopicName}</strong>
                <div style="font-size: 0.85rem; color: #64748b;">Custom user-created topic</div>
            </div>
            <div class="item-actions">
                <span class="sub-status-badge badge-inactive">Inactive</span>
                <button class="btn-sub">Subscribe</button>
                <button class="btn-remove">Remove</button>
            </div>
        `);

        // Append to DOM
        $("#subscriptionList").append($newItem);
        $newItem.slideDown(250);

        // Attach .on() click events to newly created element
        attachTopicEvents($newItem);

        // Clear input
        $("#topicInput").val("");

        // Show dynamic confirmation
        showDynamicNotice(`✨ New topic <strong>${newTopicName}</strong> added to list!`, "alert-success");
        console.log(`[Dynamic Add + .on()] Attached click handlers to new topic: "${newTopicName}"`);
    });
});
