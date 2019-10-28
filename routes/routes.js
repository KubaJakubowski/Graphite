//File for managing routes and redirects

module.exports = (function() {
    let routes = require('express').Router();
    let auth = require('../server/auth.js');


    routes.get('/', (req, res) => {
        res.set('Content-Type', 'text/html');
        res.render('main.pug')
    });

    routes.get('/login',  auth.onlyUnsigned, (req, res) => {
        res.set('Content-Type', 'text/html');
        res.render('login.pug');
    });

    routes.get('/profile', auth.onlyAuthenticated, (req, res) => {
        res.set('Content-Type', 'text/html');
        res.render('profile.pug');
    });

    routes.get('/guide', (req, res) => {
        res.set('Content-Type', 'text/html')
        res.render('guide.pug');
    });

    routes.post('/login', (req, res) => {
        auth.login(req.body, req, res);

    });

    routes.post('/register', (req, res) => {
        auth.register(req.body, req, res);
    });

    routes.post('/signout', auth.onlyAuthenticated, (req, res) => {
        let firebase = require('firebase');
        firebase.auth().signOut().then( () => {
            //successfully signed Out
            res.send({'unsigned':true});
        }).catch((error) => {
            res.send({'unsigned':false});
        })
    });

    routes.get('*', (req, res) => {
        res.status(404).send('Error 404: Page not found')
    });



    return routes;
})();


