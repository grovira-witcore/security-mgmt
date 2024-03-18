import SecurityService from './SecurityService.js';

async function getDepartment(departmentId) {
  const response = await fetch(`/api/department/${departmentId}`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${SecurityService.getToken()}`,
    }
  });
  if (!response.ok) {
    const error = new Error('Error executing "getDepartment"');
    try {
      error.additionalData = await response.json();
    }
    catch (err) {
    }
    throw error;
  }
  return await response.json();
}

async function getDepartments(args) {
  let queryString = '';
  if (args) {
    queryString = '?' + new URLSearchParams(args).toString();
  }
  const response = await fetch(`/api/departments${queryString}`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${SecurityService.getToken()}`,
    }
  });
  if (!response.ok) {
    const error = new Error('Error executing "getDepartments"');
    try {
      error.additionalData = await response.json();
    }
    catch (err) {
    }
    throw error;
  }
  return await response.json();
}

async function getCountDepartments(args) {
  let queryString = '';
  if (args) {
    queryString = '?' + new URLSearchParams(args).toString();
  }
  const response = await fetch(`/api/count-departments${queryString}`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${SecurityService.getToken()}`,
    }
  });
  if (!response.ok) {
    const error = new Error('Error executing "getCountDepartments"');
    try {
      error.additionalData = await response.json();
    }
    catch (err) {
    }
    throw error;
  }
  return await response.json();
}

async function postDepartment(data) {
  const response = await fetch(`/api/department`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${SecurityService.getToken()}`,
    },
    body: JSON.stringify(data)
  });
  if (!response.ok) {
    const error = new Error('Error executing "postDepartment"');
    try {
      error.additionalData = await response.json();
    }
    catch (err) {
    }
    throw error;
  }
  return await response.json();
}

async function putDepartment(departmentId, data) {
  const response = await fetch(`/api/department/${departmentId}`, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${SecurityService.getToken()}`,
    },
    body: JSON.stringify(data)
  });
  if (!response.ok) {
    const error = new Error('Error executing "putDepartment"');
    try {
      error.additionalData = await response.json();
    }
    catch (err) {
    }
    throw error;
  }
  return await response.json();
}

async function deleteDepartment(departmentId) {
  const response = await fetch(`/api/department/${departmentId}`, {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${SecurityService.getToken()}`,
    }
  });
  if (!response.ok) {
    const error = new Error('Error executing "deleteDepartment"');
    try {
      error.additionalData = await response.json();
    }
    catch (err) {
    }
    throw error;
  }
  return null;
}

async function getRoles(args) {
  let queryString = '';
  if (args) {
    queryString = '?' + new URLSearchParams(args).toString();
  }
  const response = await fetch(`/api/roles${queryString}`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${SecurityService.getToken()}`,
    }
  });
  if (!response.ok) {
    const error = new Error('Error executing "getRoles"');
    try {
      error.additionalData = await response.json();
    }
    catch (err) {
    }
    throw error;
  }
  return await response.json();
}

async function getObject(objectId) {
  const response = await fetch(`/api/object/${objectId}`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${SecurityService.getToken()}`,
    }
  });
  if (!response.ok) {
    const error = new Error('Error executing "getObject"');
    try {
      error.additionalData = await response.json();
    }
    catch (err) {
    }
    throw error;
  }
  return await response.json();
}

async function getObjects(args) {
  let queryString = '';
  if (args) {
    queryString = '?' + new URLSearchParams(args).toString();
  }
  const response = await fetch(`/api/objects${queryString}`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${SecurityService.getToken()}`,
    }
  });
  if (!response.ok) {
    const error = new Error('Error executing "getObjects"');
    try {
      error.additionalData = await response.json();
    }
    catch (err) {
    }
    throw error;
  }
  return await response.json();
}

async function getCountObjects(args) {
  let queryString = '';
  if (args) {
    queryString = '?' + new URLSearchParams(args).toString();
  }
  const response = await fetch(`/api/count-objects${queryString}`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${SecurityService.getToken()}`,
    }
  });
  if (!response.ok) {
    const error = new Error('Error executing "getCountObjects"');
    try {
      error.additionalData = await response.json();
    }
    catch (err) {
    }
    throw error;
  }
  return await response.json();
}

async function postObject(data) {
  const response = await fetch(`/api/object`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${SecurityService.getToken()}`,
    },
    body: JSON.stringify(data)
  });
  if (!response.ok) {
    const error = new Error('Error executing "postObject"');
    try {
      error.additionalData = await response.json();
    }
    catch (err) {
    }
    throw error;
  }
  return await response.json();
}

async function putObject(objectId, data) {
  const response = await fetch(`/api/object/${objectId}`, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${SecurityService.getToken()}`,
    },
    body: JSON.stringify(data)
  });
  if (!response.ok) {
    const error = new Error('Error executing "putObject"');
    try {
      error.additionalData = await response.json();
    }
    catch (err) {
    }
    throw error;
  }
  return await response.json();
}

