CREATE TABLE Users (id INTEGER PRIMARY KEY, name TEXT, hash TEXT);
CREATE TABLE Sessions (id INTEGER PRIMARY KEY, user_id INTEGER, token TEXT);
CREATE TABLE Books (id INTEGER PRIMARY KEY, title TEXT);
CREATE TABLE Authors (id INTEGER PRIMARY KEY, name TEXT, year INTEGER, imageURL TEXT);
CREATE TABLE BooksAuthors (book_id INTEGER, author_id INTEGER);
INSERT INTO Users (id, name, hash) VALUES
    (1, "user1", "$2b$10$HUoglT/N2aoQFuXcwwTFSeU5C4ltJxP/H3SM0pvJjBhH5koNt6MpO"),
    (2, "user2", "$2b$10$4gD1e5hwMA0jmy1bWPACl.IMFvlVt15QC3jPYvWD11/1YFWQMNREa"),
    (3, "user3", "$2b$10$oGqhulDtlfO7SvGz90vM9eZBdz48T.C8r5mKl90BwXMec0BqikZWu"),
    (4, "user4", "$2b$10$cJoo7rLCWGS80tKH0jCwBuOv1RsPVkHbfxtnP5DugcZj9ksRvKNJO"),
    (5, "user5", "$2b$10$nABdRYKK648cKpi6c6GMKeJZyTr8ze2kHMx5yvhxvpjUsmhJwl2qS");
INSERT INTO Books (title) VALUES ("The Great Gatsby"), ("The Catcher in the Rye"), ("To Kill a Mockingbird");