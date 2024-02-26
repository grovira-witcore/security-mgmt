const Security = require('../security.js');
const Utils = require('../utils.js');

module.exports = function (knex, express) {
  express.get('/count-user-roles', async function (req, res) {
    let knexQuery = knex
      .count('* as count')
      .from('user_roles as t0');
    if (req.query['userUserId']) {
      knexQuery = knexQuery.where('t0.user_id', '=', knex.raw('?', parseInt(req.query['userUserId'])));
    }
    const result = await knexQuery;
    res.send(JSON.stringify(result[0].count));
  });
}
