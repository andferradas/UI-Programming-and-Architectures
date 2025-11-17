import { authService } from "/services/AuthService.js";
import { pageUsersService } from "/services/PageUsersService.js";
import { dataAvatars } from "/data/data.js";

export async function renderPageUsersView() {
  const app = document.getElementById("app");
  const page = await fetch("/presentation/html/page_users.html").then(r => r.text());
  app.innerHTML = page;

  const user = authService.getCurrentUser();

  // Current avatar
  const avatarImg = document.getElementById("currentAvatar");
  avatarImg.src = user.avatar;

  // Display avatar options
  const avatarContainer = document.getElementById("avatarOptions");
  avatarContainer.innerHTML = dataAvatars.map(a => `
    <img src="${a}" class="select-avatar ${a === user.avatar ? 'selected' : ''}" data-url="${a}">
  `).join("");

  let selectedAvatarUrl = user.avatar;

  avatarContainer.querySelectorAll(".select-avatar").forEach(img => {
    img.addEventListener("click", () => {
      avatarContainer.querySelectorAll(".select-avatar").forEach(i => i.classList.remove("selected"));
      img.classList.add("selected");
      selectedAvatarUrl = img.dataset.url;
      avatarImg.src = selectedAvatarUrl; // preview only
    });
  });

  // Save Avatar button
  document.getElementById("saveAvatarBtn").addEventListener("click", () => {
    pageUsersService.updateAvatar(user, selectedAvatarUrl);
    localStorage.setItem('currentUser', JSON.stringify(user));
    alert("Avatar saved!");
  });

  // Search users
  const searchInput = document.getElementById("searchUserInput");
  const searchResults = document.getElementById("searchResults");

  searchInput.addEventListener("input", () => {
    const results = pageUsersService.searchUsers(searchInput.value, user.id);
    searchResults.innerHTML = results.map(u => {
      const isFriend = user.friends?.includes(u.id);
      return `
        <div class="user-item">
          <img src="${u.avatar}" alt="${u.name}" class="small-avatar">
          <span>${u.name}</span>
          ${
            isFriend
              ? `<button class="addFriendBtn" disabled>Friend</button>`
              : `<button class="sendRequestBtn" data-id="${u.id}">Send Friend Request</button>`
          }
        </div>
      `;
    }).join("");

    // Añadir eventos solo a los botones de solicitud
    searchResults.querySelectorAll(".sendRequestBtn").forEach(btn => {
      btn.addEventListener("click", () => {
        const friendId = Number(btn.dataset.id);
        pageUsersService.sendFriendRequest(user.id, friendId);
        btn.disabled = true;
        btn.textContent = "Request Sent";
      });
    });
  });

  // Friends list
  const friendsListDiv = document.getElementById("friendsList");
  function renderFriends() {
    const friends = pageUsersService.getFriends(user);
    friendsListDiv.innerHTML = friends.map(f => `
      <div class="friend-item">
        <img src="${f.avatar}" alt="${f.name}" class="small-avatar">
        <span>${f.name}</span>
      </div>
    `).join("");
  }
  renderFriends();
}
