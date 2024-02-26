import React from 'react';
import ReactDOM from 'react-dom/client';
import * as ReactBootstrap from 'react-bootstrap';
import * as ReactRouterDOM from 'react-router-dom';
import * as Recharts from 'recharts';
import Witcore from '../../witcore/witcore.js';
import IconDelete from '../icons/IconDelete.js';
import IconDummy from '../icons/IconDummy.js';
import RolePt1Pt0ContextualAction0Pt0 from './RolePt1Pt0ContextualAction0Pt0.js';

const RolePt1Pt0 = ReactRouterDOM.withRouter(function ({ role }) {
  const { getLang, session, setError } = React.useContext(Witcore.Context)
  const lang = getLang();

  const [count, setCount] = React.useState(null);
  const [pageNumber, setPageNumber] = React.useState(1);
  const pageSize = 10;
  const [items, setItems] = React.useState([]);
  const [contextualAction, setContextualAction] = React.useState(null);
  const [contextualActionData, setContextualActionData] = React.useState(null);
  const [contextualActionValidated, setContextualActionValidated] = React.useState(null);
  const bodyRefContextualAction0 = React.useRef(null);

  const history = ReactRouterDOM.useHistory();

  React.useEffect(() => {
  }, []);

  React.useEffect(() => {
    setPageNumber(1);
    loadCount();
  }, [role]);

  const loadCount = async function () {
    const params = {};
    if (role.roleId !== null && role.roleId !== undefined) {
      params['roleRoleId'] = role.roleId;
    }
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`/api/count-role-objects?${queryString}`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.accessToken}`
      }
    });
    if (!response.ok) {
      setError(response);
      return;
    }
    const count = await response.json();
    setCount(count);
  }

  React.useEffect(() => {
    loadRecords();
  }, [pageNumber, role]);

  const loadRecords = async function () {
    const params = {};
    if (role.roleId !== null && role.roleId !== undefined) {
      params['roleRoleId'] = role.roleId;
    }
    params['offset'] = (pageNumber - 1) * pageSize;
    params['limit'] = pageSize;
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`/api/role-objects?${queryString}`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.accessToken}`
      }
    });
    if (!response.ok) {
      setError(response);
      return;
    }
    const records = await response.json();
    setItems(records.map((record, index) => ({
      key: record.roleObjectId,
      data: [
        record.objectName,
        record.objectDescription,
        record.accessLevel,
        record.createdAt,
        record.updatedAt,
        record.hash,
      ],
      record: record
    })));
  }

  const refreshMe = async function () {
    await loadCount();
    await loadRecords();
  }

  const handleOnChangePageNumber = async function (newPageNumber) {
    setPageNumber(newPageNumber)
  }

  const handleContextualAction0 = async function (e, item) {
    if (e.ctrlKey) {
      return;
    }
    const response = await fetch(`/api/role-object/${item.record.roleObjectId}`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.accessToken}`
      }
    });
    if (!response.ok) {
      setError(response);
      return;
    }
    const roleObject = await response.json();
    setContextualAction({ index: 0, roleObject: roleObject });
    const data = {};
    setContextualActionData(data);
    setContextualActionValidated(false);
  }
  const submitContextualAction0 = async function (e, roleObjectId) {
    if (e.ctrlKey) {
      return;
    }
    if (Witcore.Utils.isValid(bodyRefContextualAction0.current)) {
      const response = await fetch(`/api/role-object/${roleObjectId}`, {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.accessToken}`
        },
        body: JSON.stringify(contextualActionData)
      });
      if (!response.ok) {
        setError(response);
        return;
      }
      setContextualAction(null);
      setContextualActionData(null);
      setContextualActionValidated(null);
      refreshMe();
    }
    else {
      setContextualActionValidated(true);
    }
  }
  const updateContextualActionData = function (field, value) {
    setContextualActionData({ ...contextualActionData, [field]: value });
  }
  const cancelContextualAction = async function (e) {
    if (e.ctrlKey) {
      return;
    }
    setContextualAction(null);
    setContextualActionData(null);
    setContextualActionValidated(null);
  }
  
  return (
    <div>
      <div>
        <Witcore.Grid
          containerSize={12}
          contextualActions={[
            { icon: IconDelete, label: lang.delete, color: 'red', onClick: handleContextualAction0 },
          ]}
          fields={[
            { icon: IconDummy, label: lang.object, type: 'string' },
            { type: 'string', docked: true },
            { icon: IconDummy, label: lang.accessLevel, type: 'string', translate: true, variant: 'FramedText', color: function (value) { return value === 'read' ? 'green' : (value === 'write' ? 'red' : (value === 'full' ? 'purple' : 'black')); } },
            { icon: IconDummy, label: lang.createdAt, type: 'datetime' },
            { icon: IconDummy, label: lang.updatedAt, type: 'datetime' },
            { icon: IconDummy, label: lang.hash, type: 'string' },
          ]}
          items={items}
        />
        <Witcore.PagingBar
          pageNumber={pageNumber}
          onChangePageNumber={handleOnChangePageNumber}
          countOfItems={count}
          countOfPages={Math.ceil(count/pageSize)}
        />
      </div>
      {contextualAction && contextualAction.index === 0 ?
        <ReactBootstrap.Modal
          show={true}
          onHide={() => cancelContextualAction({})}
          scrollable={true}
          centered={true}
         
        >
          <ReactBootstrap.Modal.Header className="pt-2 pb-1 ps-2 pe-3" closeButton={true}>
            <Witcore.Title level={1} icon={IconDelete} color="red" label={lang.deleteAccess} />
          </ReactBootstrap.Modal.Header>
          <ReactBootstrap.Modal.Body ref={bodyRefContextualAction0} className="p-0">
            <div className="p-2">
              <RolePt1Pt0ContextualAction0Pt0 roleObject={contextualAction ? contextualAction.roleObject : null} />
            </div>
          </ReactBootstrap.Modal.Body>
          <ReactBootstrap.Modal.Footer className="p-2">
            <div>
              <Witcore.Button label={lang.delete} color="red" onClick={(e) => submitContextualAction0(e, contextualAction ? contextualAction.roleObject.roleObjectId : null)} />
            </div>
            <div>
              <Witcore.Button label={lang.cancel} color="blue" onClick={(e) => cancelContextualAction(e)} />
            </div>
          </ReactBootstrap.Modal.Footer>
        </ReactBootstrap.Modal> :
        null
      }
    </div>
  );
})

export default RolePt1Pt0;
