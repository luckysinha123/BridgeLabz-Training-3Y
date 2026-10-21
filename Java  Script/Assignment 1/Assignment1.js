/**
 * ==============================================================================
 * FULL STACK WEB DEVELOPMENT - ASSIGNMENT 1
 * ==============================================================================
 * Language    : Core JavaScript (ECMAScript)
 * Environment : Node.js / Browser Console
 * Description : Solutions for Questions 1 to 10 with detailed logic, comments,
 *               clean formatting, descriptive naming, and modular execution.
 * ==============================================================================
 */

// ==============================================================================
// QUESTION 1: PERSONALIZED LOGIN GREETING
// ==============================================================================
/**
 * Logic:
 * 1. Fetch current system hour using new Date().getHours() (returns 0-23).
 * 2. Use conditional statements to determine the time period:
 *    - Hour < 12          -> "Good Morning"
 *    - Hour between 12-17 -> "Good Afternoon"
 *    - Otherwise (>= 18)  -> "Good Evening"
 * 3. Construct the message using template literals (`${...}`).
 */
{
    console.log("==============================================================================");
    console.log("QUESTION 1: PERSONALIZED LOGIN GREETING");
    console.log("==============================================================================");

    const userName = "Lucky";
    const currentHour = new Date().getHours(); // Returns hour from 0 to 23

    let greetingMessage = "";

    // Conditional check based on the hour of the day
    if (currentHour < 12) {
        greetingMessage = `Good Morning ${userName}!`;
    } else if (currentHour >= 12 && currentHour <= 17) {
        greetingMessage = `Good Afternoon ${userName}!`;
    } else {
        greetingMessage = `Good Evening ${userName}!`;
    }

    console.log(`User Name     : ${userName}`);
    console.log(`Current Hour  : ${currentHour}:00 (24-hour format)`);
    console.log(`Greeting      : ${greetingMessage}\n`);
}

// ==============================================================================
// QUESTION 2: MULTI-TYPE DATA SUMMARY
// ==============================================================================
/**
 * Logic:
 * 1. Declare variables representing seven fundamental JavaScript data types:
 *    string, number, boolean, array, object, null, undefined.
 * 2. In JavaScript, `typeof null` erroneously returns "object" due to legacy design.
 *    Similarly, `typeof []` returns "object".
 * 3. We use `Array.isArray()` to correctly identify arrays, check for `null`,
 *    and use the `typeof` operator for all other data types.
 * 4. Assemble the entries into an array of objects and display via console.table().
 */
{
    console.log("==============================================================================");
    console.log("QUESTION 2: MULTI-TYPE DATA SUMMARY");
    console.log("==============================================================================");

    // Declaring variables of different JavaScript types
    const textData = "JavaScript Full Stack";                // String
    const numericData = 2026;                                // Number
    const booleanData = true;                                // Boolean
    const arrayData = ["React", "Node.js", "Express"];       // Array
    const objectData = { role: "Developer", level: "Senior" }; // Object
    const nullData = null;                                   // Null
    let undefinedData;                                       // Undefined

    // Helper function to identify data types using typeof and Array.isArray()
    function determineType(value) {
        if (Array.isArray(value)) {
            return "array"; // Identified via Array.isArray()
        }
        if (value === null) {
            return "null";  // Specifically detected null (since typeof null === 'object')
        }
        return typeof value; // Standard typeof operator
    }

    // Creating structured summary report
    const databaseSummary = [
        { Label: "textData", Value: textData, Type: determineType(textData) },
        { Label: "numericData", Value: numericData, Type: determineType(numericData) },
        { Label: "booleanData", Value: booleanData, Type: determineType(booleanData) },
        { Label: "arrayData", Value: JSON.stringify(arrayData), Type: determineType(arrayData) },
        { Label: "objectData", Value: JSON.stringify(objectData), Type: determineType(objectData) },
        { Label: "nullData", Value: String(nullData), Type: determineType(nullData) },
        { Label: "undefinedData", Value: String(undefinedData), Type: determineType(undefinedData) }
    ];

    console.log("Formatted Multi-Type Database Summary Report:");
    console.table(databaseSummary);
    console.log();
}

