/**
 * ==============================================================================
 * FULL STACK WEB DEVELOPMENT - ASSIGNMENT 2 (CONSOLIDATED MASTER SCRIPT)
 * ==============================================================================
 * Environment : Node.js / Browser Console
 * Description : Solutions for Questions 1 to 10 with comprehensive logic,
 *               clean variable scoping, meaningful identifiers, zero external
 *               libraries, modular block execution, and clear formatted output.
 * ==============================================================================
 */

console.log("==============================================================================");
console.log("                   FULL STACK JAVASCRIPT - ASSIGNMENT 2                       ");
console.log("==============================================================================\n");

// ==============================================================================
// QUESTION 1: SCOPE CONFLICT RESOLVER
// ==============================================================================
/**
 * Requirements:
 * - Declare a global variable bonus = 5000.
 * - Inside a function calculateSalary(), declare a local variable salary = 40000.
 * - Add the bonus only if a local variable isPermanent (boolean) is true.
 * - Print total salary inside the function.
 * - Demonstrate how changing isPermanent affects the global variable scope.
 */
{
    console.log("==============================================================================");
    console.log("QUESTION 1: SCOPE CONFLICT RESOLVER");
    console.log("==============================================================================");

    // Global variable accessible across scopes
    let bonus = 5000;
    console.log(`[Global Scope] Initialized global bonus: ₹${bonus}`);

    function calculateSalary(isPermanentStatus) {
        // Local variables inside function scope
        let salary = 40000;
        let isPermanent = Boolean(isPermanentStatus);
        let totalSalary = salary;

        // Add bonus only if employee is permanent
        if (isPermanent) {
            totalSalary += bonus; // Reads global variable via scope chain
        }

        console.log(`[Inside calculateSalary()] isPermanent: ${isPermanent} | Salary: ₹${salary} | Bonus: ₹${isPermanent ? bonus : 0} | Total: ₹${totalSalary}`);
        return totalSalary;
    }

    console.log("Testing Permanent Employee:");
    calculateSalary(true);

    console.log("Testing Contractual/Probationary Employee:");
    calculateSalary(false);

    // Demonstration of scope containment
    console.log("\nScope Boundary Verification:");
    console.log(`- Global bonus is still: ₹${bonus}`);
    console.log(`- Local 'salary' accessible globally? ${typeof salary !== "undefined"}`);
    console.log(`- Local 'isPermanent' accessible globally? ${typeof isPermanent !== "undefined"}`);
    console.log("==============================================================================\n");
}

// ==============================================================================
// QUESTION 2: STRING MANIPULATION REPORT
// ==============================================================================
/**
 * Requirements:
 * - Store a product name like " wireless headphones PRO ".
 * - Trim extra spaces, convert to lowercase, then capitalize the first letter of each word.
 * - Replace "pro" with "Pro Edition".
 * - Display the cleaned title and its length.
 * - Use methods: trim(), split(), map(), join(), replace(), and length.
 */
{
    console.log("==============================================================================");
    console.log("QUESTION 2: STRING MANIPULATION REPORT");
    console.log("==============================================================================");

    const rawProductName = "   wireless headphones PRO   ";
    console.log(`Original String       : "${rawProductName}" (Length: ${rawProductName.length})`);

    // 1. trim()
    const trimmedTitle = rawProductName.trim();

    // 2. toLowerCase()
    const lowerCasedTitle = trimmedTitle.toLowerCase();

    // 3. split()
    const wordsArray = lowerCasedTitle.split(" ");

    // 4. map() to capitalize first letter of each word
    const capitalizedWords = wordsArray.map(word => {
        if (!word) return "";
        return word.charAt(0).toUpperCase() + word.slice(1);
    });

    // 5. join()
    const titleCased = capitalizedWords.join(" ");

    // 6. replace() "Pro" with "Pro Edition"
    const cleanedTitle = titleCased.replace("Pro", "Pro Edition");

    // 7. length
    const finalLength = cleanedTitle.length;

    console.log(`Cleaned Product Title : "${cleanedTitle}"`);
    console.log(`Cleaned Title Length  : ${finalLength} characters`);
    console.log("==============================================================================\n");
}

