import { sessions } from './sessions.js';

export function getDefaultSession() {
  const username = localStorage.getItem('username') ?? 'admin';
  return sessions.find(session => session.username === username);
}
