import { authService } from "/services/AuthService.js";
import { renderLoginView } from "./AuthView.js";
import { packService } from "/services/PackService.js";

export async function renderUserView() {
  const app = document.getElementById('app');
  const headerRoot = document.getElementById('header-root');

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
      <img src="${pack.image}" alt="${pack.name}">
      <h3>${pack.name}</h3>
    `;
    card.addEventListener("click", () => {
      alert(`Opening ${pack.name}...`);
    });
    container.appendChild(card);
  });

  document.getElementById("logoutBtn").addEventListener("click", () => {
    authService.logout();
    renderLoginView();
  });
}