// ==============================================================================
// QUESTION 3: MONTHLY EXPENSE TRACKER
// ==============================================================================
/**
 * Logic:
 * 1. Store expense amounts for 5 distinct categories in an array.
 * 2. Calculate the total expense using arithmetic (+) and assignment (+=) operators.
 * 3. Compute the average expense by dividing total by the array length.
 * 4. Add 10% tax using multiplication (*) and compound assignment (+=).
 * 5. Format numbers to 2 decimal places using `toFixed(2)`.
 */
{
    console.log("==============================================================================");
    console.log("QUESTION 3: MONTHLY EXPENSE TRACKER");
    console.log("==============================================================================");

    // Array of expenses for 5 categories (food, travel, rent, bills, leisure)
    const monthlyExpenses = [
        { category: "Food", amount: 4500.50 },
        { category: "Travel", amount: 1850.25 },
        { category: "Rent", amount: 12000.00 },
        { category: "Bills", amount: 2450.75 },
        { category: "Leisure", amount: 3200.00 }
    ];

    let totalExpense = 0;

    // Accumulating total using loop and += assignment operator
    for (let i = 0; i < monthlyExpenses.length; i++) {
        totalExpense += monthlyExpenses[i].amount;
    }

    // Calculating average monthly expense
    const averageExpense = totalExpense / monthlyExpenses.length;

    // Calculating 10% tax
    const taxRate = 0.10;
    const taxAmount = totalExpense * taxRate; // Arithmetic multiplication

    // Adding tax using compound assignment operator
    let finalAmountAfterTax = totalExpense;
    finalAmountAfterTax += taxAmount; // Compound assignment

    console.log("Itemized Category Expenses:");
    console.table(monthlyExpenses);

    console.log(`Total Expenses        : Rs. ${totalExpense.toFixed(2)}`);
    console.log(`Average Category Cost : Rs. ${averageExpense.toFixed(2)}`);
    console.log(`Tax Added (10%)       : Rs. ${taxAmount.toFixed(2)}`);
    console.log(`Final Amount After Tax: Rs. ${finalAmountAfterTax.toFixed(2)}\n`);
}

// ==============================================================================
// QUESTION 4: ACADEMIC PERFORMANCE EVALUATOR
// ==============================================================================
/**
 * Logic:
 * 1. Store marks of 5 subjects in an array.
 * 2. Sum marks, calculate average and overall percentage (out of 500).
 * 3. Check individual subject marks: If ANY subject mark is < 35, the student
 *    is automatically "Detained" regardless of overall percentage.
 * 4. If all subjects are >= 35, apply evaluation rules:
 *    - Percentage >= 85%      -> "Promoted with Distinction"
 *    - Percentage 50% to 84%  -> "Promoted"
 *    - Percentage < 50%       -> "Detained"
 * 5. Use logical operators (&&, ||) to handle evaluation cleanly.
 */
{
    console.log("==============================================================================");
    console.log("QUESTION 4: ACADEMIC PERFORMANCE EVALUATOR");
    console.log("==============================================================================");

    const subjectMarks = [88, 76, 92, 85, 90]; // 5 subjects (out of 100 each)
    const maxMarksPerSubject = 100;
    const totalMaxMarks = subjectMarks.length * maxMarksPerSubject;

    let totalObtained = 0;
    let hasFailedAnySubject = false;

    // Summing marks and validating minimum pass criteria (>= 35) per subject
    for (let i = 0; i < subjectMarks.length; i++) {
        totalObtained += subjectMarks[i];
        if (subjectMarks[i] < 35) {
            hasFailedAnySubject = true;
        }
    }

    const averageMarks = totalObtained / subjectMarks.length;
    const overallPercentage = (totalObtained / totalMaxMarks) * 100;

    let academicResult = "";

    // Evaluation using logical operators
    if (hasFailedAnySubject || overallPercentage < 50) {
        academicResult = "Detained";
    } else if (overallPercentage >= 85) {
        academicResult = "Promoted with Distinction";
    } else if (overallPercentage >= 50 && overallPercentage < 85) {
        academicResult = "Promoted";
    }

    console.log(`Marks Entered      : [${subjectMarks.join(", ")}]`);
    console.log(`Total Marks        : ${totalObtained} / ${totalMaxMarks}`);
    console.log(`Average Marks      : ${averageMarks.toFixed(2)}`);
    console.log(`Overall Percentage : ${overallPercentage.toFixed(2)}%`);
    console.log(`Subject Pass Check : ${hasFailedAnySubject ? "Failed (< 35 in a subject)" : "All subjects passed (>= 35)"}`);
    console.log(`Final Evaluation   : "${academicResult}"\n`);
}

