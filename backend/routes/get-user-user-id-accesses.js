const Security = require('../security.js');
const Utils = require('../utils.js');
const getUserAccesses = async function (knex, req, res) {
  const userId = parseInt(req.params.userId);

  const userRoles = await knex('user_roles')
    .select('role_id')
    .where('user_id', '=', userId);

  const roleIds = userRoles.map(role => role.role_id);

  const roleObjects = await knex('role_objects')
    .select('object_id', 'access_level')
    .whereIn('role_id', roleIds);

  const objectIds = [...new Set(roleObjects.map(roleObject => roleObject.object_id))];

  const result = [];

  for (const objectId of objectIds) {
    const associatedRoleObjects = roleObjects.filter(roleObject => roleObject.object_id === objectId);
    const associatedAccessLevels = associatedRoleObjects.map(roleObject => roleObject.access_level);

    let accessLevel;
    if (associatedAccessLevels.includes('full')) {
      accessLevel = 'full';
    } else if (associatedAccessLevels.includes('read') && associatedAccessLevels.includes('write')) {
      accessLevel = 'full';
    } else {
      accessLevel = associatedAccessLevels[0];
    }

    const object = await knex('objects')
      .select('name as objectName', 'description as objectDescription')
      .where('object_id', '=', objectId)
      .first();

    result.push({
      objectId: objectId,
      objectName: object.objectName,
      objectDescription: object.objectDescription,
      accessLevel: accessLevel
    });
  }

  result.sort((a, b) => a.objectName.localeCompare(b.objectName));

  res.status(200).send(result);
}
module.exports = function (knex, express) {
  express.get('/user/:userId/accesses', async function (req, res) {
    await getUserAccesses(knex, req, res);
  });
}
