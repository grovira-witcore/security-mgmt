const Security = require('../security.js');
const Utils = require('../utils.js');

module.exports = function (knex, express) {
  express.delete('/role-object/:roleObjectId', async function (req, res) {
    try {
      await knex('role_objects')
        .where('role_object_id', '=', req.params['roleObjectId'])
        .delete();
    }
    catch (err) {
      if (Utils.isForeignKeyError(err)) {
        res
          .status(409)
          .send({
            code: 409,
            message: 'Conflict',
            description: 'Foreign key constraint fails trying to delete RoleObject.',
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
