const Security = require('../security.js');
const Utils = require('../utils.js');

module.exports = function (knex, express) {
  express.get('/user/:userId', async function (req, res) {
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
    knexQuery = knexQuery.where('t0.user_id', '=', req.params['userId']);
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
          description: 'The requested User could not be found.',
          translationKey: 'theRequestedResourceCouldNotBeFound'
        });
      return;
    }
  });
}
