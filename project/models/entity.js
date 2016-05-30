var db = require('../db.js');

exports.create = function (entityName, regionID, done) {
    var values = [entityName, regionID];

    db.get().query('INSERT INTO entities (name, region_id) VALUES(?, ?)', values, function (err, result) {
        if (err) return done(err);
        //console.log("created entity with name " + entityName + " in the region with ID " + regionID + " with insertId as " + result.insertId);
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
        //console.log("Number of rows deleted is " + result.affectedRows);
        done(null, result);
    })
};