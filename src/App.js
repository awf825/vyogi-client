import React, { Component } from 'react';
import { suid } from 'rand-token';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import Header from './components/Header'
import Home from './components/Home'
import Video from './components/Video'
import About from './components/About'
import Login from './components/registrations/Login'
import {withRouter, Switch, Route, useHistory} from 'react-router-dom'
import Schedule from './components/Schedule'
import Cookies from 'universal-cookie'
import axios from 'axios';
const cookies = new Cookies();
export const AuthContext = React.createContext();
const currentUser = JSON.parse(sessionStorage.getItem('user'))
const currentVideoSession = cookies.get('videoToken')
const deadState = { isLoggedIn: false, user: null, videoRunning: !!currentVideoSession }
const liveState = { isLoggedIn: true, user: currentUser, videoRunning: !!currentVideoSession }
const appState = !currentUser ? deadState : liveState

const reducer = (state, action) => {
  switch(action.type) {
    case "LOGIN":
      sessionStorage.setItem("user", JSON.stringify(action.payload.user));
      // sessionStorage.setItem("token", JSON.stringify(action.payload.token));
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload.user,
        // token: action.payload.token
      };
    case "REGISTER":
      sessionStorage.setItem("user", JSON.stringify(action.payload.user));
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload.user
        // token: action.payload.token
      };
    case "LOGOUT":
      sessionStorage.removeItem("user");
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        account: null
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
  let history = useHistory()

  const handleLogout = () => {
    fetch('http://localhost:3001/api/v1/logout', {
      method: 'DELETE',
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
      alert(err)
    })
  }

  const handleVideoGeneration = () => {
    var inFifteenMinutes = new Date(new Date().getTime() + 15 * 60 * 1000);
    var tkn = suid(16)
    cookies.set('videoToken', tkn, { expires: inFifteenMinutes, path: '/' })
  }

  // const injectAccount = () => {
  //   axios.get(`http://localhost:3001/api/v1/accounts/${currentUser.account_id}`)
  //     .then(resp => {
  //       console.log('account call in injectAccount:', resp)
  //     })
  //   console.log('inject me into header onClicks via props')
  // }

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
              <Home {...props} />
            )}/>
            <Route exact path='/video' render={props => (
              <Video {...props} user={currentUser} videoRunning={state.videoRunning} handleVideoGeneration={handleVideoGeneration}/>
            )}/>
            <Route exact path='/schedule' render={props => (
              <Schedule {...props} user={currentUser} />
            )}/>
            <Route exact path='/about' render={props => (
              <About {...props} user={currentUser} />
            )}/>
          </Switch>
        </div>
        }
      </div>
    </AuthContext.Provider>
  )
}

export default withRouter(App);
