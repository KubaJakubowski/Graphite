
$(document).ready(() => {
    updateDocuments('#cardsContainer');

    $('#createDocumentButtonSubmit').click(() => {
        let name = $('#createDocumentName').val() ;
        let shortDesc = $('#createDocumentShortDesc').val();

        $('#createDocumentName').val('');
        $('#createDocumentShortDesc').val('');

        let dataRow = {'name':name, 'shortDesc':shortDesc};

        let request = $.post('data/createDocument', dataRow);
        request.always( () =>{
            //updateDocuments('#cardsContainer');
            addCard('#cardsContainer', dataRow)

            $('#createDocumentButtonClose').click()
        })

    })


});



let fetchDocuments = () => { return new Promise((resolve) =>{
    let update = $.post('/data/getDocuments');
    resolve(update.always((data) => {return (data);}));

})
};

let updateDocuments = (target) => {
    $(target).html("");
    fetchDocuments().then((data) => {
        console.log(data);

        //Invoked immediately function which sorts by creation date
        ((arr, key) => {
            return arr.sort((a, b) => {
                return a[key] - b[key];
            });
        })(data, 'created');


        for(let key in data){
            addCard(target, data[key])
        }
    });
};

let addCard = (target , dataRow) => {
    console.log(dataRow);

    $(target).append( "" +
        "<div class='card m-3 animated-background'style='display: inline-flex; width: 18rem;'> " +
        "<div class='card-body' > " +
        "<h5 class='card-title'>" +escapeHtml(dataRow.name)+ "</h5>" +
        "<div class='d-flex justify-content-between'>" +
        //"<h6 class='card-subtitle mb-2 text-grey'>" +dataRow.created+ "</h6> " +
        //"<h6 class='card-subtitle mb-2 text-grey text-right'>" +dataRow.updated+ "</h6> " +
        "</div>" +
        "<p class='card-text'>" +escapeHtml(dataRow.shortDesc)+ "</p>" +
        "<a href='#' class='card-link secondary-color-text'>Card link</a>" +
        "<a href='#' class='card-link secondary-color-text'>Another link</a>" +
        "</div>" +
        "</div>" );
};