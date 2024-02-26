import React from 'react';
import ReactDOM from 'react-dom/client';
import * as ReactBootstrap from 'react-bootstrap';
import * as ReactRouterDOM from 'react-router-dom';
import * as Recharts from 'recharts';
import Witcore from '../../witcore/witcore.js';
import IconObject from '../icons/IconObject.js';

const ObjectPt0 = ReactRouterDOM.withRouter(function ({ object }) {
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
        <div className="d-flex align-items-center pb-1 border-bottom">
          <div>
            <Witcore.Title
              level={1}
              icon={IconObject}
              color="sky-blue"
              label={<Witcore.Field
                value={object.name}
                type="string"
              />}
              secondaryLabel={<Witcore.Field
                value={object.description}
                type="string"
              />}
            />
          </div>
          <div className="flex-grow-1" />
          <Witcore.ActionsBar
            actions={[
            ]}
          />
        </div>
        <div className="d-flex flex-wrap">
          <div className="pt-2 col-lg-2 col-md-4 col-sm-6 col-12">
            <div className="fw-bold">
              {lang.createdAt}
            </div>
            <div className="align-middle">
              <Witcore.Field
                value={object.createdAt}
                type="datetime"
              />
            </div>
          </div>
          <div className="pt-2 col-lg-2 col-md-4 col-sm-6 col-12">
            <div className="fw-bold">
              {lang.updatedAt}
            </div>
            <div className="align-middle">
              <Witcore.Field
                value={object.updatedAt}
                type="datetime"
              />
            </div>
          </div>
          <div className="pt-2 col-lg-2 col-md-4 col-sm-6 col-12">
            <div className="fw-bold">
              {lang.hash}
            </div>
            <div className="align-middle">
              <Witcore.Field
                value={object.hash}
                type="string"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
})

export default ObjectPt0;
