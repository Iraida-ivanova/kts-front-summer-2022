import React from 'react';

import App from 'App/App';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import 'styles/index.scss';
import 'regenerator-runtime';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <HashRouter>
    <App />
  </HashRouter>
);

if (module.hot) {
  module.hot.accept();
}
