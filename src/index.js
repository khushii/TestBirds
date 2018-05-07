import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap-theme.css";
import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App";
const title = 'My Minimal React Webpack Babel Setup';

ReactDOM.render(
  <App/>,
  document.getElementById('app')
);

module.hot.accept();