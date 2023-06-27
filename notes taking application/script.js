const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");
let notes = [];

function showNotes() {
  const storedNotes = JSON.parse(localStorage.getItem("notes"));
  if (storedNotes) {
    notes = storedNotes;
    renderNotes();
  }
}

function updateStorage() {
  localStorage.setItem("notes", JSON.stringify(notes));
}

function renderNotes() {
  notesContainer.innerHTML = "";
  notes.forEach((note) => {
    const noteElement = createNoteElement(note);
    notesContainer.appendChild(noteElement);
  });
}

function createNoteElement(content) {
  const noteElement = document.createElement("p");
  const img = document.createElement("img");
  noteElement.className = "input-box";
  noteElement.contentEditable = true;
  noteElement.textContent = content;
  img.src = "images/delete.png";
  noteElement.appendChild(img);
  return noteElement;
}

createBtn.addEventListener("click", () => {
  notes.push("");
  renderNotes();
  updateStorage();
});

notesContainer.addEventListener("click", function (e) {
  if (e.target.tagName === "IMG") {
    const noteElement = e.target.parentElement;
    const noteIndex = Array.from(notesContainer.children).indexOf(noteElement);
    notes.splice(noteIndex, 1);
    renderNotes();
    updateStorage();
  }
});

notesContainer.addEventListener("input", function (e) {
  const noteElement = e.target;
  const noteIndex = Array.from(notesContainer.children).indexOf(noteElement);
  notes[noteIndex] = noteElement.textContent;
  updateStorage();
});

showNotes();
