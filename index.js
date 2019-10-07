let http = require('http');
let express = require('express');
let app = express();

app.set('trust proxy','127.0.0.1').enable();
app.disable('strict routing');
app.set('view engine', 'pug');

app.listen(8080);

app.get('/', function(req, res){
    res.set('Content-Type', 'text/html');
    res.send('Main page');
});

app.get('/login', function(req, res){
    res.set('Content-Type', 'text/html');
    res.send('Login page');
});

app.get('*', function(req, res){
    res.send(404,'Error 404: Page not found');
});