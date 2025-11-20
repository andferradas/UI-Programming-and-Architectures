let globalKeyListener = null;

async function renderLoginView() {
    const app = document.getElementById('app');
    /* For doing with Live Server extension:
    const response = await fetch("presentation/html/login.html");
    const html = await response.text();
    */
    app.innerHTML = `<div class="auth-container">
        <div class="auth-box">
            <img src="assets/GoCard_logo.png" alt="GoCard Logo" class="auth-logo">
            <h2>Login</h2>
            <input id="email" type="email" placeholder="Email" class="auth-input"><br>
            <input id="password" type="password" placeholder="Password" class="auth-input"><br>
            <button id="loginBtn" class="auth-btn">Login</button>
            <p>No account? <a href="#" id="toRegister">Register here</a></p>
        </div>
    </div> `;

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

async function renderRegisterView() {
    const app = document.getElementById('app');

    /* For doing with Live Server extension:
    const response = await fetch("presentation/html/register.html");
    const html = await response.text();
    */
    app.innerHTML = `<div class="auth-container">
        <div class="auth-box">
            <img src="assets/GoCard_logo.png" alt="GoCard Logo" class="auth-logo">
            <h2>Register</h2>
            <input id="email" type="email" placeholder="Email" class="auth-input"><br>
            <input id="password" type="password" placeholder="Password" class="auth-input"><br>
            <button id="registerBtn" class="auth-btn">Register</button>
            <p>Already have an account? <a href="#" id="toLogin">Login here</a></p>
        </div>
    </div>`;

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
