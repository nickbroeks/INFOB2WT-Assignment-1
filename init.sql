CREATE TABLE Users (id INTEGER PRIMARY KEY, name TEXT, hash TEXT);
CREATE TABLE Sessions (id INTEGER PRIMARY KEY, user_id INTEGER, token TEXT);
CREATE TABLE Books (id INTEGER PRIMARY KEY, title TEXT);
CREATE TABLE Authors (id INTEGER PRIMARY KEY, name TEXT, year INTEGER, imageURL TEXT);
CREATE TABLE BooksAuthors (book_id INTEGER, author_id INTEGER);
INSERT INTO Books (title) VALUES ("The Great Gatsby"), ("The Catcher in the Rye"), ("To Kill a Mockingbird");