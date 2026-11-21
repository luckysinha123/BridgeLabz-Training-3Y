"use strict";

/**
 * ==============================================================================
 * ASSIGNMENT 8 - QUESTION 5: Ride-Sharing Application (Classes + Error Handling)
 * ==============================================================================
 * 
 * Problem Statement:
 * Create classes:
 * ● User → name, rating
 * ● Driver → inherits from User, vehicle details
 * ● Trip → fromLocation, toLocation, distance
 * 
 * Scenario:
 * ● Write a calculateFare() method inside Trip using distance.
 * ● Throw an error if distance is negative or not provided.
 * ● Use try/catch to handle the error and show a proper message.
 * 
 * Concepts Demonstrated:
 * - OOP Class Inheritance (User -> Driver)
 * - Association / Composition (Trip uses distance and fare configuration)
 * - Strict Input Validation & Throwing Errors
 * - Graceful Exception Handling using try...catch
 * ==============================================================================
 */

console.log("==============================================================================");
console.log("    ASSIGNMENT 8 - Q5: RIDE-SHARING APPLICATION (Fare Calculation)            ");
console.log("==============================================================================\n");

/**
 * Base Class: User
 */
class User {
    /**
     * @param {string} name - User's name
     * @param {number} rating - Rating between 1.0 and 5.0
     */
    constructor(name, rating = 5.0) {
        if (!name || typeof name !== "string") {
            throw new Error("User name is required.");
        }
        this.name = name;
        this.rating = Math.min(5.0, Math.max(1.0, rating));
    }

    getProfile() {
        return `${this.name} (Rating: ${this.rating} ★)`;
    }
}

/**
 * Derived Class: Driver (inherits from User)
 */
class Driver extends User {
    /**
     * @param {string} name - Driver's name
     * @param {number} rating - Driver's rating
     * @param {Object} vehicleDetails - { model, licensePlate, type }
     */
    constructor(name, rating, vehicleDetails) {
        super(name, rating);
        if (!vehicleDetails || !vehicleDetails.licensePlate) {
            throw new Error("Driver vehicle details with license plate are required.");
        }
        this.vehicleDetails = vehicleDetails;
    }

    getDriverDetails() {
        return `Driver: ${this.name} (★ ${this.rating}) | Vehicle: ${this.vehicleDetails.model} [${this.vehicleDetails.licensePlate}]`;
    }
}

/**
 * Class representing a Ride Trip
 */
class Trip {
    // Fare Constants
    static BASE_FARE = 50;       // Base pickup charge (INR)
    static RATE_PER_KM = 14;     // Per-km rate (INR)
    static MINIMUM_FARE = 70;    // Minimum ride charge

    /**
     * @param {string} fromLocation - Pickup point
     * @param {string} toLocation - Dropoff point
     * @param {number} distance - Distance in kilometers
     * @param {Driver} [driver=null] - Assigned driver
     * @param {User} [user=null] - Requesting passenger
     */
    constructor(fromLocation, toLocation, distance, driver = null, user = null) {
        this.fromLocation = fromLocation;
        this.toLocation = toLocation;
        this.distance = distance;
        this.driver = driver;
        this.user = user;
    }

    /**
     * Calculates the fare for the trip based on distance.
     * 
     * Requirements:
     * - Throw an error if distance is negative or not provided.
     * 
     * @returns {number} Final calculated fare in INR
     * @throws {Error} If distance is missing, non-numeric, or negative.
     */
    calculateFare() {
        // Validation 1: Check if distance is provided
        if (this.distance == null || this.distance === "") {
            throw new Error("Trip Distance Missing: Distance was not provided.");
        }

        // Validation 2: Check if distance is a valid number
        if (typeof this.distance !== "number" || isNaN(this.distance)) {
            throw new TypeError(`Invalid Distance Type: Expected numeric kilometers, received '${this.distance}'.`);
        }

        // Validation 3: Check if distance is negative or zero
        if (this.distance < 0) {
            throw new RangeError(`Negative Distance Error: Distance cannot be negative (${this.distance} km).`);
        }

        if (this.distance === 0) {
            throw new RangeError("Distance Error: Pickup and drop-off cannot be 0 km.");
        }

        // Fare Computation Formula: Base Fare + (Distance * Rate per KM)
        const computedFare = Trip.BASE_FARE + (this.distance * Trip.RATE_PER_KM);
        const finalFare = Math.max(Trip.MINIMUM_FARE, computedFare);

        return Math.round(finalFare * 100) / 100;
    }

    /**
     * Formatted trip receipt
     */
    getReceipt() {
        const fare = this.calculateFare();
        return `Trip: "${this.fromLocation}" -> "${this.toLocation}" (${this.distance} km) | Total Fare: ₹${fare.toFixed(2)}`;
    }
}

// ==============================================================================
// HELPER WRAPPER: PROCESS TRIP WITH try...catch
// ==============================================================================
function bookAndCalculateTrip(tripLabel, from, to, distance, driver, user) {
    console.log("------------------------------------------------------------------------------");
    console.log(`>>> ${tripLabel}`);
    console.log(`    Route: "${from}" to "${to}" | Distance: ${distance}`);
    console.log("------------------------------------------------------------------------------");

    try {
        const trip = new Trip(from, to, distance, driver, user);
        const fare = trip.calculateFare();

        console.log("✔ FARE CALCULATED SUCCESSFULLY!");
        if (trip.driver) console.log("  " + trip.driver.getDriverDetails());
        if (trip.user) console.log("  Passenger: " + trip.user.getProfile());
        console.log(`  Distance : ${trip.distance} km`);
        console.log(`  Rate     : ₹${Trip.BASE_FARE} (Base) + (${trip.distance} km × ₹${Trip.RATE_PER_KM}/km)`);
        console.log(`  TOTAL    : ₹${fare.toFixed(2)}\n`);
    } catch (error) {
        // Handling error gracefully with a proper message as requested
        console.error("❌ FARE CALCULATION ERROR CAUGHT VIA try...catch:");
        console.error(`  Error Type : ${error.name}`);
        console.error(`  Message    : ${error.message}`);
        console.error("  Resolution : Please check your GPS coordinates and re-enter a valid positive distance.\n");
    }
}

// ==============================================================================
// TEST SCENARIOS
// ==============================================================================

const testDriver = new Driver("Rajesh Kumar", 4.9, { model: "Hyundai i20", licensePlate: "MH-02-CB-1234" });
const testPassenger = new User("Lucky Sinha", 4.85);

// Scenario 1: Valid Trip (Normal Distance)
bookAndCalculateTrip("Scenario 1: Standard Airport Ride (15.5 km)", "HSR Layout", "Kempegowda Int'l Airport", 15.5, testDriver, testPassenger);

// Scenario 2: Valid Short Trip (Minimum Fare Check)
bookAndCalculateTrip("Scenario 2: Short Neighborhood Ride (1.2 km)", "Indiranagar 100ft Rd", "Metro Station", 1.2, testDriver, testPassenger);

// Scenario 3: Negative Distance (Throws RangeError)
bookAndCalculateTrip("Scenario 3: Negative Distance Error (-10 km)", "MG Road", "Whitefield", -10, testDriver, testPassenger);

// Scenario 4: Distance Not Provided (undefined)
bookAndCalculateTrip("Scenario 4: Missing Distance Parameter (undefined)", "Bandra", "Andheri", undefined, testDriver, testPassenger);

// Scenario 5: Non-numeric String Distance
bookAndCalculateTrip("Scenario 5: Non-Numeric String Distance ('fifteen')", "Koramangala", "Bellandur", "fifteen", testDriver, testPassenger);
