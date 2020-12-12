import {LOGOUT_ACTION_KEY} from './constant';
import { API_ROOT } from '../../api-config.js';
import axios from 'axios';

export const LogoutAction = () => (dispatch, getState) => {
  return axios.post(`${API_ROOT}/logout`, {})
          .then(resp => {
            dispatch({
              type: LOGOUT_ACTION_KEY,
              payload: resp
            })
          })
          .catch(err => {
            console.err(err)
          })
}