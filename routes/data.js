//File for managing routes and redirects

module.exports = (() =>{
    let routes = require('express').Router();
    let auth = require('../server/auth.js');
    let db = require('../server/db.js');

    routes.post('/getDocuments', (req, res) => {
        res.set('Content-Type', 'text/json');
        res.send( db.getDocuments());
    });



    return routes;
})();


