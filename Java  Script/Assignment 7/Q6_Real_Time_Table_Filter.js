"use strict";

/**
 * ==============================================================================
 * ASSIGNMENT 7 - QUESTION 6: Real-Time Table Filter Using 'input' Event
 * ==============================================================================
 * 
 * Problem Statement:
 * Given a table of students (Name, Branch, CGPA):
 * ● When typing in a search box → only matching rows remain visible
 * ● Searching should be case-insensitive
 * ● If no results found → show “No results found”
 * 
 * Concepts Demonstrated:
 * - Real-Time Filtering via the 'input' Event
 * - Case-Insensitive String Matching (toLowerCase().includes())
 * - Dynamic Row Toggling & Conditional "No Results Found" Feedback
 * ==============================================================================
 */

// Master Student Record Dataset
const STUDENTS_RECORD = [
    { id: 1, name: "Aarav Mehta", branch: "Computer Science", cgpa: 9.2 },
    { id: 2, name: "Priya Nair", branch: "Electronics", cgpa: 8.7 },
    { id: 3, name: "Rohan Gupta", branch: "Information Technology", cgpa: 7.9 },
    { id: 4, name: "Sneha Reddy", branch: "Mechanical Engineering", cgpa: 8.4 },
    { id: 5, name: "Vikram Patel", branch: "Computer Science", cgpa: 9.6 },
    { id: 6, name: "Ananya Deshmukh", branch: "Civil Engineering", cgpa: 8.1 },
    { id: 7, name: "Aditya Singh", branch: "Electronics", cgpa: 7.5 }
];

/**
 * Filters an array of student records based on search query.
 * Case-insensitive across Name, Branch, or CGPA.
 * 
 * @param {Array<Object>} students - Array of student records
 * @param {string} query - Search string
 * @returns {Array<Object>} Matching students
 */
function filterStudentRecords(students, query) {
    const normalizedQuery = String(query || "").trim().toLowerCase();

    if (!normalizedQuery) {
        return students;
    }

    return students.filter(student => {
        const nameMatch = student.name.toLowerCase().includes(normalizedQuery);
        const branchMatch = student.branch.toLowerCase().includes(normalizedQuery);
        const cgpaMatch = String(student.cgpa).includes(normalizedQuery);
        return nameMatch || branchMatch || cgpaMatch;
    });
}

// ==============================================================================
// BROWSER DOM IMPLEMENTATION
// ==============================================================================
function initRealTimeTableFilterDOM() {
    if (typeof document === "undefined") return;

    const searchInput = document.getElementById("studentSearchInput");
    const tableBody = document.getElementById("studentTableBody");
    const noResultsRow = document.getElementById("noResultsTableRow");

    if (!searchInput || !tableBody) return;

    // Helper to render table rows
    const renderTable = (studentsList) => {
        tableBody.innerHTML = "";

        if (studentsList.length === 0) {
            if (noResultsRow) {
                noResultsRow.style.display = "table-row";
            } else {
                tableBody.innerHTML = `
                    <tr class="no-results-row">
                        <td colspan="4" style="text-align: center; color: #ef4444; padding: 16px; font-weight: 600;">
                            No results found
                        </td>
                    </tr>`;
            }
            return;
        }

        if (noResultsRow) noResultsRow.style.display = "none";

        studentsList.forEach((s, idx) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">${idx + 1}</td>
                <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-weight: 600;">${s.name}</td>
                <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">${s.branch}</td>
                <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; color: #16a34a; font-weight: bold;">${s.cgpa.toFixed(1)}</td>
            `;
            tableBody.appendChild(tr);
        });
    };

    // Initial table population
    renderTable(STUDENTS_RECORD);

    // REAL-TIME FILTERING ON 'input' EVENT
    searchInput.addEventListener("input", () => {
        const query = searchInput.value;
        const filtered = filterStudentRecords(STUDENTS_RECORD, query);
        renderTable(filtered);
        console.log(`[Table Filter] Query: "${query}" -> Matches found: ${filtered.length}`);
    });
}

if (typeof document !== "undefined") {
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initRealTimeTableFilterDOM);
    } else {
        initRealTimeTableFilterDOM();
    }
}

// ==============================================================================
// NODE.JS TEST SUITE
// ==============================================================================
if (typeof module !== "undefined" && typeof window === "undefined") {
    console.log("==============================================================================");
    console.log("       ASSIGNMENT 7 - Q6: REAL-TIME TABLE FILTER (NODE.JS TEST)               ");
    console.log("==============================================================================\n");

    console.log("Master Student Records:");
    console.table(STUDENTS_RECORD);

    const testQueries = ["comp", "electronics", "priya", "9.6", "nonexistentquery"];

    testQueries.forEach(query => {
        const matches = filterStudentRecords(STUDENTS_RECORD, query);
        console.log(`>>> Search Query: "${query}"`);
        if (matches.length > 0) {
            console.log(`    Found ${matches.length} matching student(s):`);
            matches.forEach(m => console.log(`      - ${m.name.padEnd(16)} | ${m.branch.padEnd(24)} | CGPA: ${m.cgpa}`));
        } else {
            console.log("    ✖ Output: \"No results found\"");
        }
        console.log();
    });

    console.log("==============================================================================\n");
}
