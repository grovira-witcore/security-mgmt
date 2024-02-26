module.exports = async function (knex) {
  await knex.raw('PRAGMA foreign_keys = ON')
  // Tables
  await knex.schema.createTable('departments', function (knexTable) {
    knexTable.increments('department_id');
    knexTable.string('name', 80);
    knexTable.string('description', 400);
    knexTable.datetime('created_at');
    knexTable.datetime('updated_at').nullable();
    knexTable.string('hash', 200);
  });
  await knex.schema.createTable('objects', function (knexTable) {
    knexTable.increments('object_id');
    knexTable.string('name', 80);
    knexTable.string('description', 400);
    knexTable.datetime('created_at');
    knexTable.datetime('updated_at').nullable();
    knexTable.string('hash', 200);
  });
  await knex.schema.createTable('roles', function (knexTable) {
    knexTable.increments('role_id');
    knexTable.string('name', 80);
    knexTable.string('description', 400);
    knexTable.integer('department_id');
    knexTable.datetime('created_at');
    knexTable.datetime('updated_at').nullable();
    knexTable.string('hash', 200);
  });
  await knex.schema.createTable('role_objects', function (knexTable) {
    knexTable.increments('role_object_id');
    knexTable.integer('role_id');
    knexTable.integer('object_id');
    knexTable.string('access_level', 20);
    knexTable.datetime('created_at');
    knexTable.datetime('updated_at').nullable();
    knexTable.string('hash', 200);
  });
  await knex.schema.createTable('users', function (knexTable) {
    knexTable.increments('user_id');
    knexTable.string('first_name', 80);
    knexTable.string('last_name', 80);
    knexTable.string('email', 80);
    knexTable.string('password', 80);
    knexTable.string('phone', 20);
    knexTable.boolean('enabled');
    knexTable.datetime('created_at');
    knexTable.datetime('updated_at').nullable();
    knexTable.string('hash', 200);
  });
  await knex.schema.createTable('user_roles', function (knexTable) {
    knexTable.increments('user_role_id');
    knexTable.integer('user_id');
    knexTable.integer('role_id');
    knexTable.datetime('created_at');
    knexTable.datetime('updated_at').nullable();
    knexTable.string('hash', 200);
  });
  // Foreign Keys
  await knex.schema.table('roles', function (knexTable) {
    knexTable.foreign('department_id').references('departments.department_id');
  });
  await knex.schema.table('role_objects', function (knexTable) {
    knexTable.foreign('role_id').references('roles.role_id');
    knexTable.foreign('object_id').references('objects.object_id');
  });
  await knex.schema.table('user_roles', function (knexTable) {
    knexTable.foreign('user_id').references('users.user_id');
    knexTable.foreign('role_id').references('roles.role_id');
  });
  // Indexes
}
