import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import Header from './components/Header'
import Home from './components/Home'
import Video from './components/Video'
import About from './components/About'
import Login from './components/registrations/Login'
import {withRouter, Switch, Route, useHistory} from 'react-router-dom'
import Schedule from './components/Schedule'
export const AuthContext = React.createContext();
const currentUser = JSON.parse(sessionStorage.getItem('user'))
const deadState = { isLoggedIn: false, user: null }
const liveState = { isLoggedIn: true, user: currentUser }
const appState = !currentUser ? deadState : liveState

const reducer = (state, action) => {
  switch(action.type) {
    case "LOGIN":
      sessionStorage.setItem("user", JSON.stringify(action.payload.user));
      // sessionStorage.setItem("token", JSON.stringify(action.payload.token));
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload.user
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
      sessionStorage.clear();
      return {
        ...state,
        isLoggedIn: false,
        user: null
      }
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

  const injectAccount = () => {
    console.log('inject me into header onClicks via props')
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
          <Header handleLogout={handleLogout} injectAccount={injectAccount}/>
          <Switch>
            <Route exact path='/home' render={props => (
              <Home {...props} />
            )}/>
            <Route exact path='/video' render={props => (
              <Video {...props} user={currentUser}/>
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
