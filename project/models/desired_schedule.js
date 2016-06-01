var db = require('../db.js');
var dateHelper = require('../helpers/date.js');

exports.create = function (value, timeblock, seller_id, buyer_id, trader_id, transaction_type_id, date, revision, done) {
    var dateString = dateHelper.getDateString(date);
    var values = [value, timeblock, seller_id, buyer_id, trader_id, transaction_type_id, dateString, revision, done];

    db.get().query('INSERT INTO desired_schedules (value, timeblock, seller_id, buyer_id, trader_id, transaction_type_id, date, revision) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', values, function (err, result) {
        if (err) return done(err);
        console.log("Desired_Schedules Model created desired_schedule");
        done(null, result.insertId);
    });
};

exports.get = function(seller_id, buyer_id, trader_id, transaction_type_id, date, revision, done){
    var dateString = dateHelper.getDateString(date);
    var values = [seller_id, buyer_id, trader_id, transaction_type_id, dateString, revision];
    db.get().query('SELECT timeblock, value FROM seller_constraints WHERE seller_id = ? AND buyer_id = ? AND trader_id = ? AND transaction_type_id = ? AND date = ? AND revision = ?', values, function (err, rows) {
        if (err) return done(err);
        done(null, rows);
    });
};