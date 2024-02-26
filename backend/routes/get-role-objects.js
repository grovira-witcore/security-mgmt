const Security = require('../security.js');
const Utils = require('../utils.js');

module.exports = function (knex, express) {
  express.get('/role-objects', async function (req, res) {
    let knexQuery = knex
      .select(
        't0.role_object_id as roleObjectId',
        't1.name as objectName',
        't1.description as objectDescription',
        't0.access_level as accessLevel',
        't0.created_at as createdAt',
        't0.updated_at as updatedAt',
        't0.hash as hash'
      )
      .from('role_objects as t0')
      .innerJoin('objects as t1', 't1.object_id', '=', 't0.object_id');
    if (req.query['roleRoleId']) {
      knexQuery = knexQuery.where('t0.role_id', '=', knex.raw('?', parseInt(req.query['roleRoleId'])));
    }
    knexQuery = knexQuery.orderBy([
      { column: 't1.name', order: 'asc' },
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
