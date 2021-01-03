import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import Dashboard from './components/Dashboard'
import Header from './components/Header'
// import Home from './components/Home'
import Video from './components/Video'
import Login from './components/registrations/Login'
import {BrowserRouter, Switch, Route } from 'react-router-dom'
import Schedule from './components/Schedule'
import { connect } from 'react-redux';

function App(props) {
  const storage = JSON.parse(localStorage.getItem("session"))
  const isLive = storage ? !(JSON.stringify(storage.userDetails.user) === "{}") : false

  const [currentUser, currentAccount] = isLive ?
    [storage.userDetails.user, storage.userDetails.account] :
    [props.userDetails.user, props.userDetails.account]

  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/register" component={Login} />
          <Route exact path="/" render={props => (
            <Dashboard
              {...props}
              user={currentUser}
              account={currentAccount}
            />
          )}/>
          <Route exact path='/video' render={props => (
            <Video
              {...props}
              user={currentUser}
              account={currentAccount}
            />
          )}/>
          <Route exact path="/schedule" render={props => (
            <Schedule
              {...props}
              user={currentUser}
              account={currentAccount}
            />
          )}/>
        </Switch>
      </div>
    </BrowserRouter>
  )
}

const mapStateToProps = (state) => {
  return {
    userDetails: state.login.userDetails
  }
}

// export default withRouter(App);
export default connect(mapStateToProps, null)(App);
