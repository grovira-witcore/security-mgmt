const Security = require('../security.js');
const Utils = require('../utils.js');

module.exports = function (knex, express) {
  express.delete('/user-role/:userRoleId', async function (req, res) {
    try {
      await knex('user_roles')
        .where('user_role_id', '=', req.params['userRoleId'])
        .delete();
    }
    catch (err) {
      if (Utils.isForeignKeyError(err)) {
        res
          .status(409)
          .send({
            code: 409,
            message: 'Conflict',
            description: 'Foreign key constraint fails trying to delete UserRole.',
            translationKey: 'cannotDeleteThisObjectBecauseItHasRelations'
          });
        return;
      }
      else {
        throw err;
      }
    }
    res.send(null);
  });
}
