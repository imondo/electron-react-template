import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Redirect, Switch } from 'react-router-dom';
import routerConfig from './routes';
import './styles/index.css';

ReactDOM.render(
  <HashRouter>
    <div className="container">
      <Switch>
        { routerConfig }
        <Redirect exact to="/login" />  
      </Switch>      
    </div>
  </HashRouter >,
  document.getElementById('root'));