'use strict';

const entity = require('@google-cloud/datastore/src/entity');
const fs = require('fs');

function dump(file, datastore, namespace, kind, verbose, total) {
  if (total === undefined) {
    total = 0;
  }

  return new Promise(function(resolve, reject) {
    const formatArrayOrig = entity.formatArray;
    entity.formatArray = results => results.map(result => result.entity);

    const dest = fs.createWriteStream(file);
    dest.write('[');

    datastore
      .createQuery(namespace, kind)
      .runStream()
      .on('error', reject)
      .on('info', info => verbose && console.info(info))
      .on('data', function(entity) {
        if (total > 0) {
          dest.write(',');
        }
        dest.write(JSON.stringify(entity));
        total++;
      })
      .on('end', function() {
        dest.write(']');
        dest.end();

        entity.formatArray = formatArrayOrig;

        resolve(total);
      });
  });
}

module.exports = dump;
