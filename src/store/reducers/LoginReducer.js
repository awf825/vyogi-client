import { LOGIN_ACTION_KEY } from '../actions/constant';

const initial_state = {
  userDetails: {}
}

const LoginReducer = (state = initial_state, action) => {
  switch (action.type) {
    case LOGIN_ACTION_KEY:
      return { 
        userDetails: { 
          user: action.payload.user,
          account: action.payload.account
        } 
      };
    default:
      return state;
  }
} 

export default LoginReducer;