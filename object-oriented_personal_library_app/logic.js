// logic.js
// Responsible for business rules. 
// Takes data from the data layer and processes it for the presentation layer

import { Item, Book, Film, Library, User } from './classes.js';

import {
  addUser,
  getAllUsers,
  setCurrentUser,
  getCurrentUser,
  getUserFromUsername,
  addItemToCurrentUserLibrary,
  getItemsFromCurrentUserLibrary,
  removeItemFromCurrentUserLibrary
} from './data.js';

export function createUser(username, password) {
  if (!getUserFromUsername(username)) {
    const newUser = new User(username, password);
    addUser(newUser);
    return true;
  }
  return false; // Username already exists
}

export function loginUser(username, password) {
  const user = getUserFromUsername(username);
  if (!user) return false; // Usuario no existe
  if (user.login(username, password)) {
    setCurrentUser(user);
    return true;
  }
  return false;
}

export function addNewItem(id, title, genre, yearReleased, author, type) {
  let newItem;
  if (type === "book") {
    newItem = new Book(id, title, genre, yearReleased, author);
  } else if (type === "film") {
    newItem = new Film(id, title, genre, yearReleased, author);
  } else {
    return false; // Invalid type
  }
  addItemToCurrentUserLibrary(newItem);
  return true;
}

export function removeItem(title) {
  removeItemFromCurrentUserLibrary(title);
}

export function getAllItems() {
  return getItemsFromCurrentUserLibrary();
}

export function toggleItemFinishedStatus(title) {
  const items = getItemsFromCurrentUserLibrary();
  const item = items.find(i => i.title === title);
  if (item) {
    item.toggleFinished();
    return true;
  }
  return false; // Item not found
}
