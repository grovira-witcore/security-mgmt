import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import * as ReactBootstrap from 'react-bootstrap';
import { useAppContext } from '../context/AppContext.js';
import IconMenu from './icons/IconMenu.js';
import IconMenuExpanded from './icons/IconMenuExpanded.js';
import IconMenuCollapsed from './icons/IconMenuCollapsed.js';
import IconFlagEn from './icons/IconFlagEn.js';
import IconFlagFr from './icons/IconFlagFr.js';
import IconFlagGe from './icons/IconFlagGe.js';
import IconFlagIt from './icons/IconFlagIt.js';
import IconFlagPo from './icons/IconFlagPo.js';
import IconFlagRu from './icons/IconFlagRu.js';
import IconFlagSp from './icons/IconFlagSp.js';
import IconFlagTu from './icons/IconFlagTu.js';
import IconUser from './icons/IconUser.js';
import IconLogout from './icons/IconLogout.js';
import SecurityService from '../services/SecurityService.js';
import { getWords } from '../utils/get-words.js';

const Header = ReactRouterDOM.withRouter(function ({ icon, label, languages, menu }) {
  const { i18n, setI18n, setError } = useAppContext();
  const words = getWords(i18n.code);
  const [showMenu, setShowMenu] = React.useState(false);
  const [collapsedMenuGroupIndexes, setCollapsedMenuGroupIndexes] = React.useState([]);

  const history = ReactRouterDOM.useHistory();

  const handleClickHome = function (e) {
    if (e.ctrlKey) {
      return;
    }
    setError(null);
    history.push('/');
  }

  const handleClickLanguage = function (e, language) {
    if (e.ctrlKey) {
      return;
    }
    setI18n({
      code: language.code,
      dateFormat: language.dateFormat,
      moneySymbol: language.moneySymbol
    });
  }

  const handleClickMenu = function (e) {
    if (e.ctrlKey) {
      return;
    }
    setError(null);
    setShowMenu(true);
    setCollapsedMenuGroupIndexes([]);
  }

  const handleClickMenuGroup = function (e, menuGroupIndex) {
    if (e.ctrlKey) {
      return;
    }
    const collapsed = collapsedMenuGroupIndexes.indexOf(menuGroupIndex) !== -1;
    if (collapsed) {
      setCollapsedMenuGroupIndexes((prevCollapsedMenuGroupIndexes) => prevCollapsedMenuGroupIndexes.filter(menuGroupIndexX => menuGroupIndexX !== menuGroupIndex))
    }
    else {
      setCollapsedMenuGroupIndexes((prevCollapsedMenuGroupIndexes) => [...prevCollapsedMenuGroupIndexes, menuGroupIndex])
    }
  }

  const handleClickMenuOption = function (e, path) {
    if (e.ctrlKey) {
      return;
    }
    setError(null);
    setShowMenu(false);
    history.push(path);
  }

  const handleClickLogout = function (e) {
    if (e.ctrlKey) {
      return;
    }
    SecurityService.logout();
  }

  const getIconFlag = function (languageCode) {
    switch (languageCode) {
      case 'En': {
        return (<IconFlagEn size="lg" />);
      }
      case 'Fr': {
        return (<IconFlagFr size="lg" />);
      }
      case 'Ge': {
        return (<IconFlagGe size="lg" />);
      }
      case 'It': {
        return (<IconFlagIt size="lg" />);
      }
      case 'Po': {
        return (<IconFlagPo size="lg" />);
      }
      case 'Ru': {
        return (<IconFlagRu size="lg" />);
      }
      case 'Sp': {
        return (<IconFlagSp size="lg" />);
      }
      case 'Tu': {
        return (<IconFlagTu size="lg" />);
      }
      default: {
        return null;
      }
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="p-2 d-flex justify-content-between header text-white">
        <div class="d-flex">
          {menu && (!menu.some(menuGroup => menuGroup.options.length > 0) || menu.some(menuGroup => menuGroup.options.some(menuOption => !menuOption.hidden))) ?
            <div className="pe-3">
              <div className="p-2 rounded header-action" onClick={handleClickMenu}>
                <IconMenu size="sm" />
              </div>
            </div> :
            null
          }
          <div className="d-flex align-items-center cursor-pointer" onClick={handleClickHome}>
            <div>{React.createElement(icon, { size: 'xl' })}</div>
            <div className="ps-2 fw-bold lead">{label}</div>
          </div>
        </div>
        <div class="d-flex">
          {languages.length > 1 ?
            <ReactBootstrap.Dropdown>
              <ReactBootstrap.Dropdown.Toggle className="d-flex align-items-center border-0 header-action">
                {languages.filter((language) => language.code === i18n.code).map((language) => (
                  <div key={language.code} className="px-2 d-flex align-items-center">
                    {getIconFlag(language.code)}
                    <div className="ps-2 fw-bold">{language.name}</div>
                  </div>
                ))}
              </ReactBootstrap.Dropdown.Toggle>
              <ReactBootstrap.Dropdown.Menu>
                {languages.map((language) => (
                  <ReactBootstrap.Dropdown.Item key={language.code} onClick={(e) => handleClickLanguage(e, language)}>
                    <div className="px-2 d-flex align-items-center">
                      {getIconFlag(language.code)}
                      <div className="ps-2">{language.name}</div>
                    </div>
                  </ReactBootstrap.Dropdown.Item>
                ))}
              </ReactBootstrap.Dropdown.Menu>
            </ReactBootstrap.Dropdown> :
            null
          }
          <ReactBootstrap.Dropdown>
            <ReactBootstrap.Dropdown.Toggle className="d-flex align-items-center border-0 header-action">
              {languages.filter((language) => language.code === i18n.code).map((language) => (
                <div key={language.code} className="px-2 d-flex align-items-center">
                  <IconUser size="lg" />
                  <div className="ps-2 fw-bold">{SecurityService.getUserFullname()}</div>
                </div>
              ))}
            </ReactBootstrap.Dropdown.Toggle>
            <ReactBootstrap.Dropdown.Menu>
              <ReactBootstrap.Dropdown.Item onClick={handleClickLogout}>
                <div className="px-2 d-flex align-items-center">
                  <IconLogout size="lg" />
                  <div className="ps-2">{words.logout}</div>
                </div>
              </ReactBootstrap.Dropdown.Item>
            </ReactBootstrap.Dropdown.Menu>
          </ReactBootstrap.Dropdown>
        </div>
      </div>
      {/* Menu */}
      {menu ?
        <ReactBootstrap.Offcanvas className="offcanvas-menu" show={showMenu} onHide={() => setShowMenu(false)}>
          <ReactBootstrap.Offcanvas.Header className="btn-close-white" closeButton>
            <ReactBootstrap.Offcanvas.Title></ReactBootstrap.Offcanvas.Title>
          </ReactBootstrap.Offcanvas.Header>
          <ReactBootstrap.Offcanvas.Body className="p-0">
            {menu.map(function (menuGroup, menuGroupIndex) {
              const filteredMenuOptions = menuGroup.options.filter(menuOption => !menuOption.hidden);
              if (menuGroup.options.length > 0 && filteredMenuOptions.length === 0) {
                return null;
              }
              const collapsed = collapsedMenuGroupIndexes.indexOf(menuGroupIndex) !== -1;
              return (
                <div key={menuGroupIndex}>
                  <div className="p-2 d-flex justify-content-between align-items-center cursor-pointer group" onClick={(e) => handleClickMenuGroup(e, menuGroupIndex)}>
                    <div className="fw-bold lead text-uppercase flex-1">{menuGroup.label}</div>
                    <div className="pe-1">
                      {collapsed ?
                        <IconMenuCollapsed size="sm" /> :
                        <IconMenuExpanded size="sm" />
                      }
                    </div>
                  </div>
                  {!collapsed ?
                    filteredMenuOptions.map((menuOption, menuOptionIndex) => (
                      <div key={menuOptionIndex} className="p-3 d-flex align-items-center cursor-pointer option" onClick={(e) => handleClickMenuOption(e, menuOption.path)}>
                        <div>{React.createElement(menuOption.icon, { size: 'sm' })}</div>
                        <div className="ps-2 pt-1 lead">{menuOption.label}</div>
                      </div>
                    )) :
                    null
                  }
                </div>
              );
            })}
          </ReactBootstrap.Offcanvas.Body>
        </ReactBootstrap.Offcanvas> :
        null
      }
    </div>
  );
})

export default Header;