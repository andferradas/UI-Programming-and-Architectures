import { authService } from "/services/AuthService.js";
import { renderUserView } from "./UserView.js";

let globalKeyListener = null;

export async function renderLoginView() {
    const app = document.getElementById('app');
    // Load login HTML -> in fetch is loading from the main html (childrens_social.html)
    const response = await fetch("/presentation/html/login.html");
    const html = await response.text();
    app.innerHTML = html;

    document.getElementById('loginBtn').addEventListener("click", () => {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (!email || !password) {
            alert("Please fill out all fields.");
            return;
        }

        const user = authService.login(email, password);
        if (user.error) {
            alert(user.error);
        } else {
            alert(`Welcome back, ${user.name}!`);
            renderUserView();
        }
    });

    if (globalKeyListener) document.removeEventListener('keydown', globalKeyListener);
    globalKeyListener = (e) => {
        if (e.key === "Enter") loginBtn.click();
    };
    document.addEventListener('keydown', globalKeyListener);

    document.getElementById('toRegister').addEventListener("click", (renderRegisterView));
}

export async function renderRegisterView() {
    const app = document.getElementById('app');
    const response = await fetch("/presentation/html/register.html");
    const html = await response.text();
    app.innerHTML = html;

    document.getElementById('registerBtn').addEventListener("click", () => {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (!email || !password) {
            alert("Please fill out all fields.");
            return;
        }

        const newUser = authService.register(email, password);
        if (newUser.error) {
            alert(newUser.error);
        } else {
            alert(`Registration successful! Welcome, ${newUser.name}`);
            renderLoginView();
        }
    });

    if (globalKeyListener) document.removeEventListener('keydown', globalKeyListener);
    globalKeyListener = (e) => {
        if (e.key === "Enter") registerBtn.click();
    };
    document.addEventListener('keydown', globalKeyListener);

    document.getElementById('toLogin').addEventListener("click", (renderLoginView));
}