// ==============================================================================
// QUESTION 3: MATH UTILITY DASHBOARD
// ==============================================================================
/**
 * Requirements:
 * - Take a number x = 16.75.
 * - Display:
 *   - Rounded value (Math.round)
 *   - Square root (Math.sqrt)
 *   - Power (Math.pow(x, 3))
 *   - Random number between 10-50 (Math.floor(Math.random() * 41) + 10)
 * - Use template literals to show a formatted result summary.
 */
{
    console.log("==============================================================================");
    console.log("QUESTION 3: MATH UTILITY DASHBOARD");
    console.log("==============================================================================");

    const x = 16.75;
    const rounded = Math.round(x);
    const sqrtValue = Math.sqrt(x);
    const powerValue = Math.pow(x, 3);
    const randomNum = Math.floor(Math.random() * 41) + 10;

    const mathSummary = `
+-----------------------------------------------------------+
|               SCIENTIFIC MATH DASHBOARD                   |
+-----------------------------------------------------------+
| Input Variable (x)             : ${x}
| 1. Rounded (Math.round)        : ${rounded}
| 2. Square Root (Math.sqrt)     : ${sqrtValue.toFixed(4)}
| 3. Power x^3 (Math.pow)        : ${powerValue.toFixed(2)}
| 4. Random Int 10-50 (Formula)  : ${randomNum}
+-----------------------------------------------------------+`;

    console.log(mathSummary);
    console.log("==============================================================================\n");
}

// ==============================================================================
// QUESTION 4: ARRAY PERFORMANCE ANALYZER
// ==============================================================================
/**
 * Requirements:
 * - Create an array of 8 random scores between 30 and 100.
 * - Calculate:
 *   - Highest and lowest score (Math.max(...arr), Math.min(...arr))
 *   - Average score
 *   - Number of students who passed (>= 50)
 * - Use array methods like map(), filter(), and reduce().
 * - Display a full summary in a formatted output.
 */
{
    console.log("==============================================================================");
    console.log("QUESTION 4: ARRAY PERFORMANCE ANALYZER");
    console.log("==============================================================================");

    // 8 random scores between 30 and 100
    const scores = Array.from({ length: 8 }, () => Math.floor(Math.random() * 71) + 30);
    console.log(`Generated Scores Array : [${scores.join(", ")}]`);

    // map() to identify pass/fail tag
    const studentProfiles = scores.map((score, i) => ({
        Student: `S${i + 1}`,
        Score: score,
        Result: score >= 50 ? "Pass" : "Fail"
    }));

    // Math.max & Math.min
    const highest = Math.max(...scores);
    const lowest = Math.min(...scores);

    // reduce() for average
    const totalScore = scores.reduce((sum, score) => sum + score, 0);
    const averageScore = totalScore / scores.length;

    // filter() for passing students
    const passedStudents = scores.filter(score => score >= 50);

    console.table(studentProfiles);
    console.log(`Highest Score          : ${highest}`);
    console.log(`Lowest Score           : ${lowest}`);
    console.log(`Average Score          : ${averageScore.toFixed(2)}`);
    console.log(`Students Passed (>=50) : ${passedStudents.length} of ${scores.length}`);
    console.log("==============================================================================\n");
}

// ==============================================================================
// QUESTION 5: BOOLEAN LOGIC ACCESS SYSTEM
// ==============================================================================
/**
 * Requirements:
 * - Variables: isDoorLocked, isWindowClosed, isAlarmOn, isOwnerInside.
 * - Access is granted only if:
 *   - Alarm is on
 *   - Door and window are closed
 *   - Owner is inside
 * - Use Boolean logic (&&, ||, !) to print "Secure" or "Unsafe".
 * - Change values and test multiple outcomes.
 */
{
    console.log("==============================================================================");
    console.log("QUESTION 5: BOOLEAN LOGIC ACCESS SYSTEM");
    console.log("==============================================================================");

    function checkSecurity(door, window, alarm, owner) {
        // Boolean logic check using &&, !, ||
        const isSecure = alarm && door && window && owner;
        const isCompromised = !alarm || !door || !window || !owner;

        const status = (isSecure && !isCompromised) ? "Secure" : "Unsafe";
        console.log(`Door: ${String(door).padEnd(5)} | Window: ${String(window).padEnd(5)} | Alarm: ${String(alarm).padEnd(5)} | Owner: ${String(owner).padEnd(5)} => [${status}]`);
        return status;
    }

    console.log("Testing Multiple Access Scenarios:");
    checkSecurity(true, true, true, true);   // Secure
    checkSecurity(false, true, true, true);  // Unsafe (Door unlocked)
    checkSecurity(true, false, true, true);  // Unsafe (Window open)
    checkSecurity(true, true, false, true);  // Unsafe (Alarm off)
    checkSecurity(true, true, true, false);  // Unsafe (Owner not inside)
    console.log("==============================================================================\n");
}

