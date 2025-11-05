// presentation.js
import { createUser, loginUser } from './logic.js';
import { loadUsersFromLocalStorage } from './data.js';

window.addEventListener('DOMContentLoaded', () => {
  loadUsersFromLocalStorage();
  document.getElementById("registerButton").onclick = function() {
    const username = document.getElementById("regUsernameInput").value;
    const password = document.getElementById("regPasswordInput").value;
    const success = createUser(username, password);
    alert(success ? "User registered!" : "Username already exists.");
    // Put as empty the fields
    document.getElementById("regUsernameInput").value = "";
    document.getElementById("regPasswordInput").value = "";
  }

  document.getElementById("loginButton").onclick = function() {
    const username = document.getElementById("loginUsernameInput").value;
    const password = document.getElementById("loginPasswordInput").value;
    const success = loginUser(username, password);
    alert(success ? "Login successful!" : "Invalid credentials.");
    // Put as empty the fields
    document.getElementById("loginUsernameInput").value = "";
    document.getElementById("loginPasswordInput").value = "";
  }
});