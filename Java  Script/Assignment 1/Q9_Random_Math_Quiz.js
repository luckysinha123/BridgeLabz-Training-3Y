/**
 * Question 9: Random Math Quiz Generator
 * 
 * Requirements:
 * - Use Math.random() to generate two numbers (1-20) and a random operator from ['+', '-', '*', '/'].
 * - Calculate the correct answer using switch statement.
 * - Display question and correct answer in the console.
 * - Ensure division is rounded to two decimals with toFixed(2).
 */

// Step 1: Generate two random numbers (1 to 20) and random operator
const firstNumber = Math.floor(Math.random() * 20) + 1;
const secondNumber = Math.floor(Math.random() * 20) + 1;

const arithmeticOperators = ['+', '-', '*', '/'];
const randomOperator = arithmeticOperators[Math.floor(Math.random() * arithmeticOperators.length)];

let calculatedResult;

// Step 2: Calculate correct answer using switch statement
switch (randomOperator) {
    case '+':
        calculatedResult = firstNumber + secondNumber;
        break;
    case '-':
        calculatedResult = firstNumber - secondNumber;
        break;
    case '*':
        calculatedResult = firstNumber * secondNumber;
        break;
    case '/':
        // Ensure division is rounded to two decimals with toFixed(2)
        calculatedResult = Number((firstNumber / secondNumber).toFixed(2));
        break;
    default:
        calculatedResult = NaN;
}

// Step 3: Display question and correct answer
console.log(`Generated Math Challenge : ${firstNumber} ${randomOperator} ${secondNumber} = ?`);
console.log(`Computed Correct Answer  : ${calculatedResult}`);
