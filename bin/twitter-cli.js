#!/usr/bin/env node
const argv = require('yargs')
    .usage('Usage: $0 [--post] <endpoint> [--recursive] [options]')
    .demandCommand(2)
    .command('--post', 'Issue a POST request instead of GET')
    // .command('--stream', 'Start streaming Twitter data to command line')
    .command('--recursive', 'Make recursive calls to specified endpoint to fetch as much data as possible')
    .alias('r', 'recursive')
    .example('$0 statuses user_timeline --trim_user=1 --count=2 --user_id=62569723', 'fetch 2 latest tweets made by user with id 62569723')
    .help('h')
    .alias('h', 'help')
    .epilog('copyright 2017')
    .argv;

const argsParse = require('../src/args-parser');
const run = require('../src/main');

run(argsParse(argv));
