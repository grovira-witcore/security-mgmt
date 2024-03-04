const Security = require('../security.js');
const Utils = require('../utils.js');
const createUserRole = async function (knex, req, res) {
  const userId = parseInt(req.params.userId);
  const { roleId } = req.body;

  const hash = Math.random().toString(36).substr(2);

  const [userRoleId] = await knex('user_roles')
    .insert({
      user_id: userId,
      role_id: roleId,
      created_at: new Date(),
      hash: hash,
    })
    .returning('user_role_id');

  res.status(201).send({ userRoleId });
}
module.exports = function (knex, express) {
  express.post('/user/:userId/role', async function (req, res) {
    await createUserRole(knex, req, res);
  });
}
