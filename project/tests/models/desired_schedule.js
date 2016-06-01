var chai = require('chai');
var expect = chai.expect; // we are using the "expect" style of Chai
var Revision_detail = require('../../models/revision_detail');
var Desired_schedule = require('../../models/desired_schedule');

describe('Desired_schedule', function () {
    var newRevision;
    var testDate;
    it('should create a desired schedule for today and get the created data back from server', function () {
        testDate = new Date();
        Revision_detail.create(testDate, "Desired_schedule TEST COMMENT", function (err, revision) {
            expect(err).to.equal(null);
            newRevision = revision;
            console.log('Desired_schedule model claimed a new revision ' + revision);
            Desired_schedule.create("1313", 13, 1, 1, 1, 1, testDate, newRevision, function (err, resultId) {
                expect(err).to.equal(null);
                console.log("Desired_schedule test created a new Desired schedule with id " + resultId + " claiming a revision number " + revision);
                Desired_schedule.get(1, 1, 1, 1, testDate, newRevision, function (err, rows) {
                    expect(err).to.equal(null);
                    console.log("Desired_schedule Model returned data " + JSON.stringify(rows));
                });
            });
        });
    });
});