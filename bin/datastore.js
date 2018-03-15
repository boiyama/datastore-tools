#!/usr/bin/env node

'use strict';

const Datastore = require('@google-cloud/datastore');
const deleteAllEntities = require('../src/deleteAllEntities');

const datastore = new Datastore({});

require('yargs')
  .demand(1)
  .command(
    'truncate <kind>',
    'Delete all entities in the specified kind.',
    {},
    argv => {
      console.log(
        `Truncate ${argv.kind} kind in ${
          argv.namespace ? argv.namespace : 'default'
        } namespace.`
      );
      deleteAllEntities(
        datastore,
        argv.namespace,
        argv.kind,
        null,
        [],
        argv.verbose
      )
        .then(total => console.log(`${total} entities deleted successfully.`))
        .catch(err => console.error('ERROR:', err));
    }
  )
  .option('namespace', {
    alias: 'n',
    describe: 'Specify namespace',
    type: 'string',
  })
  .option('verbose', {
    alias: 'v',
    describe: 'Provide more information',
    type: 'boolean',
  })
  .example('$0 truncate Item', 'Delete all entities in Item kind.')
  .help()
  .strict().argv;
