'use strict';

var assert = require('assert');

const Datastore = require('@google-cloud/datastore');
const deleteAllEntities = require('../src/deleteAllEntities');

describe('Datastore', function() {
  const datastore = new Datastore({});

  before(function(done) {
    function createEntities(i, count, entities) {
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
      if (i === count) {
        return promises;
      }
      i++;

      const entities = createEntities(0, 500, []);

      promises.push(datastore.save(entities));

      return insertEntities(i, count, promises);
    }

    Promise.all(insertEntities(0, 2, [])).then(() => done());
  });

  it('should delete all entities', function(done) {
    deleteAllEntities(datastore, null, 'Post', null, [], false).then(total => {
      assert.strictEqual(total, 1000);
      done();
    });
  });
});
