'use strict';

var assert = require('assert');

const Datastore = require('@google-cloud/datastore');
const truncate = require('../src/truncate');

describe('truncate', function() {
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
        key: datastore.key('Post'),
        data: {
          title: 'How to make the perfect pizza in your grill',
          tags: ['pizza', 'grill'],
          publishedAt: new Date(),
          author: 'Silvano',
          isDraft: false,
          wordCount: 400,
          rating: 5.0,
          likes: null,
          metadata: {
            views: 100,
          },
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

      const entities = createEntities(0, 10);

      promises.push(datastore.save(entities));

      return insertEntities(i, count, promises);
    }

    Promise.all(insertEntities(0, 1)).then(() => done());
  });

  it('should delete all entities', function(done) {
    truncate(datastore).then(total => {
      assert.strictEqual(total, 10);
      done();
    });
  });
});
