module.exports = async function (knex) {
  await knex('departments').insert({
    department_id: 1,
    name: 'Customer Service',
    description: 'User Support Department',
    created_at: new Date('2023-10-24T19:59:05.031Z'),
    updated_at: new Date('2023-10-15T01:13:23.938Z'),
    hash: 'z7Xn1Kj2WsR',
  });
  await knex('departments').insert({
    department_id: 2,
    name: 'Sales',
    description: 'User Experience Department',
    created_at: new Date('2023-04-26T00:52:40.734Z'),
    updated_at: new Date('2023-06-14T16:51:33.647Z'),
    hash: 'd3Ht6Ws0KjF',
  });
  await knex('departments').insert({
    department_id: 3,
    name: 'Finance',
    description: 'User Outreach Department',
    created_at: new Date('2023-08-28T01:19:39.909Z'),
    updated_at: new Date('2023-10-16T15:48:29.946Z'),
    hash: 'u9Kj2Ws4FdG',
  });
  await knex('departments').insert({
    department_id: 4,
    name: 'Logistics',
    description: 'User Research Department',
    created_at: new Date('2023-04-02T14:34:27.836Z'),
    updated_at: null,
    hash: 'b9Kj2Gs5HtD',
  });
  await knex('objects').insert({
    object_id: 1,
    name: 'device.switch',
    description: 'Network device for connections',
    created_at: new Date('2023-07-16T15:30:17.279Z'),
    updated_at: new Date('2024-01-31T20:42:49.023Z'),
    hash: 'o7Jq2NxQBeF',
  });
  await knex('objects').insert({
    object_id: 2,
    name: 'algorithm.encryption',
    description: 'Code for secure data',
    created_at: new Date('2023-04-04T00:57:53.126Z'),
    updated_at: new Date('2023-08-07T18:13:49.868Z'),
    hash: 'm9Yp1LvXcKw',
  });
  await knex('objects').insert({
    object_id: 3,
    name: 'sensor.temperature',
    description: 'Detects ambient heat',
    created_at: new Date('2023-09-10T19:10:41.616Z'),
    updated_at: new Date('2023-02-27T16:24:31.147Z'),
    hash: 'a4Zu8RsGhD3',
  });
  await knex('objects').insert({
    object_id: 4,
    name: 'protocol.communication',
    description: 'Rules for device talk',
    created_at: new Date('2023-05-26T22:33:45.938Z'),
    updated_at: new Date('2023-08-04T19:13:35.673Z'),
    hash: 'e6Tw0FvHjMl',
  });
  await knex('objects').insert({
    object_id: 5,
    name: 'controller.external',
    description: 'Remote device manager',
    created_at: new Date('2023-05-25T13:14:30.511Z'),
    updated_at: new Date('2023-04-14T23:40:49.211Z'),
    hash: 'i2Kx9PqOsWn',
  });
  await knex('objects').insert({
    object_id: 6,
    name: 'server.storage',
    description: 'Network data hub',
    created_at: new Date('2023-04-18T15:11:57.962Z'),
    updated_at: new Date('2023-08-16T04:21:38.262Z'),
    hash: 'u3Ew7GvZbYl',
  });
  await knex('objects').insert({
    object_id: 7,
    name: 'interface.user',
    description: 'User-device link',
    created_at: new Date('2024-02-14T18:07:24.978Z'),
    updated_at: new Date('2023-05-04T01:44:14.583Z'),
    hash: 'c8Rq1NjBmXo',
  });
  await knex('objects').insert({
    object_id: 8,
    name: 'module.processing',
    description: 'Data function unit',
    created_at: new Date('2023-05-10T21:07:51.443Z'),
    updated_at: new Date('2024-01-13T21:22:57.554Z'),
    hash: 'l0Vf4HtCwMe',
  });
  await knex('objects').insert({
    object_id: 9,
    name: 'tool.diagnostic',
    description: 'System issue finder',
    created_at: new Date('2023-07-16T15:30:17.279Z'),
    updated_at: new Date('2024-01-31T20:42:49.023Z'),
    hash: 'v1Ws4Gs7HtD',
  });
  await knex('objects').insert({
    object_id: 10,
    name: 'electronic.component',
    description: 'Hardware part',
    created_at: new Date('2023-04-04T00:57:53.126Z'),
    updated_at: new Date('2023-08-07T18:13:49.868Z'),
    hash: 'c5Kj9Fs2HtR',
  });
  await knex('objects').insert({
    object_id: 11,
    name: 'sensor.motion',
    description: 'Detects physical change',
    created_at: new Date('2023-09-10T19:10:41.616Z'),
    updated_at: new Date('2023-02-27T16:24:31.147Z'),
    hash: 'l3Gs6Ws1KjF',
  });
  await knex('objects').insert({
    object_id: 12,
    name: 'router.network',
    description: 'Data traffic director',
    created_at: new Date('2023-05-26T22:33:45.938Z'),
    updated_at: new Date('2023-08-04T19:13:35.673Z'),
    hash: 'm7Ht0Fs4KjB',
  });
  await knex('objects').insert({
    object_id: 13,
    name: 'firmware.update',
    description: 'Device software refresh',
    created_at: new Date('2023-05-25T13:14:30.511Z'),
    updated_at: new Date('2023-04-14T23:40:49.211Z'),
    hash: 'n1Ws8Gs5HtD',
  });
  await knex('objects').insert({
    object_id: 14,
    name: 'API.integration',
    description: 'Software bridge',
    created_at: new Date('2023-04-18T15:11:57.962Z'),
    updated_at: new Date('2023-08-16T04:21:38.262Z'),
    hash: 'o3Fs2Kj9HtR',
  });
  await knex('objects').insert({
    object_id: 15,
    name: 'alarm.security',
    description: 'Threat notifier',
    created_at: new Date('2024-02-14T18:07:24.978Z'),
    updated_at: new Date('2023-05-04T01:44:14.583Z'),
    hash: 'p7Gs6Ws4KjD',
  });
  await knex('objects').insert({
    object_id: 16,
    name: 'microcontroller.component',
    description: 'Tiny system chip',
    created_at: new Date('2023-05-10T21:07:51.443Z'),
    updated_at: new Date('2024-01-13T21:22:57.554Z'),
    hash: 'q1Ht8Fs5KjR',
  });
  await knex('roles').insert({
    role_id: 1,
    name: 'CallCenter',
    description: 'Call Center',
    department_id: 1,
    created_at: new Date('2023-09-25T03:36:36.884Z'),
    updated_at: new Date('2024-02-21T16:38:27.035Z'),
    hash: 'y5As9GhJkLi',
  });
  await knex('roles').insert({
    role_id: 2,
    name: 'Supervisor',
    description: 'Supervisor',
    department_id: 1,
    created_at: new Date('2023-10-17T03:43:35.635Z'),
    updated_at: new Date('2024-02-21T16:38:27.035Z'),
    hash: 'r7Sd2FgHbVc',
  });
  await knex('roles').insert({
    role_id: 3,
    name: 'Seller',
    description: 'Products Seller',
    department_id: 2,
    created_at: new Date('2023-07-29T04:59:35.758Z'),
    updated_at: new Date('2024-02-21T16:38:27.035Z'),
    hash: 'p1Lk4JhFgDs',
  });
  await knex('roles').insert({
    role_id: 4,
    name: 'Preseller',
    description: 'Products Preseller',
    department_id: 2,
    created_at: new Date('2023-03-26T14:08:29.688Z'),
    updated_at: new Date('2024-02-21T16:38:27.035Z'),
    hash: 'x9Pq3WsZeRv',
  });
  await knex('roles').insert({
    role_id: 5,
    name: 'Account Manager',
    description: 'Account Manager Responsible',
    department_id: 3,
    created_at: new Date('2023-07-11T11:22:31.273Z'),
    updated_at: null,
    hash: 'n6Mb0VcXkLo',
  });
  await knex('roles').insert({
    role_id: 6,
    name: 'Analyst',
    description: 'Finance Analyst',
    department_id: 3,
    created_at: new Date('2023-04-21T18:37:01.683Z'),
    updated_at: null,
    hash: 'q2Ns5JhFdGt',
  });
  await knex('roles').insert({
    role_id: 7,
    name: 'Driver',
    description: 'Field Driver',
    department_id: 4,
    created_at: new Date('2023-10-26T10:21:24.417Z'),
    updated_at: new Date('2024-02-21T16:38:27.035Z'),
    hash: 'v8Cj3BnMxZq',
  });
  await knex('roles').insert({
    role_id: 8,
    name: 'Logistic Coordinator',
    description: 'Logistic Coordinator',
    department_id: 4,
    created_at: new Date('2023-04-30T01:48:49.127Z'),
    updated_at: new Date('2024-02-21T16:38:27.035Z'),
    hash: 'd4Ht7KlOpWs',
  });
  await knex('role_objects').insert({
    role_object_id: 1,
    role_id: 1,
    object_id: 1,
    access_level: 'read',
    created_at: new Date('2023-12-01T14:17:05.251Z'),
    updated_at: new Date('2023-11-03T02:22:58.845Z'),
    hash: 't5Yk8PqSjBf',
  });
  await knex('role_objects').insert({
    role_object_id: 2,
    role_id: 1,
    object_id: 3,
    access_level: 'full',
    created_at: new Date('2023-09-02T16:15:29.787Z'),
    updated_at: new Date('2023-12-17T08:43:19.635Z'),
    hash: 'b9Rl2GhNpWs',
  });
  await knex('role_objects').insert({
    role_object_id: 3,
    role_id: 1,
    object_id: 4,
    access_level: 'full',
    created_at: new Date('2023-07-13T10:11:36.043Z'),
    updated_at: new Date('2023-06-19T05:27:50.859Z'),
    hash: 'w6Mz0VcXnJs',
  });
  await knex('role_objects').insert({
    role_object_id: 4,
    role_id: 1,
    object_id: 8,
    access_level: 'full',
    created_at: new Date('2023-06-19T06:19:51.141Z'),
    updated_at: new Date('2024-02-08T18:02:36.974Z'),
    hash: 'g3Hj5DfRtYl',
  });
  await knex('role_objects').insert({
    role_object_id: 5,
    role_id: 2,
    object_id: 3,
    access_level: 'read',
    created_at: new Date('2024-01-05T07:05:49.366Z'),
    updated_at: null,
    hash: 'z1Qw7GsHnJf',
  });
  await knex('role_objects').insert({
    role_object_id: 6,
    role_id: 2,
    object_id: 9,
    access_level: 'read',
    created_at: new Date('2023-12-03T14:06:24.047Z'),
    updated_at: new Date('2023-09-16T09:21:29.086Z'),
    hash: 'f8Kl4DsFgHj',
  });
  await knex('role_objects').insert({
    role_object_id: 7,
    role_id: 3,
    object_id: 4,
    access_level: 'read',
    created_at: new Date('2023-12-01T13:02:16.519Z'),
    updated_at: null,
    hash: 'j2Xk9PqWnMb',
  });
  await knex('role_objects').insert({
    role_object_id: 8,
    role_id: 3,
    object_id: 7,
    access_level: 'write',
    created_at: new Date('2023-05-21T19:06:14.724Z'),
    updated_at: new Date('2024-02-04T10:40:51.525Z'),
    hash: 'l5Gh8KjNcZq',
  });
  await knex('role_objects').insert({
    role_object_id: 9,
    role_id: 4,
    object_id: 2,
    access_level: 'read',
    created_at: new Date('2023-12-01T14:17:05.251Z'),
    updated_at: new Date('2023-11-03T02:22:58.845Z'),
    hash: 't5Yk8PqSjBf',
  });
  await knex('role_objects').insert({
    role_object_id: 10,
    role_id: 4,
    object_id: 9,
    access_level: 'full',
    created_at: new Date('2023-09-02T16:15:29.787Z'),
    updated_at: new Date('2023-12-17T08:43:19.635Z'),
    hash: 'b9Rl2GhNpWs',
  });
  await knex('role_objects').insert({
    role_object_id: 11,
    role_id: 4,
    object_id: 14,
    access_level: 'full',
    created_at: new Date('2023-07-13T10:11:36.043Z'),
    updated_at: new Date('2023-06-19T05:27:50.859Z'),
    hash: 'w6Mz0VcXnJs',
  });
  await knex('role_objects').insert({
    role_object_id: 12,
    role_id: 5,
    object_id: 8,
    access_level: 'full',
    created_at: new Date('2023-06-19T06:19:51.141Z'),
    updated_at: new Date('2024-02-08T18:02:36.974Z'),
    hash: 'g3Hj5DfRtYl',
  });
  await knex('role_objects').insert({
    role_object_id: 13,
    role_id: 5,
    object_id: 12,
    access_level: 'read',
    created_at: new Date('2024-01-05T07:05:49.366Z'),
    updated_at: null,
    hash: 'z1Qw7GsHnJf',
  });
  await knex('role_objects').insert({
    role_object_id: 14,
    role_id: 5,
    object_id: 13,
    access_level: 'read',
    created_at: new Date('2023-12-03T14:06:24.047Z'),
    updated_at: new Date('2023-09-16T09:21:29.086Z'),
    hash: 'f8Kl4DsFgHj',
  });
  await knex('role_objects').insert({
    role_object_id: 15,
    role_id: 5,
    object_id: 14,
    access_level: 'read',
    created_at: new Date('2023-12-01T13:02:16.519Z'),
    updated_at: null,
    hash: 'j2Xk9PqWnMb',
  });
  await knex('role_objects').insert({
    role_object_id: 16,
    role_id: 6,
    object_id: 4,
    access_level: 'write',
    created_at: new Date('2023-05-21T19:06:14.724Z'),
    updated_at: new Date('2024-02-04T10:40:51.525Z'),
    hash: 'l5Gh8KjNcZq',
  });
  await knex('role_objects').insert({
    role_object_id: 17,
    role_id: 6,
    object_id: 6,
    access_level: 'read',
    created_at: new Date('2023-12-01T14:17:05.251Z'),
    updated_at: new Date('2023-11-03T02:22:58.845Z'),
    hash: 't5Yk8PqSjBf',
  });
  await knex('role_objects').insert({
    role_object_id: 18,
    role_id: 6,
    object_id: 10,
    access_level: 'full',
    created_at: new Date('2023-09-02T16:15:29.787Z'),
    updated_at: new Date('2023-12-17T08:43:19.635Z'),
    hash: 'b9Rl2GhNpWs',
  });
  await knex('role_objects').insert({
    role_object_id: 19,
    role_id: 7,
    object_id: 3,
    access_level: 'full',
    created_at: new Date('2023-07-13T10:11:36.043Z'),
    updated_at: new Date('2023-06-19T05:27:50.859Z'),
    hash: 'w6Mz0VcXnJs',
  });
  await knex('role_objects').insert({
    role_object_id: 20,
    role_id: 7,
    object_id: 9,
    access_level: 'full',
    created_at: new Date('2023-06-19T06:19:51.141Z'),
    updated_at: new Date('2024-02-08T18:02:36.974Z'),
    hash: 'g3Hj5DfRtYl',
  });
  await knex('role_objects').insert({
    role_object_id: 21,
    role_id: 7,
    object_id: 12,
    access_level: 'read',
    created_at: new Date('2024-01-05T07:05:49.366Z'),
    updated_at: null,
    hash: 'z1Qw7GsHnJf',
  });
  await knex('role_objects').insert({
    role_object_id: 22,
    role_id: 8,
    object_id: 5,
    access_level: 'read',
    created_at: new Date('2023-12-03T14:06:24.047Z'),
    updated_at: new Date('2023-09-16T09:21:29.086Z'),
    hash: 'f8Kl4DsFgHj',
  });
  await knex('role_objects').insert({
    role_object_id: 23,
    role_id: 8,
    object_id: 6,
    access_level: 'read',
    created_at: new Date('2023-12-01T13:02:16.519Z'),
    updated_at: null,
    hash: 'j2Xk9PqWnMb',
  });
  await knex('role_objects').insert({
    role_object_id: 24,
    role_id: 8,
    object_id: 10,
    access_level: 'write',
    created_at: new Date('2023-05-21T19:06:14.724Z'),
    updated_at: new Date('2024-02-04T10:40:51.525Z'),
    hash: 'l5Gh8KjNcZq',
  });
  await knex('users').insert({
    user_id: 1,
    first_name: 'John',
    last_name: 'Smith',
    email: 'janedoe@example.com',
    password: 'User1234',
    phone: '555-345-6789',
    enabled: false,
    created_at: new Date('2023-11-18T10:51:42.436Z'),
    updated_at: new Date('2024-01-10T00:02:39.701Z'),
    hash: 'o3Qw6LkHtFd',
  });
  await knex('users').insert({
    user_id: 2,
    first_name: 'Sarah',
    last_name: 'Johnson',
    email: 'nataliewalker@example.com',
    password: 'Passw0rdUser',
    phone: '555-567-8901',
    enabled: false,
    created_at: new Date('2023-05-27T21:42:33.348Z'),
    updated_at: new Date('2023-03-07T13:01:01.454Z'),
    hash: 'e9Bm2SdFgHj',
  });
  await knex('users').insert({
    user_id: 3,
    first_name: 'Emma',
    last_name: 'Williams',
    email: 'victoriaadams@example.com',
    password: 'User#2021',
    phone: '555-012-3456',
    enabled: true,
    created_at: new Date('2023-04-29T12:29:08.344Z'),
    updated_at: new Date('2023-07-12T23:29:19.514Z'),
    hash: 's7Hn0ZqWmJk',
  });
  await knex('users').insert({
    user_id: 4,
    first_name: 'James',
    last_name: 'Brown',
    email: 'sophieturner@example.com',
    password: 'U$erP@ssword',
    phone: '555-901-2345',
    enabled: false,
    created_at: new Date('2023-03-15T17:23:50.669Z'),
    updated_at: new Date('2023-12-20T07:18:22.873Z'),
    hash: 'p4Xn8HjGvBc',
  });
  await knex('users').insert({
    user_id: 5,
    first_name: 'Michael',
    last_name: 'Jones',
    email: 'emilybrown@example.com',
    password: 'User!234',
    phone: '555-123-4567',
    enabled: false,
    created_at: new Date('2023-03-18T08:19:45.454Z'),
    updated_at: new Date('2024-01-11T00:44:57.210Z'),
    hash: 'm6Lk1WnJdFs',
  });
  await knex('users').insert({
    user_id: 6,
    first_name: 'Olivia',
    last_name: 'Miller',
    email: 'lilygreen@example.com',
    password: 'UserPassw0rd',
    phone: '555-678-9012',
    enabled: false,
    created_at: new Date('2024-01-26T13:40:28.357Z'),
    updated_at: null,
    hash: 'c0Vq3XnBsHj',
  });
  await knex('users').insert({
    user_id: 7,
    first_name: 'Sophia',
    last_name: 'Davis',
    email: 'sarahwhite@example.com',
    password: 'User123!',
    phone: '555-789-0123',
    enabled: true,
    created_at: new Date('2023-10-10T09:55:58.789Z'),
    updated_at: new Date('2023-07-08T19:37:06.490Z'),
    hash: 'x5Kj9LmOpQw',
  });
  await knex('users').insert({
    user_id: 8,
    first_name: 'Daniel',
    last_name: 'Garcia',
    email: 'matthewbrown@example.com',
    password: '@UserPassword',
    phone: '555-456-7890',
    enabled: false,
    created_at: new Date('2024-01-19T22:33:14.809Z'),
    updated_at: new Date('2023-11-29T15:02:50.393Z'),
    hash: 'r8Fg2Ns5JhD',
  });
  await knex('user_roles').insert({
    user_role_id: 1,
    user_id: 1,
    role_id: 1,
    created_at: new Date('2023-12-19T13:16:26.279Z'),
    updated_at: new Date('2023-12-23T18:28:05.244Z'),
    hash: 'i3Kl7Ws4HtV',
  });
  await knex('user_roles').insert({
    user_role_id: 2,
    user_id: 1,
    role_id: 3,
    created_at: new Date('2024-02-01T11:01:12.937Z'),
    updated_at: new Date('2023-06-03T09:42:47.106Z'),
    hash: 'y9Np2Qw5RsF',
  });
  await knex('user_roles').insert({
    user_role_id: 3,
    user_id: 2,
    role_id: 2,
    created_at: new Date('2023-08-09T09:22:26.710Z'),
    updated_at: new Date('2023-04-14T14:28:26.813Z'),
    hash: 'w0Xn3GsHbJq',
  });
  await knex('user_roles').insert({
    user_role_id: 4,
    user_id: 2,
    role_id: 3,
    created_at: new Date('2023-05-21T09:13:23.134Z'),
    updated_at: null,
    hash: 't7Jk1Wn5RgF',
  });
  await knex('user_roles').insert({
    user_role_id: 5,
    user_id: 3,
    role_id: 4,
    created_at: new Date('2023-08-17T16:31:57.184Z'),
    updated_at: null,
    hash: 'b4Gs0Qw3FdR',
  });
  await knex('user_roles').insert({
    user_role_id: 6,
    user_id: 4,
    role_id: 5,
    created_at: new Date('2023-08-24T16:50:11.707Z'),
    updated_at: null,
    hash: 'h8Kj2Wn4HtV',
  });
  await knex('user_roles').insert({
    user_role_id: 7,
    user_id: 5,
    role_id: 5,
    created_at: new Date('2023-05-18T19:25:22.892Z'),
    updated_at: new Date('2023-07-24T05:57:34.387Z'),
    hash: 'n5Jh7Wm1BsX',
  });
  await knex('user_roles').insert({
    user_role_id: 8,
    user_id: 6,
    role_id: 4,
    created_at: new Date('2024-02-09T03:42:02.834Z'),
    updated_at: new Date('2023-07-06T12:21:24.657Z'),
    hash: 'z9Ns4FdGvJq',
  });
  await knex('user_roles').insert({
    user_role_id: 9,
    user_id: 6,
    role_id: 7,
    created_at: new Date('2023-08-17T16:31:57.184Z'),
    updated_at: null,
    hash: 'b4Gs0Qw3FdR',
  });
  await knex('user_roles').insert({
    user_role_id: 10,
    user_id: 7,
    role_id: 5,
    created_at: new Date('2023-08-24T16:50:11.707Z'),
    updated_at: null,
    hash: 'h8Kj2Wn4HtV',
  });
  await knex('user_roles').insert({
    user_role_id: 11,
    user_id: 8,
    role_id: 3,
    created_at: new Date('2023-05-18T19:25:22.892Z'),
    updated_at: new Date('2023-07-24T05:57:34.387Z'),
    hash: 'n5Jh7Wm1BsX',
  });
  await knex('user_roles').insert({
    user_role_id: 12,
    user_id: 8,
    role_id: 6,
    created_at: new Date('2024-02-09T03:42:02.834Z'),
    updated_at: new Date('2023-07-06T12:21:24.657Z'),
    hash: 'z9Ns4FdGvJq',
  });
}