// ==============================================================================
// QUESTION 6: EVENT-BASED COUNTER SIMULATION
// ==============================================================================
/**
 * Requirements:
 * - Use variable count = 0.
 * - Create two functions: increment() and decrement().
 * - Each function modifies count and logs the current value.
 * - Simulate "click" by calling these functions manually in code.
 * - Use a nested function to show function scope of count updates.
 */
{
    console.log("==============================================================================");
    console.log("QUESTION 6: EVENT-BASED COUNTER SIMULATION");
    console.log("==============================================================================");

    let count = 0;

    function increment() {
        // Nested function demonstrating function scope of count updates
        function applyIncrement() {
            count += 1;
            return count;
        }
        const newCount = applyIncrement();
        console.log(`[Click Event: INCREMENT] Current count: ${newCount}`);
        return newCount;
    }

    function decrement() {
        // Nested function demonstrating function scope of count updates
        function applyDecrement() {
            count -= 1;
            return count;
        }
        const newCount = applyDecrement();
        console.log(`[Click Event: DECREMENT] Current count: ${newCount}`);
        return newCount;
    }

    console.log("Triggering simulated button click events:");
    increment();
    increment();
    increment();
    decrement();
    increment();
    decrement();
    console.log(`Final Counter State: ${count}`);
    console.log("==============================================================================\n");
}

// ==============================================================================
// QUESTION 7: CUSTOMER FEEDBACK PROCESSOR
// ==============================================================================
/**
 * Requirements:
 * - Store a feedback string like "Great product! Fast delivery and amazing sound quality!".
 * - Use string methods to:
 *   - Count words
 *   - Check if the feedback includes "bad" or "poor"
 *   - If not -> print "Positive Feedback"
 *   - Else -> print "Needs Improvement"
 * - Use includes(), split(), and conditional statements.
 */
{
    console.log("==============================================================================");
    console.log("QUESTION 7: CUSTOMER FEEDBACK PROCESSOR");
    console.log("==============================================================================");

    function processReview(feedback) {
        // 1. split() to count words
        const words = feedback.trim().split(/\s+/);
        const wordCount = words.length;

        // 2. includes() to inspect negative keywords
        const normalized = feedback.toLowerCase();
        const hasBad = normalized.includes("bad");
        const hasPoor = normalized.includes("poor");

        // 3. Conditional evaluation
        let result = "";
        if (!hasBad && !hasPoor) {
            result = "Positive Feedback";
        } else {
            result = "Needs Improvement";
        }

        console.log(`Review    : "${feedback}"`);
        console.log(`Word Count: ${wordCount} words`);
        console.log(`Sentiment : "${result}"\n`);
        return result;
    }

    processReview("Great product! Fast delivery and amazing sound quality!");
    processReview("The screen is poor and performance is bad.");
    console.log("==============================================================================\n");
}

// ==============================================================================
// QUESTION 8: DYNAMIC DISCOUNT EVALUATOR
// ==============================================================================
/**
 * Requirements:
 * - Use an array of objects:
 *   const cart = [
 *     { item: "Laptop", category: "electronics", price: 45000 },
 *     { item: "Shoes", category: "fashion", price: 2500 },
 *     { item: "Book", category: "education", price: 600 }
 *   ];
 * - If category = "electronics" -> 10% discount
 * - If category = "fashion" -> 5% discount
 * - If total cart value > 50000 -> apply extra 5% overall discount.
 * - Use loops, conditionals, and reduce() to calculate the final total.
 */
{
    console.log("==============================================================================");
    console.log("QUESTION 8: DYNAMIC DISCOUNT EVALUATOR");
    console.log("==============================================================================");

    const cart = [
        { item: "Laptop", category: "electronics", price: 45000 },
        { item: "Shoes", category: "fashion", price: 2500 },
        { item: "Book", category: "education", price: 600 }
    ];

    // Loop and conditionals for category discount
    const itemized = [];
    for (let i = 0; i < cart.length; i++) {
        const item = cart[i];
        let discount = 0;

        if (item.category === "electronics") {
            discount = 0.10;
        } else if (item.category === "fashion") {
            discount = 0.05;
        } else {
            discount = 0.00;
        }

        const discountedPrice = item.price * (1 - discount);
        itemized.push({
            Item: item.item,
            Category: item.category,
            Price: item.price,
            Discount: `${discount * 100}%`,
            NetPrice: discountedPrice
        });
    }

    console.table(itemized);

    // reduce() to calculate totals
    const initialSubtotal = cart.reduce((acc, curr) => acc + curr.price, 0);
    const categoryDiscountedTotal = itemized.reduce((acc, curr) => acc + curr.NetPrice, 0);

    // Extra discount conditional
    let finalPayable = categoryDiscountedTotal;
    let extraDiscount = 0;
    if (categoryDiscountedTotal > 50000) {
        extraDiscount = categoryDiscountedTotal * 0.05;
        finalPayable -= extraDiscount;
    }

    console.log(`Original Cart Subtotal  : ₹${initialSubtotal}`);
    console.log(`After Category Discount : ₹${categoryDiscountedTotal}`);
    console.log(`Extra 5% Discount (>50k): ₹${extraDiscount}`);
    console.log(`Final Payable Total     : ₹${finalPayable}`);
    console.log("==============================================================================\n");
}

