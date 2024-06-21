const express = require('express');
const passport = require('passport');
const User = require('../models/User');
const router = express.Router();

// Registro de usuario
router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const user = new User({ username, password });
    user.password = await user.encryptPassword(password);
    await user.save();
    res.redirect('/user/login');
});

// Inicio de sesión
router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/user/login',
    failureFlash: true
}));

// Cierre de sesión
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;
