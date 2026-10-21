/**
 * Question 4: Academic Performance Evaluator
 * 
 * Requirements:
 * - Input marks of 5 subjects (use an array).
 * - Calculate average and overall percentage.
 * - Use logical operators to print:
 *   - "Promoted with Distinction" if >= 85%
 *   - "Promoted" if between 50%-84%
 *   - "Detained" if < 50%
 * - Add validation: if any subject < 35 -> automatically "Detained".
 */

// Step 1: Input marks of 5 subjects (out of 100 each)
const marks = [88, 76, 92, 85, 90];
const totalSubjects = marks.length;
const maxMarksTotal = totalSubjects * 100;

// Step 2: Compute total and check if any subject is below 35
let totalMarks = 0;
let hasFailedSubject = false;

for (let i = 0; i < marks.length; i++) {
    totalMarks += marks[i];
    // Validation: Check if any subject < 35
    if (marks[i] < 35) {
        hasFailedSubject = true;
    }
}

// Step 3: Compute average and overall percentage
const averageMarks = totalMarks / totalSubjects;
const overallPercentage = (totalMarks / maxMarksTotal) * 100;

// Step 4: Decision logic using logical operators (&&, ||)
let resultStatus = "";

if (hasFailedSubject || overallPercentage < 50) {
    resultStatus = "Detained";
} else if (overallPercentage >= 85) {
    resultStatus = "Promoted with Distinction";
} else if (overallPercentage >= 50 && overallPercentage < 85) {
    resultStatus = "Promoted";
}

// Step 5: Print detailed evaluation
console.log(`Marks Obtained     : [${marks.join(", ")}]`);
console.log(`Total Score        : ${totalMarks} / ${maxMarksTotal}`);
console.log(`Average Marks      : ${averageMarks.toFixed(2)}`);
console.log(`Overall Percentage : ${overallPercentage.toFixed(2)}%`);
console.log(`Passing Check      : ${hasFailedSubject ? "Failed (< 35 in at least 1 subject)" : "Passed all subjects (>= 35)"}`);
console.log(`Academic Status    : "${resultStatus}"`);
