import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import Header from './components/Header'
import Home from './components/Home'
import Login from './components/registrations/Login'
import {withRouter, Switch, Route, useHistory} from 'react-router-dom'
import Schedule from './components/Schedule'
export const AuthContext = React.createContext();
const storage = sessionStorage.getItem('user')
const deadState = { isLoggedIn: false, user: null }
const liveState = { isLoggedIn: true, user: JSON.parse(storage)}
const appState = !storage ? deadState : liveState

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
          <Header handleLogout={handleLogout}/>
          <Switch>
            <Route exact path='/home' render={props => (
              <Home {...props} />
            )}/>
            {/* <Route exact path='/login' render={props => (
              <Login {...props}/>
            )}/> */}
            <Route exact path='/schedule' render={props => (
              <Schedule {...props} />
            )}/>
          </Switch>
        </div>
        }
      </div>
    </AuthContext.Provider>
  )
}

export default withRouter(App);
