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

    /**
     * @returns {HTMLElement}
     */
    renderAuthor() {
        const authorBlock = createElementWithClasses('div', ['author']);
        const authorTitle = createElementWithClasses('h2', ['header-medium']);
        authorTitle.textContent = this.name;

        const authorImage = createElementWithClasses('img', ['author__image']);
        authorImage.src = this.picture;
        authorImage.alt = `Picture of ${this.name}`;

        authorBlock.appendChild(authorTitle);
        authorBlock.appendChild(authorImage);
        this.renderAuthorTooltip(authorBlock);

        return authorBlock;
    }

    renderAuthorTooltip(authorBlock) {
        const extendInfo = document.createElement('p');
        const birithdayContent = 'Birthday: ' + this.yearOfBirth;
        const nameContent = 'Name: ' + this.name;
        const titlesContent = 'Books Written: ' + this.titles.join(', ');
        const clickContent = 'Click to learn more';

        addTextsWithBreaks(extendInfo, [nameContent, titlesContent, birithdayContent, clickContent]);
        extendInfo.addEventListener('click', () => {
            // Is this "Event propagation"? first mouseover authorBlock, then click extendInfo
            window.open(this.wikipediaPage, '_blank');
        });
        attachTooltip(authorBlock, extendInfo);
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

    /**
     * @returns {HTMLElement}
     */
    renderPublisherSection() {
        const publisherSection = createElementWithClasses('section', ['section', 'section--accent']);

        const publisherTitle = createElementWithClasses('h2', ['header-medium']);
        publisherTitle.textContent = 'Publisher';
        publisherSection.appendChild(publisherTitle);

        const publisherInfo = createElementWithClasses('div', ['publisher']);

        const bookList = createElementWithClasses('ul', ['publisher__books']);
        this.publishedBooks.forEach((book) => {
            const bookItem = createElementWithClasses('li', ['text-large', 'list-item--no-bullets']);
            bookItem.textContent = book;
            bookList.appendChild(bookItem);
        });
        const publisherName = createElementWithClasses('h3', ['publisher__name']);
        const splitName = this.name.split(' ');
        addTextsWithBreaks(publisherName, splitName);

        publisherInfo.appendChild(bookList);
        publisherInfo.appendChild(publisherName);

        publisherSection.appendChild(publisherInfo);
        this.renderPublisherTooltip(publisherInfo);

        return publisherSection;
    }

    renderPublisherTooltip(publisherBlock) {
        const extendInfo = document.createElement('p');
        const nameContent = 'Name: ' + this.name;
        const clickContent = 'Click to learn more';

        addTextsWithBreaks(extendInfo, [nameContent, clickContent]);
        extendInfo.addEventListener('click', () => {
            window.open(this.wikipediaPage, '_blank');
        });
        attachTooltip(publisherBlock, extendInfo);
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
    #root;
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
        this.#root = document.querySelector('main');
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

    render() {
        this.renderTitleSection();
        this.renderBookSection();
        this.renderAuthorSection();
        this.renderPublisherSection();
    }

    renderTitleSection() {
        const titleSection = createElementWithClasses('section', [
            'section',
            'section--accent',
            'body__content--padding-top',
        ]);
        const bookTitle = createElementWithClasses('h1', ['title']);
        bookTitle.textContent = this.title;

        titleSection.appendChild(bookTitle);
        this.#root.appendChild(titleSection);
    }

    renderBookSection() {
        const bookSection = createElementWithClasses('section', [
            'section',
            'section--accent',
            'section--no-padding-mobile',
            'book-section',
        ]);
        const bookSectionLeft = createElementWithClasses('div', ['book-section__info']);

        const plotTitle = createElementWithClasses('h2', ['header-medium']);
        plotTitle.textContent = `The Plot`;

        const bookPlot = document.createElement('p');
        bookPlot.textContent = this.plot;

        const bookCover = createElementWithClasses('img', ['book-section__cover']);
        bookCover.src = this.cover;
        bookCover.alt = `Cover of the book ${this.title}`;

        bookSectionLeft.appendChild(plotTitle);
        bookSectionLeft.appendChild(bookPlot);
        bookSection.appendChild(bookSectionLeft);
        bookSection.appendChild(bookCover);

        this.#root.appendChild(bookSection);
    }

    renderAuthorSection() {
        const authorSection = createElementWithClasses('section', ['section', 'section--alt']);
        const authorTitle = createElementWithClasses('h2', ['header-medium']);
        authorTitle.textContent = 'Authors';

        const authorsList = createElementWithClasses('div', ['authors']);
        this.authors.forEach((author) => {
            authorsList.appendChild(author.renderAuthor());
        });

        authorSection.appendChild(authorTitle);
        authorSection.appendChild(authorsList);
        this.#root.appendChild(authorSection);
    }

    renderPublisherSection() {
        this.#root.appendChild(this.publisher.renderPublisherSection());
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

/**
 * @param {HTMLElement} element
 * @param {string[]} texts
 */
function addTextsWithBreaks(element, texts) {
    let isFirst = true;
    texts.forEach((text) => {
        if (!isFirst) {
            element.appendChild(document.createElement('br'));
        } else {
            isFirst = false;
        }
        element.appendChild(document.createTextNode(text));
    });
}

/**
 * @param {string} tag
 * @param {string[]} classes
 * @returns {HTMLElement}
 */
function createElementWithClasses(tag, classes) {
    const element = document.createElement(tag);
    element.classList.add(...classes);
    return element;
}
createBook().render();