// ==============================================================================
// QUESTION 9: ODD-EVEN NUMBER ANALYZER
// ==============================================================================
/**
 * Requirements:
 * - Accept numbers 1-30 in an array using a loop.
 * - For each number:
 *   - If divisible by 3 and 5 -> print "FizzBuzz"
 *   - Else if even -> print "Even"
 *   - Else -> print "Odd"
 * - Store results in a new array and display it.
 * - Use %, push(), and conditionals.
 */
{
    console.log("==============================================================================");
    console.log("QUESTION 9: ODD-EVEN NUMBER ANALYZER (1 - 30)");
    console.log("==============================================================================");

    const numbers = [];
    for (let i = 1; i <= 30; i++) {
        numbers.push(i); // Using loop and push()
    }

    const results = [];
    for (let i = 0; i < numbers.length; i++) {
        const n = numbers[i];
        let label = "";

        // Conditionals and modulo operator (%)
        if (n % 3 === 0 && n % 5 === 0) {
            label = "FizzBuzz";
        } else if (n % 2 === 0) {
            label = "Even";
        } else {
            label = "Odd";
        }

        results.push({ Number: n, Classification: label });
    }

    // Display sample results
    console.table(results.slice(0, 15)); // First 15 rows
    console.log(`... and ${results.length - 15} more records.`);
    console.log("Special FizzBuzz Numbers Identified (divisible by 3 and 5):", 
        results.filter(r => r.Classification === "FizzBuzz").map(r => r.Number)
    );
    console.log("==============================================================================\n");
}

// ==============================================================================
// QUESTION 10: DEPARTMENTAL EMPLOYEE EVALUATOR
// ==============================================================================
/**
 * Requirements:
 * - Create a nested array for departments:
 *   const departments = [
 *     ["HR", 72],
 *     ["Finance", 88],
 *     ["Tech", 95],
 *     ["Support", 63]
 *   ];
 * - Use loops and conditionals to print:
 *   - "Excellent" if score >= 90
 *   - "Good" if 75-89
 *   - "Average" if 60-74
 *   - "Needs Improvement" otherwise
 * - Use comparison operators and nested if-else conditions.
 */
{
    console.log("==============================================================================");
    console.log("QUESTION 10: DEPARTMENTAL EMPLOYEE EVALUATOR");
    console.log("==============================================================================");

    const departments = [
        ["HR", 72],
        ["Finance", 88],
        ["Tech", 95],
        ["Support", 63]
    ];

    const departmentReport = [];

    // Loop through departments
    for (let i = 0; i < departments.length; i++) {
        const deptName = departments[i][0];
        const score = departments[i][1];
        let rating = "";

        // Comparison operators and nested if-else conditions
        if (score >= 90) {
            rating = "Excellent";
        } else {
            if (score >= 75 && score <= 89) {
                rating = "Good";
            } else {
                if (score >= 60 && score <= 74) {
                    rating = "Average";
                } else {
                    rating = "Needs Improvement";
                }
            }
        }

        console.log(`Department: ${deptName.padEnd(8)} | Score: ${score} | Rating: "${rating}"`);
        departmentReport.push({ Department: deptName, Score: score, Rating: rating });
    }

    console.log("\nSummary Report Table:");
    console.table(departmentReport);
    console.log("==============================================================================\n");
}

console.log("==============================================================================");
console.log("               END OF ASSIGNMENT 2 (ALL QUESTIONS EXECUTED)                   ");
console.log("==============================================================================");
