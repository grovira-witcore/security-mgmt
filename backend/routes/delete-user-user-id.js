const Security = require('../security.js');
const Utils = require('../utils.js');

module.exports = function (knex, express) {
  express.delete('/user/:userId', async function (req, res) {
    try {
      await knex('users')
        .where('user_id', '=', req.params['userId'])
        .delete();
    }
    catch (err) {
      if (Utils.isForeignKeyError(err)) {
        res
          .status(409)
          .send({
            code: 409,
            message: 'Conflict',
            description: 'Foreign key constraint fails trying to delete User.',
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
