const bigInt = require('big-integer');


const recursiveStrategies = {
    '@empty': new Function(),
    'statuses/user_timeline': maxIdRecursiveStrategy
};

function maxIdRecursiveStrategy({ endpoint, method, payload, settings }, result, run) {
    if (result.length === 0) {
        return;
    }
    const maxId = result[result.length - 1].id;
    const newPayload = Object.assign({}, payload, {
        count: 200,
        max_id: bigInt(maxId).prev().toString()
    });
    return run({ endpoint, method, payload: newPayload, settings });
}

function strategy(params, result, run) {
    const s = recursiveStrategies[params.endpoint] || recursiveStrategies['@empty'];

    return s(params, result, run);
}

module.exports = { strategy };
