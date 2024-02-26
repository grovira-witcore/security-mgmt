import React from 'react';
import ReactDOM from 'react-dom/client';
import * as ReactBootstrap from 'react-bootstrap';
import * as ReactRouterDOM from 'react-router-dom';
import * as Recharts from 'recharts';
import Witcore from '../../witcore/witcore.js';
import IconRole from '../icons/IconRole.js';
import IconAdd from '../icons/IconAdd.js';
import IconEdit from '../icons/IconEdit.js';
import IconDelete from '../icons/IconDelete.js';
import IconDummy from '../icons/IconDummy.js';
import RolesPt0Action0Pt0 from './RolesPt0Action0Pt0.js';
import RolesPt0ContextualAction0Pt0 from './RolesPt0ContextualAction0Pt0.js';
import RolesPt0ContextualAction1Pt0 from './RolesPt0ContextualAction1Pt0.js';

const RolesPt0 = ReactRouterDOM.withRouter(function ({  }) {
  const { getLang, session, setError } = React.useContext(Witcore.Context)
  const lang = getLang();

  const [count, setCount] = React.useState(null);
  const [pageNumber, setPageNumber] = React.useState(1);
  const pageSize = 10;
  const [dataSourceDepartmentId, setDataSourceDepartmentId] = React.useState([]);
  const [filtersValues, setFiltersValues] = React.useState([null, null, null]);
  const [items, setItems] = React.useState([]);
  const [action, setAction] = React.useState(null);
  const [actionData, setActionData] = React.useState(null);
  const [actionValidated, setActionValidated] = React.useState(null);
  const bodyRefAction0 = React.useRef(null);
  const [contextualAction, setContextualAction] = React.useState(null);
  const [contextualActionData, setContextualActionData] = React.useState(null);
  const [contextualActionValidated, setContextualActionValidated] = React.useState(null);
  const bodyRefContextualAction0 = React.useRef(null);
  const bodyRefContextualAction1 = React.useRef(null);

  const history = ReactRouterDOM.useHistory();

  React.useEffect(() => {
    fetchDataSourceDepartmentId();
  }, []);

  const fetchDataSourceDepartmentId = async function () {
    const response = await fetch(`/api/departments`, {
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
    setDataSourceDepartmentId(
      records.map((record) => [record.departmentId, record.name])
    );
  }
  
  React.useEffect(() => {
    setPageNumber(1);
    loadCount();
  }, [filtersValues]);

  const loadCount = async function () {
    const params = {};
    if (filtersValues[1] !== null && filtersValues[1] !== undefined) {
      params['departmentIds'] = filtersValues[1].join(',');
    }
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`/api/count-roles?${queryString}`, {
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
  }, [pageNumber, filtersValues]);

  const loadRecords = async function () {
    const params = {};
    if (filtersValues[0] !== null && filtersValues[0] !== undefined) {
      params['name'] = '%' + filtersValues[0] + '%';
    }
    if (filtersValues[1] !== null && filtersValues[1] !== undefined) {
      params['departmentIds'] = filtersValues[1].join(',');
    }
    if (filtersValues[2] !== null && filtersValues[2] !== undefined) {
      params['hash'] = '%' + filtersValues[2] + '%';
    }
    params['offset'] = (pageNumber - 1) * pageSize;
    params['limit'] = pageSize;
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`/api/roles?${queryString}`, {
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
      key: record.roleId,
      data: [
        record.name,
        record.description,
        record.departmentName,
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

  const handleClickItem = async function (e, item) {
    if (e.ctrlKey) {
      return;
    }
    history.push('/role/' + item.record.roleId);
  }

  const handleAction0 = async function (e) {
    if (e.ctrlKey) {
      return;
    }
    setAction({ index: 0 });
    const data = {};
    setActionData(data);
    setActionValidated(false);
  }
  const submitAction0 = async function (e) {
    if (e.ctrlKey) {
      return;
    }
    if (Witcore.Utils.isValid(bodyRefAction0.current)) {
      const response = await fetch(`/api/object/v2`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.accessToken}`
        },
        body: JSON.stringify(actionData)
      });
      if (!response.ok) {
        setError(response);
        return;
      }
      setAction(null);
      setActionData(null);
      setActionValidated(null);
      refreshMe();
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
  
  const handleContextualAction0 = async function (e, item) {
    if (e.ctrlKey) {
      return;
    }
    const response = await fetch(`/api/role/${item.record.roleId}`, {
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
    const role = await response.json();
    setContextualAction({ index: 0, role: role });
    const data = {};
    data.name = role.name;
    data.description = role.description;
    data.departmentId = role.departmentId;
    setContextualActionData(data);
    setContextualActionValidated(false);
  }
  const submitContextualAction0 = async function (e, roleId) {
    if (e.ctrlKey) {
      return;
    }
    if (Witcore.Utils.isValid(bodyRefContextualAction0.current)) {
      const response = await fetch(`/api/role/${roleId}`, {
        method: 'put',
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
  const handleContextualAction1 = async function (e, item) {
    if (e.ctrlKey) {
      return;
    }
    const response = await fetch(`/api/role/${item.record.roleId}`, {
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
    const role = await response.json();
    setContextualAction({ index: 1, role: role });
    const data = {};
    setContextualActionData(data);
    setContextualActionValidated(false);
  }
  const submitContextualAction1 = async function (e, roleId) {
    if (e.ctrlKey) {
      return;
    }
    if (Witcore.Utils.isValid(bodyRefContextualAction1.current)) {
      const response = await fetch(`/api/role/${roleId}`, {
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
        <div className="pb-1 d-flex align-items-center border-bottom">
          <Witcore.Title level={1} icon={IconRole} color="purple" label={lang.roles} />
          <div className="ps-4">
            <Witcore.FiltersBar
              filters={[
                {
                  label: lang.name,
                  variant: 'Text'
                },
                {
                  label: lang.department,
                  variant: 'Option',
                  dataSource: dataSourceDepartmentId
                },
                {
                  label: lang.hash,
                  variant: 'Text'
                },
              ]}
              filtersValues={filtersValues}
              setFiltersValues={setFiltersValues}
            />
          </div>
          <div className="flex-grow-1" />
          <Witcore.ActionsBar
            actions={[
              { icon: IconAdd, label: lang.add, color: 'blue', onClick: handleAction0 },
            ]}
          />
        </div>
        <Witcore.Grid
          containerSize={12}
          contextualActions={[
            { icon: IconEdit, label: lang.edit, color: 'blue', onClick: handleContextualAction0 },
            { icon: IconDelete, label: lang.delete, color: 'red', onClick: handleContextualAction1 },
          ]}
          fields={[
            { icon: IconDummy, label: lang.name, type: 'string' },
            { type: 'string', docked: true },
            { icon: IconDummy, label: lang.department, type: 'string' },
            { icon: IconDummy, label: lang.createdAt, type: 'datetime' },
            { icon: IconDummy, label: lang.updatedAt, type: 'datetime' },
            { icon: IconDummy, label: lang.hash, type: 'string' },
          ]}
          onClickItem={handleClickItem}
          items={items}
        />
        <Witcore.PagingBar
          pageNumber={pageNumber}
          onChangePageNumber={handleOnChangePageNumber}
          countOfItems={count}
          countOfPages={Math.ceil(count/pageSize)}
        />
      </div>
      {action && action.index === 0 ?
        <ReactBootstrap.Modal
          show={true}
          onHide={() => cancelAction({})}
          scrollable={true}
          centered={true}
         
        >
          <ReactBootstrap.Modal.Header className="pt-2 pb-1 ps-2 pe-3" closeButton={true}>
            <Witcore.Title level={1} icon={IconAdd} color="purple" label={lang.createRole} />
          </ReactBootstrap.Modal.Header>
          <ReactBootstrap.Modal.Body ref={bodyRefAction0} className="p-0">
            <div className="p-2">
              {actionData && <RolesPt0Action0Pt0 data={actionData} updateData={updateActionData} validated={actionValidated} />}
            </div>
          </ReactBootstrap.Modal.Body>
          <ReactBootstrap.Modal.Footer className="p-2">
            <div>
              <Witcore.Button label={lang.ok} color="blue" onClick={(e) => submitAction0(e)} />
            </div>
            <div>
              <Witcore.Button label={lang.cancel} color="blue" onClick={(e) => cancelAction(e)} />
            </div>
          </ReactBootstrap.Modal.Footer>
        </ReactBootstrap.Modal> :
        null
      }
      {contextualAction && contextualAction.index === 0 ?
        <ReactBootstrap.Modal
          show={true}
          onHide={() => cancelContextualAction({})}
          scrollable={true}
          centered={true}
         
        >
          <ReactBootstrap.Modal.Header className="pt-2 pb-1 ps-2 pe-3" closeButton={true}>
            <Witcore.Title level={1} icon={IconEdit} color="purple" label={lang.updateRole} />
          </ReactBootstrap.Modal.Header>
          <ReactBootstrap.Modal.Body ref={bodyRefContextualAction0} className="p-0">
            <div className="p-2">
              {contextualActionData && <RolesPt0ContextualAction0Pt0 role={contextualAction ? contextualAction.role : null} data={contextualActionData} updateData={updateContextualActionData} validated={contextualActionValidated} />}
            </div>
          </ReactBootstrap.Modal.Body>
          <ReactBootstrap.Modal.Footer className="p-2">
            <div>
              <Witcore.Button label={lang.ok} color="blue" onClick={(e) => submitContextualAction0(e, contextualAction ? contextualAction.role.roleId : null)} />
            </div>
            <div>
              <Witcore.Button label={lang.cancel} color="blue" onClick={(e) => cancelContextualAction(e)} />
            </div>
          </ReactBootstrap.Modal.Footer>
        </ReactBootstrap.Modal> :
        null
      }
      {contextualAction && contextualAction.index === 1 ?
        <ReactBootstrap.Modal
          show={true}
          onHide={() => cancelContextualAction({})}
          scrollable={true}
          centered={true}
         
        >
          <ReactBootstrap.Modal.Header className="pt-2 pb-1 ps-2 pe-3" closeButton={true}>
            <Witcore.Title level={1} icon={IconDelete} color="red" label={lang.deleteRole} />
          </ReactBootstrap.Modal.Header>
          <ReactBootstrap.Modal.Body ref={bodyRefContextualAction1} className="p-0">
            <div className="p-2">
              <RolesPt0ContextualAction1Pt0 role={contextualAction ? contextualAction.role : null} />
            </div>
          </ReactBootstrap.Modal.Body>
          <ReactBootstrap.Modal.Footer className="p-2">
            <div>
              <Witcore.Button label={lang.delete} color="red" onClick={(e) => submitContextualAction1(e, contextualAction ? contextualAction.role.roleId : null)} />
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

export default RolesPt0;
