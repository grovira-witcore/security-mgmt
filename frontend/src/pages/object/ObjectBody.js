import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { useAppContext } from '../../context/AppContext.js';
import Field from '../../components/Field.js';
import Title from '../../components/Title.js';
import ActionsBar from '../../components/ActionsBar.js';
import IconObject from '../../components/icons/IconObject.js';
import { protect } from '../../utils/protect.js';
import { getWords } from '../../utils/get-words.js';

const ObjectBody = ReactRouterDOM.withRouter(function ({ object }) {
  const { i18n, setError } = useAppContext();
  const words = getWords(i18n.code);


  return (
    <div>
      <div>
        <div className="d-flex align-items-center pb-1 border-bottom">
          <div>
            <Title
              level={1}
              icon={IconObject}
              color="sky-blue"
              label={<Field
                value={object.name}
                type="string"
              />}
              secondaryLabel={<Field
                value={object.description}
                type="string"
              />}
            />
          </div>
          <div className="flex-grow-1" />
          <ActionsBar
            actions={[
            ]}
          />
        </div>
        <div className="d-flex flex-wrap">
          <div className="pt-2 col-lg-2 col-md-4 col-sm-6 col-12">
            <div className="fw-bold">
              {words.createdAt}
            </div>
            <div className="align-middle">
              <Field
                value={object.createdAt}
                type="datetime"
              />
            </div>
          </div>
          <div className="pt-2 col-lg-2 col-md-4 col-sm-6 col-12">
            <div className="fw-bold">
              {words.updatedAt}
            </div>
            <div className="align-middle">
              <Field
                value={object.updatedAt}
                type="datetime"
              />
            </div>
          </div>
          <div className="pt-2 col-lg-2 col-md-4 col-sm-6 col-12">
            <div className="fw-bold">
              {words.hash}
            </div>
            <div className="align-middle">
              <Field
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

export default ObjectBody;
