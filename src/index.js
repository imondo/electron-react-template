import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Redirect, Switch } from 'react-router-dom';
import routerConfig from './routes';
import './styles/index.css';

ReactDOM.render(
  <BrowserRouter>
    <div className="container">
      <Switch>
        { routerConfig }
        <Redirect exact to="/login" />  
      </Switch>      
    </div>
  </BrowserRouter>,
  document.getElementById('root'));