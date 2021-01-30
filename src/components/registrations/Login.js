import React, { useState } from 'react';
import RegisModal from './RegisModal'
import RegisModalContent from './RegisModalContent'
import axios from 'axios'
import { API_ROOT } from '../../api-config.js';
import { serverErrorHandler, clientErrorHandler } from './gatekeeper.js'

export const Login = (props) => {
  const modalState = {
    showModal: false,
    errorLocale: "form"
    // errorMessage: null
  }

  const [modal, setModal] = useState(modalState);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalEmail, setModalEmail] = useState('');
  const [modalPassword, setModalPassword] = useState('');
  const [modalPasswordConf, setModalPasswordConf] = useState('');
  // const [isLoading, setIsLoading] = useState('');

  const login = (email, password, modalFlag, passwordConf=null) => {
    // setIsLoading(true);
    let payload = { 
      email: email, 
      password: password,
      passwordConf: passwordConf
    };

    const mainUrl = (
       modalFlag ?
      `${API_ROOT}/signup` :
      `${API_ROOT}/signin`
    );

    axios.post(mainUrl, {...payload}).then(resp => {
      sessionStorage.setItem('token', resp.data.token);
      sessionStorage.setItem('user', resp.data._id);
    })
      .then( _ => { props.history.push('/') } )
      .catch(err => {
        serverErrorHandler(err)
      }
    );
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
    clientErrorHandler({ 
      email: email, 
      password: password
    });
    login(email, password, false)
  };

  const handleModalSubmit = event => {
    event.preventDefault();
    setModal({
      showModal: false
    });
    var errHandle = clientErrorHandler({ 
      email: modalEmail, 
      password: modalPassword,
      passwordConf: modalPasswordConf
    });
    login(modalEmail, modalPassword, true, modalPasswordConf)
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
      errorLocale: "form"
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

export default Login;