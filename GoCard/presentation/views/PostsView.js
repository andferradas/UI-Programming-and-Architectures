import { authService } from "/services/AuthService.js";
import { postsService } from "/services/PostsService.js";
import { pageUsersService } from "/services/PageUsersService.js";

export async function renderPostsView() {
    const app = document.getElementById("app");
    const page = await fetch("/presentation/html/posts.html").then(r => r.text());
    app.innerHTML = page;

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

    // Create new post
    createPostBtn.addEventListener("click", () => {
        const userCards = user.cardsOwned;
        const cardId = Number(prompt("Enter the ID of a card you own to post:"));

        if (!userCards.includes(cardId)) {
            alert("You do not own this card!");
            return;
        }

        postsService.createPost(user.id, cardId);
        refreshMyPosts();
    });

}
