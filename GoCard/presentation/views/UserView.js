import { authService } from "/services/AuthService.js";
import { renderLoginView } from "./AuthView.js";
import { packService } from "/services/PackService.js";
import { renderPackageView } from "./PackageView.js";
import { renderCreateCardView } from "./CreateCardView.js";
import { renderCollectionView } from "./CollectionView.js";
import { renderPageUsersView } from "./PageUsersView.js";
import { renderPostsView } from "./PostsView.js";

export async function renderUserView() {
  const app = document.getElementById('app');
  const headerRoot = document.getElementById('header-root');
  headerRoot.style.display = "block";

  const page = await fetch("/presentation/html/user_home.html").then(r => r.text());
  app.innerHTML = page;

  const header = await fetch("/presentation/html/user_header.html").then(r => r.text());
  headerRoot.innerHTML = header;

  const user = authService.getCurrentUser();
  document.getElementById("userName").textContent = user.name;
  document.getElementById("user-avatar").src = user.avatar;

  const packs = packService.getAllPackages();
  const container = document.getElementById("packsContainer");
  
  packs.forEach(pack => {
    const card = document.createElement("div");
    card.classList.add("pack-card");
    card.innerHTML = `
      <img src="${pack.image}" alt="${pack.nameCollection}">
      <h3>${pack.nameCollection}</h3>
    `;
    card.addEventListener("click", () => {
      renderPackageView(pack.id);
    });
    container.appendChild(card);
  });

  document.getElementById("homeBtn").addEventListener("click", () => {
    renderUserView();
  });

  document.getElementById("logoutBtn").addEventListener("click", () => {
    authService.logout();
    const headerRoot = document.getElementById('header-root');
    headerRoot.innerHTML = "";  
    headerRoot.style.display = "none";
    renderLoginView();
  });

  document.getElementById("menu-collections").addEventListener("click", () => {
    renderCollectionView();
  });

  document.getElementById("menu-create-card").addEventListener("click", async () => {
    renderCreateCardView();
  });

  document.getElementById("menu-users").addEventListener("click", () => {
    renderPageUsersView();
  });

  document.getElementById("menu-posts").addEventListener("click", () => {
    renderPostsView();
  });

}
