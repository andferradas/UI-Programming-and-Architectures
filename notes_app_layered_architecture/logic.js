// logic.js
// Responsible for business rules. 
// Takes data from the data layer and processes it for the presentation layer

function createNote(text) {
    if (text.trim() === "") {
      return false; // reject empty notes
    }
    addNoteToStorage(text);
    return true;
  }