const { randomUUID } = require('crypto');
const fs = require('fs');
const file = 'data.db';
const exists = fs.existsSync(file);

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(file);

db.serialize(function () {
    if (!exists) {
        const initilizing = fs.readFileSync('init.sql', 'utf8');
        db.exec(initilizing, function (res, err) {
            if (res) console.log('Database initialized.');
            if (err) throw new Error('Failed to initialize database.');
        });
    }
});

async function getBooks() {
    return new Promise((resolve, reject) => {
        db.all('SELECT BookID, Title, Genre, Year, CoverImageURL FROM Books', function (err, rows) {
            if (err) reject(err);
            else resolve(rows);
        });
    });
}

async function getUser(name) {
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM Users WHERE name = ?', [name], function (err, row) {
            if (err) reject(err);
            else resolve(row);
        });
    });
}

async function getAllUsers() {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM Users', function (err, rows) {
            if (err) reject(err);
            else resolve(rows);
        });
    });
}

async function createUser(name, hash, email, address) {
    return new Promise((resolve, reject) => {
        db.run(
            'INSERT INTO Users (id, name, hash, email, address) VALUES (?, ?, ?, ?, ?)',
            [randomUUID(), name, hash, email, address],
            function (err) {
                if (err) reject(err);
                else resolve();
            }
        );
    });
}

module.exports = {
    getBooks,
    getUser,
    getAllUsers,
    createUser,
};
