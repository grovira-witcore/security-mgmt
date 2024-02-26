const Security = require('../security.js');
const Utils = require('../utils.js');
const createRole = async function (knex, req, res) {
  const { name, description, departmentId } = req.body;

  const hash = Math.random().toString(36).substr(2);

  const [roleId] = await knex('roles')
    .insert({
      name: name,
      description: description,
      department_id: departmentId,
      created_at: new Date(),
      hash: hash,
    })
    .returning('role_id');

  res.status(201).send({ roleId });
}
module.exports = function (knex, express) {
  express.post('/object/v2', async function (req, res) {
    await createRole(knex, req, res);
  });
}
