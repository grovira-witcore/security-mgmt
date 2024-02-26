const UpdateSession = function (session) {
  if (session) {
    localStorage.setItem('username', session.username);
  }
  else {
    localStorage.removeItem('username');
  }
}

export default UpdateSession;