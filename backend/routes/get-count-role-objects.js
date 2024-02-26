const Security = require('../security.js');
const Utils = require('../utils.js');

module.exports = function (knex, express) {
  express.get('/count-role-objects', async function (req, res) {
    let knexQuery = knex
      .count('* as count')
      .from('role_objects as t0');
    if (req.query['roleRoleId']) {
      knexQuery = knexQuery.where('t0.role_id', '=', knex.raw('?', parseInt(req.query['roleRoleId'])));
    }
    const result = await knexQuery;
    res.send(JSON.stringify(result[0].count));
  });
}
