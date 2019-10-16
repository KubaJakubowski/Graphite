$(document).ready(function(){


$('#toRegistration').click(function(){
  $('.inputHint').hide();
  $('#login').css('display','none');
  $('#register').css('display','block');
  });


$('#toLogin').click(function(){
  $('.inputHint').hide();
  $('#register').css('display','none');
  $('#login').css('display','block');
  });


$('#loginSubmit').click(function(){
  $('.inputHint').hide();
  let email = $('#loginEmail').val().toString();
  let password = $('#loginPassword').val().toString();

  if (email == "" || password == "") {
    showHint('#loginHint','Provide your account credentials')
  }else{
    let send = { 'email': email, 'password': password};
    console.log(send);
    //send login request
  }
});

$('#registerSubmit').click(function(){
  $('.inputHint').hide();
  let email = $('#registerEmail').val().toString();
  let password = $('#registerPassword').val().toString();
  let passwordMatch = $('#registerPassword').val() == $('#retypedPassword').val();

  if (!(email).match('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+\$')){
    showHint('#registerEmailHint', 'Provide valid emil address');
  }else if(!(password).match("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}\$")){
    showHint('#registerPasswordHint', 'Your password must be at least 8 characters long and need to contain one lowercase letter, one uppercase letter and digit');
  }else if(! passwordMatch){
    showHint('#retypedPasswordHint', 'Your passwords does not match')
  }else {
    let send = { 'email': email, 'password': password, 'passwordMatch': passwordMatch};
    console.log(send);
    //send request to node.js
  }
  });

  function showHint(targetMarkup, description){
    $(targetMarkup).text(description).show()
  }


});
