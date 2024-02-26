import Sessions from './Sessions.js';

const GetDefaultSession = function () {
  const username = localStorage.getItem('username') ?? 'admin';
  return Sessions.find(session => session.username === username);
}

export default GetDefaultSession;