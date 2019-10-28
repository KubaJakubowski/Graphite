//File for managing routes and redirects

module.exports = (() =>{
    let routes = require('express').Router();
    let auth = require('../server/auth.js');
    let db = require('../server/db.js');

    routes.post('/getDocuments', (req, res) => {
        res.set('Content-Type', 'text/json');
        db.getDocuments( req, res);
    });

    routes.post('/createDocument', (req, res) => {
        res.set('Content-Type', 'text/json');
        res.send( db.createDocument( req.body.name, req.body.shortDesc));
    });


    return routes;
})();


