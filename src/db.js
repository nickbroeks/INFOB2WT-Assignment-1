const fs = require('fs');
const file = 'data.db';
const exists = fs.existsSync(file);

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(file);

db.serialize(function () {
    if (!exists) {
        db.run('CREATE TABLE Users (id INTEGER PRIMARY KEY, name TEXT, hash TEXT)');
    }
});

db.close();

module.exports = db;
