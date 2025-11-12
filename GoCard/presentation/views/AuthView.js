import { authService } from "../services/AuthService.js";
import { renderUserView } from "./UserView.js";

function renderLoginView() {
    const app = document.getElementById('app');
    app.innerHTML = `
    <div class="auth-container">
        <div class="auth-box">
            <img src="GoCard_logo.png" alt="GoCard Logo" class="auth-logo">
            <h2>Login</h2>
            <input id="email" type="email" placeholder="Email" class="auth-input"><br>
            <input id="password" type="password" placeholder="Password" class="auth-input"><br>
            <button id="loginBtn" class="auth-btn">Login</button>
            <p>No account? <a href="#" id="toRegister">Register here</a></p>
        </div>
    </div>
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
    <div class="auth-container">
        <div class="auth-box">
            <img src="GoCard_logo.png" alt="GoCard Logo" class="auth-logo">
            <h2>Register</h2>
            <input id="name" type="text" placeholder="Name" class="auth-input"><br>
            <input id="email" type="email" placeholder="Email" class="auth-input"><br>
            <input id="password" type="password" placeholder="Password" class="auth-input"><br>
            <button id="registerBtn" class="auth-btn">Register</button>
            <p>Already have an account? <a href="#" id="toLogin">Login here</a></p>
        </div>
    </div>
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