let myLibrary = [];
const libraryBoard = document.querySelector(".library_board");
const addBtn = document.querySelector(".add_btn");
const modalCloseBtn = document.querySelector(".close");
const submitBookBtn = document.querySelector(".submit_book_btn");

function Book(title, author, pages, read = false) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    if (read) {
      return `The ${title} by ${author}, ${pages}, almost read`;
    } else {
      return `The ${title} by ${author}, ${pages}, not read yet`;
    }
  };
}


function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);

  myLibrary.push(book);
}

addBookToLibrary('Nurs', 'Sss', 25, false);
addBookToLibrary('Nurs1', 'Sss', 25, false);


function desplayBooks(arr) {
  libraryBoard.innerHTML = '';

  if (myLibrary.length == 0) {
    libraryBoard.innerHTML = '<h3>No books in library yet</h3>';
    return;
  }

  arr.map( book => {
    const { title, author, pages, read } = book;
    const indexOfBook = arr.indexOf(book);
    const status = read ? 'already read' : 'not read yet';

    const bookCard = document.createElement("div");
    bookCard.classList.add('book_card_wrapper');

    if (read) {
      bookCard.classList.add('green');
    }

    bookCard.innerHTML = `        
    <div class="card book_card" data-index="${indexOfBook}">
      <div class="card-body">
        <h5 class="card-title">${title}</h5>
        <p class="card-text">
          Description...
        </p>
      </div>
      <ul class="list-group list-group-flush book_card_list">
        <li class="list-group-item">Author: ${author}</li>
        <li class="list-group-item">Number of pages: ${pages}</li>
        <li class="list-group-item">Status: ${status}</li>
      </ul>
      <div class="card-body">
        <button type="button" class="btn btn-primary" id="read_btn">Change status</button>
        <button type="button" class="btn btn-danger" id="remove_btn">Remove</button>
      </div>
    </div>`;

    libraryBoard.append(bookCard);
  });

  const bookCards = document.querySelectorAll('.card');

  bookCards.forEach(bookCard => {
      bookCard.addEventListener('click', (e) => {
      const clickedBtn = e.target;
      const index = bookCard.dataset.index;

      if (clickedBtn.id !== 'read_btn' && clickedBtn.id !== 'remove_btn') {
        return;
      }


      if (clickedBtn.id == 'remove_btn') {
        removeBookFromLibrary(index)
      } else {
        setBookAsRead(index);
      }
    
    })
  })
}

desplayBooks(myLibrary);

function openModal(modalSelector) {
  const modal = document.querySelector(modalSelector);

  modal.classList.add('show');
  modal.classList.remove('hide');
}

function closeModal(modalSelector) {
  const modal = document.querySelector(modalSelector);

  modal.classList.add('hide');
  modal.classList.remove('show');
}

addBtn.addEventListener('click', () => openModal('.modal'));
modalCloseBtn.addEventListener('click', () => closeModal('.modal'));
submitBookBtn.addEventListener('click', () => submitBook());

function removeBookFromLibrary(index) {
  myLibrary.splice(index, 1);

  desplayBooks(myLibrary);
}

function setBookAsRead(index) {
  myLibrary[index].read = !myLibrary[index].read;
  
  desplayBooks(myLibrary);
}

function submitBook() {
  const title = document.getElementById('title-input').value;
  const author = document.getElementById('author-input').value;
  const pages = document.getElementById('pages-input').value;
  const read = document.getElementById('read-check').checked;

  if (title == '' || author == '' || pages == '') {
    alert('fill all fields')
  } else {
    addBookToLibrary(title, author, pages, read);

    document.querySelector(".book-adding-form").reset();

    closeModal('.modal');

    desplayBooks(myLibrary);
  }
};

