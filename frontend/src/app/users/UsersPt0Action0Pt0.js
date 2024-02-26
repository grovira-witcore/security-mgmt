import React from 'react';
import ReactDOM from 'react-dom/client';
import * as ReactBootstrap from 'react-bootstrap';
import * as ReactRouterDOM from 'react-router-dom';
import * as Recharts from 'recharts';
import Witcore from '../../witcore/witcore.js';

const UsersPt0Action0Pt0 = ReactRouterDOM.withRouter(function ({ data, updateData, validated }) {
  const { getLang, session, setError } = React.useContext(Witcore.Context)
  const lang = getLang();


  React.useEffect(() => {
  }, []);

  return (
    <div>
      <div>
        <div className="d-flex flex-wrap">
          <div className="pt-2 col-lg-6 col-md-12 col-sm-12 col-12">
            <Witcore.TextBox
              label={lang.firstName}
              value={data.firstName}
              onChange={(value) => updateData('firstName', value)}
              validated={validated}
              required
            />
          </div>
          <div className="pt-2 col-lg-6 col-md-12 col-sm-12 col-12">
            <Witcore.TextBox
              label={lang.lastName}
              value={data.lastName}
              onChange={(value) => updateData('lastName', value)}
              validated={validated}
              required
            />
          </div>
          <div className="pt-2 col-lg-6 col-md-12 col-sm-12 col-12">
            <Witcore.TextBox
              label={lang.email}
              value={data.email}
              onChange={(value) => updateData('email', value)}
              validated={validated}
              regex={/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/}
              regexText={lang.invalidEmail}
              required
            />
          </div>
          <div className="pt-2 col-lg-6 col-md-12 col-sm-12 col-12">
            <Witcore.TextBox
              label={lang.password}
              value={data.password}
              onChange={(value) => updateData('password', value)}
              validated={validated}
              required
            />
          </div>
          <div className="pt-2 col-lg-6 col-md-12 col-sm-12 col-12">
            <Witcore.TextBox
              label={lang.phone}
              value={data.phone}
              onChange={(value) => updateData('phone', value)}
              validated={validated}
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
})

export default UsersPt0Action0Pt0;
