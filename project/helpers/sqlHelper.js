var ArrayHelper = require('./arrayHelper.js');
exports.createSQLInsertString = function (tableName, argNames, values) {
    //all the values in arguments are arrays
    var numArgs = argNames.length;
    var numRowsToInsert = 1;
    if (values[0].constructor === Array) {
        numRowsToInsert = values[0].length;
    }
    var SQLQueryString = 'INSERT INTO ' + tableName + ' (' + argNames.join(',') + ') VALUES ';
    var SQLQueryValues = new Array(numArgs * numRowsToInsert);
    var questionMarkArray = ArrayHelper.createArrayFromSingleElement('?', numArgs);
    var questionMarkString = '(' + questionMarkArray.join(',') + ')'; // here we get questionMarkString = '(?,?,?,?,?,?,?,?)';
    questionMarkArray = new Array(numRowsToInsert);
    var iterator = 0;
    for (var i = 0; i < numRowsToInsert; i++) {
        questionMarkArray[i] = questionMarkString;
        for (var j = 0; j < numArgs; j++) {
            SQLQueryValues[iterator++] = values[j][i];
        }
    }
    questionMarkString = questionMarkArray.join(','); //here we get "(?,?,?,?,?,?,?,?), (?,?,?,?,?,?,?,?), (?,?,?,?,?,?,?,?)"
    SQLQueryString += questionMarkString;
    /*console.log("SQLQUERYVALUES ARE " + SQLQueryValues.join(', '));
     console.log("SQLQUERYSTRING IS " + SQLQueryString);
     console.log("NUMARGS IS " + numArgs);
     console.log("NUMOFROWSTOINSERT IS " + numRowsToInsert);
     console.log("VALUES ARRAY IS " + values);*/
    return {'SQLQueryValues': SQLQueryValues, 'SQLQueryString': SQLQueryString};
};

exports.createSQLGetString = function (tableName, getArgNames, whereArgNames, whereArgOperators) {
    var SQLQueryString = 'SELECT ';
    SQLQueryString += getArgNames.join(',') + ' ';
    SQLQueryString += 'FROM ' + tableName;
    var whereArgExpressions = new Array(whereArgNames.length);
    if (whereArgNames.length > 0) {
        for (var i = 0; i < whereArgNames.length; i++) {
            whereArgExpressions[i] = whereArgNames[i] + whereArgOperators[i] + '?';
        }
        SQLQueryString += ' WHERE ' + whereArgExpressions.join(' AND ');
    }
    //console.log("SQLQUERYSTRING IS " + SQLQueryString);
    return SQLQueryString;
};

exports.createSQLGetForRevisionString = function (tableName, dateString, seller_id, buyer_id, trader_id, transaction_type_id, dateString, revision) {
    if (revision == 'NULL') {
        revision = 9000000;
    }
    //will handle revision separately
    var SQLColumnStrings = ['seller_id', 'buyer_id', 'trader_id', 'transaction_type_id', 'date'];
    var values = [seller_id, buyer_id, trader_id, transaction_type_id, dateString, revision];
    var nonNullValues = [];
    var valuesSQLStrings = [];
    var requiredFieldsStrings = ['a.id', 'a.value', 'a.timeblock', 'a.revision'];
    for (var i = 0; i < SQLColumnStrings.length; i++) {
        if (!(values[i] == 'NULL')) {
            nonNullValues.push(values[i]);
            valuesSQLStrings.push(SQLColumnStrings[i] + ' = ?');
        } else {
            requiredFieldsStrings.push('a.' + SQLColumnStrings[i]);
        }
    }
    valuesSQLStrings.push('revision <= ?');
    nonNullValues.push(revision);
    var queryString = 'SELECT ' + requiredFieldsStrings.join(', ') + ' FROM ' + tableName + ' a INNER JOIN ( SELECT date, seller_id, buyer_id, trader_id, transaction_type_id, MAX(revision) revision FROM ' + tableName + ' WHERE ' + valuesSQLStrings.join(' AND ') + ' GROUP BY date, seller_id, buyer_id, trader_id, transaction_type_id) b ON a.date = b.date AND a.seller_id = b.seller_id AND a.buyer_id = b.buyer_id AND a.trader_id = b.trader_id AND a.transaction_type_id = b.transaction_type_id AND a.revision = b.revision ORDER BY a.date DESC, a.revision DESC, a.timeblock ASC';
    return {'queryString': queryString, 'nonNullValues': nonNullValues};
};