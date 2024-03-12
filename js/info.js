class Person {
    #name;
    #yearOfBirth;

    constructor(name, yearOfBirth) {
        this.#name = name;
        this.#yearOfBirth = yearOfBirth;
    }

    get name() {
        return this.#name;
    }

    get yearOfBirth() {
        return this.#yearOfBirth;
    }
}

class Author extends Person {
    #titles;
    #wikipediaPage;

    constructor(name, yearOfBirth, titles, wikipediaPage) {
        super(name, yearOfBirth);
        this.#titles = titles;
        this.#wikipediaPage = wikipediaPage;
    }

    get titles() {
        return this.#titles;
    }

    get wikipediaPage() {
        return this.#wikipediaPage;
    }
}

class Company {
    #name;
    #wikipediaPage;

    constructor(name, wikipediaPage) {
        this.#name = name;
        this.#wikipediaPage = wikipediaPage;
    }

    get name() {
        return this.#name;
    }

    get wikipediaPage() {
        return this.#wikipediaPage;
    }
}

class Publisher extends Company {
    #publishedBooks;

    constructor(name, wikipediaPage, publishedBooks) {
        super(name, wikipediaPage);
        this.#publishedBooks = publishedBooks;
    }

    get publishedBooks() {
        return this.#publishedBooks;
    }
}

class CreativeWork {
    #title;
    #year;
    #authors;

    constructor(title, year, authors) {
        this.#title = title;
        this.#year = year;
        this.#authors = authors;
    }

    get title() {
        return this.#title;
    }

    get year() {
        return this.#year;
    }

    get authors() {
        return this.#authors;
    }
}

class Book extends CreativeWork {
    #genre;
    #publisher;
    #cover;
    #plot;

    constructor(title, genre, year, authors, publisher, cover, plot) {
        super(title, year, authors);
        this.#genre = genre;
        this.#publisher = publisher;
        this.#cover = cover;
        this.#plot = plot;
    }

    get genre() {
        return this.#genre;
    }

    get publisher() {
        return this.#publisher;
    }

    get cover() {
        return this.#cover;
    }

    get plot() {
        return this.#plot;
    }
}

function createBook() {
    const author = new Author(
        'George R. R. Martin',
        1948,
        ['A Song of Ice and Fire'],
        'https://en.wikipedia.org/wiki/George_R._R._Martin'
    );
    const publisher = new Publisher('Bantam Books', 'https://en.wikipedia.org/wiki/Bantam_Books', [
        'A Song of Ice and Fire',
        'Nanny Needed',
        'All dressed up',
        'Steel Fear',
    ]);
    const book = new Book(
        'A Song of Ice and Fire',
        'fantasy',
        1996,
        [author],
        publisher,
        '/img/cover.jpg',
        'A Song of Ice and Fire takes place in a fictional world in which seasons last for years and end unpredictably. Nearly three centuries before the events of the first novel, the Seven Kingdoms of Westeros were united under the Targaryen dynasty, establishing military supremacy through their control of dragons. The Targaryens ruled for three hundred years, continuing beyond the extinction of the dragons. Their dynasty eventually ended with a rebellion led by Lord Robert Baratheon, in which Aerys II "the Mad King" Targaryen was killed and Robert proclaimed king of the Seven Kingdoms. At the beginning of A Game of Thrones, 15 years have passed since Robert\'s rebellion, with a nine-year-long summer coming to an end.'
    );

    return book;
}

function renderPage() {
    const main = document.querySelector('main');

    const book = createBook();

    const bookSection = document.createElement('section');
    bookSection.classList.add('section', 'section--accent', 'section--no-padding-mobile', 'book-section');

    const bookSectionLeft = document.createElement('div');
    bookSectionLeft.classList.add('book-section__info');

    const bookTitle = document.createElement('h1');
    bookTitle.classList.add('header-large');
    bookTitle.textContent = book.title;

    const bookPlot = document.createElement('p');
    bookPlot.textContent = book.plot;

    const bookCover = document.createElement('img');
    bookCover.classList.add('book-section__cover');
    bookCover.src = book.cover;
    bookCover.alt = `Cover of the book ${book.title}`;

    const authorSection = document.createElement('section');
    authorSection.classList.add('section', 'section--alt');

    bookSectionLeft.appendChild(bookTitle);
    bookSectionLeft.appendChild(bookPlot);
    bookSection.appendChild(bookSectionLeft);
    bookSection.appendChild(bookCover);
    main.appendChild(bookSection);
}

renderPage();
