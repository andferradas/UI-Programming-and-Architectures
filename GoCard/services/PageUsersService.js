import { dataUsers } from "/data/data.js";

class PageUsersService {
  constructor() {
    this.users = [...dataUsers];
    this.friendRequests = [];
  }

  searchUsers(query, currentUserId) {
    const q = query.toLowerCase();
    return this.users
      .filter(u => u.id !== currentUserId && u.name.toLowerCase().includes(q));
  }

  getUserById(id) {
    return this.users.find(u => u.id === id);
  }

  getFriends(user) {
    return user.friends ? user.friends.map(id => this.getUserById(id)) : [];
  }

  addFriend(user, friendId) {
    if (!user.friends) user.friends = [];
    if (!user.friends.includes(friendId)) user.friends.push(friendId);
  }

  sendFriendRequest(fromId, toId) {
    if (!this.friendRequests.some(r => r.from === fromId && r.to === toId)) {
      this.friendRequests.push({ from: fromId, to: toId });
    }
  }

  getFriendRequestsForUser(userId) {
    return this.friendRequests.filter(r => r.to === userId);
  }

  updateAvatar(user, newAvatarUrl) {
    user.avatar = newAvatarUrl;
  }
}

export const pageUsersService = new PageUsersService();
