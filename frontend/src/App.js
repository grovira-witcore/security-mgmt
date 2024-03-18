import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import * as ReactBootstrap from 'react-bootstrap';
import { useAppContext } from './context/AppContext.js';
import Header from './components/Header.js';
import Title from './components/Title.js';
import Button from './components/Button.js';
import ErrorBox from './components/ErrorBox.js';
import IconLogo from './components/icons/IconLogo.js';
import IconError from './components/icons/IconError.js';
import IconUser from './components/icons/IconUser.js';
import IconDepartment from './components/icons/IconDepartment.js';
import IconRole from './components/icons/IconRole.js';
import IconObject from './components/icons/IconObject.js';
import NotFound from './pages/not-found/NotFound.js';
import Department from './pages/department/Department.js';
import Departments from './pages/departments/Departments.js';
import Home from './pages/home/Home.js';
import Object from './pages/object/Object.js';
import Objects from './pages/objects/Objects.js';
import Role from './pages/role/Role.js';
import Roles from './pages/roles/Roles.js';
import User from './pages/user/User.js';
import Users from './pages/users/Users.js';
import SecurityService from './services/SecurityService.js';
import { getWords } from './utils/get-words.js';

const App = ReactRouterDOM.withRouter(function () {
  const { i18n, error, setError } = useAppContext();

  const words = getWords(i18n.code);

  const header = (
    <Header
      icon={IconLogo}
      label={words.securityManagement}
      languages={[
        {
          code: 'En',
          name: words.english,
          dateFormat: 'mm/dd/yyyy',
          moneySymbol: '$'
        }
      ]}
      menu={[
        {
          label: words.administration,
          options: [
            { icon: IconUser, label: words.users, path: "/users" },
            { icon: IconDepartment, label: words.departments, path: "/departments" },
            { icon: IconRole, label: words.roles, path: "/roles" },
            { icon: IconObject, label: words.objects, path: "/objects" },
          ]
        },
      ]}
    />
  );

  if (error === null || error === undefined || (error instanceof Response && (error.status === 400 || error.status === 409)) || (!(error instanceof Response))) {
    return (
      <div>
        {header}
        <ReactRouterDOM.Switch>
          <ReactRouterDOM.Route exact path="/department/:departmentId">
            <Department />
          </ReactRouterDOM.Route>
          <ReactRouterDOM.Route exact path="/departments">
            <Departments />
          </ReactRouterDOM.Route>
          <ReactRouterDOM.Route exact path="/">
            <Home />
          </ReactRouterDOM.Route>
          <ReactRouterDOM.Route exact path="/object/:objectId">
            <Object />
          </ReactRouterDOM.Route>
          <ReactRouterDOM.Route exact path="/objects">
            <Objects />
          </ReactRouterDOM.Route>
          <ReactRouterDOM.Route exact path="/role/:roleId">
            <Role />
          </ReactRouterDOM.Route>
          <ReactRouterDOM.Route exact path="/roles">
            <Roles />
          </ReactRouterDOM.Route>
          <ReactRouterDOM.Route exact path="/user/:userId">
            <User />
          </ReactRouterDOM.Route>
          <ReactRouterDOM.Route exact path="/users">
            <Users />
          </ReactRouterDOM.Route>
          <ReactRouterDOM.Route>
            <NotFound />
          </ReactRouterDOM.Route>
        </ReactRouterDOM.Switch>
        {error ?
          <ReactBootstrap.Modal
            show={true}
            onHide={() => setError(null)}
            scrollable={true}
            centered={true}
          >
            <ReactBootstrap.Modal.Header className="pt-2 pb-1 ps-2 pe-3" closeButton={true}>
              <Title level={1} icon={IconError} color="red" label={words.error} />
            </ReactBootstrap.Modal.Header>
            <ReactBootstrap.Modal.Body className="p-0">
              <ErrorBox />
            </ReactBootstrap.Modal.Body>
            <ReactBootstrap.Modal.Footer className="p-2">
              <Button label={words.close} color="blue" onClick={(e) => setError(null)} />
            </ReactBootstrap.Modal.Footer>
          </ReactBootstrap.Modal> :
          null
        }
      </div>
    );
  }
  else {
    return (
      <div>
        {header}
        <ErrorBox fullscreen={true} />
      </div>
    );
  }
})

export default App;
