"use strict";

/**
 * ==============================================================================
 * ASSIGNMENT 4 - QUESTION 5: Movie Ticket Booking (Objects + RegExp)
 * ==============================================================================
 * 
 * Problem Statement:
 * Build a movie ticket booking form for an app.
 * Validate user input:
 * ● Name (alphabets only)
 * ● Email (proper format)
 * ● Seats (1 to 10 only)
 * 
 * After successful validation, store booking info in an object { name, email, seats }
 * and display the ticket details.
 * 
 * Concepts Demonstrated:
 * - Regular Expression Validation for string and numeric bounds
 * - Object Creation & Data Modeling for Ticket Bookings
 * - Calculation of Bill / Seat Totals
 * - Formatted Ticket Receipt Generation
 * ==============================================================================
 */

// ==============================================================================
// REGEX SPECIFICATION FOR TICKET BOOKING
// ==============================================================================
const MOVIE_REGEX = {
    // Alphabetic characters and spaces only, min 2 characters
    NAME: /^[A-Za-z\s]{2,50}$/,

    // Standard valid email address format
    EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,

    // Seats: Integer strictly from 1 to 10
    SEATS: /^(?:[1-9]|10)$/
};

const TICKET_PRICE_PER_SEAT = 250; // INR

/**
 * Validates movie booking input parameters.
 * 
 * @param {string} name - Customer name
 * @param {string} email - Customer email
 * @param {number|string} seats - Number of seats requested
 * @returns {{ isValid: boolean, errors: Object }}
 */
function validateBookingInput(name, email, seats) {
    const errors = {};
    const trimmedName = typeof name === "string" ? name.trim() : "";
    const trimmedEmail = typeof email === "string" ? email.trim() : "";
    const stringSeats = String(seats).trim();

    if (!trimmedName || !MOVIE_REGEX.NAME.test(trimmedName)) {
        errors.name = "Name must contain alphabets only (at least 2 letters).";
    }

    if (!trimmedEmail || !MOVIE_REGEX.EMAIL.test(trimmedEmail)) {
        errors.email = "Please enter a valid email address (e.g., user@domain.com).";
    }

    if (!stringSeats || !MOVIE_REGEX.SEATS.test(stringSeats)) {
        errors.seats = "Seats must be a whole number between 1 and 10 only.";
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
}

/**
 * Creates and stores a ticket booking object if validation passes.
 * 
 * @param {string} name - Customer Name
 * @param {string} email - Customer Email
 * @param {number|string} seats - Number of seats
 * @param {string} [movieTitle="Interstellar: IMAX Special"] - Movie Title
 * @returns {Object|null} The booking info object or null on failure.
 */
function bookMovieTicket(name, email, seats, movieTitle = "Inception (Re-Release)") {
    const validation = validateBookingInput(name, email, seats);

    if (!validation.isValid) {
        console.log(`[BOOKING FAILED] Validation errors encountered for customer: "${name}":`);
        for (const [key, msg] of Object.entries(validation.errors)) {
            console.log(`  ✖ ${key}: ${msg}`);
        }
        return null;
    }

    const numSeats = parseInt(seats, 10);
    const totalAmount = numSeats * TICKET_PRICE_PER_SEAT;
    const bookingId = "TCK-" + Math.floor(100000 + Math.random() * 900000);

    // Storing booking info in an object as required: { name, email, seats } + metadata
    const bookingInfo = {
        bookingId,
        movieTitle,
        name: name.trim(),
        email: email.trim(),
        seats: numSeats,
        pricePerSeat: TICKET_PRICE_PER_SEAT,
        totalAmount,
        bookingTimestamp: new Date().toLocaleString()
    };

    return bookingInfo;
}

/**
 * Prints a formatted ticket receipt in the console.
 * @param {Object} ticket - Booking info object
 */
function displayTicketDetails(ticket) {
    if (!ticket) return;

    console.log(`
╔══════════════════════════════════════════════════════════════════╗
║                    CINEMA TICKET CONFIRMATION                    ║
╠══════════════════════════════════════════════════════════════════╣
║  Booking ID     : ${ticket.bookingId.padEnd(46)} ║
║  Movie Title    : ${ticket.movieTitle.padEnd(46)} ║
║  Customer Name  : ${ticket.name.padEnd(46)} ║
║  Customer Email : ${ticket.email.padEnd(46)} ║
║  Seats Booked   : ${String(ticket.seats).padEnd(46)} ║
║  Price Per Seat : ₹${String(ticket.pricePerSeat.toFixed(2)).padEnd(45)} ║
║  Total Payable  : ₹${String(ticket.totalAmount.toFixed(2)).padEnd(45)} ║
║  Booking Date   : ${ticket.bookingTimestamp.padEnd(46)} ║
║  Status         : CONFIRMED ✔                                    ║
╚══════════════════════════════════════════════════════════════════╝
`);
}

// ==============================================================================
// BROWSER DOM ATTACHMENT
// ==============================================================================
if (typeof document !== "undefined") {
    document.addEventListener("DOMContentLoaded", () => {
        const movieForm = document.getElementById("movieBookingForm");
        if (!movieForm) return;

        movieForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = document.getElementById("movieCustomerName").value;
            const email = document.getElementById("movieCustomerEmail").value;
            const seats = document.getElementById("movieSeats").value;
            const movie = document.getElementById("movieSelect") ? document.getElementById("movieSelect").value : "Avatar: Way of Water";

            const ticket = bookMovieTicket(name, email, seats, movie);
            const receiptContainer = document.getElementById("ticketReceipt");

            if (ticket) {
                receiptContainer.innerHTML = `
                <div style="background: #e8f5e9; border: 2px solid #4caf50; border-radius: 8px; padding: 20px; margin-top: 15px;">
                    <h3 style="margin-top:0; color: #2e7d32;">🎉 Ticket Confirmed! (ID: ${ticket.bookingId})</h3>
                    <p><strong>Movie:</strong> ${ticket.movieTitle}</p>
                    <p><strong>Name:</strong> ${ticket.name}</p>
                    <p><strong>Email:</strong> ${ticket.email}</p>
                    <p><strong>Seats Booked:</strong> ${ticket.seats}</p>
                    <p><strong>Total Amount:</strong> ₹${ticket.totalAmount.toFixed(2)}</p>
                    <small>Booked on: ${ticket.bookingTimestamp}</small>
                </div>`;
            } else {
                const validation = validateBookingInput(name, email, seats);
                const errorList = Object.values(validation.errors).map(err => `<li>${err}</li>`).join("");
                receiptContainer.innerHTML = `
                <div style="background: #ffebee; border: 2px solid #f44336; border-radius: 8px; padding: 15px; margin-top: 15px; color: #c62828;">
                    <strong>❌ Booking Failed:</strong>
                    <ul style="margin: 8px 0 0; padding-left: 20px;">${errorList}</ul>
                </div>`;
            }
        });
    });
}

