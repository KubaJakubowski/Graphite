
$(document).ready(() => {

    let update = $.post('/data/getDocuments');
    update.always((data) => console.log(data));


});