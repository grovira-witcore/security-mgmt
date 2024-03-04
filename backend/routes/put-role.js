const Security = require('../security.js');
const Utils = require('../utils.js');
const updateRole = async function (knex, req, res) {
  const roleId = parseInt(req.params.roleId);
  const { name, description, departmentId } = req.body;

  if (!name || !description || !departmentId) {
    return res.status(400).send({ error: 'Name, Description and Department are required' });
  }

  await knex('roles')
    .where('role_id', '=', roleId)
    .update({
      name,
      description,
      department_id: departmentId,
      updated_at: new Date(),
    });

  res.status(200).send({ roleId });
}
module.exports = function (knex, express) {
  express.put('/role/:roleId', async function (req, res) {
    await updateRole(knex, req, res);
  });
}
