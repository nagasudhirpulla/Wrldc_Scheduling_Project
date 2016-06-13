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
    var tableName = 'feasible_schedules';
    var query = SQLHelper.createSQLGetForRevisionString(tableName, dateString, seller_id, buyer_id, trader_id, transaction_type_id, dateString, revision);
    db.get().query(query.queryString, query.nonNullValues, function (err, rows) {
        if (err) return done(err);
        done(null, rows);
    });
    //console.log('queryString for feasible schedule is \n' + query.queryString + '\n and non null values are \n' + query.nonNullValues);
    //SELECT a.id, a.value, a.timeblock, a.revision, a.seller_id, a.trader_id, a.transaction_type_id FROM feasible_schedules a INNER JOIN ( SELECT date, timeblock, seller_id, buyer_id, trader_id, transaction_type_id, MAX(revision) revision FROM feasible_schedules WHERE buyer_id = ? AND date = ? AND revision <= ? GROUP BY date, timeblock, seller_id, buyer_id, trader_id, transaction_type_id) b ON a.date = b.date AND a.timeblock = b.timeblock AND a.seller_id = b.seller_id AND a.buyer_id = b.buyer_id AND a.trader_id = b.trader_id AND a.transaction_type_id = b.transaction_type_id AND a.revision = b.revision ORDER BY a.date DESC, a.revision DESC, a.timeblock ASC
};
