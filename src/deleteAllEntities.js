'use strict';

const Datastore = require('@google-cloud/datastore');

function deleteAllEntities(
  datastore,
  namespace,
  kind,
  endCursor,
  promises,
  verbose
) {
  const query = endCursor
    ? datastore
        .createQuery(namespace, kind)
        .limit(500)
        .start(endCursor)
    : datastore.createQuery(namespace, kind).limit(500);

  return datastore.runQuery(query).then(results => {
    const entities = results[0];
    const info = results[1];

    const entityKeys = entities.map(entity => entity[datastore.KEY]);

    promises.push(
      datastore.delete(entityKeys).then(results => {
        verbose &&
          console.log(
            `${
              results[0].mutationResults.length
            } entities deleted successfully.`
          );
        return results;
      })
    );

    if (info.moreResults === Datastore.NO_MORE_RESULTS) {
      return Promise.all(promises).then(resultss =>
        resultss
          .map(results => results[0].mutationResults.length)
          .reduce((accumulator, currentValue) => accumulator + currentValue)
      );
    }

    return deleteAllEntities(
      datastore,
      namespace,
      kind,
      info.endCursor,
      promises,
      verbose
    );
  });
}

module.exports = deleteAllEntities;
