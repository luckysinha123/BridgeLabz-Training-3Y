/**
 * ==============================================================================
 * QUESTION 10: Departmental Employee Evaluator
 * ==============================================================================
 * Requirements:
 * - Create a nested array for departments:
 *   const departments = [
 *     ["HR", 72],
 *     ["Finance", 88],
 *     ["Tech", 95],
 *     ["Support", 63]
 *   ];
 * - Use loops and conditionals to print:
 *   - "Excellent" if score >= 90
 *   - "Good" if 75-89
 *   - "Average" if 60-74
 *   - "Needs Improvement" otherwise
 * - Use comparison operators and nested if-else conditions.
 * ==============================================================================
 */

console.log("==============================================================================");
console.log("QUESTION 10: DEPARTMENTAL PERFORMANCE EVALUATOR");
console.log("==============================================================================");

// Step 1: Create the nested array of department names and scores
const departments = [
    ["HR", 72],
    ["Finance", 88],
    ["Tech", 95],
    ["Support", 63]
];

console.log("Base Department Records:");
console.log(departments);
console.log("------------------------------------------------------------------------------\n");

/**
 * Evaluates performance rating using comparison operators and nested if-else logic.
 * 
 * @param {number} score - Department score between 0 and 100
 * @returns {string} Performance tier evaluation
 */
function evaluateRating(score) {
    let rating = "";

    // Requirement: Use comparison operators and nested if-else conditions
    if (score >= 90) {
        rating = "Excellent";
    } else {
        // Nested level 1: Score < 90
        if (score >= 75 && score <= 89) {
            rating = "Good";
        } else {
            // Nested level 2: Score < 75
            if (score >= 60 && score <= 74) {
                rating = "Average";
            } else {
                // Nested level 3: Score < 60
                rating = "Needs Improvement";
            }
        }
    }

    return rating;
}

// Step 2: Loop through departments array and print evaluations
console.log("--- Department Evaluation Results ---");
const evaluationSummary = [];

for (let i = 0; i < departments.length; i++) {
    const departmentName = departments[i][0];
    const performanceScore = departments[i][1];

    // Evaluate rating using nested if-else
    const performanceRating = evaluateRating(performanceScore);

    console.log(`Department: ${departmentName.padEnd(8, " ")} | Score: ${String(performanceScore).padStart(2, " ")} | Rating: "${performanceRating}"`);

    evaluationSummary.push({
        Department: departmentName,
        Score: performanceScore,
        Rating: performanceRating,
        "Score Range Criteria": performanceScore >= 90 
            ? ">= 90" 
            : performanceScore >= 75 
                ? "75 - 89" 
                : performanceScore >= 60 
                    ? "60 - 74" 
                    : "< 60"
    });
}

// Step 3: Display summary table
console.log("\n------------------------------------------------------------------------------");
console.log("DEPARTMENT EVALUATION SUMMARY TABLE");
console.log("------------------------------------------------------------------------------");
console.table(evaluationSummary);

// Step 4: Boundary & Edge Case Testing (Demonstrating all rating branches including < 60)
console.log("\n------------------------------------------------------------------------------");
console.log("BOUNDARY CRITERIA VERIFICATION (ALL NESTED BRANCHES)");
console.log("------------------------------------------------------------------------------");

const boundaryTestCases = [
    { label: "Top Boundary (Score 98)", score: 98 },
    { label: "Threshold 'Excellent' (Score 90)", score: 90 },
    { label: "Threshold 'Good' Upper (Score 89)", score: 89 },
    { label: "Threshold 'Good' Lower (Score 75)", score: 75 },
    { label: "Threshold 'Average' Upper (Score 74)", score: 74 },
    { label: "Threshold 'Average' Lower (Score 60)", score: 60 },
    { label: "Threshold 'Needs Improvement' (Score 59)", score: 59 },
    { label: "Failing Score (Score 42)", score: 42 }
];

const boundaryTable = boundaryTestCases.map(tc => ({
    Case: tc.label,
    Score: tc.score,
    "Assigned Rating": evaluateRating(tc.score)
}));

console.table(boundaryTable);
console.log("==============================================================================\n");
