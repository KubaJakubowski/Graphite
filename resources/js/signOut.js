$('#signOutLink').click(() =>{
  let signout = $.post('/signout').always((data) => {
    if(data.unsigned){
        window.location.replace("/login")
    }
  });
});
