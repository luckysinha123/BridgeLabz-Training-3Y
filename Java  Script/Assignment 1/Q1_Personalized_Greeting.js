/**
 * Question 1: Personalized Login Greeting
 * 
 * Requirements:
 * - Declare variables for userName and current hour using new Date().getHours().
 * - If time is before 12 -> "Good Morning [name]!"
 * - If time is between 12 and 17 -> "Good Afternoon [name]!"
 * - Otherwise -> "Good Evening [name]!"
 * - Use template literals and proper string formatting.
 */

// Step 1: Declare variables
const userName = "Lucky";
const currentHour = new Date().getHours(); // Returns current hour (0 - 23)

let greetingMessage = "";

// Step 2: Time-based conditional logic
if (currentHour < 12) {
    greetingMessage = `Good Morning ${userName}!`;
} else if (currentHour >= 12 && currentHour <= 17) {
    greetingMessage = `Good Afternoon ${userName}!`;
} else {
    greetingMessage = `Good Evening ${userName}!`;
}

// Step 3: Output results using template literals
console.log(`User Name     : ${userName}`);
console.log(`Current Hour  : ${currentHour}:00 (24-hour clock)`);
console.log(`Greeting      : ${greetingMessage}`);
