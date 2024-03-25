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
        db.all('SELECT * FROM Books', function (err, rows) {
            if (err) reject(err);
            else resolve(rows);
        });
    });
}

module.exports = {
    getBooks,
};
