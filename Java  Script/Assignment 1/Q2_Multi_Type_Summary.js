/**
 * Question 2: Multi-Type Data Summary
 * 
 * Requirements:
 * - Declare variables of different data types: string, number, boolean, array, object, null, undefined.
 * - Use typeof operator and Array.isArray() to identify each type.
 * - Print a formatted report (label + value + type) using one console.table() statement.
 */

// Step 1: Declare variables of different data types
const stringVar = "Full Stack Development";
const numberVar = 100;
const booleanVar = true;
const arrayVar = ["MongoDB", "Express", "React", "Node"];
const objectVar = { subject: "JavaScript", assignment: 1 };
const nullVar = null;
let undefinedVar;

// Step 2: Function utilizing typeof and Array.isArray() to accurately detect type
function getDataType(val) {
    if (Array.isArray(val)) {
        return "array"; // Identified via Array.isArray()
    }
    if (val === null) {
        return "null";  // Specifically detected null (since typeof null === 'object' in JS)
    }
    return typeof val; // Identified using typeof operator
}

// Step 3: Compile summary array with label, value, and type
const dataSummaryReport = [
    { Label: "String Variable", Value: stringVar, Type: getDataType(stringVar) },
    { Label: "Number Variable", Value: numberVar, Type: getDataType(numberVar) },
    { Label: "Boolean Variable", Value: booleanVar, Type: getDataType(booleanVar) },
    { Label: "Array Variable", Value: JSON.stringify(arrayVar), Type: getDataType(arrayVar) },
    { Label: "Object Variable", Value: JSON.stringify(objectVar), Type: getDataType(objectVar) },
    { Label: "Null Variable", Value: String(nullVar), Type: getDataType(nullVar) },
    { Label: "Undefined Variable", Value: String(undefinedVar), Type: getDataType(undefinedVar) }
];

// Step 4: Display using one console.table() statement
console.log("Multi-Type Database Summary Report:");
console.table(dataSummaryReport);
