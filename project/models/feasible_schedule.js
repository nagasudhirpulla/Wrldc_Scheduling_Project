var db = require('../db.js');
var dateHelper = require('../helpers/date.js');

exports.create = function (value, timeblock, seller_id, buyer_id, trader_id, transaction_type_id, date, revision, done) {
    var dateString = dateHelper.getDateString(date);
    var values = [value, timeblock, seller_id, buyer_id, trader_id, transaction_type_id, dateString, revision];

    db.get().query('INSERT INTO feasible_schedules (value, timeblock, seller_id, buyer_id, trader_id, transaction_type_id, date, revision) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', values, function (err, result) {
        if (err) return done(err);
        console.log("Feasible_schedules Model created a feasible_schedule");
        done(null, result.insertId);
    });
};

exports.get = function (seller_id, buyer_id, trader_id, transaction_type_id, date, revision, done) {
    var dateString = dateHelper.getDateString(date);
    var SQLStrings = ['seller_id', 'buyer_id', 'trader_id', 'transaction_type_id', 'date', 'revision'];
    var values = [seller_id, buyer_id, trader_id, transaction_type_id, dateString, revision];
    var nonNullValues = [];
    var valuesSQLStrings = [];
    var requiredFieldsStrings = ['value', 'timeblock'];
    for (var i = 0; i < values.length; i++) {
        if (!(values[i] == 'NULL')) {
            nonNullValues.push(values[i]);
            valuesSQLStrings.push(SQLStrings[i] + ' = ?');
        } else {
            requiredFieldsStrings.push(SQLStrings[i]);
        }
    }
    db.get().query('SELECT ' + requiredFieldsStrings.join(', ') + ' FROM feasible_schedules WHERE ' + valuesSQLStrings.join(' AND '), nonNullValues, function (err, rows) {
        if (err) return done(err);
        done(null, rows);
    });
};