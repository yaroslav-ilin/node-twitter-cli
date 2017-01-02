const bigInt = require('big-integer');


const recursiveStrategies = {
    'statuses/user_timeline': maxIdRecursiveStrategy
};

function identity(o) {
    return o;
}

function recursive({ endpoint, method, payload, settings }, result, run) {
    if (result.hasOwnProperty('next_cursor_str')) {
        return {
            strategy: () => cursorBasedRecursiveStrategy('ids').apply(this, arguments),
            print: result => result.ids
        };
    }
    if (recursiveStrategies.hasOwnProperty(endpoint)) {
        return {
            strategy: () => maxIdRecursiveStrategy.apply(this, arguments),
            print: identity
        };
    }
    return {
        strategy: run,
        print: identity
    };
}

function cursorBasedRecursiveStrategy(key) {
    return function({ endpoint, method, payload, settings }, result, run) {
        if (result.next_cursor_str === '0') {
            return;
        }
        const newPayload = Object.assign({}, payload, {
            cursor: result.next_cursor_str,
            count: 5000
        });
        return run({ endpoint, method, payload: newPayload, settings });
    }
}

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

module.exports = recursive;
