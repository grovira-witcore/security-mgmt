const Security = require('../security.js');
const Utils = require('../utils.js');

module.exports = function (knex, express) {
  express.get('/users', async function (req, res) {
    let knexQuery = knex
      .select(
        't0.user_id as userId',
        't0.first_name as firstName',
        't0.last_name as lastName',
        't0.email as email',
        't0.phone as phone',
        't0.created_at as createdAt',
        't0.updated_at as updatedAt',
        't0.hash as hash',
        't0.enabled as enabled'
      )
      .from('users as t0');
    if (req.query['email']) {
      knexQuery = knexQuery.where(function () { return this.whereLike('t0.email', knex.raw('?', req.query['email'])); });
    }
    if (req.query['hash']) {
      knexQuery = knexQuery.where(function () { return this.whereLike('t0.hash', knex.raw('?', req.query['hash'])); });
    }
    knexQuery = knexQuery.orderBy([
      { column: 't0.first_name', order: 'asc' },
      { column: 't0.last_name', order: 'asc' },
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
