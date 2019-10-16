//File for managing routes and redirects

module.exports = (function() {
    let routes = require('express').Router();

    routes.get('/', function(req, res){
        res.set('Content-Type', 'text/html');
        res.render('main.pug')
    });

    routes.get('/profile', function(req, res){
        res.set('Content-Type', 'text/html');
        res.render('profile.pug');
    });

    routes.get('*', function(req, res){
        res.set('Content-Type', 'text/html');
        res.redirect('/profile');
    });




    return routes;
})();
