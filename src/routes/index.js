const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { isAuthenticated } = require('../middleware');
const db = require('../db');

const saltRounds = 10;

router.get('/users', isAuthenticated, (req, res) => {
    db.getAllUsers()
        .then((users) => {
            res.json(users);
        })
        .catch(() => {
            res.status(500).send();
        });
});

router.get('/user', isAuthenticated, (req, res) => {
    res.json({ user: req.session.user });
});
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        console.log(username, password, hashedPassword);
        const user = await db.getUser(username);
        if (user) {
            return res.status(409).send();
        }
        await db.createUser(username, hashedPassword);
        return res.status(201).send();
    } catch (err) {
        return res.status(501).send();
    }
});

router.post('/login', express.urlencoded({ extended: false }), async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await db.getUser(username);
        if (!user) {
            return next({ status: 401 });
        }
        const match = await bcrypt.compare(password, user.hash);
        if (!match) {
            return next({ status: 401 });
        }
        req.session.regenerate(function (err) {
            if (err) return next(err);
            // store user information in session, typically a user id
            req.session.user = username;

            // save the session before redirection to ensure page
            // load does not happen before session is saved
            req.session.save(function (err) {
                if (err) return next(err);
                return res.redirect('/');
            });
        });
    } catch (err) {
        return next(err);
    }
});

router.post('/logout', isAuthenticated, (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;
