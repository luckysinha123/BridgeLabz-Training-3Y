/**
 * ==============================================================================
 * QUESTION 9: Odd-Even Number Analyzer
 * ==============================================================================
 * Requirements:
 * - Accept numbers 1-30 in an array using a loop.
 * - For each number:
 *   - If divisible by 3 and 5 -> print "FizzBuzz"
 *   - Else if even -> print "Even"
 *   - Else -> print "Odd"
 * - Store results in a new array and display it.
 * - Use %, push(), and conditionals.
 * ==============================================================================
 */

console.log("==============================================================================");
console.log("QUESTION 9: ODD-EVEN & FIZZBUZZ NUMBER ANALYZER (RANGE 1 - 30)");
console.log("==============================================================================");

// Step 1: Initialize an empty array and populate numbers 1 to 30 using a loop and push()
const numbers = [];
for (let i = 1; i <= 30; i++) {
    numbers.push(i);
}

console.log(`Generated Numbers Array (1 to 30):`);
console.log(`[${numbers.join(", ")}]\n`);

// Step 2: Initialize new array to store classified results
const classifiedResults = [];

console.log("--- Sequential Classification Logs ---");

// Step 3: Iterate through numbers using modulo (%), push(), and conditionals
for (let i = 0; i < numbers.length; i++) {
    const currentNumber = numbers[i];
    let resultType = "";

    // Condition 1: Check if divisible by both 3 and 5 (i.e., divisible by 15)
    if (currentNumber % 3 === 0 && currentNumber % 5 === 0) {
        resultType = "FizzBuzz";
    }
    // Condition 2: Else if divisible by 2 (Even)
    else if (currentNumber % 2 === 0) {
        resultType = "Even";
    }
    // Condition 3: Otherwise (Odd)
    else {
        resultType = "Odd";
    }

    // Print individual classification as specified in requirements
    console.log(`Number ${String(currentNumber).padStart(2, " ")} -> ${resultType}`);

    // Store in the new array using push()
    classifiedResults.push({
        Number: currentNumber,
        Classification: resultType,
        "Divisible by 3 & 5": (currentNumber % 3 === 0 && currentNumber % 5 === 0) ? "Yes" : "No",
        "Divisible by 2": currentNumber % 2 === 0 ? "Yes" : "No"
    });
}

// Step 4: Display the populated results array
console.log("\n------------------------------------------------------------------------------");
console.log("CLASSIFICATION SUMMARY TABLE");
console.log("------------------------------------------------------------------------------");
console.table(classifiedResults);

// Step 5: Metric analysis of distribution
const fizzBuzzCount = classifiedResults.filter(r => r.Classification === "FizzBuzz").length;
const evenCount = classifiedResults.filter(r => r.Classification === "Even").length;
const oddCount = classifiedResults.filter(r => r.Classification === "Odd").length;

console.log("Statistical Distribution:");
console.log(`- Total Numbers Analyzed : ${classifiedResults.length}`);
console.log(`- FizzBuzz Count         : ${fizzBuzzCount} (Numbers: 15, 30)`);
console.log(`- Even Count             : ${evenCount}`);
console.log(`- Odd Count              : ${oddCount}`);
console.log("==============================================================================\n");
