/* global document */
/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';

import App from './js/App.jsx';
import './styles/sass/index.scss';

ReactDOM.render(
  <App />,
  document.getElementById('app')
);

module.hot.accept();