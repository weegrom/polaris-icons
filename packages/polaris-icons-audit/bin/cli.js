#!/usr/bin/env node

const yargs = require('yargs');
const collect = require('../src/commands/collect');
const audit = require('../src/commands/audit');

// eslint-disable-next-line no-unused-expressions
yargs
  .usage('Usage: $0 <command> [options]')
  .command(collect)
  .command(audit)
  .help().argv;
