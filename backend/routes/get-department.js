const Security = require('../security.js');
const Utils = require('../utils.js');

module.exports = function (knex, express) {
  express.get('/department/:departmentId', async function (req, res) {
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
    knexQuery = knexQuery.where('t0.department_id', '=', req.params['departmentId']);
    const instances = await knexQuery;
    if (instances.length > 0) {
      res.send(instances[0]);
    }
    else {
      res
        .status(404)
        .send({
          code: 404,
          message: 'Not Found',
          description: 'The requested Department could not be found.',
          translationKey: 'theRequestedResourceCouldNotBeFound'
        });
      return;
    }
  });
}
