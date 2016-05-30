var chai = require('chai');
var expect = chai.expect; // we are using the "expect" style of Chai
var Entity = require('../../models/entity');

describe('Entity', function () {
    it('should have CGPL in the entity list and have properties name, id and region_id', function () {
        var entities = Entity.getByName("CGPL", function (err, rows) {
            expect(err).to.equal(null);
            expect(rows.length).to.equal(1);
            expect(rows[0]).to.have.property('name');
            expect(rows[0]).to.have.property('id');
            expect(rows[0]).to.have.property('region_id');
            //console.log("id = " + rows[0].id);
            //console.log("name = " + rows[0].name);
            //console.log("region_id = " + rows[0].region_id);
        });
    });

    it('should get the entity list and have properties name, id and region_id', function () {
        var entities = Entity.getAll(function (err, rows) {
            expect(err).to.equal(null);
            expect(rows.length).to.be.above(0);
            expect(rows[0]).to.have.property('name');
            expect(rows[0]).to.have.property('id');
            expect(rows[0]).to.have.property('region_id');
            console.log("Number of entities = " + rows.length);
            for (var i = 0; i < rows.length; i++) {
                //console.log("name = " + rows[i].name + "; region_id = " + rows[i].region_id);
            }
        });
    });

    it('should create an entity called sudhir and delete it', function () {
        Entity.deleteByName("sudhir", function (err, result) {
            expect(err).to.equal(null);
            var entities = Entity.create("sudhir", 1, function (err, resultID) {
                expect(err).to.equal(null);
                expect(resultID).to.not.equal(undefined);
                expect(resultID).to.not.equal(null);
                Entity.deleteByName("sudhir", function (err, result) {
                    expect(err).to.equal(null);
                    expect(result.affectedRows).to.be.above(0);
                });
            });
        })
    });

});