/**
 * ==============================================================================
 * QUESTION 4: Array Performance Analyzer
 * ==============================================================================
 * Requirements:
 * - Create an array of 8 random scores between 30 and 100.
 * - Calculate:
 *   - Highest and lowest score (Math.max(...arr), Math.min(...arr))
 *   - Average score
 *   - Number of students who passed (>= 50)
 * - Use array methods like map(), filter(), and reduce().
 * - Display a full summary in a formatted output.
 * ==============================================================================
 */

console.log("==============================================================================");
console.log("QUESTION 4: STUDENT ACADEMIC ARRAY PERFORMANCE ANALYZER");
console.log("==============================================================================");

// Step 1: Create an array of 8 random scores between 30 and 100 (inclusive)
// Formula: Math.floor(Math.random() * (100 - 30 + 1)) + 30
const scores = Array.from({ length: 8 }, () => Math.floor(Math.random() * 71) + 30);

console.log("Generated 8 Random Scores (between 30 and 100):");
console.log(`[${scores.join(", ")}]\n`);

// Step 2: Use map() to create individual student performance profiles
const performanceProfiles = scores.map((score, index) => {
    return {
        Student: `Student #${index + 1}`,
        Score: score,
        Status: score >= 50 ? "Pass" : "Fail",
        Grade: score >= 90 ? "A" : score >= 75 ? "B" : score >= 50 ? "C" : "F"
    };
});

// Step 3: Use Math.max(...arr) and Math.min(...arr) with spread operator
const highestScore = Math.max(...scores);
const lowestScore = Math.min(...scores);

// Step 4: Use reduce() to compute sum of scores and calculate average
const totalSum = scores.reduce((accumulator, currentScore) => {
    return accumulator + currentScore;
}, 0);
const averageScore = totalSum / scores.length;

// Step 5: Use filter() to find passing students (score >= 50) and failing students
const passingScores = scores.filter((score) => score >= 50);
const failingScores = scores.filter((score) => score < 50);

const passedCount = passingScores.length;
const failedCount = failingScores.length;
const passPercentage = ((passedCount / scores.length) * 100).toFixed(1);

// Step 6: Display tabular summary of individual student evaluations
console.log("Individual Student Records (generated via map()):");
console.table(performanceProfiles);

// Step 7: Display formatted statistical analysis summary
console.log("------------------------------------------------------------------------------");
console.log("PERFORMANCE SUMMARY REPORT");
console.log("------------------------------------------------------------------------------");
console.log(`Total Students Evaluated : ${scores.length}`);
console.log(`Highest Score (Math.max) : ${highestScore}`);
console.log(`Lowest Score  (Math.min) : ${lowestScore}`);
console.log(`Total Marks   (reduce)   : ${totalSum}`);
console.log(`Average Score (reduce)   : ${averageScore.toFixed(2)} / 100`);
console.log(`Students Passed (filter) : ${passedCount} (Score >= 50)`);
console.log(`Students Failed (filter) : ${failedCount} (Score < 50)`);
console.log(`Passing Rate             : ${passPercentage}%`);
console.log("==============================================================================\n");
