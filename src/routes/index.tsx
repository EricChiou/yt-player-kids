import React from 'react';
import { createBrowserRouter, Navigate, RouteObject } from 'react-router-dom';

import Routes from '@/constants/routes';
import BeforeEach from './BeforeEach';

import Main from '@/layout/Main';
import Plain from '@/layout/Plain';

import Home from '@/pages/Home';
import Channel from '@/pages/Channel';
import Search from '@/pages/Search';
import Setting from '@/pages/Setting';

const routes: RouteObject[] = [
  {
    path: Routes.CHANNEL,
    element: <Main><Channel></Channel></Main>,
  },
  {
    path: Routes.SEARCH,
    element: <Main><Search></Search></Main>,
  },
  {
    path: Routes.SETTING,
    element: <Plain><Setting></Setting></Plain>,
  },
  {
    path: Routes.HOME,
    element: <Main><Home></Home></Main>,
  },
  {
    path: '/*',
    element: <Navigate to={Routes.HOME}></Navigate>,
  },
];

function setBeforeEach(routes: RouteObject[]) {
  routes.forEach((route) => {
    if (route.element) { route.element = <BeforeEach>{route.element}</BeforeEach>; }
    if (route.children) { setBeforeEach(route.children); }
  });
}
setBeforeEach(routes);

export const router = createBrowserRouter(routes, {
  basename: `/${import.meta.env.VITE_URL_BASENAME}`,
});

export default router;
