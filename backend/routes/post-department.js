const Security = require('../security.js');
const Utils = require('../utils.js');
const createDepartment = async function (knex, req, res) {
  const { name, description } = req.body;

  const hash = Math.random().toString(36).substr(2);

  const [departmentId] = await knex('departments')
    .insert({
      name: name,
      description: description,
      created_at: new Date(),
      hash: hash,
    })
    .returning('department_id');

  res.status(201).send({ departmentId });
}
module.exports = function (knex, express) {
  express.post('/department', async function (req, res) {
    await createDepartment(knex, req, res);
  });
}
