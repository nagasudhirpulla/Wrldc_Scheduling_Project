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
    console.log("SQLQUERYVALUES ARE " + SQLQueryValues.join(', '));
    console.log("SQLQUERYSTRING IS " + SQLQueryString);
    console.log("NUMARGS IS " + numArgs);
    console.log("NUMOFROWSTOINSERT IS " + numRowsToInsert);
    console.log("VALUES ARRAY IS " + values);
    return {'SQLQueryValues': SQLQueryValues, 'SQLQueryString': SQLQueryString};
};