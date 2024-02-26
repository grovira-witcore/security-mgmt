import React from 'react';
import ReactDOM from 'react-dom/client';
import * as ReactBootstrap from 'react-bootstrap';
import * as ReactRouterDOM from 'react-router-dom';
import * as Recharts from 'recharts';
import Witcore from '../../witcore/witcore.js';
import IconAccess from '../icons/IconAccess.js';
import RolePt1Pt0 from './RolePt1Pt0.js';

const RolePt1 = ReactRouterDOM.withRouter(function ({ role }) {
  const { getLang, session, setError } = React.useContext(Witcore.Context)
  const lang = getLang();

  return (
    <div>
      <Witcore.Tabs
        tabs={[
          { icon: IconAccess, label: lang.accesses, component: RolePt1Pt0, arguments: { role: role } },
        ]}
      />
    </div>
  );
})

export default RolePt1;
