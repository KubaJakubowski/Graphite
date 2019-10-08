let express = require('express');
let pug = require('pug');

let app = express();
app.locals.title = 'Graphite';
app.locals.version = '1.0.0';

app.set('trust proxy','127.0.0.1').enable('trust proxy');
app.disable('strict routing');

app.set('views','./views');
app.set('view engine', 'pug');
app.engine('pug', require('pug').__express);
app.locals.basedir = __dirname

app.listen(8080);

app.use('/', require('./routes'));

