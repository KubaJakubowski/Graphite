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
    let request = $.post('/login', { 'email' : email, 'password' : password});
    request.always((data) => { if(data.success) window.location.replace("/profile");
      else
      showHint('#loginHint',data.errorDesc); });
  }
});

$('#registerSubmit').click(function(){
  $('.inputHint').hide();
  let email = $('#registerEmail').val().toString();
  let password = $('#registerPassword').val().toString();
  let passwordMatch = $('#registerPassword').val() == $('#retypedPassword').val();

  if (!(email).match('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9.]*[a-zA-Z0-9-]{2,}\$')){
    showHint('#registerEmailHint', 'Provide valid emil address');
  }else if(!(password).match("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}\$")){
    showHint('#registerPasswordHint', 'Your password must be at least 8 characters long and need to contain one lowercase letter, one uppercase letter and digit');
  }else if(! passwordMatch){
    showHint('#retypedPasswordHint', 'Your passwords does not match')
  }else {
    //send request to node.js
    let request = $.post('/register', { 'email' : email, 'password' : password, 'passwordMatch' : passwordMatch});
    request.always((data) => { if(data.success) window.location.replace("/welcome");
    else
    showHint('#retypedPasswordHint',data.errorDesc); });
  }
  });

  function showHint(targetMarkup, description){
    $(targetMarkup).text(description).show()
  }


});
