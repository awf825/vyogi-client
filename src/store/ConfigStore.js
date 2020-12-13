import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import LoginReducer from './reducers/LoginReducer';
import LogoutReducer from './reducers/LogoutReducer';

const ConfigStore = () => {
  var initialState = {}
  try {
    initialState = sessionStorage.getItem("user") ?
      JSON.parse(sessionStorage.getItem("user")) : {}
  } catch (err) {
    console.log('error:', err)
  }

  // store is an object that can be used to get current state, 
  // next is a function that is used to pass the 
  // action to the next middle-ware.

  const saver = (store) => next => action => {
    let result = next(action);
    let stateToSave = store.getState();
    sessionStorage.setItem("user", JSON.stringify({
      ...stateToSave
    }))
    return result;
  }
  // first we use combineReducers a function from redux to combine 
  // multiple reducers into one root reducer
  const rootReducer = combineReducers({
    login: LoginReducer,
    logout: LogoutReducer,
  });
  // applyMiddleware is a function from redux that is used
  // to add middle wares like thunk to redux store.
  // createStore takes multiple arguments but for basics, 
  // we pass in two argument which is the rootReducer 
  // and the applyMiddleware
  return createStore(rootReducer, applyMiddleware(thunk, saver));
}

export default ConfigStore;