async function deleteObject(objectId) {
  const response = await fetch(`/api/object/${objectId}`, {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${SecurityService.getToken()}`,
    }
  });
  if (!response.ok) {
    const error = new Error('Error executing "deleteObject"');
    try {
      error.additionalData = await response.json();
    }
    catch (err) {
    }
    throw error;
  }
  return null;
}

async function getRole(roleId) {
  const response = await fetch(`/api/role/${roleId}`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${SecurityService.getToken()}`,
    }
  });
  if (!response.ok) {
    const error = new Error('Error executing "getRole"');
    try {
      error.additionalData = await response.json();
    }
    catch (err) {
    }
    throw error;
  }
  return await response.json();
}

async function postRoleObject(roleId, data) {
  const response = await fetch(`/api/role/${roleId}/object`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${SecurityService.getToken()}`,
    },
    body: JSON.stringify(data)
  });
  if (!response.ok) {
    const error = new Error('Error executing "postRoleObject"');
    try {
      error.additionalData = await response.json();
    }
    catch (err) {
    }
    throw error;
  }
  return await response.json();
}

async function getRoleObjects(args) {
  let queryString = '';
  if (args) {
    queryString = '?' + new URLSearchParams(args).toString();
  }
  const response = await fetch(`/api/role-objects${queryString}`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${SecurityService.getToken()}`,
    }
  });
  if (!response.ok) {
    const error = new Error('Error executing "getRoleObjects"');
    try {
      error.additionalData = await response.json();
    }
    catch (err) {
    }
    throw error;
  }
  return await response.json();
}

async function getCountRoleObjects(args) {
  let queryString = '';
  if (args) {
    queryString = '?' + new URLSearchParams(args).toString();
  }
  const response = await fetch(`/api/count-role-objects${queryString}`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${SecurityService.getToken()}`,
    }
  });
  if (!response.ok) {
    const error = new Error('Error executing "getCountRoleObjects"');
    try {
      error.additionalData = await response.json();
    }
    catch (err) {
    }
    throw error;
  }
  return await response.json();
}

async function getRoleObject(roleObjectId) {
  const response = await fetch(`/api/role-object/${roleObjectId}`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${SecurityService.getToken()}`,
    }
  });
  if (!response.ok) {
    const error = new Error('Error executing "getRoleObject"');
    try {
      error.additionalData = await response.json();
    }
    catch (err) {
    }
    throw error;
  }
  return await response.json();
}

async function deleteRoleObject(roleObjectId) {
  const response = await fetch(`/api/role-object/${roleObjectId}`, {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${SecurityService.getToken()}`,
    }
  });
  if (!response.ok) {
    const error = new Error('Error executing "deleteRoleObject"');
    try {
      error.additionalData = await response.json();
    }
    catch (err) {
    }
    throw error;
  }
  return null;
}

async function getCountRoles(args) {
  let queryString = '';
  if (args) {
    queryString = '?' + new URLSearchParams(args).toString();
  }
  const response = await fetch(`/api/count-roles${queryString}`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${SecurityService.getToken()}`,
    }
  });
  if (!response.ok) {
    const error = new Error('Error executing "getCountRoles"');
    try {
      error.additionalData = await response.json();
    }
    catch (err) {
    }
    throw error;
  }
  return await response.json();
}

async function postObjectV2(data) {
  const response = await fetch(`/api/object/v2`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${SecurityService.getToken()}`,
    },
    body: JSON.stringify(data)
  });
  if (!response.ok) {
    const error = new Error('Error executing "postObjectV2"');
    try {
      error.additionalData = await response.json();
    }
    catch (err) {
    }
    throw error;
  }
  return await response.json();
}

async function putRole(roleId, data) {
  const response = await fetch(`/api/role/${roleId}`, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${SecurityService.getToken()}`,
    },
    body: JSON.stringify(data)
  });
  if (!response.ok) {
    const error = new Error('Error executing "putRole"');
    try {
      error.additionalData = await response.json();
    }
    catch (err) {
    }
    throw error;
  }
  return await response.json();
}

async function deleteRole(roleId) {
  const response = await fetch(`/api/role/${roleId}`, {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${SecurityService.getToken()}`,
    }
  });
  if (!response.ok) {
    const error = new Error('Error executing "deleteRole"');
    try {
      error.additionalData = await response.json();
    }
    catch (err) {
    }
    throw error;
  }
  return null;
}

async function getUser(userId) {
  const response = await fetch(`/api/user/${userId}`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${SecurityService.getToken()}`,
    }
  });
  if (!response.ok) {
    const error = new Error('Error executing "getUser"');
    try {
      error.additionalData = await response.json();
    }
    catch (err) {
    }
    throw error;
  }
  return await response.json();
}

