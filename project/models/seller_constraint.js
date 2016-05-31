var db = require('../db.js');
var dateHelper = require('../helpers/date.js');

exports.create = function (value, date, revision, timeblock, entity_id, constraint_type_id, done) {
    var dateString = dateHelper.getDateString(date);
    var values = [value, dateString, revision, timeblock, entity_id, constraint_type_id];

    db.get().query('INSERT INTO seller_constraints (value, date, revision, timeblock, entity_id, constraint_type_id) VALUES (?, ?, ?, ?, ?, ?)', values, function (err, result) {
        if (err) return done(err);
        var delimiter = ", ";
        console.log("Seller_Constraint Model created seller_constraint with value, date, revision, timeblock, entity_id, constraint_type_id = " + value + delimiter + date + delimiter + revision + delimiter + timeblock + delimiter + entity_id + delimiter + constraint_type_id);
        done(null, result.insertId);
    });
};

exports.get = function(date, revision, entity_id, constraint_type_id, done){
    var dateString = dateHelper.getDateString(date);
    var values = [dateString, revision, entity_id, constraint_type_id];
    db.get().query('SELECT timeblock, value FROM seller_constraints WHERE date = ?, revision = ?, entity_id = ?, constraint_type_id = ?)', values, function (err, result) {
        if (err) return done(err);
        console.log("Seller_Constraint Model searched for seller_constraint row");
        done(null, result);
    });
};