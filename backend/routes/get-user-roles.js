const Security = require('../security.js');
const Utils = require('../utils.js');

module.exports = function (knex, express) {
  express.get('/user-roles', async function (req, res) {
    let knexQuery = knex
      .select(
        't0.user_role_id as userRoleId',
        't1.name as roleName',
        't1.description as roleDescription',
        't0.created_at as createdAt',
        't0.updated_at as updatedAt',
        't0.hash as hash',
        't0.role_id as roleId'
      )
      .from('user_roles as t0')
      .innerJoin('roles as t1', 't1.role_id', '=', 't0.role_id');
    if (req.query['userUserId']) {
      knexQuery = knexQuery.where('t0.user_id', '=', knex.raw('?', parseInt(req.query['userUserId'])));
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
