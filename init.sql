CREATE TABLE Users (id TEXT PRIMARY KEY, name TEXT, hash TEXT);
CREATE TABLE Sessions (id INTEGER PRIMARY KEY, user_id INTEGER, token TEXT);
CREATE TABLE Books (id INTEGER PRIMARY KEY, title TEXT);
CREATE TABLE Authors (id INTEGER PRIMARY KEY, name TEXT, year INTEGER, imageURL TEXT);
CREATE TABLE BooksAuthors (book_id INTEGER, author_id INTEGER);
INSERT INTO Users (id, name, hash) VALUES
    ("4dea5a94-92b1-41e9-8fa4-f7a69680fbb3", "user1", "$2b$10$57TmZMb3R3S8ArtA9y2XZeX0s/hIer0qmlljvCVlfn7kIQ1zHvWD."),
    ("5a3b749a-fd1d-499d-9709-3189df034c0e", "user2", "$2b$10$kvoM2g1kWSCdwaBBYPaPWO4a2AaIl/i1O3eixWP9nupf4ZX3LT77."),
    ("7296bc11-0676-4b64-b042-044a3a9a801b", "user3", "$2b$10$P3vwlj95uvEKyPGeBI0puOEci3WJOYs62nT7TsEnmvShyXUAW6Guy"),
    ("10892d71-ba36-4a72-88f6-915fb6e8b6e0", "user4", "$2b$10$FqkitUiL609MEhfPIv934ebKrwdBKzzWKHkTnEH8if2WhwrfEtgfy"),
    ("9fb05aaf-1b02-4c9b-8395-28b2f95410ac", "user5", "$2b$10$53fyieag2/CwXRUCbJ6waeHC5f/O6r1Oo2CP07fo3CZ.myQA8my32");
INSERT INTO Books (title) VALUES ("The Great Gatsby"), ("The Catcher in the Rye"), ("To Kill a Mockingbird");