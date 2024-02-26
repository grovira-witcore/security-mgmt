const Security = require('../security.js');
const Utils = require('../utils.js');

module.exports = function (knex, express) {
  express.delete('/department/:departmentId', async function (req, res) {
    try {
      await knex('departments')
        .where('department_id', '=', req.params['departmentId'])
        .delete();
    }
    catch (err) {
      if (Utils.isForeignKeyError(err)) {
        res
          .status(409)
          .send({
            code: 409,
            message: 'Conflict',
            description: 'Foreign key constraint fails trying to delete Department.',
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
