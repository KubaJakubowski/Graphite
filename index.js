let express = require('express');
let bodyParser = require('body-parser');
let app = express();

/* TODO: remove or modify session managment third parties
 let expressSession = require('express-session');
*/

app.locals.title = 'Graphite';
app.locals.version = '1.0.0';

//Firebase initialization
let firebase = require('firebase')
require('firebase/auth')
require('firebase/firestore')

const firebaseConfig = {
    apiKey: "AIzaSyDte34MsG_Q-hqtyDINCb0dNa_tkaxNQvg",
    authDomain: "graphite-node.firebaseapp.com",
    databaseURL: "https://graphite-node.firebaseio.com",
    projectId: "graphite-node",
    storageBucket: "graphite-node.appspot.com",
    messagingSenderId: "392407575158",
    appId: "1:392407575158:web:1e4d5615f20eb8e2f98d57"
};
firebase.initializeApp(firebaseConfig);



app.set('trust proxy','127.0.0.1').enable('trust proxy');
app.disable('strict routing');
app.use(bodyParser.urlencoded({ extended: true }));

//Pug, html templates engine
let pug = require('pug');
app.set('views','./views');
app.set('view engine', 'pug');
app.engine('pug', require('pug').__express);

app.locals.basedir = __dirname

app.listen(8080);

app.use('/', require('./routes'));

