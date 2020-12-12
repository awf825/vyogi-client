import {LOGIN_ACTION_KEY} from './constant';
import { API_ROOT } from '../../api-config.js';
import axios from 'axios';

// The parameter (payload) can be any data required to perform some task
  // The dispatch (default) function is use to return the required action to the redux-store 
  // when the asynchronous task is completed, while the getState (default) function 
  // is used to get current store state.

export const LoginAction = (payload) => (dispatch, getState) => {
  let result = {...payload}
  const mainUrl = (
    !result.modalFlag ?
    `${API_ROOT}/login` :
    `${API_ROOT}/users`
  )
  return axios.post(mainUrl, result).then(resp => {
          axios.get(`${API_ROOT}/accounts/${resp.data.user.id}`).then(secondResp => {
            dispatch({
              type: LOGIN_ACTION_KEY,
              payload: {
                user: resp.data.user,
                account: secondResp.data
              }
            })
          })
         }).catch(err => {
           console.log('error fetching user and account:')
         })
}
  // return new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     let result = {...payload}
  //     let date = new Date();
  //     result.date = date.toDateString();
  //     result._id = Math.random();
  //     dispatch({ type: LOGIN_ACTION_KEY, payload: result });
  //     resolve({ success: true })
  //   }, 3000);
  // });