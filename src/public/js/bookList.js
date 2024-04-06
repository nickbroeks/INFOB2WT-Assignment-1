import { Book, Author, Publisher, readFromAPI } from './book.js';
import { createElementWithClasses } from './utils.js';

/**
 * Fetches the list of books from the server and displays them on the page.
 * @returns {Promise<Book[]>} The list of books.
 */
async function getBooks() {
    const response = await fetch('/books');
    const books = await response.json();
    return books.map((bookData) => {
        const book = readFromAPI(bookData);
        return book;
    });
}

/**
 * Fetches the list of authors from the server.
 * @param {string} bookID The ID of the book to fetch authors for.
 * @returns {Author[]} The list of authors.
 */
async function getAuthors(bookID) {
    const response = await fetch(`/books/${bookID}/authors`);
    const authors = await response.json();
    return authors.map((authorData) => {
        return new Author(authorData.name);
    });
}

/**
 * Fetches the list of publishers from the server.
 * @param {string} bookID The ID of the book to fetch publishers for.
 * @returns {Publisher[]} The list of publishers.
 */
async function getPublishers(bookID) {
    const response = await fetch(`/books/${bookID}/publishers`);
    const publishers = await response.json();
    return publishers.map((publisherData) => {
        return new Publisher(publisherData.name);
    });
}
/**
 * Displays the list of books on the page.
 */
async function displayBooks() {
    const books = await getBooks();
    const bookList = createElementWithClasses('section', [
        'section',
        'section--accent',
        'section--header-margin',
        'book-list',
    ]);
    books.forEach((book) => {
        bookList.appendChild(book.renderCover());
    });

    document.querySelector('main').appendChild(bookList);
}

displayBooks();
