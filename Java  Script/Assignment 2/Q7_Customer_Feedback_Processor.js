/**
 * ==============================================================================
 * QUESTION 7: Customer Feedback Processor
 * ==============================================================================
 * Requirements:
 * - Store a feedback string like "Great product! Fast delivery and amazing sound quality!".
 * - Use string methods to:
 *   - Count words
 *   - Check if the feedback includes "bad" or "poor"
 *   - If not -> print "Positive Feedback"
 *   - Else -> print "Needs Improvement"
 * - Use includes(), split(), and conditional statements.
 * ==============================================================================
 */

console.log("==============================================================================");
console.log("QUESTION 7: CUSTOMER REVIEW & SENTIMENT FEEDBACK PROCESSOR");
console.log("==============================================================================");

/**
 * Analyzes a customer review string for word count and sentiment tone.
 * 
 * @param {string} feedbackText - The raw customer feedback text
 * @returns {object} Analysis report with word count, negative flags, and sentiment rating
 */
function processFeedback(feedbackText) {
    // Step 1: Use split() to count words by breaking on whitespace
    // Trimming ensures leading/trailing spaces don't create false word tokens
    const wordsArray = feedbackText.trim().split(/\s+/);
    const wordCount = wordsArray.length;

    // Convert to lowercase to ensure case-insensitive matching for "bad" and "poor"
    const lowerCaseFeedback = feedbackText.toLowerCase();

    // Step 2: Use includes() to check for negative sentiment indicators
    const containsBad = lowerCaseFeedback.includes("bad");
    const containsPoor = lowerCaseFeedback.includes("poor");
    const hasNegativeKeywords = containsBad || containsPoor;

    // Step 3: Conditional statements to evaluate sentiment classification
    let classification = "";
    if (!hasNegativeKeywords) {
        classification = "Positive Feedback";
    } else {
        classification = "Needs Improvement";
    }

    return {
        feedback: feedbackText,
        wordCount: wordCount,
        containsBad: containsBad,
        containsPoor: containsPoor,
        classification: classification
    };
}

// Step 4: Primary Case required by the problem statement
const primaryFeedback = "Great product! Fast delivery and amazing sound quality!";

console.log(`Primary Review Input : "${primaryFeedback}"\n`);

const primaryResult = processFeedback(primaryFeedback);

console.log("--- Primary Review Analysis ---");
console.log(`Total Word Count     : ${primaryResult.wordCount} words`);
console.log(`Includes 'bad'       : ${primaryResult.containsBad}`);
console.log(`Includes 'poor'      : ${primaryResult.containsPoor}`);
console.log(`Final Classification : ${primaryResult.classification}\n`);

// Step 5: Test Multiple Diverse Customer Reviews
console.log("------------------------------------------------------------------------------");
console.log("TESTING MULTIPLE FEEDBACK SAMPLES");
console.log("------------------------------------------------------------------------------");

const sampleFeedbacks = [
    "Great product! Fast delivery and amazing sound quality!",
    "The battery backup is poor and customer support was unhelpful.",
    "Decent build, but the packaging was really bad.",
    "Exceeded all my expectations! Five stars for performance and design.",
    "Not bad, but could be much better."
];

const feedbackSummaryReport = sampleFeedbacks.map((text, index) => {
    const analysis = processFeedback(text);
    return {
        ID: `Review #${index + 1}`,
        Feedback: text.length > 40 ? `${text.substring(0, 37)}...` : text,
        Words: analysis.wordCount,
        "Has 'bad'": analysis.containsBad ? "Yes" : "No",
        "Has 'poor'": analysis.containsPoor ? "Yes" : "No",
        Sentiment: analysis.classification
    };
});

console.table(feedbackSummaryReport);

console.log("\nSummary of Methods Used:");
console.log("- split(/\\s+/) : Tokenized string into words for accurate count.");
console.log("- includes()   : Detected presence of target keywords 'bad' and 'poor'.");
console.log("- if / else    : Evaluated conditional branching to classify feedback.");
console.log("==============================================================================\n");
