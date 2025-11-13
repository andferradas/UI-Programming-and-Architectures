import { authService } from "../../services/AuthService.js";
import { renderLoginView } from "./AuthView.js";

export async function renderUserView() {
  const app = document.getElementById('app');
  const user = authService.getCurrentUser();

  const response = await fetch("./presentation/html/user_home.html");
  const html = await response.text();
  app.innerHTML = html;

  document.getElementById("logoutBtn").addEventListener("click", () => {
    authService.logout();
    renderLoginView();
  });
}
