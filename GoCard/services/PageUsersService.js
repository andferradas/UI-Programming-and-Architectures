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

  sendFriendRequest(senderId, receiverId) {
    const receiver = this.getUserById(receiverId);
    if (!receiver.friendRequests.includes(senderId)) {
      receiver.friendRequests.push(senderId);
    }
  }

  getReceivedFriendRequests(userId) {
    const user = this.getUserById(userId);
    return user.friendRequests.map(id => this.getUserById(id));
  }

  acceptFriendRequest(userId, senderId) {
    const user = this.getUserById(userId);
    const sender = this.getUserById(senderId);

    if (!user.friends.includes(senderId)) user.friends.push(senderId);
    if (!sender.friends.includes(userId)) sender.friends.push(userId);

    user.friendRequests = user.friendRequests.filter(id => id !== senderId);
  }

  rejectFriendRequest(userId, senderId) {
    const user = this.getUserById(userId);
    user.friendRequests = user.friendRequests.filter(id => id !== senderId);
  }

  updateAvatar(user, newAvatarUrl) {
    user.avatar = newAvatarUrl;
  }

  addUser(user) {
    this.users.push({
        id: user.id,
        name: user.name,
        avatar: user.avatar,
        friends: [],
        friendRequestsSent: [],
        friendRequestsReceived: []
    });
    localStorage.setItem("page_users", JSON.stringify(this.users));
  }

}

export const pageUsersService = new PageUsersService();
