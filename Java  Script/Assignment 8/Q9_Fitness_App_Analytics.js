"use strict";

/**
 * ==============================================================================
 * ASSIGNMENT 8 - QUESTION 9: Fitness App Analytics (Classes + Array Processing)
 * ==============================================================================
 * 
 * Problem Statement:
 * Given user workout data:
 * [
 *   { user: "A", steps: 8000, calories: 300 },
 *   { user: "B", steps: 12000, calories: 500 },
 *   { user: "C", steps: 4000, calories: 200 }
 * ]
 * 
 * Create a FitnessAnalytics class with methods:
 * ● getActiveUsers() → users with steps > 7000 using filter()
 * ● getAverageCalories() → using reduce()
 * ● getUserSummary() → using map() to format as messages
 * ● Throw an error if dataset is empty
 * 
 * Execute all methods for the above data.
 * 
 * Concepts Demonstrated:
 * - Array Transformation (filter, reduce, map)
 * - Guard Clauses & Custom Error Handling
 * - Encapsulation in Analytical Classes
 * ==============================================================================
 */

console.log("==============================================================================");
console.log("         ASSIGNMENT 8 - Q9: FITNESS APP ANALYTICS                             ");
console.log("==============================================================================\n");

/**
 * Class representing Fitness Activity Analytics.
 */
class FitnessAnalytics {
    /**
     * @param {Array<{ user: string, steps: number, calories: number }>} workoutData 
     * @throws {Error} If dataset is empty or not an array
     */
    constructor(workoutData) {
        // Requirement: Throw an error if dataset is empty
        this.validateDataset(workoutData);
        this.workoutData = workoutData;
    }

    /**
     * Validates that the provided dataset is non-empty.
     * @param {Array} data 
     */
    validateDataset(data) {
        if (!Array.isArray(data) || data.length === 0) {
            throw new Error("Dataset Error: Workout activity dataset cannot be empty or null.");
        }
    }

    /**
     * Returns users with steps strictly greater than threshold using Array.prototype.filter().
     * Default threshold: 7,000 steps.
     * 
     * @param {number} [threshold=7000] 
     * @returns {Array<Object>}
     */
    getActiveUsers(threshold = 7000) {
        return this.workoutData.filter(entry => entry.steps > threshold);
    }

    /**
     * Calculates the average calories burned across all users using Array.prototype.reduce().
     * 
     * @returns {number} Average calories rounded to 2 decimal places.
     */
    getAverageCalories() {
        const totalCalories = this.workoutData.reduce((accumulated, entry) => {
            return accumulated + entry.calories;
        }, 0);

        const average = totalCalories / this.workoutData.length;
        return Math.round(average * 100) / 100;
    }

    /**
     * Formats user workout statistics as descriptive messages using Array.prototype.map().
     * 
     * @returns {string[]} Array of formatted message strings
     */
    getUserSummary() {
        return this.workoutData.map(entry => {
            return `User ${entry.user} logged ${entry.steps.toLocaleString()} steps and burned ${entry.calories} kcal.`;
        });
    }

    /**
     * Returns overall analytics dashboard overview.
     */
    getOverview() {
        return {
            totalUsers: this.workoutData.length,
            activeUsersCount: this.getActiveUsers().length,
            averageCalories: this.getAverageCalories(),
            summaries: this.getUserSummary()
        };
    }
}

// ==============================================================================
// STEP 1: INITIALIZE DATA & RUN ALL METHODS
// ==============================================================================
console.log("------------------------------------------------------------------------------");
console.log("INPUT WORKOUT DATASET");
console.log("------------------------------------------------------------------------------\n");

const sampleWorkoutData = [
    { user: "A", steps: 8000, calories: 300 },
    { user: "B", steps: 12000, calories: 500 },
    { user: "C", steps: 4000, calories: 200 }
];

console.table(sampleWorkoutData);
console.log();

const analytics = new FitnessAnalytics(sampleWorkoutData);

// 1. Execute getActiveUsers()
console.log("------------------------------------------------------------------------------");
console.log("1. ACTIVE USERS (filter() - Steps > 7000)");
console.log("------------------------------------------------------------------------------");
const activeUsers = analytics.getActiveUsers(7000);
console.log(`Found ${activeUsers.length} active user(s):`);
activeUsers.forEach(u => {
    console.log(`  ✔ User ${u.user}: ${u.steps.toLocaleString()} steps | ${u.calories} kcal`);
});
console.log();

// 2. Execute getAverageCalories()
console.log("------------------------------------------------------------------------------");
console.log("2. AVERAGE CALORIES BURNED (reduce())");
console.log("------------------------------------------------------------------------------");
const avgCalories = analytics.getAverageCalories();
console.log(`Average Calories Burned Across All Users: ${avgCalories} kcal`);
console.log();

// 3. Execute getUserSummary()
console.log("------------------------------------------------------------------------------");
console.log("3. FORMATTED USER SUMMARIES (map())");
console.log("------------------------------------------------------------------------------");
const userSummaries = analytics.getUserSummary();
userSummaries.forEach(msg => {
    console.log(`  • ${msg}`);
});
console.log();

// ==============================================================================
// STEP 2: DEMONSTRATING ERROR HANDLING (EMPTY DATASET)
// ==============================================================================
console.log("------------------------------------------------------------------------------");
console.log("4. TESTING ERROR HANDLING ON EMPTY DATASET (try...catch)");
console.log("------------------------------------------------------------------------------\n");

try {
    console.log("Attempting to instantiate FitnessAnalytics with an empty array []...");
    const emptyAnalytics = new FitnessAnalytics([]);
    console.log(emptyAnalytics);
} catch (error) {
    console.error("  ❌ [Error Caught Successfully]:", error.message);
    console.log("  ✔ Safety check verified: Empty datasets are rejected with informative error.");
}
console.log("\n==============================================================================\n");
