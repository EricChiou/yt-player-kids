import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import router from './routes';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

import './index.css';
import './styles/common.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>,
);

serviceWorkerRegistration.register();
