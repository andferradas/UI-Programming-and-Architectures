// Data Layer data.js
// Responsible only for storing and retrieving notes. Start with an in-memory array.
// Talks to the logic layer
let notes = [];

function addNoteToStorage(note) {
  notes.push(note);
}

function getAllNotes() {
  return notes;
}