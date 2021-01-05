import React, { useState } from 'react';
import RegisModal from './RegisModal'
import RegisModalContent from './RegisModalContent'

import { LoginAction } from '../../store/actions/LoginAction';
import { connect } from 'react-redux'

export const Login = (props) => {
  // const [isLoading, setIsLoading] = useState(false)
  const modalState = {
    showModal: false,
    errorLocale: "form"
  }

  const [modal, setModal] = useState(modalState);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalEmail, setModalEmail] = useState('');
  const [modalPassword, setModalPassword] = useState('');
  const [modalPasswordConf, setModalPasswordConf] = useState('')

  const login = (email, password, modalFlag) => {
    const mainUrl = !modalFlag ? `${API_ROOT}/login` : `${API_ROOT}/users`;
    return
      axios.post(mainUrl, { email: email, password: password })
        .then(resp => {
          console.log(resp)
          // validate in the server
          // start the session in the server (send 200 back)
          // push to dashboard
          //   props.history.push('/dashboard')
        }).catch(err => {
          console.log('error fetching user and account:', err)
          // explain the error
          // reset page
        });
    // setIsLoading(true);
    // let payload = { email: email, password: password, modalFlag: modalFlag }
    // props.loginAction(payload).then(res => {
    //   props.history.push('/dashboard')
    }

// HERE IS OLD CODE FROM EARLIER IN TRYING REDUX 12/13/2020

// import {LOGIN_ACTION_KEY} from './constant';
// import { API_ROOT } from '../../api-config.js';
// import axios from 'axios';

// The parameter (payload) can be any data required to perform some task
  // The dispatch (default) function is use to return the required action to the redux-store
  // when the asynchronous task is completed, while the getState (default) function
  // is used to get current store state.

  // Here is login in from original reducer method

// export const LoginAction = (payload) => (dispatch, getState) => {
//   let result = {...payload}
//   const mainUrl = (
//     !result.modalFlag ?
//     `${API_ROOT}/login` :
//     `${API_ROOT}/users`
//   )
//   return axios.post(mainUrl, result).then(resp => {
//           axios.get(`${API_ROOT}/accounts/${resp.data.user.id}`).then(secondResp => {
//             dispatch({
//               type: LOGIN_ACTION_KEY,
//               payload: {
//                 user: resp.data.user,
//                 account: secondResp.data
//               }
//             })
//           })
//          }).catch(err => {
//            console.log('error fetching user and account:')
//          })
// }
  }

  const handleChange = (e) => {
    return (
      e.target.name === 'email' ? setEmail(e.target.value) :
      e.target.name === 'password' ? setPassword(e.target.value) :
      () => {}
    )
  }

  const handleModalChange = (e) => {
    return (
      e.target.name === 'email' ? setModalEmail(e.target.value) :
      e.target.name === 'password' ? setModalPassword(e.target.value) :
      e.target.name === 'passwordConf' ? setModalPasswordConf(e.target.value) :
      () => {}
    )
  }

  const handleClick = (e) => {
    e.preventDefault();
    email.length && password.length && login(email, password, false)
  }

  const handleModalSubmit = event => {
    event.preventDefault();
    setModal({
      errorMessage: null,
      showModal: false
    });
    modalEmail.length && modalPassword.length && modalPasswordConf.length && login(modalEmail, modalPassword, true)
  }

  const displayModal = (e) => {
    e.preventDefault()
    setModal({
      showModal: true,
      errorLocale: "modal"
    })
  }

  const hideModal = () => {
    setModal({
      showModal: false,
      errorLocale: ""
    })
  }

  return (
    <div classname="wrap">
      <div className="login">
        <RegisModal show={modal.showModal} handleClose={hideModal}>
          <RegisModalContent
            handleRegistration={handleModalSubmit}
            handleInputChange={handleModalChange}
            data={modal}
            handleClick={handleClick}
          />
        </RegisModal>
        <h2>Login Form</h2>
        <form action="/" method="post">
          <div classname="container">
            <label for="email"><b>Email</b></label>
            <input
              type="text"
              value={email}
              name="email"
              placeholder="Enter Email"
              onChange={handleChange}
              required
            />
            <label for="password"><b>Password</b></label>
            <input
              type="text"
              value={password}
              name="password"
              placeholder="Enter Password"
              onChange={handleChange}
              required
            />
            <button type="submit" onClick={handleClick}>
              "Login"
              {/* { !isLoading ? "Login" : "Loading..." } */}
            </button>
            <button type="submit" onClick={displayModal}>
              "Sign Up"
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    userDetails: state.login.userDetails,
  }
}

const mapDispatchToProps = {
  loginAction: LoginAction
}

// in order to subscribe our Login component to store, we import connect from react-redux;
// connect is a higher order function that acts like a subscriber,
// it wraps the component we want to access the redux store state

// mapStateToProps is a callback function that takes the current redux store state
// and returns an object that can be accessed from the props of the current component

// mapDispatchToProps is an object that contains action creators as it
// properties and makes them accessible as props in the current component.

export default connect(mapStateToProps, mapDispatchToProps)(Login);
