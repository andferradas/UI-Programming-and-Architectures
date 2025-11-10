import { authService } from "../services/AuthService.js";
import { renderLoginView } from "./AuthView.js";

export function renderUserView() {
  const app = document.getElementById('app');
  const user = authService.getCurrentUser();

  app.innerHTML = `
    <h2>Welcome, ${user.name}!</h2>
    <p>Email: ${user.email}</p>
    <button id="logoutBtn">Logout</button>
  `;

  document.getElementById("logoutBtn").addEventListener("click", () => {
    authService.logout();
    renderLoginView();
  });
}
