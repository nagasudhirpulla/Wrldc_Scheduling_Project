var db = require('../db.js');
var dateHelper = require('../helpers/date.js');
var SQLHelper = require('../helpers/sqlHelper.js');
var ArrayHelper = require('../helpers/arrayHelper.js');

exports.create = function (value, timeblock, seller_id, buyer_id, trader_id, transaction_type_id, date, revision, done) {
    var dateString = dateHelper.getDateString(date);
    var values = [value, timeblock, seller_id, buyer_id, trader_id, transaction_type_id, dateString, revision];

    db.get().query('INSERT INTO feasible_schedules (value, timeblock, seller_id, buyer_id, trader_id, transaction_type_id, date, revision) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', values, function (err, result) {
        if (err) return done(err);
        console.log("Feasible_schedules Model created a feasible_schedule");
        done(null, result.insertId);
    });
};

exports.createMultiple = function (value, timeblock, seller_id, buyer_id, trader_id, transaction_type_id, date, revision, done) {
    var values = ArrayHelper.convertNonArrayArgumentsToArrayArguments(value, timeblock, seller_id, buyer_id, trader_id, transaction_type_id, date, revision);
    var dateString = [];
    var dateStringArgumentPos = 6;
    var dateArg = values[dateStringArgumentPos];
    for (var i = 0; i < dateArg.length; i++) {
        dateString[i] = dateHelper.getDateString(dateArg[i]);
    }
    values[dateStringArgumentPos] = dateString;
    //all the values in arguments are arrays
    var tableName = 'feasible_schedules';
    var argNames = ['value', 'timeblock', 'seller_id', 'buyer_id', 'trader_id', 'transaction_type_id', 'date', 'revision'];
    var createdSQL = SQLHelper.createSQLInsertString(tableName, argNames, values);
    db.get().query(createdSQL['SQLQueryString'], createdSQL['SQLQueryValues'], function (err, result) {
        if (err) return done(err);
        console.log("Feasible_schedules Model createMultiple created a feasible_schedule");
        done(null, result);
    });
};

exports.get = function (seller_id, buyer_id, trader_id, transaction_type_id, date, revision, done) {
    var dateString = dateHelper.getDateString(date);
    var SQLColumnStrings = ['seller_id', 'buyer_id', 'trader_id', 'transaction_type_id', 'date', 'revision'];
    var values = [seller_id, buyer_id, trader_id, transaction_type_id, dateString, revision];
    var nonNullValues = [];
    var valuesSQLStrings = [];
    var requiredFieldsStrings = ['value', 'timeblock'];
    for (var i = 0; i < values.length; i++) {
        if (!(values[i] == 'NULL')) {
            nonNullValues.push(values[i]);
            valuesSQLStrings.push(SQLColumnStrings[i] + ' = ?');
        } else {
            requiredFieldsStrings.push(SQLColumnStrings[i]);
        }
    }
    db.get().query('SELECT ' + requiredFieldsStrings.join(', ') + ' FROM feasible_schedules WHERE ' + valuesSQLStrings.join(' AND '), nonNullValues, function (err, rows) {
        if (err) return done(err);
        done(null, rows);
    });
};

exports.getForRevision = function (seller_id, buyer_id, trader_id, transaction_type_id, date, revision, done) {
    var dateString = dateHelper.getDateString(date);
    var SQLColumnStrings = ['seller_id', 'buyer_id', 'trader_id', 'transaction_type_id', 'date', 'revision'];
    var values = [seller_id, buyer_id, trader_id, transaction_type_id, dateString, revision];
    var nonNullValues = [];
    var valuesSQLStrings = [];
    var requiredFieldsStrings = ['value', 'timeblock'];
    for (var i = 0; i < values.length; i++) {
        if (!(values[i] == 'NULL')) {
            nonNullValues.push(values[i]);
            valuesSQLStrings.push(SQLColumnStrings[i] + ' = ?');
        } else {
            requiredFieldsStrings.push(SQLColumnStrings[i]);
        }
    }
    db.get().query('SELECT ' + requiredFieldsStrings.join(', ') + ' FROM feasible_schedules WHERE ' + valuesSQLStrings.join(' AND '), nonNullValues, function (err, rows) {
        if (err) return done(err);
        done(null, rows);
    });
    /*SELECT a.* FROM desired_schedules a
    INNER JOIN (
        SELECT id, MAX(revision) revision
    FROM desired_schedules
    GROUP BY id
    ) b ON a.id = b.id AND a.revision = b.revision*/
    //SELECT a.* FROM desired_schedules a INNER JOIN ( SELECT id, MAX(revision) revision FROM desired_schedules GROUP BY id ) b ON a.id = b.id AND a.revision = b.revision
};
