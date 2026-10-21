/**
 * Question 7: Smart Guessing Game (Number Range)
 * 
 * Requirements:
 * - Generate a random secret number between 1-50 using Math.floor(Math.random() * 50) + 1.
 * - Let userGuess be a variable with a test value.
 * - Print:
 *   - "Correct guess!" if equal
 *   - "Very close!" if within ± 3 of secret
 *   - "Too high" or "Too low" otherwise
 * - Use nested if conditions and logical operators.
 */

// Step 1: Generate secret number between 1 and 50
const secretNumber = Math.floor(Math.random() * 50) + 1;

// Step 2: Test guess from user
const userGuess = 28;

console.log(`Target Secret Number : ${secretNumber}`);
console.log(`User's Guess         : ${userGuess}`);

const difference = Math.abs(userGuess - secretNumber);
let feedbackMessage = "";

// Step 3: Nested if conditions and logical operators
if (userGuess === secretNumber) {
    feedbackMessage = "Correct guess!";
} else {
    // Nested check 1: Range check within ± 3
    if (difference <= 3 && difference > 0) {
        feedbackMessage = "Very close!";
    } else {
        // Nested check 2: Too high or too low
        if (userGuess > secretNumber) {
            feedbackMessage = "Too high";
        } else {
            feedbackMessage = "Too low";
        }
    }
}

// Step 4: Display feedback
console.log(`Difference           : ${difference}`);
console.log(`Feedback             : "${feedbackMessage}"`);
