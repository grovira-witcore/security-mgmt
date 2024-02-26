const Security = require('../security.js');
const Utils = require('../utils.js');
const createRoleObject = async function (knex, req, res) {
  const roleId = parseInt(req.params.roleId);
  const { objectId, accessLevel } = req.body;

  const hash = Math.random().toString(36).substr(2);

  const [roleObjectId] = await knex('role_objects')
    .insert({
      role_id: roleId,
      object_id: objectId,
      access_level: accessLevel,
      created_at: new Date(),
      hash: hash,
    })
    .returning('role_object_id');

  res.status(201).send({ roleObjectId });
}
module.exports = function (knex, express) {
  express.post('/role/:roleId/object', async function (req, res) {
    await createRoleObject(knex, req, res);
  });
}
