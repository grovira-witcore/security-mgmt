const Security = require('../security.js');
const Utils = require('../utils.js');

module.exports = function (knex, express) {
  express.get('/role/:roleId', async function (req, res) {
    let knexQuery = knex
      .select(
        't0.role_id as roleId',
        't0.name as name',
        't0.description as description',
        't1.name as departmentName',
        't0.created_at as createdAt',
        't0.updated_at as updatedAt',
        't0.hash as hash',
        't0.department_id as departmentId'
      )
      .from('roles as t0')
      .innerJoin('departments as t1', 't1.department_id', '=', 't0.department_id');
    knexQuery = knexQuery.where('t0.role_id', '=', req.params['roleId']);
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
          description: 'The requested Role could not be found.',
          translationKey: 'theRequestedResourceCouldNotBeFound'
        });
      return;
    }
  });
}
