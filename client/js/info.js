//#region Classes
class Person {
    #name;
    #yearOfBirth;
    #picture;

    /**
     * @param {string} name
     * @param {number} yearOfBirth
     * @param {string} [picture]
     */
    constructor(name, yearOfBirth, picture = null) {
        this.#name = name;
        this.#yearOfBirth = yearOfBirth;
        this.#picture = picture;
    }

    /**
     * @returns {string}
     */
    get name() {
        return this.#name;
    }

    /**
     * @returns {number}
     */
    get yearOfBirth() {
        return this.#yearOfBirth;
    }

    /**
     * @returns {string}
     */
    get picture() {
        return this.#picture;
    }
}

class Author extends Person {
    #titles;
    #wikipediaPage;

    /**
     * @param {string} name
     * @param {number} yearOfBirth
     * @param {string} picture
     * @param {string[]} titles
     * @param {string} wikipediaPage
     */
    constructor(name, yearOfBirth, picture, titles, wikipediaPage) {
        super(name, yearOfBirth, picture);
        this.#titles = titles;
        this.#wikipediaPage = wikipediaPage;
    }

    /**
     * @returns {string[]}
     */
    get titles() {
        return this.#titles;
    }

    /**
     * @returns {string}
     */
    get wikipediaPage() {
        return this.#wikipediaPage;
    }
}

class Company {
    #name;
    #wikipediaPage;

    /**
     * @param {string} name
     * @param {string} wikipediaPage
     */
    constructor(name, wikipediaPage) {
        this.#name = name;
        this.#wikipediaPage = wikipediaPage;
    }

    /**
     * @returns {string}
     */
    get name() {
        return this.#name;
    }

    /**
     * @returns {string}
     */
    get wikipediaPage() {
        return this.#wikipediaPage;
    }
}

class Publisher extends Company {
    #publishedBooks;

    /**
     * @param {string} name
     * @param {string} wikipediaPage
     * @param {string[]} publishedBooks
     */
    constructor(name, wikipediaPage, publishedBooks) {
        super(name, wikipediaPage);
        this.#publishedBooks = publishedBooks;
    }

    /**
     * @returns {string[]}
     */
    get publishedBooks() {
        return this.#publishedBooks;
    }
}

class CreativeWork {
    #title;
    #year;
    #authors;

    /**
     * @param {string} title
     * @param {number} year
     * @param {Author[]} authors
     */
    constructor(title, year, authors) {
        this.#title = title;
        this.#year = year;
        this.#authors = authors;
    }
    /**
     * @returns {string}
     */
    get title() {
        return this.#title;
    }
    /**
     * @returns {number}
     */
    get year() {
        return this.#year;
    }
    /**
     * @returns {Author[]}
     */
    get authors() {
        return this.#authors;
    }
}

class Book extends CreativeWork {
    #genre;
    #publisher;
    #cover;
    #plot;

    /**
     * @param {string} title
     * @param {string} genre
     * @param {number} year
     * @param {Author[]} authors
     * @param {Publisher} publisher
     * @param {string} cover
     * @param {string} plot
     */
    constructor(title, genre, year, authors, publisher, cover, plot) {
        super(title, year, authors);
        this.#genre = genre;
        this.#publisher = publisher;
        this.#cover = cover;
        this.#plot = plot;
    }

    /**
     * @returns {string}
     */
    get genre() {
        return this.#genre;
    }

    /**
     * @returns {Publisher}
     */
    get publisher() {
        return this.#publisher;
    }

    /**
     * @returns {string}
     */
    get cover() {
        return this.#cover;
    }

    get plot() {
        return this.#plot;
    }
}
//#endregion

