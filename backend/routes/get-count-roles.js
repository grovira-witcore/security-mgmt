const Security = require('../security.js');
const Utils = require('../utils.js');

module.exports = function (knex, express) {
  express.get('/count-roles', async function (req, res) {
    let knexQuery = knex
      .count('* as count')
      .from('roles as t0');
    if (req.query['name']) {
      knexQuery = knexQuery.where(function () { return this.whereLike('t0.name', knex.raw('?', req.query['name'])); });
    }
    if (req.query['departmentIds']) {
      knexQuery = knexQuery.where(function () { return this.whereIn('t0.department_id', req.query['departmentIds'].split(',').map((value) => parseInt(value))); });
    }
    if (req.query['hash']) {
      knexQuery = knexQuery.where(function () { return this.whereLike('t0.hash', knex.raw('?', req.query['hash'])); });
    }
    const result = await knexQuery;
    res.send(JSON.stringify(result[0].count));
  });
}
