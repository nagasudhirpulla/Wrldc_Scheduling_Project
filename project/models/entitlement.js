var db = require('../db.js');
var dateHelper = require('../helpers/date.js');

exports.create = function (value, timeblock, seller_id, buyer_id, trader_id, transaction_type_id, from_date, to_date, isPercentage, transaction_code, done) {
    var fromDateString = dateHelper.getDateString(from_date);
    var toDateString = dateHelper.getDateString(to_date);
    var values = [value, timeblock, seller_id, buyer_id, trader_id, transaction_type_id, fromDateString, toDateString, isPercentage, transaction_code];

    db.get().query('INSERT INTO entitlements (value, timeblock, seller_id, buyer_id, trader_id, transaction_type_id, from_date, to_date, isPercentage, transaction_code) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', values, function (err, result) {
        if (err) return done(err);
        console.log("Desired_Schedules Model created desired_schedule");
        done(null, result.insertId);
    });
};

exports.get = function (seller_id, buyer_id, trader_id, transaction_type_id, on_date, done) {
    var dateString = dateHelper.getDateString(on_date);
    var values = [seller_id, buyer_id, trader_id, transaction_type_id, dateString];
    db.get().query('SELECT timeblock, value, isPercentage, from_date, to_date, transaction_code FROM entitlements WHERE seller_id = ? AND buyer_id = ? AND trader_id = ? AND transaction_type_id = ? AND from_date = (SELECT MAX(from_date) FROM entitlements WHERE from_date <= ?)', values, function (err, rows) {
        if (err) return done(err);
        done(null, rows);
    });
};

exports.getAllEntitlementsOnDate = function (transaction_type_id, on_date, done) {
    var dateString = dateHelper.getDateString(on_date);
    var values = [transaction_type_id, dateString];
    db.get().query('SELECT timeblock, value, isPercentage, seller_id, buyer_id, trader_id, from_date, to_date, transaction_code FROM entitlements WHERE transaction_type_id = ? AND from_date = (SELECT MAX(from_date) FROM entitlements WHERE from_date <= ?)', values, function (err, rows) {
        if (err) return done(err);
        done(null, rows);
    });
};
