var db = require('../db.js');
var dateHelper = require('../helpers/date.js');

exports.create = function (value, date, revision, timeblock, entity_id, constraint_type_id, done) {
    var dateString = dateHelper.getDateString(date);
    var values = [value, dateString, revision, timeblock, entity_id, constraint_type_id];

    db.get().query('INSERT INTO seller_constraints (value, date, revision, timeblock, entity_id, constraint_type_id) VALUES (?, ?, ?, ?, ?, ?)', values, function (err, result) {
        if (err) return done(err);
        var delimiter = ", ";
        console.log("created seller_constraint with value, date, revision, timeblock, entity_id, constraint_type_id = " + value + delimiter + date + delimiter + revision + delimiter + timeblock + delimiter + entity_id + delimiter + constraint_type_id);
        done(null, result.insertId);
    })
};

exports.getAll = function (done) {
    db.get().query('SELECT * FROM entities', function (err, rows) {
        if (err) return done(err);
        done(null, rows);
    })
};

exports.getByName = function (name, done) {
    var values = [name];

    db.get().query('SELECT * FROM entities WHERE name = ?', values, function (err, rows) {
        if (err) return done(err);
        done(null, rows);
    })
};

exports.deleteByName = function (name, done) {
    var values = [name];

    db.get().query('DELETE FROM entities WHERE entities.name = ?', values, function (err, result) {
        if (err) return done(err);
        console.log("Number of rows affected is " + result.affectedRows);
        done(null, result);
    })
};