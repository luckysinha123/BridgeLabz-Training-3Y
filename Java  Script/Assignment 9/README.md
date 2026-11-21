# ASSIGNMENT 9 - JQUERY WEB APPLICATIONS SUITE
## BridgeLabz Training - 3rd Year Full Stack Curriculum

---

### Overview
This folder contains the complete, verified solutions for **Assignment 9**, focusing on **jQuery DOM Manipulation, Event Handling, Effects, Traversing, Multi-Version Isolation with `noConflict()`, and Real-World UI Widgets**.

Every question has its own dedicated, standalone **HTML** and **JavaScript** file pair, adhering to semantic HTML5 standards, responsive styling, and thorough inline code comments. An overarching [`index.html`](./index.html) portal provides seamless navigation across all 10 applications.

---

### File Index & Question Mapping

| Question | HTML File | JS File | Key jQuery APIs & Concepts |
| :--- | :--- | :--- | :--- |
| **Q1: Welcome Page Greeting** | [`q1_welcome_page.html`](./q1_welcome_page.html) | [`q1_welcome_page.js`](./q1_welcome_page.js) | `.text()`, `.fadeOut()`, `.fadeIn()`, `.slideToggle()`, Time-of-day logic, Alert trigger |
| **Q2: Product Highlight** | [`q2_product_highlight.html`](./q2_product_highlight.html) | [`q2_product_highlight.js`](./q2_product_highlight.js) | `.hover()`, `.toggleClass()`, Attribute selectors `[data-discount]`, `.data("stock")` |
| **Q3: Interactive FAQ** | [`q3_interactive_faq.html`](./q3_interactive_faq.html) | [`q3_interactive_faq.js`](./q3_interactive_faq.js) | `.slideToggle()`, `.dblclick()`, `.closest()`, `.addClass()`, Focus/Blur event handling |
| **Q4: Special Offer Banner** | [`q4_special_offer_banner.html`](./q4_special_offer_banner.html) | [`q4_special_offer_banner.js`](./q4_special_offer_banner.js) | `.show()`, `.hide()`, `.slideToggle()`, `.fadeToggle()`, 5s automated rotation via `setInterval` |
| **Q5: Team Members Directory** | [`q5_team_directory.html`](./q5_team_directory.html) | [`q5_team_directory.js`](./q5_team_directory.js) | `.next()`, `.children()`, `.siblings()`, `.parent()`, `.find()`, DOM hierarchy traversal |
| **Q6: Event Subscription Panel** | [`q6_event_subscription.html`](./q6_event_subscription.html) | [`q6_event_subscription.js`](./q6_event_subscription.js) | Dynamic event binding via `.on()`, event detachment via `.off()`, DOM element creation & removal |
| **Q7: Search Courses** | [`q7_search_courses.html`](./q7_search_courses.html) | [`q7_search_courses.js`](./q7_search_courses.js) | Real-time filtering via `.keyup()`, `.css()` border/color highlights, dynamic match counter |
| **Q8: Dynamic Blog Posts** | [`q8_dynamic_blog_posts.html`](./q8_dynamic_blog_posts.html) | [`q8_dynamic_blog_posts.js`](./q8_dynamic_blog_posts.js) | `.append()`, `.prepend()`, `.remove()`, `.before()`, `.after()`, `:contains()` keyword selector |
| **Q9: Multi-JQuery Widgets** | [`q9_multi_jquery_widgets.html`](./q9_multi_jquery_widgets.html) | [`q9_multi_jquery_widgets.js`](./q9_multi_jquery_widgets.js) | `jQuery.noConflict(true)`: jQuery 3.7.1 ($jqV1) runs carousel; jQuery 2.2.4 ($jqV2) runs modals & tooltips |
| **Q10: Registration Form Validation** | [`q10_registration_validation.html`](./q10_registration_validation.html) | [`q10_registration_validation.js`](./q10_registration_validation.js) | Form `.submit()`, `event.preventDefault()`, `.css()` red/green borders, email uniqueness verification |
| **Navigation Portal** | [`index.html`](./index.html) | — | Unified dashboard card hub linking to all 10 question applications |

---

### Detailed Question Summaries

