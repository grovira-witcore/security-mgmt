const Security = require('../security.js');
const Utils = require('../utils.js');
const createObject = async function (knex, req, res) {
  const { name, description } = req.body;

  const hash = Math.random().toString(36).substr(2);

  const [objectId] = await knex('objects')
    .insert({
      name: name,
      description: description,
      created_at: new Date(),
      hash: hash,
    })
    .returning('object_id');

  res.status(201).send({ objectId });
}
module.exports = function (knex, express) {
  express.post('/object', async function (req, res) {
    await createObject(knex, req, res);
  });
}
