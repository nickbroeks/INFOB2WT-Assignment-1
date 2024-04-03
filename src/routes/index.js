const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

router.get('/users', (req, res) => {
    const db = require('../db');
    db.getAllUsers()
        .then((users) => {
            res.json(users);
        })
        .catch(() => {
            res.status(500).send();
        });
});

router.post('/register', async (req, res) => {
    const db = require('../db');
    const { username, password } = req.body;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log(username, password, hashedPassword);
    await db
        .getUser(username)
        .then((user) => {
            if (user) {
                return res.status(409).send();
            }
            return db.createUser(username, hashedPassword);
        })
        .then(() => {
            return res.status(201).send();
        })
        .catch(() => {
            return res.status(500).send();
        });
});

router.post('/login', async (req, res) => {
    const db = require('../db');
    const { username, password } = req.body;
    await db
        .getUser(username)
        .then(async (row) => {
            if (!row) {
                return res.status(401).send();
            } else {
                const match = await bcrypt.compare(password, row.hash);
                if (match) {
                    console.log('Logged in');
                    req.session.name = username;
                    return res.status(200).send();
                } else {
                    return res.status(401).send();
                }
            }
        })
        .catch(() => {
            return res.status(500).send();
        });
});

module.exports = router;
