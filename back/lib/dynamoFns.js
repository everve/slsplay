function updateByWhiteList(toUpdate, whitelist) {
    var filtered = Object.keys(toUpdate).filter(i=>
    whitelist.indexOf(i) > -1);

    return {
        UpdateExpression: 'SET ' + filtered.map(
            k => '#' + k + ' = ' + ':' + k)
            .join(', '),

        ExpressionAttributeNames: filtered.reduce(
            (atts, k)=> {
                atts['#' + k] = k;
                return atts
            }, {}
        ),

        ExpressionAttributeValues: filtered.reduce(
            (atts, k)=> {
                atts[':' + k] = toUpdate[k];
                return atts
            }, {}
        )
    }
}

function toPutRequests(items) {
    return items.map(item => {
        return {
            PutRequest: {
                Item: item
            }
        }
    });
}

module.exports = {
    updateByWhiteList : updateByWhiteList,
    toPutRequests : toPutRequests
}