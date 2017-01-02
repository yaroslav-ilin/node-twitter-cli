const IGNORED_ARGS = [
    '_',
    '$0',
    'h',
    'help',
    'post',
    'stream',
    'r',
    'recursive'
];

function parse(argv) {
    if (argv._.length !== 2) {
        throw new Error('endpoint is not specified, ' +
            'try to supply `statuses user_timeline` as command line argument');
    }
    const endpoint = argv._.join('/');

    let method = null;
    if (argv.post) {
        method = 'post';
        // if (argv.stream) {
        //     throw new Error('please use either `--post` or `--stream`, not both at the same time');
        // }
    }
    // if (argv.stream) {
    //     method = 'stream';
    // }
    if (!method) {
        method = 'get';
    }

    let payload = Object.keys(argv).reduce((payload, key) => {
        if (!IGNORED_ARGS.some(arg => arg === key)) {
            payload[key] = argv[key];
        }
        return payload;
    }, {});

    let settings = {
        recursive: argv.recursive
    };

    return {
        endpoint,
        method,
        payload,
        settings
    };
}

module.exports = parse;
