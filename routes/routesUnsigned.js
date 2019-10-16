//File for managing routes and redirects

module.exports = (function() {
    let routes = require('express').Router();

    routes.get('/', function(req, res){
        res.set('Content-Type', 'text/html');
        res.render('main.pug')
    });

    routes.get('/login', function(req, res){
        res.set('Content-Type', 'text/html');
        res.render('login.pug');
    });

    routes.get('*', function(req, res){
        res.status(404).send('Error 404: Page not found')
    });

    routes.post('/login', function(req, res){
        res.send(`Following credentials, login:  ${req.body.loginEmail}, password: ${req.body.loginPassword}`)
        console.log(`Following credentials, login: ${req.body.loginEmail}, password: ${req.body.loginPassword}`)
    })

    routes.post('/register', function(req, res){
        console.log(`${req.body.email} $`)
    })

    return routes;
})();