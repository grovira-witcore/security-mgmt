import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import * as ReactBootstrap from 'react-bootstrap';
import AppContext from './context/AppContext.js';
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
import Login from './pages/login/Login.js';
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
import { retrieveLang } from './utils/retrieve-lang.js';
import { getDefaultSession } from './security/get-default-session.js';
import { updateSessionInt } from './security/update-session-int.js';

const App = ReactRouterDOM.withRouter(function ({}) {
  const [langCode, setLangCode] = React.useState(null);
  const getLang = function () { return retrieveLang(langCode); }
  const lang = getLang();

  const [dateFormat, setDateFormat] = React.useState(null);
  const [moneySymbol, setMoneySymbol] = React.useState(null);

  const [session, setSession] = React.useState(getDefaultSession());
  const updateSession = function (newSession) {
    setSession(newSession);
    updateSessionInt(newSession);
  }

  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const navigatorLanguage = navigator.language || navigator.userLanguage;
    switch (navigatorLanguage.substring(0, 2)) {
      case 'en': {
        setLangCode('En');
        setDateFormat('mm/dd/yyyy');
        setMoneySymbol('$');
        break;
      }
      default: {
        setLangCode('En');
        setDateFormat('mm/dd/yyyy');
        setMoneySymbol('$');
      }
    }
  }, []);

  if (langCode === null || langCode === undefined || dateFormat === null || dateFormat === undefined || moneySymbol === null || moneySymbol === undefined) {
    return (<div />);
  }

  const header = (
    <Header
      icon={IconLogo}
      label={lang.securityManagement}
      languages={[
        {
          code: 'En',
          name: lang.english,
          dateFormat: 'mm/dd/yyyy',
          moneySymbol: '$'
        }
      ]}
      menu={session ? [
        {
          label: lang.administration,
          options: [
            { icon: IconUser, label: lang.users, path: "/users" },
            { icon: IconDepartment, label: lang.departments, path: "/departments" },
            { icon: IconRole, label: lang.roles, path: "/roles" },
            { icon: IconObject, label: lang.objects, path: "/objects" },
          ]
        },
      ] : null}
    />
  );

  if (session) {
    if (error === null || error === undefined || (error instanceof Response && (error.status === 400 || error.status === 409)) || (!(error instanceof Response))) {
      return (
        <AppContext.Provider value={{ langCode, setLangCode, getLang, dateFormat, setDateFormat, moneySymbol, setMoneySymbol, session, updateSession, error, setError }}>
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
                <Title level={1} icon={IconError} color="red" label={lang.error} />
              </ReactBootstrap.Modal.Header>
              <ReactBootstrap.Modal.Body className="p-0">
                <ErrorBox />
              </ReactBootstrap.Modal.Body>
              <ReactBootstrap.Modal.Footer className="p-2">
                <Button label={lang.close} color="blue" onClick={(e) => setError(null)} />
              </ReactBootstrap.Modal.Footer>
            </ReactBootstrap.Modal> :
            null
          }
        </AppContext.Provider>
      );
    }
    else {
      return (
        <AppContext.Provider value={{ langCode, setLangCode, getLang, dateFormat, setDateFormat, moneySymbol, setMoneySymbol, session, updateSession, error, setError }}>
          {header}
          <ErrorBox fullscreen={true} />
        </AppContext.Provider>
      );
    }
  }
  else {
    return (
      <AppContext.Provider value={{ langCode, setLangCode, getLang, dateFormat, setDateFormat, moneySymbol, setMoneySymbol, session, updateSession, error, setError }}>
        {header}
        <Login />
      </AppContext.Provider>
    );
  }
})

export default App;
