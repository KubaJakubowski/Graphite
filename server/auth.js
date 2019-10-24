//Authentication module

let auth = {
  login: function(data, req, res){
    let firebase = require('firebase');
    require('firebase/auth');

    firebase.auth().signInWithEmailAndPassword(data.email, data.password).then(function(){
      res.send({'success':true, 'errorCode':'', 'errorDesc':''});

    }).catch(function(error){
      res.send({'success':false, 'errorCode':error.code,'errorDesc':error.message});
    });
  },
  register: function(data, req, res) {
    let firebase = require('firebase');
    require('firebase/auth');
    let errorDesc = '';
    let db = require('../server/db');

    if (!(data.email).match('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9.]*[a-zA-Z0-9-]{2,}\$')) {
      errorDesc = 'Invalid email';
      res.send({'success': false, 'errorCode': 'formatting', 'errorDesc': errorDesc});
    } else if (!(data.password).match("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}\$")) {
      errorDesc = 'Invalid password';
      res.send({'success': false, 'errorCode': 'formatting', 'errorDesc': errorDesc});
    } else if (!data.passwordMatch) {
      errorDesc = 'Passwords does not match';
      res.send({'success': false, 'errorCode': 'formatting', 'errorDesc': errorDesc});
    } else {
      firebase.auth().createUserWithEmailAndPassword(data.email, data.password).then(function () {
        db.initUser();
        res.send({'success':true, 'errorCode': '', 'errorDesc':''});
      }).catch(function (error) {
        errorDesc = 'Something went wrong, try again later or contact maintainer';
        res.send({'success': false, 'errorCode':error.code, 'errorDesc': error.message});
      });
    }
  },
  isSigned: ()=>{
    let firebase = require('firebase');
    if(firebase.auth().currentUser)
      return true;
    else {
      return false;
    }
  },
  onlyAuthenticated(req, res, next) {
    let firebase = require('firebase');
    if( firebase.auth().currentUser){
      return next();
    }
    res.redirect('/login');
  },
  onlyUnsigned(req, res, next) {
    let firebase = require('firebase');
    if( firebase.auth().currentUser == null){
      return next();
    }
    res.redirect('/profile');
  }
};

module.exports = auth;
