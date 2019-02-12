#!/usr/bin/env node

const yargs = require('yargs');
const audit = require('../src/commands/audit');

// eslint-disable-next-line no-unused-expressions
yargs
  .usage('Usage: $0 <command> [options]')
  .command(audit)
  .help().argv;
