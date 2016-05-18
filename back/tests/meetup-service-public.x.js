var lambdaFunc = require('./../meetup-service/meetup-service.js');
var lambda = require('lambda-wrapper').wrap(lambdaFunc);
var test = require('blue-tape');
var supertest = require('supertest');

var request = supertest('http://localhost:3000');


/**********************************************************
 * MEMBER OF PUBLIC VIEWS A LIST OF PUBLIC MEET-UPS   *
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
 * MEMBER OF PUBLIC VIEWS A SPECIFIC MEET-UP   *
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
 * MEMBER OF PUBLIC RSVP's for a A SPECIFIC MEET-UP   *
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