async function postUserRole(userId, data) {
  const response = await fetch(`/api/user/${userId}/role`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${SecurityService.getToken()}`,
    },
    body: JSON.stringify(data)
  });
  if (!response.ok) {
    const error = new Error('Error executing "postUserRole"');
    try {
      error.additionalData = await response.json();
    }
    catch (err) {
    }
    throw error;
  }
  return await response.json();
}

async function getUserAccesses(userId) {
  const response = await fetch(`/api/user/${userId}/accesses`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${SecurityService.getToken()}`,
    }
  });
  if (!response.ok) {
    const error = new Error('Error executing "getUserAccesses"');
    try {
      error.additionalData = await response.json();
    }
    catch (err) {
    }
    throw error;
  }
  return await response.json();
}

async function getUserRoles(args) {
  let queryString = '';
  if (args) {
    queryString = '?' + new URLSearchParams(args).toString();
  }
  const response = await fetch(`/api/user-roles${queryString}`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${SecurityService.getToken()}`,
    }
  });
  if (!response.ok) {
    const error = new Error('Error executing "getUserRoles"');
    try {
      error.additionalData = await response.json();
    }
    catch (err) {
    }
    throw error;
  }
  return await response.json();
}

async function getCountUserRoles(args) {
  let queryString = '';
  if (args) {
    queryString = '?' + new URLSearchParams(args).toString();
  }
  const response = await fetch(`/api/count-user-roles${queryString}`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${SecurityService.getToken()}`,
    }
  });
  if (!response.ok) {
    const error = new Error('Error executing "getCountUserRoles"');
    try {
      error.additionalData = await response.json();
    }
    catch (err) {
    }
    throw error;
  }
  return await response.json();
}

async function getUserRole(userRoleId) {
  const response = await fetch(`/api/user-role/${userRoleId}`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${SecurityService.getToken()}`,
    }
  });
  if (!response.ok) {
    const error = new Error('Error executing "getUserRole"');
    try {
      error.additionalData = await response.json();
    }
    catch (err) {
    }
    throw error;
  }
  return await response.json();
}

async function deleteUserRole(userRoleId) {
  const response = await fetch(`/api/user-role/${userRoleId}`, {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${SecurityService.getToken()}`,
    }
  });
  if (!response.ok) {
    const error = new Error('Error executing "deleteUserRole"');
    try {
      error.additionalData = await response.json();
    }
    catch (err) {
    }
    throw error;
  }
  return null;
}

async function getUsers(args) {
  let queryString = '';
  if (args) {
    queryString = '?' + new URLSearchParams(args).toString();
  }
  const response = await fetch(`/api/users${queryString}`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${SecurityService.getToken()}`,
    }
  });
  if (!response.ok) {
    const error = new Error('Error executing "getUsers"');
    try {
      error.additionalData = await response.json();
    }
    catch (err) {
    }
    throw error;
  }
  return await response.json();
}

async function getCountUsers(args) {
  let queryString = '';
  if (args) {
    queryString = '?' + new URLSearchParams(args).toString();
  }
  const response = await fetch(`/api/count-users${queryString}`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${SecurityService.getToken()}`,
    }
  });
  if (!response.ok) {
    const error = new Error('Error executing "getCountUsers"');
    try {
      error.additionalData = await response.json();
    }
    catch (err) {
    }
    throw error;
  }
  return await response.json();
}

async function postUser(data) {
  const response = await fetch(`/api/user`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${SecurityService.getToken()}`,
    },
    body: JSON.stringify(data)
  });
  if (!response.ok) {
    const error = new Error('Error executing "postUser"');
    try {
      error.additionalData = await response.json();
    }
    catch (err) {
    }
    throw error;
  }
  return await response.json();
}

async function putUser(userId, data) {
  const response = await fetch(`/api/user/${userId}`, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${SecurityService.getToken()}`,
    },
    body: JSON.stringify(data)
  });
  if (!response.ok) {
    const error = new Error('Error executing "putUser"');
    try {
      error.additionalData = await response.json();
    }
    catch (err) {
    }
    throw error;
  }
  return await response.json();
}

async function deleteUser(userId) {
  const response = await fetch(`/api/user/${userId}`, {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${SecurityService.getToken()}`,
    }
  });
  if (!response.ok) {
    const error = new Error('Error executing "deleteUser"');
    try {
      error.additionalData = await response.json();
    }
    catch (err) {
    }
    throw error;
  }
  return null;
}

const ApiService = {
  getDepartment,
  getDepartments,
  getCountDepartments,
  postDepartment,
  putDepartment,
  deleteDepartment,
  getRoles,
  getObject,
  getObjects,
  getCountObjects,
  postObject,
  putObject,
  deleteObject,
  getRole,
  postRoleObject,
  getRoleObjects,
  getCountRoleObjects,
  getRoleObject,
  deleteRoleObject,
  getCountRoles,
  postObjectV2,
  putRole,
  deleteRole,
  getUser,
  postUserRole,
  getUserAccesses,
  getUserRoles,
  getCountUserRoles,
  getUserRole,
  deleteUserRole,
  getUsers,
  getCountUsers,
  postUser,
  putUser,
  deleteUser,
}

export default ApiService;
