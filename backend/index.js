const Knex = require('knex');
const Express = require('express');
const Fs = require('fs');
const CreateTables = require('./create-tables.js');
const CreateMockData = require('./create-mock-data.js');
const Security = require('./security.js');

(async function () {
  // Knex
  const knex = Knex({
    client: 'sqlite3',
    connection: {
      filename: ':memory:'
    },
    useNullAsDefault: true
  });
  await CreateTables(knex);
  await CreateMockData(knex);
  // Express
  const express = Express();
  express.use(Express.json());
  express.use(Security.authenticate());
  const filesNames = await Fs.promises.readdir('./routes');
  filesNames.forEach(fileName => {
    require('./routes/' + fileName)(knex, express);
  });
  express.listen(4000, () => {
    console.log('Listening');
  });
})();
