import React, { useState } from 'react';
import RegisModal from './RegisModal'
import RegisModalContent from './RegisModalContent'
import axios from 'axios'
import { API_ROOT } from '../../api-config.js';
/* gatekeeper is a silly thing I made to dry up error handling code */
import { serverErrorHandler, clientErrorHandler } from './gatekeeper.js'

export const Login = (props) => {
  // errorLocale here is pretty useless. I only kept it here cos its in the
  // hide display functions (lines 91-104) and would probably break a bunch
  // of shit. Use it if you'd like, but you can totally go scorched earth too. 
  // Also feel free to use isLoading if you find it relevant.
  const modalState = {
    showModal: false,
    errorLocale: "form"
    // errorMessage: null
    // isLoading: false
  }


  const [modal, setModal] = useState(modalState);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalEmail, setModalEmail] = useState('');
  const [modalPassword, setModalPassword] = useState('');
  const [modalPasswordConf, setModalPasswordConf] = useState('');
  // const [isLoading, setIsLoading] = useState('');

  // In this function I have both signup and login actions routing through
  // this method: two giveaways are the optional passwordConf argument (kind of 
  // lazy) and the condition in mainUrl. This is another reason why it may
  // be a good idea to stick to the modal: the request itself is hinged on 
  // what part of the app its coming from. But, you can make an argument for anything
  // else if you stay inline with this logic. 
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

    // I have a future project in mind to contain these variables in 
    // React context, I don't think this storage idea is the safest
    axios.post(mainUrl, {...payload}).then(resp => {
      console.log('axios.post(mainUrl, {...payload}).then(resp =>', resp)
      sessionStorage.setItem('token', resp.data.token);
      sessionStorage.setItem('user', resp.data._id);
      sessionStorage.setItem('admin', resp.data.isAdmin);
    })
      .then( _ => { props.history.push('/') } )
      .catch(err => {
        // see gatekeeper
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
    // gatekeeper method checks length of inputs (I'm not sure why I have it in a variable)
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

    /*
  // RegisModal is the wrapper for the modal. Its wrapped up in the state hook
  // at line 22 and the first two props work with the visibility of it; RegisModalContent,
  // passed as children, handles the data request. handleModalSubmit and handleClick (at line 158 in this file)
  // both end with an invocation of login method). I don't think handleClick as prop in
  // RegisModalContent is actually doing anything. You'll do a lot of living in these components 
  */

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