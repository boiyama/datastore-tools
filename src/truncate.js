'use strict';

function truncate(datastore, namespace, kind, verbose) {
  const query = datastore.createQuery(namespace, kind).select('__key__');

  return datastore.runQuery(query).then(results => {
    const keys = results[0]
      .map(entity => entity[datastore.KEY])
      .filter(key => /^(?!__Stat_)/.test(key.kind));

    return Promise.all(deleteRecursively(datastore, keys, verbose)).then(
      resultss =>
        resultss.reduce(
          (accumulator, currentValue) => accumulator + currentValue,
          0
        )
    );
  });
}

function deleteRecursively(datastore, keys, verbose, promises) {
  if (promises === undefined) {
    promises = [];
  }

  if (keys.length === 0) {
    return promises;
  }

  promises.push(
    datastore.delete(keys.splice(0, 500)).then(results => {
      const length = results[0].mutationResults.length;
      if (verbose) {
        console.info(`${length} entities deleted successfully.`);
      }
      return length;
    })
  );

  return deleteRecursively(datastore, keys, verbose, promises);
}

module.exports = truncate;
