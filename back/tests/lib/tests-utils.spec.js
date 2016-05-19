const processForRefs = require("./test-utils.js").processForRefs;

const testString = "${1#$.data.meetupId}";
const previousResponses = [
                            {
                                data:
                                    {meetupId:12}
                            },
                            {
                               data:
                                    {meetupId: 13
                            }
                            }
                          ];

var test = require('blue-tape');


test('trivial replace', function (t) {
    t.equal("13", processForRefs(testString, previousResponses));
});


