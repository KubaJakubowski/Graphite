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
        console.log(`Following credentials, login: ${req.body.email}, password: ${req.body.password}`);
        login(req.body);
    });

    routes.post('/register', function(req, res){
        console.log(`${req.body.email} $`)
        register(req.body);

    });

    return routes;
})();

function login(data){
    try{
        if(data.email == "" || data.password == "")
            throw new Error('Failed to login user with following credentials');
        else{
            firebase.auth().signInWithEmailAndPassword(data.email, data.password).catch(function(error){
                throw new Error(error.code.toString()+": " + error.message.toString());
            })
            console.log("nigga")
        }
    } catch(error) {
        console.log(error);
    }
}

function register(data){}