const Security = require('../security.js');
const Utils = require('../utils.js');

module.exports = function (knex, express) {
  express.get('/departments', async function (req, res) {
    let knexQuery = knex
      .select(
        't0.department_id as departmentId',
        't0.name as name',
        't0.description as description',
        't0.created_at as createdAt',
        't0.updated_at as updatedAt',
        't0.hash as hash'
      )
      .from('departments as t0');
    if (req.query['name']) {
      knexQuery = knexQuery.where(function () { return this.whereLike('t0.name', knex.raw('?', req.query['name'])); });
    }
    if (req.query['hash']) {
      knexQuery = knexQuery.where(function () { return this.whereLike('t0.hash', knex.raw('?', req.query['hash'])); });
    }
    knexQuery = knexQuery.orderBy([
      { column: 't0.name', order: 'asc' },
    ]);
    if (req.query['offset']) {
      knexQuery = knexQuery.offset(parseInt(req.query['offset']));
    }
    if (req.query['limit']) {
      knexQuery = knexQuery.limit(parseInt(req.query['limit']));
    }
    const instances = await knexQuery;
    res.send(JSON.stringify(instances));
  });
}
