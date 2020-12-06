import React, {useEffect, useCallback, useState, useContext} from 'react';
// import { suid } from 'rand-token';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import Header from './components/Header'
import Home from './components/Home'
import Video from './components/Video'
import About from './components/About'
import Login from './components/registrations/Login'
import {withRouter, Switch, Route, useHistory} from 'react-router-dom'
import Schedule from './components/Schedule'
import AuthContext from './AuthContext'
import Cookies from 'universal-cookie'
import { API_ROOT } from './api-config.js';
import axios from 'axios';
const cookies = new Cookies();
const currentUser = JSON.parse(sessionStorage.getItem('user'))
const currentAccount = JSON.parse(sessionStorage.getItem('account'))
const currentVideoSession = cookies.get('videoToken')
const deadState = { 
  isLoggedIn: false, 
  user: {}, 
  account: {},
  videoRunning: !!currentVideoSession 
}
const liveState = { 
  isLoggedIn: true, 
  user: currentUser, 
  account: currentAccount,
  videoRunning: !!currentVideoSession 
}
const appState = !currentUser ? deadState : liveState

const reducer = (state, action) => {
  switch(action.type) {
    case "LOGIN":
      sessionStorage.setItem('user', JSON.stringify(action.payload.user));
      sessionStorage.setItem('account', JSON.stringify(action.payload.account))
      // sessionStorage.setItem("token", JSON.stringify(action.payload.token));
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload.user,
        account: action.payload.account
        // token: action.payload.token
      };
    case "REGISTER":
      sessionStorage.setItem("user", JSON.stringify(action.payload.user));
      sessionStorage.setItem('account', JSON.stringify(action.payload.account));
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload.user,
        account: action.payload.account
        // token: action.payload.token
      };
    case "LOGOUT":
      sessionStorage.removeItem("user");
      cookies.remove('videoToken')
      return {
        ...state,
        isLoggedIn: false,
        user: null
      }
    case "AWAKE":
      // var inFifteenMinutes = new Date(new Date().getTime() + 15 * 60 * 1000);
      // // var tkn = suid(16)
      // cookies.set('videoToken', tkn, { expires: inFifteenMinutes, path: '/' })
      // var expiry = moment(new Date()).add(30, 's').toDate();
      // var videoSession = {
      //   expiresAt: expiry,
      //   token: action.payload.videoToken
      // }
      // sessionStorage.setItem("videoSession", JSON.stringify(videoSession))
      // return {
      //   ...state,
      //   isLoggedIn: true,
      //   user: currentUser
      // }
    default:
      return state;  
  }
};



function App() {
  const [state, dispatch] = React.useReducer(reducer, appState)
  // console.log('REDUCER STATE AT APP.JS:', state)
  let history = useHistory()

  const handleLogout = () => {
    fetch(`${API_ROOT}/logout`, {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json'
      }
    }).then(resp => {
      if (resp.ok) {
        return resp.json()
      }
      throw resp;
    }).then(respJson => {
      dispatch({
        type: "LOGOUT",
        payload: respJson
      })
    }).catch(err => {
      console.err(err)
    })
  }

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch
      }}
      >
      <div className="App">
        {!state.isLoggedIn ? 
        <Login history={history}/> 
        :
        <div className="AppHome">
          <Header handleLogout={handleLogout} />
          <Switch>
            <Route exact path='/home' render={props => (
              <Home {...props} user={currentUser} account={currentAccount} />
            )}/>
            <Route exact path='/video' render={props => (
              <Video 
                {...props} 
                user={currentUser} 
                account={currentAccount}/>
            )}/>
            <Route exact path='/schedule' render={props => (
              <Schedule 
                {...props}  
                account={currentAccount}
              />
            )}/>
            <Route exact path='/about' render={props => (
              <About {...props} user={currentUser} />
            )}/>
            <Route exact path='/register' render={props => (
              <Login {...props} />
            )}/>
          </Switch>
        </div>
        }
      </div>
    </AuthContext.Provider>
  )
}

export default withRouter(App);
