import { dataPosts } from "/data/data.js";
import { Post } from "/data/models/Post.js";
import { dataCards } from "/data/data.js";

class PostsService {
    constructor() {
        this.posts = [...dataPosts];
    }

    getAllPosts() {
        return this.posts;
    }

    createPost(userIdOwnerPost, cardId) {
        const newId = Date.now();
        const newPost = new Post(newId, userIdOwnerPost, cardId, []);
        this.posts.push(newPost);
    }

    getPostsFromFriends(user, friendsList) {
        return this.posts.filter(p => friendsList.includes(p.userIdOwnerPost));
    }

    getMyPosts(userIdOwnerPost) {
        return this.posts.filter(p => p.userIdOwnerPost === userIdOwnerPost);
    }

    addReaction(postId, userId, emoji) {
        const post = this.posts.find(p => p.id === postId);
        if (!post) return;

        const existing = post.reactions.find(r => r.userId === userId);

        if (existing) {
            existing.emoji = emoji;
        } else {
            post.reactions.push({ userId, emoji });
        }
    }

    getCard(cardId) {
        return dataCards.find(c => c.id === cardId);
    }

    getPostById(id) {
        return this.posts.find(p => p.id === id);
    }
}

export const postsService = new PostsService();
