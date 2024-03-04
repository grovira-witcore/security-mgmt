export function updateSessionInt(session) {
  if (session) {
    localStorage.setItem('username', session.username);
  }
  else {
    localStorage.removeItem('username');
  }
}
