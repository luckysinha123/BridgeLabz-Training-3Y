"use strict";

/**
 * ==============================================================================
 * ASSIGNMENT 8 - QUESTION 1: Student Result Processing (reduce + Classes)
 * ==============================================================================
 * 
 * Problem Statement:
 * You are given an array of marks of a student.
 * Create a Student class with properties: name and marks[].
 * Add method:
 * ● calculateAverage() using reduce()
 * ● Return grade based on average: A/B/C/F
 * Test the class for 3 students.
 * 
 * Concepts Demonstrated:
 * - ES6 Class syntax and encapsulation
 * - Array.prototype.reduce() for accumulating totals and calculating averages
 * - Conditional grading logic based on numerical ranges
 * - Multi-instance testing and formatted console reporting
 * ==============================================================================
 */

console.log("==============================================================================");
console.log("       ASSIGNMENT 8 - Q1: STUDENT RESULT PROCESSING (reduce + Classes)        ");
console.log("==============================================================================\n");

/**
 * Class representing a Student and their academic evaluation.
 */
class Student {
    /**
     * @param {string} name - Student's full name
     * @param {number[]} marks - Array of scores obtained across subjects (0-100)
     */
    constructor(name, marks) {
        if (!name || typeof name !== "string") {
            throw new Error("Student name must be a valid non-empty string.");
        }
        if (!Array.isArray(marks) || marks.length === 0) {
            throw new Error("Marks must be a non-empty array of numbers.");
        }

        this.name = name;
        this.marks = marks;
    }

    /**
     * Calculates the average marks using Array.prototype.reduce().
     * @returns {number} Average marks rounded to 2 decimal places.
     */
    calculateAverage() {
        // Accumulate sum of marks using reduce
        const totalMarks = this.marks.reduce((accumulator, currentMark) => {
            return accumulator + currentMark;
        }, 0);

        const average = totalMarks / this.marks.length;
        return Math.round(average * 100) / 100;
    }

    /**
     * Determines the letter grade based on the calculated average score.
     * Grading Criteria:
     * - Average >= 90 : Grade A (Outstanding)
     * - Average >= 75 : Grade B (Good)
     * - Average >= 50 : Grade C (Pass)
     * - Average <  50 : Grade F (Fail)
     * 
     * @returns {string} Grade letter ('A', 'B', 'C', or 'F')
     */
    getGrade() {
        const avg = this.calculateAverage();

        if (avg >= 90) return "A";
        if (avg >= 75) return "B";
        if (avg >= 50) return "C";
        return "F";
    }

    /**
     * Returns a detailed academic report summary.
     * @returns {string}
     */
    getReport() {
        const avg = this.calculateAverage();
        const grade = this.getGrade();
        const status = grade !== "F" ? "PASSED ✔" : "FAILED ✖";
        return `Student: ${this.name.padEnd(16)} | Marks: [${this.marks.join(", ")}] | Avg: ${avg.toFixed(2)} | Grade: ${grade} (${status})`;
    }
}

// ==============================================================================
// TESTING WITH 3 STUDENTS
// ==============================================================================
console.log("------------------------------------------------------------------------------");
console.log("TESTING STUDENT EVALUATIONS (3 STUDENTS)");
console.log("------------------------------------------------------------------------------\n");

const student1 = new Student("Aarav Mehta", [95, 92, 88, 94, 91]); // Expected: Grade A (~92.00)
const student2 = new Student("Neha Sharma", [78, 82, 70, 74, 80]); // Expected: Grade B (~76.80)
const student3 = new Student("Rahul Verma", [42, 48, 55, 38, 45]); // Expected: Grade F (~45.60)

const testStudents = [student1, student2, student3];

testStudents.forEach((student, index) => {
    console.log(`Student ${index + 1}:`);
    console.log(`  Name        : ${student.name}`);
    console.log(`  Marks Array : [${student.marks.join(", ")}]`);
    console.log(`  Average     : ${student.calculateAverage()}`);
    console.log(`  Grade       : ${student.getGrade()}`);
    console.log(`  Summary     : ${student.getReport()}\n`);
});

// Tabular Summary
console.log("------------------------------------------------------------------------------");
console.log("STUDENT RESULTS SUMMARY TABLE");
console.log("------------------------------------------------------------------------------");
console.table(testStudents.map(s => ({
    Name: s.name,
    "Marks Count": s.marks.length,
    Average: s.calculateAverage(),
    Grade: s.getGrade(),
    Status: s.getGrade() !== "F" ? "Passed" : "Failed"
})));
console.log("==============================================================================\n");
