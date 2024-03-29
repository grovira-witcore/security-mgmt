import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import * as ReactBootstrap from 'react-bootstrap';
import { useAppContext } from '../../context/AppContext.js';
import Field from '../../components/Field.js';
import Title from '../../components/Title.js';
import ActionsBar from '../../components/ActionsBar.js';
import Button from '../../components/Button.js';
import IconRole from '../../components/icons/IconRole.js';
import IconAdd from '../../components/icons/IconAdd.js';
import RoleBody1Action1 from './RoleBody1Action1.js';
import ApiService from '../../services/ApiService.js';
import { protect } from '../../utils/protect.js';
import { getWords } from '../../utils/get-words.js';
import { isValid } from '../../utils/is-valid.js';

const RoleBody1 = ReactRouterDOM.withRouter(function ({ role }) {
  const { i18n, setError } = useAppContext();
  const words = getWords(i18n.code);

  const [action, setAction] = React.useState(null);
  const [actionData, setActionData] = React.useState(null);
  const [actionValidated, setActionValidated] = React.useState(null);
  const bodyRefAction0 = React.useRef(null);

  const handleAction0 = async function (e) {
    if (e.ctrlKey) {
      return;
    }
    setAction({ index: 0 });
    const data = {};
    setActionData(data);
    setActionValidated(false);
  }
  const submitAction0 = async function (e, roleId) {
    if (e.ctrlKey) {
      return;
    }
    if (isValid(bodyRefAction0.current)) {
      try {
        await ApiService.postRoleObject(roleId, actionData);
      }
      catch (error) {
        setError(error);
        return;
      }
      setAction(null);
      setActionData(null);
      setActionValidated(null);
      window.location.reload();
    }
    else {
      setActionValidated(true);
    }
  }
  const updateActionData = function (field, value) {
    setActionData({ ...actionData, [field]: value });
  }
  const cancelAction = async function (e) {
    if (e.ctrlKey) {
      return;
    }
    setAction(null);
    setActionData(null);
    setActionValidated(null);
  }
  

  return (
    <div>
      <div>
        <div className="d-flex align-items-center pb-1 border-bottom">
          <div>
            <Title
              level={1}
              icon={IconRole}
              color="purple"
              label={<Field
                value={role.name}
                type="string"
              />}
              secondaryLabel={<Field
                value={role.description}
                type="string"
              />}
            />
          </div>
          <div className="flex-grow-1" />
          <ActionsBar
            actions={[
              { icon: IconAdd, label: words.addAccess, color: 'blue', onClick: handleAction0 },
            ]}
          />
        </div>
        <div className="d-flex flex-wrap">
          <div className="pt-2 col-lg-2 col-md-4 col-sm-6 col-12">
            <div className="fw-bold">
              {words.department}
            </div>
            <div className="align-middle">
              <Field
                value={role.departmentName}
                type="string"
              />
            </div>
          </div>
          <div className="pt-2 col-lg-2 col-md-4 col-sm-6 col-12">
            <div className="fw-bold">
              {words.createdAt}
            </div>
            <div className="align-middle">
              <Field
                value={role.createdAt}
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
                value={role.updatedAt}
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
                value={role.hash}
                type="string"
              />
            </div>
          </div>
        </div>
      </div>
      {action && action.index === 0 ?
        <ReactBootstrap.Modal
          show={true}
          onHide={() => cancelAction({})}
          scrollable={true}
          centered={true}
         
        >
          <ReactBootstrap.Modal.Header className="pt-2 pb-1 ps-2 pe-3" closeButton={true}>
            <Title level={1} icon={IconAdd} color="blue" label={words.addAccess} />
          </ReactBootstrap.Modal.Header>
          <ReactBootstrap.Modal.Body ref={bodyRefAction0} className="p-0">
            <div className="p-2">
              {actionData && <RoleBody1Action1 role={role} data={actionData} updateData={updateActionData} validated={actionValidated} />}
            </div>
          </ReactBootstrap.Modal.Body>
          <ReactBootstrap.Modal.Footer className="p-2">
            <div>
              <Button label={words.ok} color="blue" onClick={(e) => submitAction0(e, role.roleId)} />
            </div>
            <div>
              <Button label={words.cancel} color="blue" onClick={(e) => cancelAction(e)} />
            </div>
          </ReactBootstrap.Modal.Footer>
        </ReactBootstrap.Modal> :
        null
      }
    </div>
  );
})

export default RoleBody1;
