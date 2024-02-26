import React from 'react';
import Witcore from '../../witcore/witcore.js';
import Sessions from './Sessions.js';

const Login = function () {
  const { getLang, updateSession } = React.useContext(Witcore.Context);
  const lang = getLang();

  const login = function (username) {
    const session = Sessions.find(sessionX => sessionX.username === username);
    updateSession(session);
  }

  return (
    <div className="container p-2">
      <div class="d-flex justify-content-center flex-wrap">
        {Sessions.map(sessionX => (
          <div index={sessionX.username} className="p-2">
            <div className="border bg-light" style={{ width: 300 }}>
              <div className="p-3">
                <Witcore.Title
                  level={1}
                  icon={Witcore.Icon.User}
                  color={sessionX.username === 'admin' ? 'gold' : 'blue'}
                  label={sessionX.fullName}
                  secondaryLabel={sessionX.username}
                />
                <div className="pt-4 pb-1 d-flex justify-content-center">
                  <Witcore.Button label={lang.login} color="green" onClick={(e) => login(sessionX.username)} />
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