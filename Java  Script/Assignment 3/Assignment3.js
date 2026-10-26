/**
 * ==============================================================================
 * FULL STACK JAVASCRIPT - ASSIGNMENT 3 (CONSOLIDATED RUNNER)
 * ==============================================================================
 * Environment : Node.js (v18+) / Modern Browser
 * Folder      : d:\College #3rd year\Full Stack\Java  Script\Assignment 3
 * 
 * Description : Master script that systematically executes all 10 assignment
 *               modules in sequence, producing structured, formatted terminal
 *               output with zero external libraries.
 * ==============================================================================
 */

"use strict";

console.log("==============================================================================");
console.log("                                                                              ");
console.log("           FULL STACK WEB DEVELOPMENT - JAVASCRIPT ASSIGNMENT 3               ");
console.log("            HOISTING, STRICT MODE, ERROR HANDLING & DEBUGGING                 ");
console.log("                                                                              ");
console.log("==============================================================================\n");

const modules = [
    { id: 1, title: "Dynamic Data Parser", file: "./Q1_Dynamic_Data_Parser.js" },
    { id: 2, title: "Employee Bonus Calculator", file: "./Q2_Employee_Bonus_Calculator.js" },
    { id: 3, title: "Transaction Validator", file: "./Q3_Transaction_Validator.js" },
    { id: 4, title: "Debugging Mystery", file: "./Q4_Debugging_Mystery.js" },
    { id: 5, title: "Hoisting Lab: The Sequence Trap", file: "./Q5_Hoisting_Sequence_Trap.js" },
    { id: 6, title: "Pyramid Pattern Generator", file: "./Q6_Pyramid_Pattern_Generator.js" },
    { id: 7, title: "Smart Calculator", file: "./Q7_Smart_Calculator.js" },
    { id: 8, title: "Strict Mode Showdown", file: "./Q8_Strict_Mode_Showdown.js" },
    { id: 9, title: "JSON Audit", file: "./Q9_JSON_Audit.js" },
    { id: 10, title: "Nested Hoisting and Closures", file: "./Q10_Nested_Hoisting_and_Closures.js" }
];

modules.forEach(mod => {
    console.log("\n" + "#".repeat(80));
    console.log(`### STARTING QUESTION ${mod.id}: ${mod.title.toUpperCase()}`);
    console.log(`### Target Script: ${mod.file}`);
    console.log("#".repeat(80) + "\n");

    try {
        require(mod.file);
    } catch (err) {
        console.error(`[Error executing module ${mod.file}]:`, err);
    }

    console.log("\n" + "-".repeat(80));
    console.log(`### COMPLETED QUESTION ${mod.id}: ${mod.title}`);
    console.log("-".repeat(80) + "\n");
});

console.log("\n==============================================================================");
console.log("               ALL 10 ASSIGNMENT MODULES EXECUTED SUCCESSFULLY                ");
console.log("==============================================================================\n");
