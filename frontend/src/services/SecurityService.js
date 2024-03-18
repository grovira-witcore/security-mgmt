import React from 'react';
import Title from '../components/Title.js';
import Button from '../components/Button.js';
import IconLogo from '../components/icons/IconLogo.js';
import IconUser from '../components/icons/IconUser.js';
import { getWords } from '../utils/get-words.js';

const sessions = [
  { username: 'admin', fullName: 'Administrator', permissions: [], accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcmVmZXJyZWRfdXNlcm5hbWUiOiJhZG1pbiIsIm5hbWUiOiJBZG1pbmlzdHJhdG9yIiwiaWF0IjoxNzEwNzY2MjE1fQ.IKMOwUCwn9P3p4zs51ZDXqNqORDbd8flPcR1N9r9wh4' },
]

const getCurrentSession = function () {
  let currentUsername = localStorage.getItem('username');
  if (currentUsername === null || currentUsername === undefined) {
    localStorage.setItem('username', 'admin');
    currentUsername = 'admin';
  }
  return sessions.find(session => session.username === currentUsername);
}

const init = function (root, defaultI18n, cb) {
  const currentSession = getCurrentSession();
  if (currentSession) {
    root.render(cb());
  }
  else {
    const words = getWords(defaultI18n.code);
    root.render(
      <div>
        <div className="p-2 header text-white d-flex align-items-center">
          <div><IconLogo size="xl" /></div>
          <div className="ps-2 fw-bold lead">{words.securityManagement}</div>
        </div>
        <div className="container p-2">
          <div class="d-flex justify-content-center flex-wrap">
            {sessions.map(session => (
              <div index={session.username} className="p-2">
                <div className="border bg-light" style={{ width: 300 }}>
                  <div className="p-3">
                    <Title
                      level={1}
                      icon={IconUser}
                      color={session.username === 'admin' ? 'gold' : 'blue'}
                      label={session.fullName}
                      secondaryLabel={session.username}
                    />
                    <div className="pt-4 pb-1 d-flex justify-content-center">
                      <Button label={words.login} color="green" onClick={function (e) { localStorage.setItem('username', session.username); window.location.reload(); }} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

const logout = function () {
  localStorage.setItem('username', '-');
  window.location.reload();
  window.location.href = '/';
}

const getToken = function () {
  const currentSession = getCurrentSession();
  if (currentSession) {
    return currentSession.accessToken;
  }
  else {
    return null;
  }
}

const hasPermission = function (permission) {
  const currentSession = getCurrentSession();
  if (currentSession) {
    return currentSession.permissions.includes(permission);
  }
  else {
    return false;
  }
}

const updateToken = function () {
}

const getUserFullname = function () {
  const currentSession = getCurrentSession();
  if (currentSession) {
    return currentSession.fullName;
  }
  else {
    return null;
  }
}

const SecurityService = {
  init,
  logout,
  getToken,
  hasPermission,
  updateToken,
  getUserFullname,
}

export default SecurityService;
