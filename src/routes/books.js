const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware');
const db = require('../db');

router.get('/', async function (req, res) {
    const books = await db.getBooks();
    res.json(books);
});

router.get('/:bookID/authors', async function (req, res) {
    const authors = await db.getAuthors(req.params.bookID);
    res.json(authors);
});

router.get('/:bookID/publishers', async function (req, res) {
    const publishers = await db.getPublishers(req.params.bookID);
    res.json(publishers);
});
module.exports = router;
