var lambdaFunc = require('./../meetup-service/meetup-service.js');
var lambda = require('lambda-wrapper').wrap(lambdaFunc);
var test = require('blue-tape');
var supertest = require('supertest');

var request = supertest('http://localhost:3000');

/**********************************************************
 * MEET-UP INVITEE VIEWS A MEET-UP THEY WERE INVITED TO   *
 **********************************************************/

test('When receives DELETE', function (t) {
    request
        .delete('/api/meetups')
        .expect('Content-Type', /json/)
        .expect(404)
        .end(function (err, res) {
            t.error(err, 'should be error');
            t.end();
        });
});


/**********************************************************
 * MEET-UP INVITEE ACCEPTS INVITATION VIA RSVP'ing   *
 **********************************************************/

test('When receives DELETE', function (t) {
    request
        .delete('/api/meetups')
        .expect('Content-Type', /json/)
        .expect(404)
        .end(function (err, res) {
            t.error(err, 'should be error');
            t.end();
        });
});



