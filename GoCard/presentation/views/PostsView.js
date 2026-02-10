async function renderPostsView() {
    const app = document.getElementById("app");
    /* For doing with Live Server extension:
    const page = await fetch("presentation/html/posts.html").then(r => r.text());
    app.innerHTML = page;
    */
    app.innerHTML = `<div class="posts-view">
        <h1>Posts</h1>

        <div class="posts-tabs">
            <button id="friendsPostsBtn" class="tab-btn active">Friends Posts</button>
            <button id="myPostsBtn" class="tab-btn">My Posts</button>
        </div>

        <button id="createPostBtn" class="create-post-btn">＋ Create Post</button>

        <div id="postsContainer"></div>
        <!-- Modal para seleccionar carta -->
        <div id="cardSelectorModal" class="modal hidden">
            <div class="modal-content">
                <h2>Select a card to post</h2>
                <div id="cardSelectorGrid"></div>
                <button id="closeCardSelector" class="close-btn">Cancel</button>
            </div>
        </div>
    </div>
    `;

    const user = authService.getCurrentUser();
    const friends = pageUsersService.getFriends(user).map(f => f.id);

    const postsContainer = document.getElementById("postsContainer");

    const friendsBtn = document.getElementById("friendsPostsBtn");
    const myPostsBtn = document.getElementById("myPostsBtn");
    const createPostBtn = document.getElementById("createPostBtn");

    const emojis = ["❤️", "🔥", "😂", "😮", "👍"];

    function renderPosts(list, showReactors = false) {
        postsContainer.innerHTML = list.map(post => {
            const card = postsService.getCard(post.cardId);
            const author = pageUsersService.getUserById(post.userIdOwnerPost);

            const reactionsHtml = post.reactions
                .map(r => {
                    const reactor = pageUsersService.getUserById(r.userId);
                    const isOwnReaction = r.userId === user.id; // check if current user
                    if(showReactors) {
                        return `<span class="reaction-item ${isOwnReaction ? "own-reaction" : ""}">${r.emoji} ${reactor.name}</span>`;
                    }
                    return `<span class="reaction-item ${isOwnReaction ? "own-reaction" : ""}">${r.emoji}</span>`;
                })
                .join("");

            return `
                <div class="post-item">
                    <div class="post-header">
                        <img src="${author.avatar}" class="small-avatar">
                        <span>${author.name}</span>
                    </div>

                    <img src="${card.image}" class="post-card-img">

                    <div class="post-reactions">${reactionsHtml}</div>

                    <div class="reaction-buttons">
                        ${emojis.map(e => `
                            <button 
                                class="reactBtn" 
                                data-post="${post.id}" 
                                data-emoji="${e}"
                                ${post.userIdOwnerPost === user.id ? "disabled" : ""}
                            >
                                ${e}
                            </button>
                        `).join("")}
                    </div>
                </div>
            `;
        }).join("");

        // reaction buttons event
        postsContainer.querySelectorAll(".reactBtn").forEach(btn => {
            btn.addEventListener("click", () => {
                postsService.addReaction(
                    Number(btn.dataset.post),
                    user.id,
                    btn.dataset.emoji
                );
                if(myPostsBtn.classList.contains("active")) refreshMyPosts();
                else refreshFriendsPosts();
            });
        });
    }

    function refreshFriendsPosts() {
        const posts = postsService.getPostsFromFriends(user, friends);
        renderPosts(posts, false);
    }

    function refreshMyPosts() {
        const posts = postsService.getMyPosts(user.id);
        renderPosts(posts, true); // <-- mostrar nombres en my posts
    }

    // Tabs switching
    friendsBtn.addEventListener("click", () => {
        friendsBtn.classList.add("active");
        myPostsBtn.classList.remove("active");
        refreshFriendsPosts();
    });

    myPostsBtn.addEventListener("click", () => {
        myPostsBtn.classList.add("active");
        friendsBtn.classList.remove("active");
        refreshMyPosts();
    });

    // Default: show friends posts
    refreshFriendsPosts();

    const modal = document.getElementById("cardSelectorModal");
    const cardGrid = document.getElementById("cardSelectorGrid");
    const closeBtn = document.getElementById("closeCardSelector");

    createPostBtn.addEventListener("click", () => {
        const userCards = user.cardsOwned;

        // Renderizar cartas del usuario
        cardGrid.innerHTML = userCards.map(id => {
            const card = postsService.getCard(id);
            return `
                <div class="card-option" data-id="${id}">
                    <img src="${card.image}">
                </div>
            `;
        }).join("");

        modal.classList.remove("hidden");

        // Click en una carta → crear post
        cardGrid.querySelectorAll(".card-option").forEach(cardEl => {
            cardEl.addEventListener("click", () => {
                const cardId = Number(cardEl.dataset.id);

                postsService.createPost(user.id, cardId);
                modal.classList.add("hidden");
                refreshMyPosts();
            });
        });
    });

// Cerrar modal
closeBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
});


}
