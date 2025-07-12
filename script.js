const books = [];

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.id = crypto.randomUUID();
    }

    changeStatus() {
        this.read = !this.read;
    }

    storeBookInArray() {
        books.push(this);
    }

    static displayBooks(index) {
        const container = document.querySelector('section');
        for (index; index < books.length; index++) {
            //Create header and footer template
            const card = document.createElement("div");
            card.classList.add('card');
            card.dataset.id = books[index].id;

            const cardHeader = document.createElement('div');
            cardHeader.className = 'card-header';
            const bookInfo = document.createElement('div');
            bookInfo.className = 'book-info';
            card.appendChild(cardHeader);
            card.appendChild(bookInfo);

            //Add Header content
            const title = document.createElement('h1');
            title.textContent = books[index].title;
            const bookImage = document.createElement('img');
            bookImage.src = './images/book-open-page-variant-outline.svg';
            const deleteButton = document.createElement('a');
            deleteButton.classList.add('delete-button');
            const deleteIcon = document.createElement('img');
            deleteIcon.src = './images/trash-can-outline.svg';
            deleteButton.dataset.id = books[index].id;
            deleteButton.appendChild(deleteIcon);
            cardHeader.appendChild(bookImage);
            cardHeader.appendChild(title);
            cardHeader.appendChild(deleteButton);

            //Add Author
            const separator = document.createElement('hr');
            const authorLine = document.createElement('div');
            authorLine.className = 'line';
            const authorTag = document.createElement('p');
            const authorTagText = document.createElement('span');
            const authorIcon = document.createElement('img');
            const authorName = document.createElement('p');

            authorTagText.textContent = 'Author';
            authorIcon.src = './images/account-edit.svg';
            authorName.textContent = books[index].author;

            authorTag.appendChild(authorIcon);
            authorTag.appendChild(authorTagText);
            authorLine.appendChild(authorTag);
            authorLine.appendChild(authorName);
            bookInfo.appendChild(authorLine)
            bookInfo.appendChild(separator);

            //Page Info
            const separator2 = document.createElement('hr');
            const pagesLine = document.createElement('div');
            pagesLine.className = 'line';
            const pagesTag = document.createElement('p');
            const pagesTagText = document.createElement('span');
            const pagesIcon = document.createElement('img');
            const pagesNumber = document.createElement('p');

            pagesTagText.textContent = 'Pages';
            pagesIcon.src = './images/numeric-1-box-multiple-outline.svg';
            pagesNumber.textContent = books[index].pages;

            pagesTag.appendChild(pagesIcon);
            pagesTag.appendChild(pagesTagText);
            pagesLine.appendChild(pagesTag);
            pagesLine.appendChild(pagesNumber);
            bookInfo.appendChild(pagesLine);
            bookInfo.appendChild(separator2);

            //Status Info
            const statusLine = document.createElement('div');
            statusLine.className = 'line';
            const statusTag = document.createElement('p');
            statusTag.className = 'status';
            const statusTagText = document.createElement('span');
            const statusIcon = document.createElement('img');
            const statusState = document.createElement('img');

            statusTagText.textContent = 'Status (Read / To-Read)';
            statusIcon.src = './images/list-status.svg';
            if (books[index].read) {
                statusState.src = './images/checkbox-marked-circle-outline.svg';
            } else {
                statusState.src = './images/radiobox-blank.svg';
            }
            statusState.dataset.id = books[index].id;

            statusTag.appendChild(statusIcon);
            statusTag.appendChild(statusTagText);
            statusLine.appendChild(statusTag);
            statusLine.appendChild(statusState);
            bookInfo.appendChild(statusLine);


            container.appendChild(card);
        }
        wireListeners();
    }
}

