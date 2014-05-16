'use strict';

var Promise = require('bluebird');
var Resolver = require('./resolver');

/**
 * Module interface.
 */

module.exports = reset;

/**
 * Drop schemas tables.
 *
 * @param {[Schemas]} schemas
 * @return {Promise}
 */

function reset(schemas) {
  var resolver = new Resolver(schemas);
  // Reduce force sequential execution.
  return Promise.reduce(resolver.resolve().reverse(), dropSchema.bind(this), []);
}

/**
 * Drop schema table.
 *
 * @param {[Schema]} result - reduce accumulator
 * @param {Schema} schema
 * @return {Promise}
 */

function dropSchema(result, schema) {
  return this.db.bookshelf.knex.schema.dropTableIfExists(schema.tableName);
}