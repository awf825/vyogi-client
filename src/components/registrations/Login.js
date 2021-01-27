import React, { useState } from 'react';
import RegisModal from './RegisModal'
import RegisModalContent from './RegisModalContent'
import axios from 'axios'
import { API_ROOT } from '../../api-config.js';

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
    // setIsLoading(true);
    let payload = { 
      email: email, 
      password: password
    };

    const mainUrl = (
      !payload.modalFlag ?
      `${API_ROOT}/signin` :
      `${API_ROOT}/signup`
    );

    axios.post(mainUrl, {...payload}).then(resp => {
      console.log('axios.post(mainUrl, {...payload}', resp);
      localStorage.setItem('token', resp.data.token);
    })
      .then( _ => { props.history.push('/register') } )
      .catch(err => { console.log('SIGNUP BLEW UP'); }
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

export default Login;
