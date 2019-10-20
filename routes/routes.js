//File for managing routes and redirects

module.exports = (function() {
    let routes = require('express').Router();

    routes.get('/', function(req, res){
        res.set('Content-Type', 'text/html');
        res.render('main.pug')
    });

    routes.get('/login',  onlyUnsigned, function(req, res){
        res.set('Content-Type', 'text/html');
        res.render('login.pug');
    })

    routes.get('/profile', onlyAuthenticated, function(req, res){
        res.set('Content-Type', 'text/html');
        res.render('profile.pug');
    });

    routes.post('/login', function(req, res){
        console.log(`Following credentials, login: ${req.body.email}, password: ${req.body.password}`);
        auth.login(req.body);
    });

    routes.post('/register', function(req, res){
        console.log(`${req.body.email} $`);
        auth.register(req.body);
    });

    routes.get('*', function(req, res){
        res.status(404).send('Error 404: Page not found')
    });

    let auth = require('../server/auth.js');

    return routes;
})();

function onlyAuthenticated(req, res, next) {
    let firebase = require('firebase');
    if( firebase.auth().currentUser){
        return next();
    }
    res.redirect('/login');
}

function onlyUnsigned(req, res, next) {
    let firebase = require('firebase');
    if( firebase.auth().currentUser == null){
        return next();
    }
    res.redirect('/profile');
}