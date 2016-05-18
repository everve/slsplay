var TypeFns = require('./../lib/typeFns.js');
var test = require('blue-tape');

test('double isnt', function (t) {
    t.false(TypeFns.isInteger(12.2));
    t.end();
});
test('integer is', function (t) {
    t.true(TypeFns.isInteger(12));
    t.end();
});

test('double with no fraction is', function (t) {
    t.true(TypeFns.isInteger(12)); //good enough for me.
    t.end();
});