// ==============================================================================
// QUESTION 5: WEATHER ACTIVITY PLANNER
// ==============================================================================
/**
 * Logic:
 * Advise user based on:
 * 1. If raining -> "Stay indoors with hot coffee."
 * 2. Else if temperature > 35 -> "Go swimming."
 * 3. Else if temperature < 15 and windSpeed > 20 -> "Too cold and windy — stay home."
 * 4. Else -> "Perfect day for a walk."
 *
 * Combines && and || operators to inspect weather criteria.
 */
{
    console.log("==============================================================================");
    console.log("QUESTION 5: WEATHER ACTIVITY PLANNER");
    console.log("==============================================================================");

    function planWeatherActivity(temperature, isRaining, windSpeed) {
        let recommendation = "";

        // Decision logic combining conditions smartly
        if (isRaining) {
            recommendation = "Stay indoors with hot coffee.";
        } else if (temperature > 35) {
            recommendation = "Go swimming.";
        } else if (temperature < 15 && windSpeed > 20) {
            recommendation = "Too cold and windy — stay home.";
        } else {
            recommendation = "Perfect day for a walk.";
        }

        return recommendation;
    }

    // Primary test case
    const temperature = 12;   // in Celsius
    const isRaining = false;  // boolean
    const windSpeed = 25;     // in km/h

    console.log(`Weather Conditions : Temp = ${temperature}°C, Raining = ${isRaining}, Wind = ${windSpeed} km/h`);
    console.log(`Recommendation     : "${planWeatherActivity(temperature, isRaining, windSpeed)}"`);

    // Demonstrating compound logic with && and ||
    const isUnfavorableWeather = isRaining || (temperature < 15 && windSpeed > 20) || (temperature > 40);
    console.log(`Extreme / Unfavorable Outdoor Weather Flag: ${isUnfavorableWeather}\n`);
}

// ==============================================================================
// QUESTION 6: PROGRESSIVE DISCOUNT SYSTEM
// ==============================================================================
/**
 * Logic:
 * Tiered discount structure:
 * - Purchase >= 10000 -> 25% discount
 * - Purchase >= 5000  -> 15% discount
 * - Purchase >= 2000  -> 5% discount
 * - Otherwise         -> 0% discount
 *
 * Calculations:
 * - Discount amount = (total * discountPercentage) / 100
 * - Final price = total - discountAmount
 * - Round final price using Math.round().
 */
{
    console.log("==============================================================================");
    console.log("QUESTION 6: PROGRESSIVE DISCOUNT SYSTEM");
    console.log("==============================================================================");

    const totalPurchaseAmount = 7450.75; // Input total purchase

    let discountPercentage = 0;

    // Determine discount tier
    if (totalPurchaseAmount >= 10000) {
        discountPercentage = 25;
    } else if (totalPurchaseAmount >= 5000) {
        discountPercentage = 15;
    } else if (totalPurchaseAmount >= 2000) {
        discountPercentage = 5;
    } else {
        discountPercentage = 0;
    }

    const discountAmount = (totalPurchaseAmount * discountPercentage) / 100;
    const finalPriceBeforeRounding = totalPurchaseAmount - discountAmount;
    const finalPrice = Math.round(finalPriceBeforeRounding); // Applying Math.round()

    console.log(`Original Total Purchase : Rs. ${totalPurchaseAmount.toFixed(2)}`);
    console.log(`Discount Percentage     : ${discountPercentage}%`);
    console.log(`Discount Amount Saved   : Rs. ${discountAmount.toFixed(2)}`);
    console.log(`Final Price After Disc. : Rs. ${finalPrice} (Rounded using Math.round())\n`);
}

