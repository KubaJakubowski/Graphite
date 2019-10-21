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
    });

    routes.get('/profile', onlyAuthenticated, function(req, res){
        res.set('Content-Type', 'text/html');
        res.render('profile.pug');
    });

    routes.post('/login', function(req, res){
        auth.login(req.body, req, res);

    });

    routes.post('/register', function(req, res){
        auth.register(req.body, req, res);
    });

    routes.post('/signout', onlyAuthenticated, function(req, res){
        let firebase = require('firebase');
        firebase.auth().signOut().then( () => {
            //successfully signed Out
            res.send({'unsigned':true});
        }).catch((error) => {
            res.send({'unsigned':false});
        })
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
