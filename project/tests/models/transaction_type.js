var chai = require('chai');
var expect = chai.expect; // we are using the "expect" style of Chai
var Transaction_type = require('../../models/transaction_type');

describe('Transaction_type Model', function () {
    it('should get the transaction_types list and have properties name, id', function () {
        var entities = Transaction_type.getAll(function (err, rows) {
            expect(err).to.equal(null);
            expect(rows.length).to.be.above(0);
            expect(rows[0]).to.have.property('name');
            expect(rows[0]).to.have.property('id');
            /*console.log("Number of transaction_types = " + rows.length);
            for (var i = 0; i < rows.length; i++) {
                console.log("transaction type = " + rows[i].name + "; id = " + rows[i].id);
            }*/
        });
    });
});
