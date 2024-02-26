const Security = require('../security.js');
const Utils = require('../utils.js');

module.exports = function (knex, express) {
  express.get('/roles', async function (req, res) {
    let knexQuery = knex
      .select(
        't0.role_id as roleId',
        't0.name as name',
        't0.description as description',
        't0.created_at as createdAt',
        't0.updated_at as updatedAt',
        't0.hash as hash',
        't0.department_id as departmentId',
        't1.name as departmentName'
      )
      .from('roles as t0')
      .innerJoin('departments as t1', 't1.department_id', '=', 't0.department_id');
    if (req.query['name']) {
      knexQuery = knexQuery.where(function () { return this.whereLike('t0.name', knex.raw('?', req.query['name'])); });
    }
    if (req.query['departmentIds']) {
      knexQuery = knexQuery.where(function () { return this.whereIn('t0.department_id', req.query['departmentIds'].split(',').map((value) => parseInt(value))); });
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
