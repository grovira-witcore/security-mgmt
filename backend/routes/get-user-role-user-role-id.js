const Security = require('../security.js');
const Utils = require('../utils.js');

module.exports = function (knex, express) {
  express.get('/user-role/:userRoleId', async function (req, res) {
    let knexQuery = knex
      .select(
        't0.user_role_id as userRoleId',
        't1.name as roleName'
      )
      .from('user_roles as t0')
      .innerJoin('roles as t1', 't1.role_id', '=', 't0.role_id');
    knexQuery = knexQuery.where('t0.user_role_id', '=', req.params['userRoleId']);
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
          description: 'The requested UserRole could not be found.',
          translationKey: 'theRequestedResourceCouldNotBeFound'
        });
      return;
    }
  });
}
