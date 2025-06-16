const books = [];

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