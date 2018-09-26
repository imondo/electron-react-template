import React from 'react';
import { Route } from 'react-router-dom';

import App from './views/index';
import Login from './views/login'

const routes = [
  {
    path: '/index',
    component: App
  },
  {
    path: '/login',
    component: Login
  }
];

const routerConfig = routes.map((route, i) => {
  return (
    <Route 
      path={ route.path } 
      key = { i }
      render = { props => ( 
        <route.component {...props} routes = { route.routes } />
      )} 
    />
  );
});

export default routerConfig;