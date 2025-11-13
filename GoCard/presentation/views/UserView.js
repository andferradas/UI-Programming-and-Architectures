import { authService } from "../../services/AuthService.js";
import { renderLoginView } from "./AuthView.js";
import {packService} from "../../services/PackService.js";

export async function renderUserView() {
  const app = document.getElementById('app');
  const response = await fetch("./presentation/html/user_home.html");
  const html = await response.text();
  app.innerHTML = html;

  const user = authService.getCurrentUser();
  document.getElementById("userName").textContent = user.username;

  const packs = packService.getAllPacks();

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
