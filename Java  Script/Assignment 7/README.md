# ASSIGNMENT 7 - JAVASCRIPT DOM MANIPULATION & ADVANCED EVENTS
## BridgeLabz Training - 3rd Year Full Stack Curriculum

---

### Overview
This folder contains the complete, verified solutions for **Assignment 7**, focusing on **Core JavaScript (ES6+), DOM Manipulation, Event Listeners, and Event Architecture**. The topics covered include **Event Delegation, Event Bubbling & `stopPropagation()`, Event Capturing Phase (`{ capture: true }`), `preventDefault()`, Attribute Manipulation (`setAttribute`), Keyboard & Mouse Event Listeners, and Multi-Step State Flow**.

All code is written purely with **HTML, CSS, and Core JavaScript (ES6+)** with zero frameworks, supporting both Node.js unit tests and a rich browser interface (`index.html`).

---

### File Index & Question Mapping

| File Name | Question | Concepts Covered |
| :--- | :--- | :--- |
| [`Q1_Dynamic_Product_List_Manager.js`](./Q1_Dynamic_Product_List_Manager.js) | **Q1: Dynamic Product List Manager** | Event delegation on parent `<ul>`, inline content editing, document click outside auto-save |
| [`Q2_Live_Character_Counter.js`](./Q2_Live_Character_Counter.js) | **Q2: Live Character Counter** | Remaining count (max 100), yellow warning at $\le 20$, red limit at 0 blocking typing via `preventDefault()`, reset action |
| [`Q3_Multi_Step_Form.js`](./Q3_Multi_Step_Form.js) | **Q3: Multi-Step Form with Next/Back** | 3-step registration wizard (Name $\rightarrow$ Email $\rightarrow$ Password), step validation, back/next navigation, aggregate summary |
| [`Q4_Theme_Switcher_Attributes.js`](./Q4_Theme_Switcher_Attributes.js) | **Q4: Theme Switcher via Attributes** | Light/Dark/Blue themes applied via `setAttribute('class', ...)` and stored in custom `data-theme="..."` |
| [`Q5_Image_Gallery_Modal.js`](./Q5_Image_Gallery_Modal.js) | **Q5: Image Gallery with Modal Preview** | 6-image grid, modal preview, outside click dismissal, stopping inside bubbling with `event.stopPropagation()` |
| [`Q6_Real_Time_Table_Filter.js`](./Q6_Real_Time_Table_Filter.js) | **Q6: Real-Time Table Filter** | Real-time student filtering on `input` event, case-insensitive string matching, conditional "No results found" row |
| [`Q7_Mouse_Coordinates_Logger.js`](./Q7_Mouse_Coordinates_Logger.js) | **Q7: Mouse Path & Coordinates Logger** | 400&times;400 canvas, tracking live `clientX`/`clientY` on `mousemove`, dropping red dots on `dblclick` |
| [`Q8_Custom_Dropdown_Capture.js`](./Q8_Custom_Dropdown_Capture.js) | **Q8: Custom Dropdown (No &lt;select&gt;)** | Custom dropdown widget, button text updates, outside click closing using the **Capturing Phase** (`true` flag) |
| [`Q9_Form_Submit_Blocker.js`](./Q9_Form_Submit_Blocker.js) | **Q9: Form Submit Blocker with Live Errors** | `preventDefault()` stopping invalid submissions, dynamic inline errors, real-time error clearance on input correction |
| [`index.html`](./index.html) | **Browser Interactive Dashboard** | Complete interactive web dashboard implementing and testing all 9 questions with live visual feedback |
| [`style.css`](./style.css) | **Stylesheet** | Clean responsive layout with theme definitions for Light, Dark, and Blue color palettes |

---

### Key Technical Concepts

#### 1. Event Delegation (Q1)
Instead of attaching separate event listeners to every edit and delete button, a single listener is placed on the parent `<ul>`. It uses `event.target.closest("button[data-action]")` to intercept and process child actions dynamically as items are added and deleted.

#### 2. Event Cancellation via `preventDefault()` (Q2 & Q9)
- In **Q2**, `event.preventDefault()` intercepts `keydown` events when remaining characters reach 0, preventing additional characters from being entered while preserving editing keys (Backspace, Arrows, Delete).
- In **Q9**, `event.preventDefault()` blocks default browser form submission (preventing page refresh) when required fields fail validation.

#### 3. Stopping Event Propagation (`event.stopPropagation()`) (Q5)
In the image modal, clicking on the backdrop closes the popup. To prevent clicks inside the modal content from accidentally bubbling up to the backdrop and closing the dialog, `event.stopPropagation()` is called on the content container.

#### 4. Event Capturing Phase (`addEventListener(..., true)`) (Q8)
By passing `true` as the third parameter to `document.addEventListener("click", handler, true)`, the click handler executes during the **capturing phase** (traveling down the DOM tree) before reaching target elements. This guarantees clean and predictable dropdown dismissal when clicking outside.

---

### How to Run

#### In Node.js Console:
```powershell
cd "d:\College #3rd year\Full Stack\BridgeLabz-Training-3Y\Java  Script\Assignment 7"

node Q1_Dynamic_Product_List_Manager.js
node Q2_Live_Character_Counter.js
node Q3_Multi_Step_Form.js
node Q4_Theme_Switcher_Attributes.js
node Q5_Image_Gallery_Modal.js
node Q6_Real_Time_Table_Filter.js
node Q7_Mouse_Coordinates_Logger.js
node Q8_Custom_Dropdown_Capture.js
node Q9_Form_Submit_Blocker.js
```

#### In Web Browser:
Open [index.html](file:///d:/College%20#3rd%20year/Full%20Stack/BridgeLabz-Training-3Y/Java%20%20Script/Assignment%207/index.html) in any browser (Chrome, Edge, Firefox) to interactively test all 9 questions with live DOM feedback and dynamic theme switching.
