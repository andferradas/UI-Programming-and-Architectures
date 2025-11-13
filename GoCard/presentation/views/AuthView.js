import { authService } from "../../services/AuthService.js";
import { renderUserView } from "./UserView.js";

export async function renderLoginView() {
    const app = document.getElementById('app');
    // Load login HTML -> in fetch is loading from the main html (childrens_social.html)
    const response = await fetch("./presentation/html/login.html");
    const html = await response.text();
    app.innerHTML = html;

    document.getElementById('loginBtn').addEventListener("click", () => {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const user = authService.login(email, password);
        if (user.error) {
            alert(user.error);
        } else {
            alert(`Welcome back, ${user.name}!`);
            renderUserView();
        }
    });

    document.getElementById('toRegister').addEventListener("click", (renderRegisterView));
}

export async function renderRegisterView() {
    const app = document.getElementById('app');
    const response = await fetch("./presentation/html/register.html");
    const html = await response.text();
    app.innerHTML = html;

    document.getElementById('registerBtn').addEventListener("click", () => {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const newUser = authService.register(name, email, password);
        if (newUser.error) {
            alert(newUser.error);
        } else {
            alert(`Registration successful! Welcome, ${newUser.name}`);
            renderLoginView();
        }
    });

    document.getElementById('toLogin').addEventListener("click", (renderLoginView));
}
