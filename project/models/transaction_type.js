var db = require('../db.js');
var SQLHelper = require('../helpers/sqlHelper.js');

exports.getAll = function (done) {
    db.get().query(SQLHelper.createSQLGetString('transaction_types', ['id', 'name'], [], []), function (err, rows) {
        if (err) return done(err);
        //console.log("Transaction types are " + JSON.stringify(rows));
        done(null, rows);
    });
};