function createBook() {
    const author1 = new Author(
        'George R. R. Martin',
        1948,
        'img/george_r_r_martin.webp',
        ['A Song of Ice and Fire', 'Wild Cards', 'The Thousand World', 'Path of the Dragon'],
        'https://en.wikipedia.org/wiki/George_R._R._Martin'
    );
    const author2 = new Author(
        'Elena Ferrante',
        1943,
        'img/elena_ferrante.jpg',
        ['A Song of Ice and Fire', 'The Days of Abandonment', 'Neapolitan Novels'],
        'https://en.wikipedia.org/wiki/Elena_Ferrante'
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
        [author1, author2],
        publisher,
        'img/cover.jpg',
        'A Song of Ice and Fire takes place in a fictional world in which seasons last for years and end unpredictably. Nearly three centuries before the events of the first novel, the Seven Kingdoms of Westeros were united under the Targaryen dynasty, establishing military supremacy through their control of dragons. The Targaryens ruled for three hundred years, continuing beyond the extinction of the dragons. Their dynasty eventually ended with a rebellion led by Lord Robert Baratheon, in which Aerys II "the Mad King" Targaryen was killed and Robert proclaimed king of the Seven Kingdoms. At the beginning of A Game of Thrones, 15 years have passed since Robert\'s rebellion, with a nine-year-long summer coming to an end.'
    );

    return book;
}

function renderPage() {
    const main = document.querySelector('main');

    const book = createBook();

    const titleSection = renderTitleSection(book);
    const bookSection = renderBookSection(book);
    const authorSection = renderAuthorSection(book);
    const publisherSection = renderPublisherSection(book);

    main.appendChild(titleSection);
    main.appendChild(bookSection);
    main.appendChild(authorSection);
    main.appendChild(publisherSection);
}

/**
 * @param {Book} book
 * @returns {HTMLDivElement}
 */
function renderTitleSection(book) {
    const titleSection = document.createElement('section');
    titleSection.classList.add('section', 'section--accent', 'body__content--padding-top');
    const bookTitle = document.createElement('h1');
    bookTitle.classList.add('title');
    bookTitle.textContent = book.title;

    titleSection.appendChild(bookTitle);
    return titleSection;
}
/**
 * @param {Book} book
 * @returns {HTMLDivElement}
 */
function renderBookSection(book) {
    const bookSection = document.createElement('section');
    bookSection.classList.add('section', 'section--accent', 'section--no-padding-mobile', 'book-section');

    const bookSectionLeft = document.createElement('div');
    bookSectionLeft.classList.add('book-section__info');

    const plotTitle = document.createElement('h2');
    plotTitle.classList.add('header-medium');
    plotTitle.textContent = `The Plot`;

    const bookPlot = document.createElement('p');
    bookPlot.textContent = book.plot;

    const bookCover = document.createElement('img');
    bookCover.classList.add('book-section__cover');
    bookCover.src = book.cover;
    bookCover.alt = `Cover of the book ${book.title}`;

    bookSectionLeft.appendChild(plotTitle);
    bookSectionLeft.appendChild(bookPlot);
    bookSection.appendChild(bookSectionLeft);
    bookSection.appendChild(bookCover);

    return bookSection;
}

/**
 * @param {Book} book
 * @returns {HTMLDivElement}
 */
function renderAuthorSection(book) {
    const authorSection = document.createElement('section');
    authorSection.classList.add('section', 'section--alt');

    const authorTitle = document.createElement('h2');
    authorTitle.classList.add('header-medium');
    authorTitle.textContent = 'Authors';

    const authorsList = document.createElement('div');
    authorsList.classList.add('authors');
    book.authors.forEach((author) => {
        authorsList.appendChild(renderAuthor(author));
    });

    authorSection.appendChild(authorTitle);
    authorSection.appendChild(authorsList);
    return authorSection;
}

/**
 * @param {Author} author
 * @param {boolean} isEven
 * @returns {HTMLDivElement}
 */
function renderAuthor(author) {
    const authorBlock = document.createElement('div');
    authorBlock.classList.add('author');
    const authorTitle = document.createElement('h2');
    authorTitle.classList.add('header-medium');
    authorTitle.textContent = author.name;

    const authorImage = document.createElement('img');
    authorImage.classList.add('author__image');
    authorImage.src = author.picture;
    authorImage.alt = `Picture of ${author.name}`;

    authorBlock.appendChild(authorTitle);
    authorBlock.appendChild(authorImage);
    renderAuthorTooltip(authorBlock, author);
    return authorBlock;
}

