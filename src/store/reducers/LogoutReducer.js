import { LOGOUT_ACTION_KEY } from '../actions/constant';

const initial_state = {
  userDetails: JSON.parse(sessionStorage.getItem("user"))
}

const LogoutReducer = (state = initial_state, action) => {
  switch (action.type) {
    case LOGOUT_ACTION_KEY:
      sessionStorage.clear()
      return {
        userDetails: {
          user: {},
          account: {}
        }
      }
    default:
      return state;
  }
}

export default LogoutReducer;