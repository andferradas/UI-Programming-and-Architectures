export class Post {
    constructor(id, userIdOwnerPost, cardId, reactions = []) {
        this.id = id;
        this.userIdOwnerPost = userIdOwnerPost;
        this.cardId = cardId;
        this.reactions = reactions; // { userId, emoji }
    }
}