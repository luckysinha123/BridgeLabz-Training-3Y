"use strict";

/**
 * ==============================================================================
 * ASSIGNMENT 8 - QUESTION 8: Movie Ticket Booking System (Prototype Chain)
 * ==============================================================================
 * 
 * Problem Statement:
 * Create a class MovieTicket with properties:
 * ● movieName
 * ● seatNo
 * ● price
 * 
 * Then create a class OnlineTicket that inherits and adds:
 * ● convenienceFee
 * ● method getTotalAmount()
 * 
 * Additionally:
 * ● Add a method to MovieTicket.prototype called printTicket()
 * ● Call it using OnlineTicket objects (demonstrate prototype chain working)
 * 
 * Concepts Demonstrated:
 * - ES6 Class Inheritance (extends, super)
 * - Prototype Augmentation on Base Class (`MovieTicket.prototype.printTicket`)
 * - Prototypal Delegation & Upward Lookup: OnlineTicket instance resolves
 *   `printTicket()` through its prototype link to `MovieTicket.prototype`.
 * ==============================================================================
 */

console.log("==============================================================================");
console.log("  ASSIGNMENT 8 - Q8: MOVIE TICKET BOOKING SYSTEM (Prototype Chain)            ");
console.log("==============================================================================\n");

// ==============================================================================
// STEP 1: Base Class MovieTicket
// ==============================================================================
/**
 * Base Class: MovieTicket
 */
class MovieTicket {
    /**
     * @param {string} movieName - Name of the film
     * @param {string} seatNo - Allocated seat number (e.g. "F12")
     * @param {number} price - Base ticket price
     */
    constructor(movieName, seatNo, price) {
        if (!movieName || !seatNo || price == null) {
            throw new Error("movieName, seatNo, and price are required.");
        }
        this.movieName = movieName;
        this.seatNo = seatNo;
        this.price = Number(price);
    }
}

// ==============================================================================
// STEP 2: Derived Class OnlineTicket (Inherits MovieTicket)
// ==============================================================================
/**
 * Derived Class: OnlineTicket
 */
class OnlineTicket extends MovieTicket {
    /**
     * @param {string} movieName - Film title
     * @param {string} seatNo - Seat ID
     * @param {number} price - Base price
     * @param {number} [convenienceFee=35] - Digital booking surcharge
     */
    constructor(movieName, seatNo, price, convenienceFee = 35) {
        // Invoke super-constructor to initialize parent properties
        super(movieName, seatNo, price);
        this.convenienceFee = Number(convenienceFee);
    }

    /**
     * Calculates total amount payable (base price + convenience fee).
     * @returns {number}
     */
    getTotalAmount() {
        return this.price + this.convenienceFee;
    }
}

// ==============================================================================
// STEP 3: Add method printTicket() to MovieTicket.prototype
// ==============================================================================
/**
 * Prototype method added to MovieTicket.prototype.
 * Accessible by MovieTicket instances AND all derived OnlineTicket instances!
 */
MovieTicket.prototype.printTicket = function() {
    const isOnline = typeof this.getTotalAmount === "function";
    const totalPayable = isOnline ? this.getTotalAmount() : this.price;

    console.log(`
┌─────────────────────────────────────────────────────────────┐
│                    CINEMA ADMISSION TICKET                  │
├─────────────────────────────────────────────────────────────┤
│  Movie Title      : ${this.movieName.padEnd(39)} │
│  Seat Allocation  : ${this.seatNo.padEnd(39)} │
│  Base Price       : ₹${String(this.price.toFixed(2)).padEnd(38)} │${isOnline ? `\n│  Convenience Fee  : ₹${String(this.convenienceFee.toFixed(2)).padEnd(38)} │` : ""}
│  Total Amount     : ₹${String(totalPayable.toFixed(2)).padEnd(38)} │
│  Ticket Type      : ${(isOnline ? "Online Booking (Web/App)" : "Box Office Counter").padEnd(39)} │
└─────────────────────────────────────────────────────────────┘`);
};

// ==============================================================================
// STEP 4: Instantiate OnlineTicket and Demonstrate Prototype Chain Working
// ==============================================================================
console.log("------------------------------------------------------------------------------");
console.log("CREATING ONLINE TICKET OBJECTS & CALLING printTicket()");
console.log("------------------------------------------------------------------------------\n");

const onlineTicket1 = new OnlineTicket("Interstellar: IMAX 70mm", "H-14", 450, 45);
const onlineTicket2 = new OnlineTicket("Dune: Part Two", "E-08", 380, 40);

console.log("Invoking onlineTicket1.printTicket():");
onlineTicket1.printTicket();

console.log("Invoking onlineTicket2.printTicket():");
onlineTicket2.printTicket();

// ==============================================================================
// STEP 5: DETAILED PROOF OF PROTOTYPE CHAIN LOOKUP
// ==============================================================================
console.log("------------------------------------------------------------------------------");
console.log("VERIFYING THE PROTOTYPE CHAIN ARCHITECTURE");
console.log("------------------------------------------------------------------------------\n");

console.log("1. Checking method existence on instance vs prototype:");
console.log("  onlineTicket1.hasOwnProperty('printTicket') :", onlineTicket1.hasOwnProperty("printTicket"), "(NOT on instance!)");
console.log("  OnlineTicket.prototype.hasOwnProperty('printTicket') :", OnlineTicket.prototype.hasOwnProperty("printTicket"), "(NOT on OnlineTicket.prototype!)");
console.log("  MovieTicket.prototype.hasOwnProperty('printTicket')  :", MovieTicket.prototype.hasOwnProperty("printTicket"), "(FOUND ON MovieTicket.prototype! ✔)");
console.log();

console.log("2. Prototype Chain Traversal:");
const proto1 = Object.getPrototypeOf(onlineTicket1);
const proto2 = Object.getPrototypeOf(proto1);
const proto3 = Object.getPrototypeOf(proto2);

console.log("  onlineTicket1.__proto__ === OnlineTicket.prototype :", proto1 === OnlineTicket.prototype);
console.log("  OnlineTicket.prototype.__proto__ === MovieTicket.prototype :", proto2 === MovieTicket.prototype);
console.log("  MovieTicket.prototype.__proto__ === Object.prototype      :", proto3 === Object.prototype);
console.log();

console.log("3. 'instanceof' Verification:");
console.log("  onlineTicket1 instanceof OnlineTicket :", onlineTicket1 instanceof OnlineTicket);
console.log("  onlineTicket1 instanceof MovieTicket  :", onlineTicket1 instanceof MovieTicket);
console.log("  onlineTicket1 instanceof Object       :", onlineTicket1 instanceof Object);
console.log("------------------------------------------------------------------------------\n");
