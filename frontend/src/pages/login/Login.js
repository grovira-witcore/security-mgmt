import React from 'react';
import AppContext from '../../context/AppContext.js';
import Title from '../../components/Title.js';
import Button from '../../components/Button.js';
import IconUser from '../../components/icons/IconUser.js';
import { sessions } from '../../security/sessions.js';

const Login = function () {
  const { getLang, updateSession } = React.useContext(AppContext);
  const lang = getLang();

  const login = function (username) {
    const session = sessions.find(sessionX => sessionX.username === username);
    updateSession(session);
  }

  return (
    <div className="container p-2">
      <div class="d-flex justify-content-center flex-wrap">
        {sessions.map(sessionX => (
          <div index={sessionX.username} className="p-2">
            <div className="border bg-light" style={{ width: 300 }}>
              <div className="p-3">
                <Title
                  level={1}
                  icon={IconUser}
                  color={sessionX.username === 'admin' ? 'gold' : 'blue'}
                  label={sessionX.fullName}
                  secondaryLabel={sessionX.username}
                />
                <div className="pt-4 pb-1 d-flex justify-content-center">
                  <Button label={lang.login} color="green" onClick={(e) => login(sessionX.username)} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Login;