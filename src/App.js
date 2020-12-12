import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import Dashboard from './components/Dashboard'
import Header from './components/Header'
// import Home from './components/Home'
import Video from './components/Video'
import About from './components/About'
import Login from './components/registrations/Login'
import {BrowserRouter, Switch, Route } from 'react-router-dom'
import Schedule from './components/Schedule'
import { connect } from 'react-redux';

function App(props) {
  const currentUser = props.userDetails.user || JSON.parse(sessionStorage.getItem("user"))

  return (
    <BrowserRouter>
      <div className="App">
        {!!currentUser ? <Header /> : null}
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/dashboard" render={props => (
            <Dashboard 
              {...props}
              user={currentUser}
            />
          )}/>
          <Route exact path='/video' render={props => (
            <Video 
            {...props} 
            user={currentUser} 
            // account={currentAccount}
            />
          )}/>
          <Route exact path="/schedule" render={props => (
            <Schedule 
              {...props}
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