/**
 * @param {HTMLElement} authorBlock
 * @param {Author} author
 */
function renderAuthorTooltip(authorBlock, author) {
    const extendInfo = document.createElement('p');
    const birithdayContent = document.createTextNode('Birthday: ' + author.yearOfBirth);
    const nameContent = document.createTextNode('Name: ' + author.name);
    const titlesContent = document.createTextNode('Books Written: ' + author.titles.join(', '));
    const clickContent = document.createTextNode('Click to learn more');

    extendInfo.appendChild(nameContent);
    extendInfo.appendChild(document.createElement('br'));
    extendInfo.appendChild(titlesContent);
    extendInfo.appendChild(document.createElement('br'));
    extendInfo.appendChild(birithdayContent);
    extendInfo.appendChild(document.createElement('br'));
    extendInfo.appendChild(clickContent);
    extendInfo.addEventListener('click', () => {
        // Is this "Event propagation"? first mouseover authorBlock, then click extendInfo
        window.open(author.wikipediaPage, '_blank');
    });
    attachTooltip(authorBlock, extendInfo);
}

/**
 * @param {Book} book
 * @returns {HTMLDivElement}
 */
function renderPublisherSection(book) {
    const publisherSection = document.createElement('section');
    publisherSection.classList.add('section', 'section--accent');

    const publisherTitle = document.createElement('h2');
    publisherTitle.classList.add('header-medium');
    publisherTitle.textContent = 'Publisher';

    const publisherInfo = document.createElement('div');
    publisherInfo.classList.add('publisher');

    const bookList = document.createElement('ul');
    bookList.classList.add('publisher__books');
    book.publisher.publishedBooks.forEach((book) => {
        const bookItem = document.createElement('li');
        bookItem.classList.add('text-large', 'list-item--no-bullets');
        bookItem.textContent = book;
        bookList.appendChild(bookItem);
    });

    const publisherName = document.createElement('h3');
    publisherName.classList.add('publisher__name');
    const splitName = book.publisher.name.split(' ');
    publisherName.textContent = splitName.shift();
    splitName.forEach((part) => {
        publisherName.appendChild(document.createElement('br'));
        publisherName.appendChild(document.createTextNode(part));
    });

    publisherSection.appendChild(publisherTitle);
    publisherInfo.appendChild(bookList);
    publisherInfo.appendChild(publisherName);
    publisherSection.appendChild(publisherInfo);
    renderPublisherTooltip(publisherInfo, book.publisher);
    return publisherSection;
}

/**
 * @param {HTMLElement} publisherBlock
 * @param {Publisher} publisher
 */
function renderPublisherTooltip(publisherBlock, publisher) {
    const extendInfo = document.createElement('p');
    const nameContent = document.createTextNode('Name: ' + publisher.name);
    const clickContent = document.createTextNode('Click to learn more');

    extendInfo.appendChild(nameContent);
    extendInfo.appendChild(document.createElement('br'));
    extendInfo.appendChild(clickContent);
    extendInfo.addEventListener('click', () => {
        window.open(publisher.wikipediaPage, '_blank');
    });
    attachTooltip(publisherBlock, extendInfo);
}

/**
 * @param {HTMLElement} container
 * @param {HTMLElement} tooltip
 */
function attachTooltip(container, tooltip) {
    container.classList.add('js-tooltip-container');
    tooltip.classList.add('js-tooltip');
    container.appendChild(tooltip);

    container.addEventListener('mouseenter', () => {
        tooltip.classList.add('js-tooltip--display');
        setTimeout(() => {
            tooltip.classList.add('js-tooltip--visible');
        }, 0);
    });

    container.addEventListener('mouseleave', () => {
        tooltip.classList.remove('js-tooltip--visible');
        setTimeout(() => {
            if (!tooltip.classList.contains('js-tooltip--visible')) {
                tooltip.classList.remove('js-tooltip--display');
            }
        }, 1000);
    });
}

renderPage();
