var db = require('../db.js');
var dateHelper = require('../helpers/date.js');

exports.getMaxRevision = function (date, done) {
    var dateString = dateHelper.getDateString(date);
    var minTimeStamp = dateString + " 00:00:01";
    var maxTimeStamp = dateString + " 23:59:59";
    var values = [minTimeStamp, maxTimeStamp];

    db.get().query('SELECT MAX(revision_number) AS rev, COUNT(*) AS nrev FROM revision_details WHERE issue_time BETWEEN ? AND ?', values, function (err, result) {
        if (err) return done(err);
        //console.log("The max revision is " + result[0].rev);
        if (result[0].nrev == 0) {
            done(null, -1);
        } else {
            done(null, result[0].rev);
        }
    });

};

exports.create = function (issue_time, comment, done) {
    var dateString = dateHelper.getDateString(issue_time);
    var minTimeStamp = dateString + " 00:00:01";
    var maxTimeStamp = dateString + " 23:59:59";

    db.get().query('INSERT INTO revision_details (revision_number, comment, issue_time) VALUES ( (SELECT MAX(revision_number)+1 FROM revision_details WHERE issue_time BETWEEN ? AND ?), ?, ?)', [minTimeStamp, maxTimeStamp, comment, dateHelper.getDateTimeString(issue_time)], function (err, result) {
        if (err) return done(err);
        //console.log("inserted a new Revision number " + (newRev));
        console.log("revision created and keys are " + Object.keys(result));
        done(null, maxRev + 1);
    });
};

exports.getAllOnDate = function (date, done) {
    var dateString = dateHelper.getDateString(date);
    var minTimeStamp = dateString + " 00:00:01";
    var maxTimeStamp = dateString + " 23:59:59";
    var values = [minTimeStamp, maxTimeStamp];
    db.get().query('SELECT * FROM revision_details WHERE issue_time BETWEEN ? AND ?', values, function (err, rows) {
        if (err) return done(err);
        //console.log("Revsion row columns are " + Object.Keys(rows[0]));
        done(null, rows);
    })
};