#### Q1 – Welcome Page Greeting
- Greets the visitor on page load based on current local hour (Morning, Afternoon, Evening).
- Clicking "Change Greeting" cycles through an array of motivational quotes with smooth fade transitions.
- "Toggle Welcome Message" collapses and expands detailed announcements using `.slideToggle()`.
- Clicking the greeting card triggers an interactive alert.

#### Q2 – Product Highlight (5 Products)
- Clicking a product card toggles the `.highlighted` state.
- Hovering reveals additional specification details using `.hover()` and `.slideDown()`.
- Clicking the heart icon toggles favorite selection without bubbling to the card.
- Applies unique styling to discounted items via the `[data-discount="true"]` attribute selector.
- Triggers a warning alert when clicking any out-of-stock item (`data-stock="0"`).

#### Q3 – Interactive FAQ (5 Questions)
- Accordion interaction: clicking questions toggles answer blocks using `.slideToggle()`.
- Hovering smoothly highlights question titles.
- Double-clicking any question automatically collapses all open answers.
- Focusing on feedback input fields highlights the parent question container via `.closest()`; blurring resets styling.

#### Q4 – Special Offer Banner (5 Banners)
- Supports manual control via Hide, Show, Slide Up/Down, and Fade In/Fade Out buttons.
- Features an automatic banner rotation cycle transitioning every 5 seconds using `.fadeOut()` and `.fadeIn()`.
- Includes an active rotation pause/resume toggle button.

#### Q5 – Team Members Directory
- Click a manager $\rightarrow$ highlights all direct reports using `.siblings(`.report-item[data-team="..."]`)`.
- Hovering on employee names reveals their contact information via `.next(".contact-info")`.
- Clicking the department title changes the background of all team members using `.children("li")`.
- Clicking an individual employee highlights peer coworkers using `.siblings()`.
- Collapsing/expanding teams uses `.parent()` and `.find()`.

#### Q6 – Event Subscription Panel (5+ Topics)
- Subscribe/Unsubscribe toggles notification badges and button states.
- Dynamically add new subscription topics to the DOM and automatically attach `.on("click")` handlers.
- Removing a topic uses `.off("click")` to cleanly detach handlers before removing from the DOM.
- Inserts animated notification alert banners dynamically into the page.

#### Q7 – Search Courses (6 Courses)
- Real-time filtering responds to keystrokes using `.keyup()`.
- Matching cards are styled dynamically using `.css()`.
- Non-matching cards are hidden.
- Shows dynamic match counts (e.g. `Showing 4 of 6 courses`) and displays a message when no results match.
- "Clear" button resets all cards and restores the full catalog.

#### Q8 – Dynamic Blog Posts (5+ Posts)
- "Add New Post" appends a post to the bottom using `.append()`.
- "Prepend Featured Post" pins an announcement to the top using `.prepend()`.
- "Remove Last Post" deletes the last item using `.children().last().remove()`.
- "Add Tags" injects category labels before titles using `.before()` and tags after paragraphs using `.after()`.
- Highlight search queries dynamically using the `:contains()` selector.

#### Q9 – Multi-JQuery Widgets via `noConflict()`
- Loads two distinct jQuery versions simultaneously:
  - **Version 1 (`jQuery 3.7.1`)**: Assigned to `$jqV1`, manages carousel rotation and active widget highlighting.
  - **Version 2 (`jQuery 2.2.4`)**: Assigned to `$jqV2`, manages notification modals and hover tooltips.
- Proves zero variable collision using `jQuery.noConflict(true)`.

#### Q10 – Registration Form Validation
- Client-side validation enforcing non-empty names, valid email syntax, email uniqueness (checked against pre-existing database), and password minimum length (8 chars).
- Applies red borders via `.css()` on errors, clearing live on correction.
- Displays an animated success message when all fields pass validation.

---

### How to Run

1. Open [`index.html`](file:///d:/College%20#3rd%20year/Full%20Stack/BridgeLabz-Training-3Y/Java%20%20Script/Assignment%209/index.html) in any modern web browser to navigate and test all 10 applications.
2. Individual questions can also be launched directly by opening any `qX_*.html` file.