// ==============================================================================
// NODE.JS TEST SUITE
// ==============================================================================
if (typeof module !== "undefined" && typeof window === "undefined") {
    console.log("==============================================================================");
    console.log("          ASSIGNMENT 4 - Q5: MOVIE TICKET BOOKING (TEST SUITE)                ");
    console.log("==============================================================================\n");

    // Test 1: Valid Booking
    console.log(">>> TEST 1: Valid Booking Request (3 Seats)");
    const ticket1 = bookMovieTicket("Lucky Sinha", "lucky.sinha@example.com", 3, "Oppenheimer");
    displayTicketDetails(ticket1);

    // Test 2: Valid Booking (Boundary condition: 10 Seats)
    console.log(">>> TEST 2: Valid Booking Request (10 Seats - Maximum allowed)");
    const ticket2 = bookMovieTicket("Aditi Sharma", "aditi@cinema.com", 10, "Dune: Part Two");
    displayTicketDetails(ticket2);

    // Test 3: Invalid Seats (Exceeds maximum: 12)
    console.log(">>> TEST 3: Invalid Seats (12 seats requested)");
    const ticket3 = bookMovieTicket("Vikram Patel", "vikram@mail.com", 12);
    console.log();

    // Test 4: Invalid Name (Contains numeric digits)
    console.log(">>> TEST 4: Invalid Name ('User123')");
    const ticket4 = bookMovieTicket("User123", "user@mail.com", 2);
    console.log();

    // Test 5: Invalid Email
    console.log(">>> TEST 5: Invalid Email format ('not-an-email')");
    const ticket5 = bookMovieTicket("Rohan Verma", "not-an-email", 4);
    console.log();

    console.log("==============================================================================\n");
}
