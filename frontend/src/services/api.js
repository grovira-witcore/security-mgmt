export async function getDepartment(departmentId, accessToken) {
  const response = await fetch(`/api/department/${departmentId}`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
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

export async function getDepartments(args, accessToken) {
  let queryString = '';
  if (args) {
    queryString = '?' + new URLSearchParams(args).toString();
  }
  const response = await fetch(`/api/departments${queryString}`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
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

export async function getCountDepartments(args, accessToken) {
  let queryString = '';
  if (args) {
    queryString = '?' + new URLSearchParams(args).toString();
  }
  const response = await fetch(`/api/count-departments${queryString}`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
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

export async function postDepartment(data, accessToken) {
  const response = await fetch(`/api/department`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
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

export async function putDepartment(departmentId, data, accessToken) {
  const response = await fetch(`/api/department/${departmentId}`, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
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

export async function deleteDepartment(departmentId, accessToken) {
  const response = await fetch(`/api/department/${departmentId}`, {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
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

export async function getRoles(args, accessToken) {
  let queryString = '';
  if (args) {
    queryString = '?' + new URLSearchParams(args).toString();
  }
  const response = await fetch(`/api/roles${queryString}`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
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

export async function getObject(objectId, accessToken) {
  const response = await fetch(`/api/object/${objectId}`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
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

export async function getObjects(args, accessToken) {
  let queryString = '';
  if (args) {
    queryString = '?' + new URLSearchParams(args).toString();
  }
  const response = await fetch(`/api/objects${queryString}`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
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

export async function getCountObjects(args, accessToken) {
  let queryString = '';
  if (args) {
    queryString = '?' + new URLSearchParams(args).toString();
  }
  const response = await fetch(`/api/count-objects${queryString}`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
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

export async function postObject(data, accessToken) {
  const response = await fetch(`/api/object`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
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

export async function putObject(objectId, data, accessToken) {
  const response = await fetch(`/api/object/${objectId}`, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
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

export async function deleteObject(objectId, accessToken) {
  const response = await fetch(`/api/object/${objectId}`, {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
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

export async function getRole(roleId, accessToken) {
  const response = await fetch(`/api/role/${roleId}`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
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

export async function postRoleObject(roleId, data, accessToken) {
  const response = await fetch(`/api/role/${roleId}/object`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
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

export async function getRoleObjects(args, accessToken) {
  let queryString = '';
  if (args) {
    queryString = '?' + new URLSearchParams(args).toString();
  }
  const response = await fetch(`/api/role-objects${queryString}`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
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

export async function getCountRoleObjects(args, accessToken) {
  let queryString = '';
  if (args) {
    queryString = '?' + new URLSearchParams(args).toString();
  }
  const response = await fetch(`/api/count-role-objects${queryString}`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
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

export async function getRoleObject(roleObjectId, accessToken) {
  const response = await fetch(`/api/role-object/${roleObjectId}`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
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

export async function deleteRoleObject(roleObjectId, accessToken) {
  const response = await fetch(`/api/role-object/${roleObjectId}`, {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
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

export async function getCountRoles(args, accessToken) {
  let queryString = '';
  if (args) {
    queryString = '?' + new URLSearchParams(args).toString();
  }
  const response = await fetch(`/api/count-roles${queryString}`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
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

export async function postObjectV2(data, accessToken) {
  const response = await fetch(`/api/object/v2`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
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

export async function putRole(roleId, data, accessToken) {
  const response = await fetch(`/api/role/${roleId}`, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
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

export async function deleteRole(roleId, accessToken) {
  const response = await fetch(`/api/role/${roleId}`, {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
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

export async function getUser(userId, accessToken) {
  const response = await fetch(`/api/user/${userId}`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
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

export async function postUserRole(userId, data, accessToken) {
  const response = await fetch(`/api/user/${userId}/role`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
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

export async function getUserAccesses(userId, accessToken) {
  const response = await fetch(`/api/user/${userId}/accesses`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
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

export async function getUserRoles(args, accessToken) {
  let queryString = '';
  if (args) {
    queryString = '?' + new URLSearchParams(args).toString();
  }
  const response = await fetch(`/api/user-roles${queryString}`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
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

export async function getCountUserRoles(args, accessToken) {
  let queryString = '';
  if (args) {
    queryString = '?' + new URLSearchParams(args).toString();
  }
  const response = await fetch(`/api/count-user-roles${queryString}`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
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

export async function getUserRole(userRoleId, accessToken) {
  const response = await fetch(`/api/user-role/${userRoleId}`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
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

export async function deleteUserRole(userRoleId, accessToken) {
  const response = await fetch(`/api/user-role/${userRoleId}`, {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
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

export async function getUsers(args, accessToken) {
  let queryString = '';
  if (args) {
    queryString = '?' + new URLSearchParams(args).toString();
  }
  const response = await fetch(`/api/users${queryString}`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
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

export async function getCountUsers(args, accessToken) {
  let queryString = '';
  if (args) {
    queryString = '?' + new URLSearchParams(args).toString();
  }
  const response = await fetch(`/api/count-users${queryString}`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
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

export async function postUser(data, accessToken) {
  const response = await fetch(`/api/user`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
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

export async function putUser(userId, data, accessToken) {
  const response = await fetch(`/api/user/${userId}`, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
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

export async function deleteUser(userId, accessToken) {
  const response = await fetch(`/api/user/${userId}`, {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
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

