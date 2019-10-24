//File for managing routes and redirects

module.exports = (function() {
    let routes = require('express').Router();
    let auth = require('../server/auth.js');


    routes.get('/', function(req, res){
        res.set('Content-Type', 'text/html');
        res.render('main.pug')
    });

    routes.get('/login',  auth.onlyUnsigned, function(req, res){
        res.set('Content-Type', 'text/html');
        res.render('login.pug');
    });

    routes.get('/profile', auth.onlyAuthenticated, function(req, res){
        res.set('Content-Type', 'text/html');
        res.render('profile.pug');
    });

    routes.get('/guide', (req, res) => {
        res.set('Content-Type', 'text/html')
        res.render('guide.pug');
    });

    routes.post('/login', function(req, res){
        auth.login(req.body, req, res);

    });

    routes.post('/register', function(req, res){
        auth.register(req.body, req, res);
    });

    routes.post('/signout', auth.onlyAuthenticated, function(req, res){
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



    return routes;
})();


