import axios from 'axios';
//import { browserHistory } from 'react-router';
import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  FETCH_MESSAGE
} from './Types';
const ROOT_URL = 'http://localhost:3090';

export function signinUser({ email, password }) {
  debugger
  // redux-promise vs thunk
  // // purpose of thunk is to get direct access to dispatch method
  // // instead of returning an obj, thunk returns a function
  return function(dispatch) {
    // now able to pass a customized dispatch action
    //dispatch({ type: ... })
    // this is where you call mongo
    axios.post(`${ROOT_URL}/signin`, { email, password })
      .then(resp => {
        // Update state
        dispatch({ type: AUTH_USER })
        // Save the JWT token
        localStorage.setItem('token', resp.data.token)
        // NEED TO REPLACE THIS
        //browserHistory.push('/feature')
      })
      .catch((err) => {
        console.log('error at axios:', err)
        // show error to user
        dispatch(authError('Bad Login Info'))
      });

  }
}

export function signupUser({ email, password }) {
  return function(dispatch) {
    debugger
    axios.post(`${ROOT_URL}/signup`, { email, password })
      .then(resp => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', resp.data.token);
        // NEED TO REPLACE THIS
        //browserHistory.push('/feature');
      })
      .catch(resp => {
        console.log('catch at signup', resp)
        dispatch(authError(resp.data.error))
      })
  }
}

export function signoutUser() {
  localStorage.removeItem('token');
  return {
    type: UNAUTH_USER
  }
}

export function fetchMessage() {
  return function(dispatch) {
    axios.get(ROOT_URL, {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(resp => {
        dispatch({
          type: FETCH_MESSAGE,
          payload: resp.data.message
        })
      })
  }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}
