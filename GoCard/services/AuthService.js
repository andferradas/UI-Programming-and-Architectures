import { dataUsers, dataAvatars } from "/data/data.js";

const colors = ["Red", "Blue", "Green", "Yellow", "Purple", "Pink", "Orange", "Silver", "Golden", "White", "Black"];
const animals = ["Tiger", "Fox", "Penguin", "Lion", "Dolphin", "Eagle", "Panda", "Bear", "Wolf", "Turtle", "Shark", "Frog", "Monkey"];

function generateUniqueName() {
    let name;
    do {
        const color = colors[Math.floor(Math.random() * colors.length)];
        const animal = animals[Math.floor(Math.random() * animals.length)];
        name = color + animal;
    } while (dataUsers.some(u => u.name === name));
    return name;
}


class AuthService {
    constructor() {
        // Charging user data from data.js
        this.users = [...dataUsers];
    }

    // For registering a new user 
    register(email, password) {
        // check email exists
        const existingUser = dataUsers.find(u => u.email === email);
        if (existingUser) {
            return { error: "Email already registered." };
        }

        // generate random name
        const randomName = generateUniqueName();

        // pick a random avatar
        const randomAvatar = dataAvatars[Math.floor(Math.random() * dataAvatars.length)];

        // new ID
        const newId = dataUsers.length + 1;

        const newUser = {
            id: newId,
            name: randomName,
            email,
            password,
            avatar: randomAvatar,
            cardsOwned: [],
            friends: [],
            friendRequests: []
        };

        dataUsers.push(newUser);
        return newUser;
    }

    // For user login
    login(email, password) {
        const user = dataUsers.find(u => u.email === email && u.password === password);
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
        const user = JSON.parse(localStorage.getItem('currentUser'));
        if (!user) return null;
        return { ...user, cardsOwned: user.cardsOwned || [] };
    }
}

export const authService = new AuthService();