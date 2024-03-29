import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import * as ReactBootstrap from 'react-bootstrap';
import { useAppContext } from '../../context/AppContext.js';
import Grid from '../../components/Grid.js';
import Title from '../../components/Title.js';
import FiltersBar from '../../components/FiltersBar.js';
import ActionsBar from '../../components/ActionsBar.js';
import PagingBar from '../../components/PagingBar.js';
import Button from '../../components/Button.js';
import IconRole from '../../components/icons/IconRole.js';
import IconAdd from '../../components/icons/IconAdd.js';
import IconEdit from '../../components/icons/IconEdit.js';
import IconDelete from '../../components/icons/IconDelete.js';
import RolesBodyAction1 from './RolesBodyAction1.js';
import RolesBodyContextualAction1 from './RolesBodyContextualAction1.js';
import RolesBodyContextualAction2 from './RolesBodyContextualAction2.js';
import ApiService from '../../services/ApiService.js';
import { getWords } from '../../utils/get-words.js';
import { isValid } from '../../utils/is-valid.js';

const RolesBody = ReactRouterDOM.withRouter(function ({  }) {
  const { i18n, setError } = useAppContext();
  const words = getWords(i18n.code);

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
    let records = null;
    try {
      records = await ApiService.getDepartments(null);
    }
    catch (error) {
      setError(error);
      return;
    }
    setDataSourceDepartmentId(
      records.map((record) => [record.departmentId, record.name])
    );
  }
  
  React.useEffect(() => {
    setPageNumber(1);
    loadCount();
  }, [filtersValues]);

  const loadCount = async function () {
    try {
      const args = {};
      if (filtersValues[1] !== null && filtersValues[1] !== undefined) {
        args.departmentIds = filtersValues[1].join(',');
      }
      setCount(await ApiService.getCountRoles(args));
    }
    catch (error) {
      setError(error);
      return;
    }
  }

  React.useEffect(() => {
    loadRecords();
  }, [pageNumber, filtersValues]);

  const loadRecords = async function () {
    let records = null;
    try {
      const args = {};
      if (filtersValues[0] !== null && filtersValues[0] !== undefined) {
        args.name = '%' + filtersValues[0] + '%';
      }
      if (filtersValues[1] !== null && filtersValues[1] !== undefined) {
        args.departmentIds = filtersValues[1].join(',');
      }
      if (filtersValues[2] !== null && filtersValues[2] !== undefined) {
        args.hash = '%' + filtersValues[2] + '%';
      }
      args.offset = (pageNumber - 1) * pageSize;
      args.limit = pageSize;
      records = await ApiService.getRoles(args);
    }
    catch (error) {
      setError(error);
      return;
    }
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
    if (isValid(bodyRefAction0.current)) {
      try {
        await ApiService.postObjectV2(actionData);
      }
      catch (error) {
        setError(error);
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
    let role = null;
    try {
      role = await ApiService.getRole(item.record.roleId);
    }
    catch (error) {
      setError(error);
      return;
    }
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
    if (isValid(bodyRefContextualAction0.current)) {
      try {
        await ApiService.putRole(roleId, contextualActionData);
      }
      catch (error) {
        setError(error);
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
    let role = null;
    try {
      role = await ApiService.getRole(item.record.roleId);
    }
    catch (error) {
      setError(error);
      return;
    }
    setContextualAction({ index: 1, role: role });
    const data = {};
    setContextualActionData(data);
    setContextualActionValidated(false);
  }
  const submitContextualAction1 = async function (e, roleId) {
    if (e.ctrlKey) {
      return;
    }
    if (isValid(bodyRefContextualAction1.current)) {
      try {
        await ApiService.deleteRole(roleId);
      }
      catch (error) {
        setError(error);
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
          <Title level={1} icon={IconRole} color="purple" label={words.roles} />
          <div className="ps-4">
            <FiltersBar
              filters={[
                {
                  label: words.name,
                  variant: 'Text'
                },
                {
                  label: words.department,
                  variant: 'Option',
                  dataSource: dataSourceDepartmentId
                },
                {
                  label: words.hash,
                  variant: 'Text'
                },
              ]}
              filtersValues={filtersValues}
              setFiltersValues={setFiltersValues}
            />
          </div>
          <div className="flex-grow-1" />
          <ActionsBar
            actions={[
              { icon: IconAdd, label: words.add, color: 'blue', onClick: handleAction0 },
            ]}
          />
        </div>
        <Grid
          containerSize={12}
          contextualActions={[
            { icon: IconEdit, label: words.edit, color: 'blue', onClick: handleContextualAction0 },
            { icon: IconDelete, label: words.delete, color: 'red', onClick: handleContextualAction1 },
          ]}
          fields={[
            { label: words.name, type: 'string' },
            { type: 'string', docked: true },
            { label: words.department, type: 'string' },
            { label: words.createdAt, type: 'datetime' },
            { label: words.updatedAt, type: 'datetime' },
            { label: words.hash, type: 'string' },
          ]}
          onClickItem={handleClickItem}
          items={items}
        />
        {count !== null && count !== undefined ?
          <PagingBar
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            countOfItems={count}
            countOfPages={Math.ceil(count/pageSize)}
          /> :
          null
        }
      </div>
      {action && action.index === 0 ?
        <ReactBootstrap.Modal
          show={true}
          onHide={() => cancelAction({})}
          scrollable={true}
          centered={true}
         
        >
          <ReactBootstrap.Modal.Header className="pt-2 pb-1 ps-2 pe-3" closeButton={true}>
            <Title level={1} icon={IconAdd} color="purple" label={words.createRole} />
          </ReactBootstrap.Modal.Header>
          <ReactBootstrap.Modal.Body ref={bodyRefAction0} className="p-0">
            <div className="p-2">
              {actionData && <RolesBodyAction1 data={actionData} updateData={updateActionData} validated={actionValidated} />}
            </div>
          </ReactBootstrap.Modal.Body>
          <ReactBootstrap.Modal.Footer className="p-2">
            <div>
              <Button label={words.ok} color="blue" onClick={(e) => submitAction0(e)} />
            </div>
            <div>
              <Button label={words.cancel} color="blue" onClick={(e) => cancelAction(e)} />
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
            <Title level={1} icon={IconEdit} color="purple" label={words.updateRole} />
          </ReactBootstrap.Modal.Header>
          <ReactBootstrap.Modal.Body ref={bodyRefContextualAction0} className="p-0">
            <div className="p-2">
              {contextualActionData && <RolesBodyContextualAction1 role={contextualAction ? contextualAction.role : null} data={contextualActionData} updateData={updateContextualActionData} validated={contextualActionValidated} />}
            </div>
          </ReactBootstrap.Modal.Body>
          <ReactBootstrap.Modal.Footer className="p-2">
            <div>
              <Button label={words.ok} color="blue" onClick={(e) => submitContextualAction0(e, contextualAction ? contextualAction.role.roleId : null)} />
            </div>
            <div>
              <Button label={words.cancel} color="blue" onClick={(e) => cancelContextualAction(e)} />
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
            <Title level={1} icon={IconDelete} color="red" label={words.deleteRole} />
          </ReactBootstrap.Modal.Header>
          <ReactBootstrap.Modal.Body ref={bodyRefContextualAction1} className="p-0">
            <div className="p-2">
              <RolesBodyContextualAction2 role={contextualAction ? contextualAction.role : null} />
            </div>
          </ReactBootstrap.Modal.Body>
          <ReactBootstrap.Modal.Footer className="p-2">
            <div>
              <Button label={words.delete} color="red" onClick={(e) => submitContextualAction1(e, contextualAction ? contextualAction.role.roleId : null)} />
            </div>
            <div>
              <Button label={words.cancel} color="blue" onClick={(e) => cancelContextualAction(e)} />
            </div>
          </ReactBootstrap.Modal.Footer>
        </ReactBootstrap.Modal> :
        null
      }
    </div>
  );
})

export default RolesBody;
