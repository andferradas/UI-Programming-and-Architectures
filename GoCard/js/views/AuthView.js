import { authService } from "../services/AuthService.js";
import { renderUserView } from "./UserView.js";

function renderLoginView() {
    const app = document.getElementById('app');
    app.innerHTML = `
    <h2>Login</h2>
    <input id="email" type="email" placeholder="Email"><br>
    <input id="password" type="password" placeholder="Password"><br>
    <button id="loginBtn">Login</button>
    <p>No account? <a href="#" id="toRegister">Register here</a></p>
    `;

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

function renderRegisterView() {
    const app = document.getElementById('app');
    app.innerHTML = `
    <h2>Register</h2>
    <input id="name" type="text" placeholder="Name"><br>
    <input id="email" type="email" placeholder="Email"><br>
    <input id="password" type="password" placeholder="Password"><br>
    <button id="registerBtn">Register</button>
    <p>Already have an account? <a href="#" id="toLogin">Login here</a></p>
    `;

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

export { renderLoginView, renderRegisterView };