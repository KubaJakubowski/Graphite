$(document).ready(function(){


$('#toRegistration').click(function(){
  $('#login').css('display','none');
  $('#register').css('display','block');
  })


$('#toLogin').click(function(){
  $('#register').css('display','none');
  $('#login').css('display','block');
  })



$('#loginSumbit').click(function(){
  console.log('Catched login submit');

})

$('#registerSubmit').click(function(){
  console.log('Catched register submit');

  })


})
