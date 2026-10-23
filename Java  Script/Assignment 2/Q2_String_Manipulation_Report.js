/**
 * ==============================================================================
 * QUESTION 2: String Manipulation Report
 * ==============================================================================
 * Requirements:
 * - Store a product name like " wireless headphones PRO ".
 * - Trim extra spaces, convert to lowercase, then capitalize the first letter of each word.
 * - Replace "pro" with "Pro Edition".
 * - Display the cleaned title and its length.
 * - Use methods: trim(), split(), map(), join(), replace(), and length.
 * ==============================================================================
 */

console.log("==============================================================================");
console.log("QUESTION 2: E-COMMERCE PRODUCT TITLE FORMATTER & REPORT");
console.log("==============================================================================");

// Step 1: Store initial raw product name with extra spaces and mixed casing
const rawProductName = "   wireless headphones PRO   ";

console.log(`Original Raw String   : "${rawProductName}"`);
console.log(`Original String Length: ${rawProductName.length} characters\n`);

// Step 2: Use trim() to remove leading and trailing whitespace
const trimmedName = rawProductName.trim();
console.log(`Step 1 (trim())       : "${trimmedName}"`);

// Step 3: Convert string to lowercase for uniform processing
const lowerCasedName = trimmedName.toLowerCase();
console.log(`Step 2 (toLowerCase()): "${lowerCasedName}"`);

// Step 4: Use split() to break sentence into an array of individual words
const wordsArray = lowerCasedName.split(" ");
console.log(`Step 3 (split(" "))   : [${wordsArray.map(w => `"${w}"`).join(", ")}]`);

// Step 5: Use map() to capitalize the first letter of each word
const capitalizedWordsArray = wordsArray.map((word) => {
    if (word.length === 0) return word;
    // Capitalize character at index 0 and concatenate remainder of the word
    return word.charAt(0).toUpperCase() + word.slice(1);
});
console.log(`Step 4 (map())        : [${capitalizedWordsArray.map(w => `"${w}"`).join(", ")}]`);

// Step 6: Use join() to combine array of words back into a single string
const titleCasedName = capitalizedWordsArray.join(" ");
console.log(`Step 5 (join(" "))    : "${titleCasedName}"`);

// Step 7: Use replace() to substitute "Pro" with "Pro Edition"
// Note: "pro" in the capitalized title is "Pro", so we replace "Pro" with "Pro Edition"
const cleanedTitle = titleCasedName.replace("Pro", "Pro Edition");
console.log(`Step 6 (replace())    : "${cleanedTitle}"`);

// Step 8: Calculate final length using .length property
const titleLength = cleanedTitle.length;

// Step 9: Display final formatted report summary
console.log("\n------------------------------------------------------------------------------");
console.log("FINAL PRODUCT TITLE REPORT");
console.log("------------------------------------------------------------------------------");
console.log(`Cleaned Product Title : ${cleanedTitle}`);
console.log(`Character Length      : ${titleLength} characters`);

// Summary Table of Methods Utilized
console.log("\nMethods Checklist:");
console.table([
    { Method: "trim()", Purpose: "Removed surrounding whitespace", OutputSample: trimmedName },
    { Method: "split()", Purpose: "Split string into array of words", OutputSample: JSON.stringify(wordsArray) },
    { Method: "map()", Purpose: "Capitalized first letter of words", OutputSample: JSON.stringify(capitalizedWordsArray) },
    { Method: "join()", Purpose: "Reassembled words into string", OutputSample: titleCasedName },
    { Method: "replace()", Purpose: "Replaced 'Pro' with 'Pro Edition'", OutputSample: cleanedTitle },
    { Method: "length", Purpose: "Measured final string length", OutputSample: `${titleLength}` }
]);
console.log("==============================================================================\n");
