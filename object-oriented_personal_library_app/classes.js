export class Item {
    constructor(id, title, genre, year, creator) {
        this.id = id;
        this.title = title;
        this.genre = genre;
        this.year = year;
        this.creator = creator;
        this.isFinished = false;
    }

    toggleFinished() {
        this.isFinished = !this.isFinished;
    }
}

export class Book extends Item {
    constructor(id, title, genre, year, creator, numPages) {
        super(id, title, genre, year, creator);
        this.numPages = numPages;
    }
}

export class Film extends Item {
    constructor(id, title, genre, year, creator, duration) {
        super(id, title, genre, year, creator);
        this.duration = duration;
    }
}

export class Library {
    constructor() {
        this.items = [];
    }

    addItem(item) {
        this.items.push(item);
    }

    getItems() {
        return this.items;
    }

    removeItem(title) {
        this.items = this.items.filter(item => item.title !== title);
    }
}

export class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;
        this.friendList = [];
        this.library = new Library();
    }

    login(inputUsername, inputPassword) {
        return this.username === inputUsername && this.password === inputPassword;
    }

    logout() {
        console.log(`${this.username} has logged out.`);
    }

    addFriend(friendUsername) {
        this.friendList.push(friendUsername);
    }

    removeFriend(friendUsername) {
        this.friendList = this.friendList.filter(friend => friend !== friendUsername);
    }

    getFriends() {
        return this.friendList;
    }
}
