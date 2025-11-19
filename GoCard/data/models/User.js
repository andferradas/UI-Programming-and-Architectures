export class User {
    constructor(id, name, email, password, avatar, cardsOwned = [], friends = [], friendsRequests = []) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.avatar = avatar;
        this.cardsOwned = cardsOwned;
        this.friends = friends;
        this.friendsRequests = friendsRequests;
    }
}