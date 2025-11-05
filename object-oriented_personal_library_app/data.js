// Data Layer data.js
// Responsible only for storing and retrieving library and usersList data.
// Talks to the logic layer

import { Item, User, Book, Film } from './classes.js';

let usersList = [];
let currentUser = null;

// LocalStorage
function saveUsersToLocalStorage() {
  localStorage.setItem('usersList', JSON.stringify(usersList));
  console.log('Users saved to localStorage:', JSON.parse(localStorage.getItem('usersList')));
}

export function loadUsersFromLocalStorage() {
  const usersData = JSON.parse(localStorage.getItem('usersList')) || [];
  console.log('Loading users from localStorage:', usersData);
  if (usersData) {
    usersList = usersData.map(userData => {
      const user = new User(userData.username, userData.password);
      user.library.items = userData.library.items.map(itemData => {
        let item;
        if (itemData.numPages !== undefined) {
          item = new Book(itemData.id, itemData.title, itemData.genre, itemData.year, itemData.creator, itemData.numPages);
        } else if (itemData.duration !== undefined) {
          item = new Film(itemData.id, itemData.title, itemData.genre, itemData.year, itemData.creator, itemData.duration);
        } else {
          item = new Item(itemData.id, itemData.title, itemData.genre, itemData.year, itemData.creator);
        }
        item.isFinished = itemData.isFinished;
        return item;
      });
      return user;
    });
  }
}

// User-related functions
export function addUser(user) {
  usersList.push(user);
  saveUsersToLocalStorage();
}

export function getAllUsers() {
  return usersList;
}

export function setCurrentUser(user) {
  currentUser = user;
}

export function getCurrentUser() {
  return currentUser;
}

export function getUserFromUsername(username) {
  return usersList.find(user => user.username === username);
}

// Library-related functions
export function addItemToCurrentUserLibrary(item) {
  if (currentUser) {
    currentUser.library.addItem(item);
    saveUsersToLocalStorage();
  }
}

export function removeItemFromCurrentUserLibrary(title) {
  if (currentUser) {
    currentUser.library.removeItem(title);
    saveUsersToLocalStorage();
  }
}

export function getItemsFromCurrentUserLibrary() {
  if (currentUser) {
    return currentUser.library.getItems();
  }
  return [];
}
