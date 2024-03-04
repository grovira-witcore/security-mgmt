import React from 'react';
import ReactDOM from 'react-dom/client';
import * as ReactRouterDOM from 'react-router-dom';
import './styles/styles.css';
import App from './App.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ReactRouterDOM.BrowserRouter>
    <App/>
  </ReactRouterDOM.BrowserRouter>
);
