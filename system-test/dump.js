'use strict';

var assert = require('assert');

const Datastore = require('@google-cloud/datastore');
const dump = require('../src/dump');
const truncate = require('../src/truncate');

describe('dump', function() {
  const datastore = new Datastore({});

  before(function(done) {
    function createEntities(i, count, entities) {
      if (entities === undefined) {
        entities = [];
      }

      if (i === count) {
        return entities;
      }
      i++;

      entities.push({
        key: datastore.key({
          path: ['Post', `p${i}`],
        }),
        data: {
          e: 0,
          j: {defaultProperty: 'propertyValue'},
          b: 'c',
          k: null,
          h: {latitude: 35, longitude: 125},
          l: 'm\nn',
          f: 0,
          g: false,
          i: ['propertyValue'],
          d: '2018-03-15T00:58:58.633Z',
        },
      });

      return createEntities(i, count, entities);
    }

    function insertEntities(i, count, promises) {
      if (promises === undefined) {
        promises = [];
      }

      if (i === count) {
        return promises;
      }
      i++;

      const entities = createEntities(0, 2);

      promises.push(datastore.save(entities));

      return insertEntities(i, count, promises);
    }

    Promise.all(insertEntities(0, 1)).then(() => done());
  });

  after(function(done) {
    truncate(datastore).then(() => done());
  });

  it('should export all entities', function(done) {
    dump('dump.json', datastore, null, 'Post').then(total => {
      assert.strictEqual(total, 2);
      done();
    });
  });
});
