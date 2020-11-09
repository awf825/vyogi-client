import React, {useEffect, useCallback, useState} from 'react';
import { suid } from 'rand-token';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import Header from './components/Header'
import Home from './components/Home'
import Video from './components/Video'
import dailyApi from './components/video/dailyApi'
import About from './components/About'
import Login from './components/registrations/Login'
import {withRouter, Switch, Route, useHistory} from 'react-router-dom'
import Schedule from './components/Schedule'
import Cookies from 'universal-cookie'
import axios from 'axios';
const cookies = new Cookies();
export const AuthContext = React.createContext();
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
// Only enable "leave" button when we know we're not mid-operation
const enableCallButtons = [STATE_JOINED, STATE_ERROR].includes(callState);
// Only enable "start" button when we know we're not mid-operation
const enableStartButton = callState === STATE_IDLE;

const reducer = (state, action) => {
  switch(action.type) {
    case "LOGIN":
      //debugger
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
  console.log('REDUCER STATE AT APP.JS:', state)
  let history = useHistory()

  const handleLogout = () => {
    fetch('http://localhost:3001/api/v1/logout', {
      method: 'DELETE',
      headers: {
        "Content-Type": 'application/json'
      }
    }).then(resp => {
      console.log('first catch at logout:', resp)
      if (resp.ok) {
        return resp.json()
      }
      throw resp;
    }).then(respJson => {
      console.log('second catch at logout:', respJson)
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

  useEffect(() => {
    if (!callObject) return;
  
    const events = ["joined-meeting", "left-meeting", "error"];
  
    function handleNewMeetingState(event) {
      event && logDailyEvent(event);
      switch (callObject.meetingState()) {
        case "joined-meeting":
          // update component state to a "joined" state...
          break;
        case "left-meeting":
          callObject.destroy().then(() => {
            // update component state to a "left" state...
          });
          break;
        case "error":
          // update component state to an "error" state...
          break;
        default:
          break;
      }
    }
  
    // Use initial state
    handleNewMeetingState();
  
    // Listen for changes in state
    for (const event of events) {
      callObject.on(event, handleNewMeetingState);
    }
  
    // Stop listening for changes in state
    return function cleanup() {
      for (const event of events) {
        callObject.off(event, handleNewMeetingState);
      }
    };
  }, [callObject]);

  const createCall = useCallback(() => {
    // update component state to a "creating" state
    return dailyApi
      .createRoom()
      .then(room => room.url)
      .catch(error => {
        // update comp state to an "error" state...
      })
  }, []);

  const startJoiningCall = useCallback(url => {
    const callObject = DailyIframe.createCallObject();
    // update comp to "joining" state
    callObject.join({ url });
  }, []);

  const startLeavingCall = useCallback(() => {
    if (!callObject) return;
    // update comp state to a "leaving" state
    callObject.leave()
  }, [callObject]);

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
                account={currentAccount} 
                videoRunning={state.videoRunning} 
                handleVideoGeneration={handleVideoGeneration}/>
            )}/>
            <Route exact path='/schedule' render={props => (
              <Schedule 
                {...props} 
                user={currentUser} 
                account={currentAccount}
              />
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
