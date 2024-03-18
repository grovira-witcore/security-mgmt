import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { useAppContext } from '../../context/AppContext.js';
import Tabs from '../../components/Tabs.js';
import IconAccess from '../../components/icons/IconAccess.js';
import RoleBody2Tab1 from './RoleBody2Tab1.js';
import { getWords } from '../../utils/get-words.js';

const RoleBody2 = ReactRouterDOM.withRouter(function ({ role }) {
  const { i18n, setError } = useAppContext();
  const words = getWords(i18n.code);

  return (
    <div>
      <Tabs
        tabs={[
          { icon: IconAccess, label: words.accesses, component: RoleBody2Tab1, arguments: { role: role } },
        ]}
      />
    </div>
  );
})

export default RoleBody2;
