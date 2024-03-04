const Security = require('../security.js');
const Utils = require('../utils.js');
const updateDepartment = async function (knex, req, res) {
  const departmentId = parseInt(req.params.departmentId);
  const { name, description } = req.body;

  if (!name || !description) {
    return res.status(400).send({ error: 'Name and Description are required' });
  }

  await knex('departments')
    .where('department_id', '=', departmentId)
    .update({
      name,
      description,
      updated_at: new Date(),
    });

  res.status(200).send({ departmentId });
}
module.exports = function (knex, express) {
  express.put('/department/:departmentId', async function (req, res) {
    await updateDepartment(knex, req, res);
  });
}
