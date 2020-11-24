import { API_ROOT } from '../../api-config.js';
import React from 'react';
import RegisModal from './RegisModal'
import RegisModalContent from './RegisModalContent'
import axios from 'axios';
import AuthContext from '../../AuthContext'

export const Login = (props) => {
  const { dispatch } = React.useContext(AuthContext);
  const initialState = {
    email: '',
    password: '',
    passwordConf: '',
    isSubmitting: false,
    errorMessage: null,
    errorLocale: "form",
    showModal: false
  }

  const [data, setData] = React.useState(initialState);

  const loginReq = (user, sourceFlag) => {
    const toggle = ((sourceFlag == "form") ? "LOGIN" : "REGISTER")
    const mainUrl = (
      (sourceFlag == "form") ? 
      `${API_ROOT}/login` : 
      `${API_ROOT}/users`
    )
    // BIG TODO FIND WAY TO CHAIN AXIOS CALLS: ACCOUNT URL IS DEPENDENT ON USER INFO
    axios.post(mainUrl, user)
      .then(resp => {
        if (resp.data.logged_in || (resp.data.status == "created")) {
          axios.get(`${API_ROOT}/accounts/${resp.data.user.id}`)
            .then(secondResp => {
              dispatch({
                type: toggle,
                payload: {
                  user: resp.data.user,
                  account: secondResp.data
                }
              })
              props.history.push('/home')
            }) 
        } else {
          setData({
            ...data,
            isSubmitting: false,
            errorMessage: resp.data.errors
          })
        }
      })
      .catch(er => console.log('api errors:', er))
  }

  const handleInputChange = event => {
    setData({
      ...data,
      [event.target.name]: event.target.value
    })
  }

  const handleFormSubmit = event => {
    event.preventDefault();
    setData({
      ...data,
      isSumitting: true,
      errorMessage: null
    });
    const user = ({email: data.email, password: data.password})
    loginReq(user, "form")
  }

  const handleModalSubmit = event => {
    event.preventDefault();
    setData({
      ...data,
      errorMessage: null,
      showModal: false
    });
    const user = ({email: data.email, password: data.password, password_confirmation: data.passwordConf})
    loginReq(user, "modal")
  }

  const displayModal = () => {
    setData({
      ...data,
      showModal: true,
      errorLocale: "modal"
    })
  }

  const hideModal = () => {
    setData({
      ...data,
      showModal: false,
      errorLocale: ""
    })
  }

  return (
    <div className="login-container">
      <div className="card">
        <div className="container">
          <RegisModal show={data.showModal} handleClose={hideModal}>
            <RegisModalContent 
              handleRegistration={handleModalSubmit} 
              handleInputChange={handleInputChange} 
              data={data} 
            />
          </RegisModal>
          <form onSubmit={handleFormSubmit}>
            <h1>Login</h1>
            <label htmlFor="email">
              Email
              <input
                type="text"
                value={data.email}
                onChange={handleInputChange}
                name="email"
                id="email"
              />
            </label>
            <label htmlFor="password">
              Password
              <input
                type="password"
                value={data.password}
                onChange={handleInputChange}
                name="password"
                id="password"
              />
            </label>

            {(data.errorMessage && (data.errorLocale == "form")) && (
              <span className="form-error">{data.errorMessage}</span>
            )}

            <button disabled={data.isSubmitting}>
              {data.isSubmitting ? (
                "Loading..."
              ) : (
                "Login"
              )}
            </button>
          </form>
          <div>
            or
            <button onClick={displayModal}>
              Register
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Login;
