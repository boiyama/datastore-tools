#!/usr/bin/env node

'use strict';

const Datastore = require('@google-cloud/datastore');
const truncate = require('../src/truncate');
const dump = require('../src/dump');

const datastore = new Datastore({});

require('yargs')
  .demand(1)
  .command('truncate', 'Delete all entities.', {}, argv => {
    console.info(
      `Delete all entities${argv.kind ? ` from "${argv.kind}" kind` : ''}${
        argv.namespace ? ` in "${argv.namespace}" namespace` : ''
      }.`
    );
    truncate(datastore, argv.namespace, argv.kind, argv.verbose)
      .then(total => console.info(`${total} entities deleted successfully.`))
      .catch(console.error);
  })
  .command('dump <file>', 'Export all entities.', {}, argv => {
    console.info(
      `Export all entities${argv.kind ? ` from "${argv.kind}" kind` : ''}${
        argv.namespace ? ` in "${argv.namespace}" namespace` : ''
      }.`
    );
    dump(argv.file, datastore, argv.namespace, argv.kind, argv.verbose)
      .then(total => console.info(`${total} entities exported successfully.`))
      .catch(console.error);
  })
  .option('namespace', {
    alias: 'n',
    describe: 'Specify namespace',
    type: 'string',
  })
  .option('kind', {
    alias: 'k',
    describe: 'Specify kind',
    type: 'string',
  })
  .option('verbose', {
    alias: 'v',
    describe: 'Provide more information',
    type: 'boolean',
  })
  .example('$0 truncate', 'Delete all entities.')
  .example('$0 dump dump.json', 'Export all entities to dump.json.')
  .help()
  .strict().argv;
