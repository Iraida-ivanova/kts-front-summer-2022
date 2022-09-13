import React from 'react';

import App from 'App/App';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'styles/index.module.scss';
import 'regenerator-runtime';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

if (module.hot) {
  module.hot.accept();
}
