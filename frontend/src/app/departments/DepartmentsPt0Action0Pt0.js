import React from 'react';
import ReactDOM from 'react-dom/client';
import * as ReactBootstrap from 'react-bootstrap';
import * as ReactRouterDOM from 'react-router-dom';
import * as Recharts from 'recharts';
import Witcore from '../../witcore/witcore.js';

const DepartmentsPt0Action0Pt0 = ReactRouterDOM.withRouter(function ({ data, updateData, validated }) {
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
              label={lang.name}
              value={data.name}
              onChange={(value) => updateData('name', value)}
              validated={validated}
              required
            />
          </div>
          <div className="pt-2 col-lg-12 col-md-12 col-sm-12 col-12">
            <Witcore.TextArea
              label={lang.description}
              value={data.description}
              onChange={(value) => updateData('description', value)}
              validated={validated}
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
})

export default DepartmentsPt0Action0Pt0;
