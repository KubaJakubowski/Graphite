
    let date = {
        getFullDate(char){
            let date = new Date();
            let dd = String(date.getDate()).padStart(2, '0');
            let mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
            let yyyy = date.getFullYear();

            return dd + char + mm + char + yyyy;
        },
        getFullTime(char){
            let date = new Date();
            let hh = String(date.getHours()).padStart(2, '0');
            let mn = String(date.getMinutes()).padStart(2, '0');
            return hh + char + mn;
        }

    };
    module.exports = date;