// ==============================================================================
// QUESTION 7: SMART GUESSING GAME (NUMBER RANGE)
// ==============================================================================
/**
 * Logic:
 * 1. Generate random secret number between 1 and 50:
 *    Math.floor(Math.random() * 50) + 1
 * 2. Compare userGuess with secret:
 *    - If userGuess === secret -> "Correct guess!"
 *    - Else check if difference is <= 3 -> "Very close!"
 *    - Else if userGuess > secret -> "Too high"
 *    - Else -> "Too low"
 * 3. Implements nested if conditions and logical operators.
 */
{
    console.log("==============================================================================");
    console.log("QUESTION 7: SMART GUESSING GAME (NUMBER RANGE)");
    console.log("==============================================================================");

    // Generating random secret integer in range [1, 50]
    const secret = Math.floor(Math.random() * 50) + 1;
    const userGuess = 28; // Test value

    console.log(`Target Secret Number : ${secret}`);
    console.log(`User's Guess         : ${userGuess}`);

    const difference = Math.abs(userGuess - secret);
    let outcomeMessage = "";

    // Nested if-conditions with logical operators
    if (userGuess === secret) {
        outcomeMessage = "Correct guess!";
    } else {
        // Nested condition 1: Range proximity check within ±3
        if (difference <= 3 && difference > 0) {
            outcomeMessage = "Very close!";
        } else {
            // Nested condition 2: Directional hint
            if (userGuess > secret) {
                outcomeMessage = "Too high";
            } else {
                outcomeMessage = "Too low";
            }
        }
    }

    console.log(`Difference           : ${difference}`);
    console.log(`Result               : "${outcomeMessage}"\n`);
}

// ==============================================================================
// QUESTION 8: EMPLOYEE SALARY PROJECTION
// ==============================================================================
/**
 * Logic:
 * 1. Declare starting salary and yearly increment percentage.
 * 2. Use a for-loop iterating over 5 years.
 * 3. Each year:
 *    - Calculate increment amount = currentSalary * (rate / 100)
 *    - Update salary using compound assignment operator (+=)
 *    - Round salary using Math.round()
 * 4. Display the 5-year projection neatly formatted via console.table().
 */
{
    console.log("==============================================================================");
    console.log("QUESTION 8: EMPLOYEE SALARY PROJECTION");
    console.log("==============================================================================");

    const initialSalary = 50000;
    const incrementRate = 8; // 8% annual increment
    const projectionYears = 5;

    let projectedSalary = initialSalary;
    const projectionData = [];

    // 5-year projection loop
    for (let year = 1; year <= projectionYears; year++) {
        const incrementAmount = projectedSalary * (incrementRate / 100);
        projectedSalary += incrementAmount; // Compound assignment operator

        projectionData.push({
            Year: `Year ${year}`,
            "Current Base (Rs.)": Math.round(projectedSalary - incrementAmount),
            "Increment Rate": `${incrementRate}%`,
            "Increment (Rs.)": Math.round(incrementAmount),
            "Projected Salary (Rs.)": Math.round(projectedSalary) // Rounded value
        });
    }

    console.log(`Initial Salary : Rs. ${initialSalary} | Annual Increment Rate: ${incrementRate}%`);
    console.log("5-Year Career Salary Projection Table:");
    console.table(projectionData);
    console.log();
}