//DIALOG LOGIC Add Book
const DialogHandler = (function () {
    const dialog = document.querySelector('dialog');
    const showButton = document.querySelector('.add');
    const cancelButton = document.querySelector('.close');
    const confirmButton = dialog.querySelector('.submit');

    const bookName = document.querySelector('#book-name');
    const bookNameError = document.querySelector('#book-name + span.error');
    const bookAuthor = document.querySelector('#book-author');
    const bookAuthorError = document.querySelector('#book-author + span.error');
    const bookPages = document.querySelector('#book-pages');
    const bookPagesError = document.querySelector('#book-pages + span.error');

    //BOOK NAME ERROR HANDLING
    bookName.addEventListener('input', (e) => {
        if (bookName.validity.valid) {
            bookNameError.textContent = '';
            bookNameError.className = 'error';
        } else {
            displayBookNameError();
        }
    });

    function displayBookNameError() {
        if (bookName.validity.valueMissing) {
            bookNameError.textContent = 'This field cannot be empty';
        } else if (bookName.validity.tooLong) {
            bookNameError.textContent = `Name must be under ${bookName.maxLength} characters`;
        }

        bookNameError.classList = 'error active';
    }

    //BOOK AUHTOR ERROR HANDLING
    bookAuthor.addEventListener('input', (e) => {
        if (bookAuthor.validity.valid) {
            bookAuthorError.textContent = '';
            bookAuthorError.className = 'error';
        } else {
            displayBookAuthorError();
        }
    });

    function displayBookAuthorError() {
        if (bookAuthor.validity.valueMissing) {
            bookAuthorError.textContent = 'This field cannot be empty';
        } else if (bookAuthor.validity.tooLong) {
            bookAuthorError.textContent = `Name must be under ${bookAuthor.maxLength} characters`;
        }

        bookAuthorError.classList = 'error active';
    }

    //PAGES ERROR HANDLING
    bookPages.addEventListener('input', (e) => {
        if (bookPages.validity.valid) {
            bookPagesError.textContent = '';
            bookPagesError.className = 'error';
        } else {
            displaybookPagesError();
        }
    });

    function displaybookPagesError() {
        if (bookPages.validity.valueMissing) {
            bookPagesError.textContent = 'This field cannot be empty';
        } else if (bookPages.validity.rangeUnderflow || bookPages.validity.rangeOverflow) {
            bookPagesError.textContent = 'Value must be between 1 and 20 000';
        }

        bookPagesError.classList = 'error active';
    }

    //Show and cancel logic
    showButton.addEventListener('click', () => {
        dialog.showModal();
    });

    cancelButton.addEventListener('click', (event) => {
        event.preventDefault();
        dialog.close();
    });

    //Submit logic
    dialog.addEventListener('submit', (event) => {
        let submit = true;
        event.preventDefault();

        if (!bookName.validity.valid) {
            submit = false;
            displayBookNameError();
        }

        if (!bookPages.validity.valid) {
            submit = false;
            displaybookPagesError();
        }

        if (!bookAuthor.validity.valid) {
            submit = false;
            displayBookAuthorError();
        }

        if (submit) {
            const inputName = document.querySelector('#book-name').value;
            const inputAuthor = document.querySelector('#book-author').value;
            const inputPages = document.querySelector('#book-pages').value;
            const inputStatus = document.querySelector('#status').checked;

            dialog.close();
            new Book(inputName, inputAuthor, inputPages, inputStatus).storeBookInArray();
            Book.displayBooks(books.length - 1);
        }

    });
})();

//Event listeners for each book (has to be called everytime a book is made and displayed)
function wireListeners() {
    let deleteButton = [...document.getElementsByClassName('delete-button')];
    let statusarr = [...document.querySelectorAll('.line > img')];

    //Delete Button
    deleteButton.forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.dataset.id;
            const index = books.findIndex(b => b.id === id);
            if (index === -1) return;
            books.splice(index, 1);
            const card = document.querySelector(`.card[data-id="${id}"]`);
            card?.remove();
        });
    });

    //Change status Button
    statusarr.forEach((img) => {
        img.addEventListener('click', () => {
            const id = img.dataset.id;
            const book = books.find(b => b.id === id);
            if (!book) return;
            book.changeStatus();
            if (book.read) {
                img.src = './images/checkbox-marked-circle-outline.svg';
            } else {
                img.src = './images/radiobox-blank.svg';
            }

        });
    });
}


//Some default books to make the page look nice
let tobie = new Book('Tobie Lolness', 'Thimothé de Fombelle', 354, true);
let dune = new Book('Dune', 'Frank Herbert', 810, true);
let karamasov = new Book('Les frères Karamasov', 'Fiodor Dostoïevski', 915, false);
let coeur = new Book("L'attrappe coeur", 'J.D. Salinger', 200, true);
tobie.storeBookInArray();
dune.storeBookInArray();
karamasov.storeBookInArray();
coeur.storeBookInArray();

Book.displayBooks(0);