import { testUsers } from '../data.js';

class AuthService {
    constructor() {
        // Charging user data from data.js
        this.users = [...testUsers];
    }

    // For registering a new user 
    register(name, email, password) {
        if (this.users.find(u => u.email === email)) {
            return { error: 'Email already in use' };
        }

        const newUser = {
            id: this.users.length + 1,
            name,
            email,
            password
        };
        this.users.push(newUser);
        return newUser;
    }

    // For user login
    login(email, password) {
        const user = this.users.find(u => u.email === email && u.password === password);
        if (user) {
            // Save user session
            localStorage.setItem('currentUser', JSON.stringify(user));
            return user;
        }
        // Invalid credentials
        return { error: 'Invalid email or password' };
    }

    // For user logout
    logout() {
        // Clear user session
        localStorage.removeItem('currentUser');
    }

    // Get current logged-in user
    getCurrentUser() {
        return JSON.parse(localStorage.getItem('currentUser'));
    }
}

export const authService = new AuthService();