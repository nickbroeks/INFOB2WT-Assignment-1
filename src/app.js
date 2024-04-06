const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const sessionOptions = { secret: 'SECRET', resave: false, saveUninitialized: true };

const indexRouter = require('./routes/index');
const { getBooks } = require('./db');

const app = express();

app.use(session(sessionOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/index.html', (req, res) => {
    res.redirect('/');
});
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.use('/books', async function (req, res) {
    const books = await getBooks();
    res.json(books);
});
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res) {
    // render the error page
    res.status(err.status || 500);
});

module.exports = app;
