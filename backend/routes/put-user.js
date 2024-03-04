const Security = require('../security.js');
const Utils = require('../utils.js');
const updateUser = async function (knex, req, res) {
  const userId = parseInt(req.params.userId);
  const { firstName, lastName, phone } = req.body;

  if (!firstName || !lastName || !phone) {
    return res.status(400).send({ error: 'FirstName, LastName and Phone are required' });
  }

  await knex('users')
    .where('user_id', '=', userId)
    .update({
      first_name: firstName,
      last_name: lastName,
      phone: phone,
      updated_at: new Date(),
    });

  res.status(200).send({ userId });
}
module.exports = function (knex, express) {
  express.put('/user/:userId', async function (req, res) {
    await updateUser(knex, req, res);
  });
}
