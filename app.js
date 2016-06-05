var db = require('./project/db');
var express = require('express');

var app = express();
var port = process.env.PORT || 3000;

app.set('json spaces', 1);
app.use('/api/entities', require('./project/controllers/entity'));
app.use('/api/transaction_types', require('./project/controllers/transaction_type'));

// Connect to MySQL on start
db.connect(db.MODE_PRODUCTION, function (err) {
    if (err) {
        console.log('Unable to connect to the Scheduling Database.');
        process.exit(1);
    } else {
        app.listen(port, function () {
            console.log('Listening on port ' + port + ' ...');
        })
    }
});