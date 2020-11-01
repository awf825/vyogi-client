import React from 'react';
import RegisModal from './RegisModal'
import RegisModalContent from './RegisModalContent'
import axios from 'axios';
// import {Link} from 'react-router-dom'
import {AuthContext} from '../../App'

export const Login = (props) => {
  const { dispatch } = React.useContext(AuthContext);
  const initialState = {
    email: '',
    password: '',
    passwordConf: '',
    isSubmitting: false,
    errorMessage: null,
    showModal: false
  }

  const [data, setData] = React.useState(initialState);

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
    let user = {email: data.email, password: data.password}
    axios.post('http://localhost:3001/api/v1/login', user)
      .then(resp => {
        if (resp.data.logged_in) {
          dispatch({
            type: "LOGIN",
            payload: resp.data
          })
          props.history.push('/home')
        } else {
          setData({
            ...data,
            isSubmitting: false,
            errorMessage: resp.data.errors
          })
          console.log('failure', resp)
        }
      })
      .catch(er => console.log('api errors:', er))

    // fetch('http://localhost:3001/api/v1/login', {
    //   method: 'POST',
    //   headers: {
    //     "Content-Type": 'application/json'
    //   },
    //   body: JSON.stringify({
    //     email: data.email,
    //     password: data.password
    //   })
    // }).then(resp => {
    //   console.log('resp at login:', resp)
    //   if (resp.ok) {
    //     props.history.push('/home')
    //     return resp.json()
    //   }
    //   throw resp;
    // }).then(respJson => {
    //   dispatch({
    //     type: "LOGIN",
    //     payload: respJson
    //   })
    // }).catch(err => {
    //   setData({
    //     ...data,
    //     isSubmitting: false,
    //     errorMessage: err.message || err.statusText
    //   })
    // })
  }

  const handleModalSubmit = event => {
    event.preventDefault();
    setData({
      ...data,
      errorMessage: null,
      showModal: false
    });
    fetch('http://localhost:3001/api/v1/users', {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
        passwordConf: data.passwordConf
      })
    }).then(resp => {
      console.log(resp)
      if(resp.ok) {
        props.history.push('/home')
        return resp.json()
      }
      throw resp;
    }).then(respJson => {
      dispatch({
        type: "REGISTER",
        payload: respJson
      })
    }).catch(err => {
      setData({
        ...data,
        isSubmitting: false,
        errorMessage: err.message || err.statusText
      })
    })
  }

  const displayModal = () => {
    setData({
      ...data,
      showModal: true
    })
  }

  const hideModal = () => {
    setData({
      ...data,
      showModal: false
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

            {data.errorMessage && (
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


// class Login extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       email: '',
//       password: '',
//       errors: ''
//     };
//   }

//   componentWillMount() {
//     return this.props.loggedInStatus ? this.redirect() : null
//   }

//   handleChange = (ev) => {
//     const {name, value} = ev.target;
//     this.setState({
//       [name]: value
//     })
//   };

//   handleSubmit = (ev) => {
//     ev.preventDefault();
//     const {email, password} = this.state

//     let user = {
//       email: email,
//       password: password
//     }

//     axios.post('http://localhost:3001/api/v1/login', {user}, {withCredentials: true})
//       .then(resp => {
//         if (resp.data.logged_in) {
//           this.props.handleLogin(resp.data)
//           this.redirect()
//         } else {
//           this.setState({
//             errors: resp.data.errors
//           })
//         }
//       })
//       .catch(er => console.log('api errors:', er))
//   }

//   redirect = () => {
//     this.props.history.push('/schedule')
//   }

//   handleErrors = () => {
//     return (
//       <div>
//         <ul>
//           {this.state.errors.map(er => {
//             return <li key={er}>{er}</li>
//           })}
//         </ul>
//       </div>
//     )
//   }

//   render() {
//     const {email, password} = this.state
//     return (
//       <div>
//         <h1>Log In</h1>
//         <form onSubmit={this.handleSubmit}>
//           <input
//             placeholder="email"
//             type="text"
//             name="email"
//             value={email}
//             onChange={this.handleChange}
//           />
//           <input
//             placeholder="password"
//             type="password"
//             name="password"
//             value={password}
//             onChange={this.handleChange}
//           />
//           <button placeholder="submit" type="submit">
//             Log In
//           </button>
//           <div>
//             or <Link to="/signup">sign up</Link>
//           </div>
//         </form>
//         <div>
//           {
//             this.state.errors ? this.handleErrors() : null
//           }
//         </div>
//       </div>
//     );
//   }
// }

export default Login;