/**
 * Question 5: Weather Activity Planner
 * 
 * Requirements:
 * - Create variables for temperature, isRaining, windSpeed.
 * - If raining -> "Stay indoors with hot coffee."
 * - Else if temperature > 35 -> "Go swimming."
 * - Else if temperature < 15 and windSpeed > 20 -> "Too cold and windy — stay home."
 * - Else -> "Perfect day for a walk."
 * - Combine && and || conditions smartly.
 */

// Step 1: Create variables
const temperature = 12;  // in Celsius
const isRaining = false; // boolean
const windSpeed = 25;    // in km/h

// Step 2: Evaluation using combined && and || conditional structure
let activityAdvice = "";

if (isRaining) {
    activityAdvice = "Stay indoors with hot coffee.";
} else if (temperature > 35) {
    activityAdvice = "Go swimming.";
} else if (temperature < 15 && windSpeed > 20) {
    activityAdvice = "Too cold and windy — stay home.";
} else {
    activityAdvice = "Perfect day for a walk.";
}

// Step 3: Display results
console.log(`Weather Input: Temperature = ${temperature}°C, Raining = ${isRaining}, Wind Speed = ${windSpeed} km/h`);
console.log(`Planner Advice: "${activityAdvice}"`);

// Additional smart check combining && and || for extreme outdoor safety
const isUnfavorable = isRaining || (temperature < 15 && windSpeed > 20) || (temperature > 40);
console.log(`Harsh Conditions Flag (isRaining || (temp < 15 && wind > 20)): ${isUnfavorable}`);
