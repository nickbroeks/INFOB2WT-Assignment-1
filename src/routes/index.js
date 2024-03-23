const express = require('express');
const router = express.Router();

router.get('/users', (req, res) => {
    const db = require('../db');
    db.all('SELECT * FROM Users', (err, rows) => {
        if (err) {
            res.status;
        }
        res.json(rows);
    });
});

router.post('/register', (req, res) => {
    const db = require('../db');
    const { name, hash } = req.body;
    db.get('SELECT * FROM Users WHERE name = ?', [name], (err, row) => {
        if (err) {
            return res.status(500).send();
        }
        if (row) {
            return res.status(409).send();
        }
        db.run('INSERT INTO Users (name, hash) VALUES (?, ?)', [name, hash], (err) => {
            if (err) {
                return res.status(400).send();
            } else {
                return res.status(201).send();
            }
        });
    });
});

router.post('/login', (req, res) => {
    const db = require('../db');
    const { name, hash } = req.body;
    db.get('SELECT * FROM Users WHERE name = ? AND hash = ?', [name, hash], (err, row) => {
        if (err) {
            res.status(500).send();
        }
        if (row) {
            req.session.name = name;
            res.status(200).send();
        } else {
            res.status(401).send();
        }
    });
});

module.exports = router;
