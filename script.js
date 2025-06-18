const books = [];
const container = document.querySelector('section');

function Book(title, author, pages, read) {
    if (!new.target) {
        throw Error('You must have the keyword "new" to call this constructor');
    }
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
}

function storeBookInArray(Book) {
    books.push(Book);
}

function displayBooks() {
    for (let book of books) {
        //Create header and footer template
        const card = document.createElement("div");
        card.className = 'card';
        const cardHeader = document.createElement('div');
        cardHeader.className = 'card-header';
        const bookInfo = document.createElement('div');
        bookInfo.className = 'book-info';
        card.appendChild(cardHeader);
        card.appendChild(bookInfo);

        //Add Header content
        const title = document.createElement('h1');
        title.textContent = book.title;
        const bookImage = document.createElement('img');
        bookImage.src = './images/book-open-page-variant-outline.svg';
        const deleteIcon = document.createElement('img');
        deleteIcon.src = './images/trash-can-outline.svg';
        cardHeader.appendChild(bookImage);
        cardHeader.appendChild(title);
        cardHeader.appendChild(deleteIcon);

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
        authorName.textContent = book.author;

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
        pagesNumber.textContent = book.pages;

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
        if (book.read) {
            statusState.src = './images/checkbox-marked-circle-outline.svg';
        } else {
            statusState.src = './images/radiobox-blank.svg';
        }

        statusTag.appendChild(statusIcon);
        statusTag.appendChild(statusTagText);
        statusLine.appendChild(statusTag);
        statusLine.appendChild(statusState);
        bookInfo.appendChild(statusLine);
        

        container.appendChild(card);
    }
}

let test = new Book('random', 'Teoslip', 354, true);
storeBookInArray(test);
displayBooks();