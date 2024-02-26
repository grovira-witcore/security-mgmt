const Security = require('../security.js');
const Utils = require('../utils.js');
const createUser = async function (knex, req, res) {
  const { firstName, lastName, email, password, phone } = req.body;

  const hash = Math.random().toString(36).substr(2);

  const [userId] = await knex('users')
    .insert({
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
      phone: phone,
      enabled: true,
      created_at: new Date(),
      hash: hash,
    })
    .returning('user_id');

  res.status(201).send({ userId });
}
module.exports = function (knex, express) {
  express.post('/user', async function (req, res) {
    await createUser(knex, req, res);
  });
}
