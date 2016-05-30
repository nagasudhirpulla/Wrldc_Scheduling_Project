exports.getDateString = function (today) {
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    today = yyyy + '-' + mm + '-' + dd;
    return today;
};

exports.getDateTimeString = function (today) {
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    var hrs = today.getHours();
    var mins = today.getMinutes();
    var secs = today.getSeconds();

    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    if (hrs < 10) {
        dd = '0' + dd;
    }
    if (mins < 10) {
        mm = '0' + mm;
    }
    if (secs < 10) {
        dd = '0' + dd;
    }
    today = yyyy + '-' + mm + '-' + dd + " " + hrs + ":" + mins + ":" + secs;
    return today;
};