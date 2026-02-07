const booksList = document.querySelector(".books_list");
const modal = document.getElementById("modal");
const modalButton = document.getElementById("open_modal");
const bookForm = document.querySelector(".book_form");
const closeButton = document.querySelector(".close_button");

let myLibrary = [];

function Book(title, author, pages, hasRead) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.hasRead = hasRead;
}

function addBookToLibrary(title, author, pages, hasRead) {
  const newObject = new Book(title, author, pages, hasRead);

  myLibrary.push(newObject);
}

addBookToLibrary("Harry Potter", "Joanne Rowling", "324", true);
addBookToLibrary("The Little Prince", "Antoine De Saint-Exupéry", "290", false);
addBookToLibrary("Hobbit", "J.R.R. Tolkien", "302", true);
addBookToLibrary("Nice Book", "Nice Author", "233", false);

function getBooks() {
  myLibrary.forEach((book) => {
    const newCard = document.createElement("div");
    newCard.className = "book_card";
    newCard.id = `${book.id}`;
    newCard.innerHTML = `
    <h2>${book.title}</h2>
    <h3>by ${book.author}</h3>
    <p>Pages: ${book.pages}</p>
    <button class="toggle_button ${book.hasRead ? "toggle_on" : null}" onClick="toggleReadStatus('${book.id}')" >
      ${book.hasRead ? "Read" : "Not Read"}
    </button>
    <button class="delete_button" onClick="deleteBook(event)" >Delete</button>
  `;
    booksList.appendChild(newCard);
  });
}

getBooks();

bookForm.addEventListener("submit", addBook);

modalButton.addEventListener("click", () => {
  modal.showModal();
});

function addBook(event) {
  event.preventDefault();

  const form = event.target;

  addBookToLibrary(
    form.title.value,
    form.author.value,
    form.pages.value,
    form.hasRead.checked,
  );

  booksList.innerHTML = "";
  getBooks();

  modal.close();
  form.reset();
}

closeButton.addEventListener("click", () => {
  modal.close();
  bookForm.reset();
});

function deleteBook(event) {
  const card = event.target.closest(".book_card");
  const bookId = card.id;

  const newBooksList = myLibrary.filter((book) => book.id !== bookId);
  myLibrary = newBooksList;
  booksList.innerHTML = "";
  getBooks();
}

Book.prototype.toggleRead = function () {
  this.hasRead = !this.hasRead;
};

function toggleReadStatus(bookId) {
  const book = myLibrary.find((b) => b.id === bookId);

  if (book) {
    book.toggleRead();
    booksList.innerHTML = "";
    getBooks();
  }
}
