// presentation.js
function renderNotes() {
  const list = document.getElementById("notesList");
  list.innerHTML = "";
  const notes = getAllNotes();
  notes.forEach(note => {
    const li = document.createElement("li");
    li.textContent = note;
    list.appendChild(li);
  });
}

function handleAddNote() {
  const input = document.getElementById("noteInput");
  const success = createNote(input.value);
  if (!success) {
    alert("Note cannot be empty!");
  }
  input.value = "";
  renderNotes();
}