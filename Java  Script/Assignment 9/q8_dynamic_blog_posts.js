/**
 * ==============================================================================
 * ASSIGNMENT 9 - QUESTION 8: Dynamic Blog Posts (jQuery)
 * ==============================================================================
 * 
 * Requirements:
 * 1. “Add New Post” → append a new post to the list.
 * 2. “Prepend Featured Post” → add a post at the top.
 * 3. “Remove Last Post” → delete last element.
 * 4. Add tags to posts → use .before()/.after() for placement.
 * 5. Highlight posts with specific keywords dynamically.
 * ==============================================================================
 */

$(document).ready(function() {
    console.log("[Q8 Dynamic Blog Posts Initialized]");

    let newPostCounter = 6;

    // --------------------------------------------------------------------------
    // REQUIREMENT 1: "Add New Post" -> append a new post to the list using .append()
    // --------------------------------------------------------------------------
    $("#btnAppendPost").on("click", function() {
        const postNum = newPostCounter++;
        const $newPost = $(`
            <article class="blog-post-card" style="display: none;">
                <h3 class="post-title">Post #${postNum}: Asynchronous JavaScript Patterns</h3>
                <p class="post-body">Mastering Promise chaining, Promise.allSettled(), and async/await execution in production JavaScript applications.</p>
                <div class="post-footer"><small style="color: #64748b;">Just now</small></div>
            </article>
        `);

        // jQuery .append() adds element to the end of the container
        $("#blogContainer").append($newPost);
        $newPost.slideDown(250);
        console.log(`[jQuery .append()] Appended new Post #${postNum} at the end of the list.`);
    });

    // --------------------------------------------------------------------------
    // REQUIREMENT 2: "Prepend Featured Post" -> add a post at the top using .prepend()
    // --------------------------------------------------------------------------
    $("#btnPrependPost").on("click", function() {
        const postNum = newPostCounter++;
        const $featuredPost = $(`
            <article class="blog-post-card featured" style="display: none;">
                <div class="post-header-tag">⭐ FEATURED ANNOUNCEMENT</div>
                <h3 class="post-title">🌟 Release Spotlight #${postNum}: Next-Gen Web Frameworks</h3>
                <p class="post-body">Exploring high-performance SSR compilers, edge computing runtimes, and optimized JavaScript bundle tree-shaking.</p>
                <div class="post-footer"><small style="color: #b45309; font-weight: bold;">Pinned to Top by Admin</small></div>
            </article>
        `);

        // jQuery .prepend() adds element at the very top of the container
        $("#blogContainer").prepend($featuredPost);
        $featuredPost.slideDown(250);
        console.log(`[jQuery .prepend()] Prepended Featured Post #${postNum} at the top.`);
    });

    // --------------------------------------------------------------------------
    // REQUIREMENT 3: "Remove Last Post" -> delete last element (.remove)
    // --------------------------------------------------------------------------
    $("#btnRemoveLast").on("click", function() {
        // Select the last child element in the container and remove it
        const $lastPost = $("#blogContainer").children(".blog-post-card").last();

        if ($lastPost.length === 0) {
            alert("No more posts available to remove!");
            return;
        }

        const removedTitle = $lastPost.find(".post-title").text();
        $lastPost.slideUp(200, function() {
            $(this).remove();
            console.log(`[jQuery .remove()] Deleted last post: "${removedTitle}"`);
        });
    });

    // --------------------------------------------------------------------------
    // REQUIREMENT 4: Add tags to posts -> use .before() and .after() for placement
    // --------------------------------------------------------------------------
    let tagsApplied = false;
    $("#btnAddTags").on("click", function() {
        if (tagsApplied) {
            alert("Tags have already been injected into posts!");
            return;
        }

        // Use .before() to insert category header tag before each post title
        $(".post-title").each(function(idx) {
            $("<span class='post-header-tag'>🏷️ Article Category</span>").before(this);
        });

        // Use .after() to insert metadata badges after each post body paragraph
        $(".post-body").each(function() {
            $("<div class='tags-row'><span class='post-tag-badge'>#WebDev</span><span class='post-tag-badge'>#FullStack</span><span class='post-tag-badge'>#Trending</span></div>").after(this);
        });

        tagsApplied = true;
        $(this).css("opacity", "0.6").text("🏷️ Tags Injected ✔");
        console.log("[jQuery .before() / .after()] Successfully injected tags before titles and after paragraphs.");
    });

    // --------------------------------------------------------------------------
    // REQUIREMENT 5: Highlight posts with specific keywords dynamically
    // --------------------------------------------------------------------------
    $("#keywordInput").on("keyup", function() {
        const keyword = $(this).val().trim();

        // Clear existing highlights
        $(".blog-post-card").removeClass("keyword-highlight");

        if (keyword.length > 0) {
            // Using jQuery :contains() pseudo-selector to locate matching post cards
            const $matchedCards = $(`#blogContainer .blog-post-card:contains("${keyword}")`);
            $matchedCards.addClass("keyword-highlight");
            console.log(`[jQuery :contains("${keyword}")] Highlighted ${$matchedCards.length} post(s).`);
        }
    });

    $("#btnClearKeyword").on("click", function() {
        $("#keywordInput").val("");
        $(".blog-post-card").removeClass("keyword-highlight");
        console.log("[jQuery Highlight Reset] Cleared keyword highlights.");
    });
});
