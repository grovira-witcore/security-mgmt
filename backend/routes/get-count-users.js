const Security = require('../security.js');
const Utils = require('../utils.js');

module.exports = function (knex, express) {
  express.get('/count-users', async function (req, res) {
    let knexQuery = knex
      .count('* as count')
      .from('users as t0');
    if (req.query['email']) {
      knexQuery = knexQuery.where(function () { return this.whereLike('t0.email', knex.raw('?', req.query['email'])); });
    }
    if (req.query['hash']) {
      knexQuery = knexQuery.where(function () { return this.whereLike('t0.hash', knex.raw('?', req.query['hash'])); });
    }
    const result = await knexQuery;
    res.send(JSON.stringify(result[0].count));
  });
}
