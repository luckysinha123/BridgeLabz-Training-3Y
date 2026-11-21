"use strict";

/**
 * ==============================================================================
 * ASSIGNMENT 4 - QUESTION 3: Library Management System (Classes + Objects)
 * ==============================================================================
 * 
 * Problem Statement:
 * Design a Book class with properties like title, author, ISBN, isIssued.
 * 
 * Tasks:
 * 1. Create methods issueBook() and returnBook().
 * 2. Create an array of book objects.
 * 3. Display all available books (not issued).
 * 4. Allow a user to issue a book by searching ISBN.
 * 
 * Concepts Demonstrated:
 * - OOP in ES6: Class declaration, encapsulation, state mutation
 * - Array Searching & Filtering (Array.prototype.find, Array.prototype.filter)
 * - State Management & Defensive Logic Handling
 * ==============================================================================
 */

console.log("==============================================================================");
console.log("          ASSIGNMENT 4 - Q3: LIBRARY MANAGEMENT SYSTEM                        ");
console.log("==============================================================================\n");

/**
 * Class representing a Library Book.
 */
class Book {
    /**
     * @param {string} title - Book Title
     * @param {string} author - Author Name
     * @param {string} ISBN - International Standard Book Number
     * @param {boolean} [isIssued=false] - Initial checkout status
     */
    constructor(title, author, ISBN, isIssued = false) {
        if (!title || !author || !ISBN) {
            throw new Error("title, author, and ISBN are required parameters.");
        }
        this.title = title;
        this.author = author;
        this.ISBN = String(ISBN).trim();
        this.isIssued = Boolean(isIssued);
        this.issuedAt = null;
    }

    /**
     * Issues the book if available.
     * @returns {boolean} True if successfully issued, false if already issued.
     */
    issueBook() {
        if (this.isIssued) {
            console.log(`[ISSUE FAILED] "${this.title}" (ISBN: ${this.ISBN}) is ALREADY ISSUED to another patron.`);
            return false;
        }

        this.isIssued = true;
        this.issuedAt = new Date().toISOString().split("T")[0];
        console.log(`[SUCCESS] "${this.title}" (ISBN: ${this.ISBN}) has been ISSUED successfully on ${this.issuedAt}.`);
        return true;
    }

    /**
     * Returns the book to the library inventory.
     * @returns {boolean} True if successfully returned, false if was not issued.
     */
    returnBook() {
        if (!this.isIssued) {
            console.log(`[RETURN FAILED] "${this.title}" (ISBN: ${this.ISBN}) was NOT issued and is already in the library.`);
            return false;
        }

        this.isIssued = false;
        this.issuedAt = null;
        console.log(`[SUCCESS] "${this.title}" (ISBN: ${this.ISBN}) has been RETURNED and is now AVAILABLE.`);
        return true;
    }

    /**
     * Returns formatted details of the book.
     * @returns {string}
     */
    getDetails() {
        const status = this.isIssued ? "[ISSUED ✖]" : "[AVAILABLE ✔]";
        return `${status.padEnd(14)} ISBN: ${this.ISBN.padEnd(14)} | "${this.title}" by ${this.author}`;
    }
}

// ==============================================================================
// STEP 1: Create an Array of Book Objects
// ==============================================================================
console.log("------------------------------------------------------------------------------");
console.log("STEP 1: INITIALIZING LIBRARY BOOK CATALOG");
console.log("------------------------------------------------------------------------------\n");

const libraryBooks = [
    new Book("Clean Code", "Robert C. Martin", "978-0132350884", false),
    new Book("You Don't Know JS Yet", "Kyle Simpson", "978-1091210424", true),
    new Book("JavaScript: The Good Parts", "Douglas Crockford", "978-0596517748", false),
    new Book("Design Patterns", "Erich Gamma et al.", "978-0201633610", false),
    new Book("The Pragmatic Programmer", "Andrew Hunt, David Thomas", "978-0135957059", true),
    new Book("Eloquent JavaScript", "Marijn Haverbeke", "978-1593279509", false)
];

console.log(`Total books in collection: ${libraryBooks.length}\n`);
libraryBooks.forEach(b => console.log(b.getDetails()));
console.log();

// ==============================================================================
// STEP 2: Display All Available Books (Not Issued)
// ==============================================================================
/**
 * Filters and prints all available books in the inventory.
 * @param {Array<Book>} books 
 * @returns {Array<Book>}
 */
function displayAvailableBooks(books) {
    console.log("------------------------------------------------------------------------------");
    console.log("STEP 2: AVAILABLE BOOKS IN INVENTORY (isIssued === false)");
    console.log("------------------------------------------------------------------------------\n");

    const availableBooks = books.filter(book => !book.isIssued);

    console.log(`Found ${availableBooks.length} available books for checkout:\n`);
    availableBooks.forEach((b, i) => {
        console.log(`  ${i + 1}. ISBN: ${b.ISBN} | "${b.title}" - ${b.author}`);
    });
    console.log();
    return availableBooks;
}

displayAvailableBooks(libraryBooks);

// ==============================================================================
// STEP 3: Issue a Book by Searching ISBN
// ==============================================================================
/**
 * Finds a book by ISBN and attempts to issue it.
 * 
 * @param {Array<Book>} books - Book collection.
 * @param {string} searchISBN - ISBN to locate.
 * @returns {Book|null}
 */
function issueBookByISBN(books, searchISBN) {
    console.log(`[ACTION] Searching for ISBN: "${searchISBN}" to issue...`);
    const targetBook = books.find(book => book.ISBN === searchISBN);

    if (!targetBook) {
        console.log(`[SEARCH ERROR] No book found with ISBN: "${searchISBN}" in library database.\n`);
        return null;
    }

    console.log(`[FOUND] Book identified: "${targetBook.title}"`);
    targetBook.issueBook();
    console.log();
    return targetBook;
}

console.log("------------------------------------------------------------------------------");
console.log("STEP 3: ISSUING BOOKS BY SEARCHING ISBN");
console.log("------------------------------------------------------------------------------\n");

// Test 1: Issue an available book (Clean Code)
issueBookByISBN(libraryBooks, "978-0132350884");

// Test 2: Attempt to issue an already issued book (The Pragmatic Programmer)
issueBookByISBN(libraryBooks, "978-0135957059");

// Test 3: Attempt to issue with a non-existent ISBN
issueBookByISBN(libraryBooks, "978-0000000000");

// ==============================================================================
// STEP 4: Return a Book and Re-Check Available Books
// ==============================================================================
console.log("------------------------------------------------------------------------------");
console.log("STEP 4: RETURNING A BOOK & RE-CHECKING INVENTORY");
console.log("------------------------------------------------------------------------------\n");

// Return "You Don't Know JS Yet"
const ydkjs = libraryBooks.find(b => b.ISBN === "978-1091210424");
if (ydkjs) {
    ydkjs.returnBook();
}
console.log();

// Display updated available books list
displayAvailableBooks(libraryBooks);
