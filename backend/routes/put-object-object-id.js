const Security = require('../security.js');
const Utils = require('../utils.js');
const updateObject = async function (knex, req, res) {
  const objectId = parseInt(req.params.objectId);
  const { name, description } = req.body;

  if (!name || !description) {
    return res.status(400).send({ error: 'Name and Description are required' });
  }

  await knex('objects')
    .where('object_id', '=', objectId)
    .update({
      name,
      description,
      updated_at: new Date(),
    });

  res.status(200).send({ objectId });
}
module.exports = function (knex, express) {
  express.put('/object/:objectId', async function (req, res) {
    await updateObject(knex, req, res);
  });
}
