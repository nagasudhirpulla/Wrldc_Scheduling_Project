var db = require('../db.js');
var dateHelper = require('../helpers/date.js');

exports.getMaxRevision = function (date, done) {
    var dateString = dateHelper.getDateString(date);
    var minTimeStamp = dateString + " 00:00:01";
    var maxTimeStamp = dateString + " 23:59:59";
    var values = [minTimeStamp, maxTimeStamp];

    db.get().query('SELECT MAX(revision_number) AS rev FROM revision_details WHERE issue_time BETWEEN ? AND ?', values, function (err, result) {
        if (err) return done(err);
        if (result[0].rev == null) {
            done(null, -1);
        } else {
            done(null, result[0].rev);
        }
    });

};

exports.create = function (issue_time, comment, done) {
    var dateString = dateHelper.getDateString(issue_time);
    var dateTimeStr = dateHelper.getDateTimeString(issue_time);

    db.get().query('CALL create_rev(?, @p1, ?, ?); SELECT @p1 AS `newrev`;', [dateString, comment, dateTimeStr], function (err, result) {
        if (err) return done(err);
        done(null, result[1][0].newrev);
        //console.log('STUB created a new revision ' + JSON.stringify(result));
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