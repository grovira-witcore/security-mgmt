import React from 'react';
import ReactDOM from 'react-dom/client';
import * as ReactBootstrap from 'react-bootstrap';
import * as ReactRouterDOM from 'react-router-dom';
import * as Recharts from 'recharts';
import Witcore from '../../witcore/witcore.js';

const UserPt1Pt0ContextualAction0Pt0 = ReactRouterDOM.withRouter(function ({ userRole }) {
  const { getLang, session, setError } = React.useContext(Witcore.Context)
  const lang = getLang();

  const history = ReactRouterDOM.useHistory();

  const refreshMe = async function () {
    window.location.reload();
  }

  const getFieldColor = function (color, value) {
    if (color) {
      const solvedColor = Witcore.Utils.protect(color, value);
      if (solvedColor) {
        return 'text-' + solvedColor;
      }
    }
    return '';
  }


  return (
    <div>
      <div>
        <div className="py-4 px-2 fs-5">
          <Witcore.Paragraph
            template={lang.confirmDeleteUserRole}
            alignment="justify-content-center"
            fields={[
              { type: 'string', style: function (value) { return 'fw-bold'; } },
            ]}
            data={[
              userRole.roleName,
            ]}
          />
        </div>
      </div>
    </div>
  );
})

export default UserPt1Pt0ContextualAction0Pt0;
