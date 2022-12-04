const addNote = document.getElementById("add");

addNote.addEventListener("click", () => addNewNote());

const addNewNote = (text = "") => {
  const note = document.createElement("div");
  note.classList.add("note");
  note.innerHTML = ` <div class="tools">
    <button class="edit">
      <i class="fa-solid fa-pen-to-square"></i>
    </button>
    <button class="delete"><i class="fa-solid fa-trash"></i></button>
  </div>
  <div class="main ${text ? "" : "hidden"}"></div>
  <textarea class=${text ? "hidden" : ""}  rows="5" cols="24"></textarea>
</div>`;
  const deleteBtn = note.querySelector(".delete");
  const editBtn = note.querySelector(".edit");
  const main = note.querySelector(".main");
  const textArea = note.querySelector("textarea");
  textArea.value = text;
  main.innerText = text;
  deleteBtn.addEventListener("click", () => {
    note.remove();
    updateLS();
  });
  editBtn.addEventListener("click", () => {
    main.classList.toggle("hidden");
    textArea.classList.toggle("hidden");
  });

  textArea.addEventListener("input", (e) => {
    const { value: i } = e.target;

    main.innerText = i;
    updateLS();
  });

  const container = document.getElementsByClassName("container");

  container[0].appendChild(note);
};
const notesLS = JSON.parse(localStorage.getItem("notes"));

if (notesLS) {
  notesLS.forEach((el) => {
    addNewNote(el);
  });
}

const updateLS = () => {
  const notesText = document.querySelectorAll("textarea");
  const notes = [];
  notesText.forEach((el) => notes.push(el.value));
  localStorage.setItem("notes", JSON.stringify(notes));
};
