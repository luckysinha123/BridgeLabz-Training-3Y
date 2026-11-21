/**
 * ==============================================================================
 * ASSIGNMENT 9 - QUESTION 1: Welcome Page Greeting (jQuery)
 * ==============================================================================
 * 
 * Requirements:
 * 1. On page load → display a personalized greeting based on time of day
 *    (Morning / Afternoon / Evening).
 * 2. Button “Change Greeting” → changes text to a motivational quote.
 * 3. Toggle visibility of a welcome message using another button.
 * 4. Show an alert when greeting is clicked.
 * ==============================================================================
 */

// List of motivational quotes for Scenario 2
const motivationalQuotes = [
    "“The only way to do great work is to love what you do.” – Steve Jobs",
    "“Code is like humor. When you have to explain it, it’s bad.” – Cory House",
    "“First, solve the problem. Then, write the code.” – John Johnson",
    "“Simplicity is the soul of efficiency.” – Austin Freeman",
    "“Make it work, make it right, make it fast.” – Kent Beck"
];

let quoteIndex = 0;

/**
 * Returns a time-sensitive greeting based on current local hour.
 * @returns {string}
 */
function getTimeBasedGreeting() {
    const currentHour = new Date().getHours();
    if (currentHour >= 5 && currentHour < 12) {
        return "🌅 Good Morning! Hope you have an energized start to your day.";
    } else if (currentHour >= 12 && currentHour < 17) {
        return "☀️ Good Afternoon! Keep up the great productivity momentum.";
    } else {
        return "🌙 Good Evening! Time to review your learning and unwind.";
    }
}

// Ensure DOM is fully loaded before executing jQuery code
$(document).ready(function() {
    console.log("[Q1 jQuery Initialized]");

    // --------------------------------------------------------------------------
    // REQUIREMENT 1: Display personalized greeting on page load based on time
    // --------------------------------------------------------------------------
    const initialGreeting = getTimeBasedGreeting();
    $("#greetingHeading").text(initialGreeting);
    $("#greetingMessage").text("Click this box for a special welcome or use buttons below to customize!");

    // --------------------------------------------------------------------------
    // REQUIREMENT 2: Button "Change Greeting" -> Updates text with motivational quote
    // --------------------------------------------------------------------------
    $("#btnChangeGreeting").on("click", function() {
        const selectedQuote = motivationalQuotes[quoteIndex];
        quoteIndex = (quoteIndex + 1) % motivationalQuotes.length;

        // Use jQuery animation: fade out briefly, update text, fade back in
        $("#greetingMessage").fadeOut(200, function() {
            $(this).text(selectedQuote).fadeIn(200);
        });

        $("#greetingHeading").text("💡 Daily Motivation");
        console.log("[jQuery] Greeting updated to quote: " + selectedQuote);
    });

    // --------------------------------------------------------------------------
    // REQUIREMENT 3: Toggle visibility of welcome message using another button
    // --------------------------------------------------------------------------
    $("#btnToggleWelcome").on("click", function() {
        // jQuery .slideToggle() provides a smooth vertical collapse/expand animation
        $("#welcomeDetailsPanel").slideToggle(300, function() {
            const isVisible = $(this).is(":visible");
            $("#btnToggleWelcome").text(isVisible ? "Hide Welcome Message" : "Show Welcome Message");
            console.log("[jQuery] Welcome panel visibility toggled: " + (isVisible ? "VISIBLE" : "HIDDEN"));
        });
    });

    // Reset button to restore original time-based greeting
    $("#btnResetGreeting").on("click", function() {
        $("#greetingHeading").fadeOut(150, function() {
            $(this).text(getTimeBasedGreeting()).fadeIn(150);
        });
        $("#greetingMessage").text("Click this box for a special welcome or use buttons below to customize!");
    });

    // --------------------------------------------------------------------------
    // REQUIREMENT 4: Show an alert when the greeting container is clicked
    // --------------------------------------------------------------------------
    $("#greetingContainer").on("click", function() {
        const headingText = $("#greetingHeading").text();
        const msgText = $("#greetingMessage").text();

        // Triggering alert with custom message
        alert(`👋 Greeting Clicked!\n\n${headingText}\n\n${msgText}`);
        console.log("[jQuery] Greeting container click alert triggered.");
    });
});
