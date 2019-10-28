
$(document).ready(() => {


    let fetchDocuments = () => { return new Promise((resolve) =>{
        let update = $.post('/data/getDocuments');
        resolve(update.always((data) => {return (data);}));

    })
    };

    let updateDocuments = (target) => {
        $(target).html("");
        fetchDocuments().then((data) => {
            console.log(data);
            for(let key in data){
                addCard(target, data[key])
            }
            $(target).append('' +
                '<div class="card m-3 text-center"style="display: inline-flex; width: 18rem; border-radius: 100px;"> ' +
                '<i class="card-body far fa-plus-square fa-1x"> Add new document </i>' +
                '</div>');
        });
    };

    let addCard = (target , dataRow) => {
        console.log(dataRow);
        $(target).append( "" +
            "<div class='card m-3'style='display: inline-flex; width: 18rem;'> " +
                "<div class='card-body' > " +
                "<h5 class='card-title'>" +dataRow.name+ "</h5>" +
                "<div class='d-flex justify-content-between'>" +
                "<h6 class='card-subtitle mb-2 text-muted'>" +dataRow.creationDate+ "</h6> " +
                "<h6 class='card-subtitle mb-2 text-muted text-right'>" +dataRow.creationHour+ "</h6> " +
                "</div>" +
                "<p class='card-text'>" +dataRow.shortDesc+ "</p>" +
                "<a href='#' class='card-link secondary-color-text'>Card link</a>" +
                "<a href='#' class='card-link secondary-color-text'>Another link</a>" +
                "</div>" +
            "</div>" );
        };

    updateDocuments("#cardsContainer");
});