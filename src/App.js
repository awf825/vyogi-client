import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import Dashboard from './components/Dashboard'
import Header from './components/Header'
import Video from './components/Video'
import Login from './components/registrations/Login'
import {BrowserRouter, Switch, Route } from 'react-router-dom'
import Schedule from './components/Schedule'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/register" component={Login} />
          <Route exact path="/" render={props => (
            <Dashboard {...props} />
          )}/>
          <Route exact path='/video' render={props => (
            <Video {...props} />
          )}/>
          <Route exact path="/schedule" render={props => (
            <Schedule session{...props} />
          )}/>
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App;
