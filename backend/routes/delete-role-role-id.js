const Security = require('../security.js');
const Utils = require('../utils.js');

module.exports = function (knex, express) {
  express.delete('/role/:roleId', async function (req, res) {
    try {
      await knex('roles')
        .where('role_id', '=', req.params['roleId'])
        .delete();
    }
    catch (err) {
      if (Utils.isForeignKeyError(err)) {
        res
          .status(409)
          .send({
            code: 409,
            message: 'Conflict',
            description: 'Foreign key constraint fails trying to delete Role.',
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
