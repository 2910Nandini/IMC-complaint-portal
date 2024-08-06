const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('homepage');             //rendering home page
});

router.get('/userlogin', (req, res) => {
    res.render('userlogin');  
});

router.get('/dashboard', (req, res) => {
    res.render('dashboard'); 
});

router.get('/filecomplaint', (req, res) => {
    res.render('filecomplaint'); 
});

router.get('/mycomplaint', (req, res) => {
    res.render('mycomplaint'); 
});

router.get('/', (req, res) => {
    res.render('admindash'); 
});

router.get('/totaladmin', (req, res) => {
    res.render('totaladmin'); 
});

module.exports = router;