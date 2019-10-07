//File for managing routes and redirects

module.exports = (function() {
    let routes = require('express').Router();

    routes.get('/', function(req, res){
        res.set('Content-Type', 'text/html');
        res.render('Base.pug')
    });

    routes.get('/login', function(req, res){
        res.set('Content-Type', 'text/html');
        res.send('Login page');
    });

    routes.get('*', function(req, res){
        res.status(404).send('Error 404: Page not found')
    });

    return routes;
})();

