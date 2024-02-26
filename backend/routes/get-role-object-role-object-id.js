const Security = require('../security.js');
const Utils = require('../utils.js');

module.exports = function (knex, express) {
  express.get('/role-object/:roleObjectId', async function (req, res) {
    let knexQuery = knex
      .select(
        't0.role_object_id as roleObjectId',
        't1.name as objectName'
      )
      .from('role_objects as t0')
      .innerJoin('objects as t1', 't1.object_id', '=', 't0.object_id');
    knexQuery = knexQuery.where('t0.role_object_id', '=', req.params['roleObjectId']);
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
          description: 'The requested RoleObject could not be found.',
          translationKey: 'theRequestedResourceCouldNotBeFound'
        });
      return;
    }
  });
}