// ==============================================================================
// QUESTION 9: RANDOM MATH QUIZ GENERATOR
// ==============================================================================
/**
 * Logic:
 * 1. Generate two random integers from 1 to 20 using:
 *    Math.floor(Math.random() * 20) + 1
 * 2. Select a random operator from ['+', '-', '*', '/'].
 * 3. Evaluate the correct answer using a switch statement.
 * 4. For division, ensure result is rounded to two decimal places using toFixed(2).
 */
{
    console.log("==============================================================================");
    console.log("QUESTION 9: RANDOM MATH QUIZ GENERATOR");
    console.log("==============================================================================");

    const num1 = Math.floor(Math.random() * 20) + 1; // 1 to 20
    const num2 = Math.floor(Math.random() * 20) + 1; // 1 to 20

    const operators = ['+', '-', '*', '/'];
    const chosenOperator = operators[Math.floor(Math.random() * operators.length)];

    let correctAnswer;

    // Calculating correct answer using switch statement
    switch (chosenOperator) {
        case '+':
            correctAnswer = num1 + num2;
            break;
        case '-':
            correctAnswer = num1 - num2;
            break;
        case '*':
            correctAnswer = num1 * num2;
            break;
        case '/':
            // Division formatted to 2 decimal places using toFixed(2)
            correctAnswer = Number((num1 / num2).toFixed(2));
            break;
        default:
            correctAnswer = null;
    }

    console.log(`Generated Challenge : ${num1} ${chosenOperator} ${num2} = ?`);
    console.log(`Evaluated Answer    : ${correctAnswer}`);

    // Simulation of evaluating a student's answer
    const simulatedStudentAnswer = correctAnswer;
    const isStudentCorrect = simulatedStudentAnswer === correctAnswer;
    console.log(`Auto-Evaluation Test: ${isStudentCorrect ? "CORRECT ANSWER" : "INCORRECT ANSWER"}\n`);
}

// ==============================================================================
// QUESTION 10: CITIZEN ELIGIBILITY VALIDATOR
// ==============================================================================
/**
 * Logic:
 * Requirements:
 * - "Eligible for all services." if citizen and age >= 18 (for full adult age, typically 21+
 *   when voting-only applies to 18-20)
 * - "Eligible to vote only." if citizen and 18-20
 * - "Only age criteria met." if not citizen but age >= 18
 * - "Not eligible yet." otherwise
 *
 * Implements nested if-else structures and logical operators.
 */
{
    console.log("==============================================================================");
    console.log("QUESTION 10: CITIZEN ELIGIBILITY VALIDATOR");
    console.log("==============================================================================");

    function validateEligibility(age, isCitizen) {
        let status = "";

        // Nested if-else decision structure
        if (isCitizen) {
            // Citizen branch
            if (age >= 18) {
                // Check whether within vote-only window (18-20) or all services (21+)
                if (age >= 18 && age <= 20) {
                    status = "Eligible to vote only.";
                } else {
                    status = "Eligible for all services.";
                }
            } else {
                status = "Not eligible yet.";
            }
        } else {
            // Non-citizen branch
            if (age >= 18) {
                status = "Only age criteria met.";
            } else {
                status = "Not eligible yet.";
            }
        }

        console.log(`Profile [Age: ${age}, Citizen: ${isCitizen}] -> "${status}"`);
        return status;
    }

    // Testing all requirement scenarios
    console.log("Testing All Citizen & Age Scenarios:");
    validateEligibility(25, true);   // Citizen >= 21  -> Eligible for all services.
    validateEligibility(19, true);   // Citizen 18-20  -> Eligible to vote only.
    validateEligibility(22, false);  // Non-citizen >= 18 -> Only age criteria met.
    validateEligibility(16, true);   // Minor citizen  -> Not eligible yet.
    validateEligibility(15, false);  // Minor non-citizen -> Not eligible yet.
    console.log("==============================================================================\n");
}
