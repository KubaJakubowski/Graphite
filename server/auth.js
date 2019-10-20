//Authentication module

let auth = {
  login: function(data, req, res){
    let firebase = require('firebase');
    require('firebase/auth');

    firebase.auth().signInWithEmailAndPassword(data.email, data.password).then(function(){
      console.log('successful');
      res.send('<script> location.href = "/fwaf/" </script>');
    }).catch(function(error){
      console.log('error catch, code: ' + error.code + ' desc: ' + error.message);
    });
  },
  register: function(data, req, res){
    let firebase = require('firebase');
    require('firebase/auth');

    try{
    if (!(data.email).match('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+\$')){
      throw new Error('Provide valid emil address, no some faggy random string bby');
    }else if(!(data.password).match("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}\$")){
      throw new Error('Do not mess with js');
    }else if(! data.passwordMatch){
      throw new Error('I should let you do this, but better no, no touching');
    }else {
      console.log('successfully checked');
      firebase.auth().createUserWithEmailAndPassword(data.email, data.password).then(function(){
        console.log('successfully registered');
      }).catch(function(error){
        console.log('error catch, code: ' + error.code + 'desc: ' + error.message);
      });
      }
    }catch (error){
      // TODO send popup
      console.log('Following error' + error.message);

    }


    firebase.auth().signInWithEmailAndPassword(data.email, data.password).catch(function(error){
      console.log("error catch");
    });
      console.log('successful');

  }

};

module.exports = auth;
