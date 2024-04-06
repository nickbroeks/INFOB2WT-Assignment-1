import { Book, Author, Publisher } from './book.js';

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
        1,
        'A Song of Ice and Fire',
        'fantasy',
        1996,
        'img/cover.jpg',
        'A Song of Ice and Fire takes place in a fictional world in which seasons last for years and end unpredictably. Nearly three centuries before the events of the first novel, the Seven Kingdoms of Westeros were united under the Targaryen dynasty, establishing military supremacy through their control of dragons. The Targaryens ruled for three hundred years, continuing beyond the extinction of the dragons. Their dynasty eventually ended with a rebellion led by Lord Robert Baratheon, in which Aerys II "the Mad King" Targaryen was killed and Robert proclaimed king of the Seven Kingdoms. At the beginning of A Game of Thrones, 15 years have passed since Robert\'s rebellion, with a nine-year-long summer coming to an end.',
        [author1, author2],
        publisher
    );

    return book;
}

createBook().render();
