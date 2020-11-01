import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import Header from './components/Header'
import Home from './components/Home'
import Login from './components/registrations/Login'
// import {BrowserRouter, Switch, Route} from 'react-router-dom'
import {withRouter, Switch, Route, useHistory} from 'react-router-dom'
import Signup from './components/registrations/Signup'
import Schedule from './components/Schedule'
import Book from './components/Book'
export const AuthContext = React.createContext();
const storage = sessionStorage.getItem('user')
const deadState = { isLoggedIn: false, user: null }
const liveState = { isLoggedIn: true, user: JSON.parse(storage)}
const appState = !storage ? deadState : liveState

// import {Nav} from 'react-bootstrap';
// import axios from 'axios'

const reducer = (state, action) => {
  console.log(action.payload)
  switch(action.type) {
    case "LOGIN":
      sessionStorage.setItem("user", JSON.stringify(action.payload.user));
      // sessionStorage.setItem("token", JSON.stringify(action.payload.token));
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload.user
        // token: action.payload.token
      };
    case "REGISTER":
      sessionStorage.setItem("user", JSON.stringify(action.payload.user));
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload.user
        // token: action.payload.token
      };
    case "LOGOUT":
      sessionStorage.clear();
      return {
        ...state,
        isLoggedIn: false,
        user: null
      }
    default:
      return state;  
  }
};



function App() {
  const [state, dispatch] = React.useReducer(reducer, appState)
  let history = useHistory()

  const handleLogout = () => {
    fetch('http://localhost:3001/api/v1/logout', {
      method: 'DELETE',
      headers: {
        "Content-Type": 'application/json'
      }
    }).then(resp => {
      if (resp.ok) {
        return resp.json()
      }
      throw resp;
    }).then(respJson => {
      dispatch({
        type: "LOGOUT",
        payload: respJson
      })
    }).catch(err => {
      alert(err)
    })
  }

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch
      }}
      >
      <div className="App">
        {!state.isLoggedIn ? 
        <Login history={history}/> 
        :
        <div className="AppHome">
          <Header handleLogout={handleLogout}/>
          <Switch>
            <Route exact path='/home' render={props => (
              <Home {...props} />
            )}/>
            {/* <Route exact path='/login' render={props => (
              <Login {...props}/>
            )}/> */}
            <Route exact path='/signup' render={props => (
              <Signup {...props} />
            )}/>
            <Route exact path='/schedule' render={props => (
              <Schedule {...props} />
            )}/>
          </Switch>
        </div>
        }
      </div>
    </AuthContext.Provider>
  )
}


// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       isLoggedIn: false,
//       user: {}
//     }
//   }

//   // We need to ‘automate’ this request though. 
//   // App.js should keep track of this status and request 
//   // this information every time it’s mounted.
//   componentDidMount() {
//     this.loginStatus()
//   }

//   loginStatus = () => {
//     // withCredentials allows our Rails server to set and read the 
//     // cookie on the front-end’s browser. ALWAYS pass this argument! 
//     axios.get('http://localhost:3001/api/v1/logged_in', {withCredentials: true})
//     .then(response => {
//       if (response.data.logged_in) {
//         this.handleLogin(response)
//       } else {
//         this.handleLogout()
//       }
//     })
//     .catch(error => console.log('api errors:', error))
//   }

//   handleLogin = (data) => {
//     this.setState({
//       isLoggedIn: true,
//       user: data.user
//     })
//   }

//   handleLogout = () => {
//     this.setState({
//       isLoggedIn: false,
//       user: {}
//     })
//   }

//   handleClick = () => {
//     axios.delete('http://localhost:3001/api/v1/logout', {withCredentials: true})
//       .then(resp => {
//         this.handleLogout()
//         // props.history.push('/')
//       })
//       .catch(er => console.log(er))
//   }

//   // Our App.js component is not going to render itself to the DOM,
//   //  instead, it will serve as our router to render all other components. 
//   //  It will also manage the application’s state and authentication status; 
//   //  we use the component’s state to maintain the logged in status of a User, 
//   //  and to store the User data when we request it from the server.

//   render() {
//     // render=props. This allows us to pass props to the components to 
//     // be rendered, and in that way, we can pass isLoggedIn state status, 
//     // handleLogin(), and handleLogout(), to our components as props!
//     const { isLoggedIn, user } = this.state
//     return (
//       <div>
//           {
//             // TODO Have this ternary operator do:
//             // if user is logged in AND NOT on Log in Screen, render NavBar, 
//             // some options should show on home page for unsigned users
//             // (if this.state.LoggedIn || this.state.defaultNav)
//             (isLoggedIn) ? 
//             // <Header {...props} /> :
//             <Nav justify variant="tabs" defaultActiveKey="/home">
//               <Nav.Item>
//                 <Nav.Link href="/" >Home</Nav.Link>
//               </Nav.Item>
//               <Nav.Item>
//                 <Nav.Link href="/schedule" >Schedule</Nav.Link>
//               </Nav.Item>
//               <Nav.Item>
//                 <Nav.Link href="/" onClick={this.handleClick}>Log Out</Nav.Link>
//               </Nav.Item>
//             </Nav>
//             :         
//             <Nav justify variant="tabs" defaultActiveKey="/home">
//               <Nav.Item>
//                 <Nav.Link href="/login" >Log In</Nav.Link>
//               </Nav.Item>
//               <Nav.Item>
//                 <Nav.Link href="/signup" >Sign Up</Nav.Link>
//               </Nav.Item>
//             </Nav>
//           }
//       </div>
//     )
//   }
// }

export default withRouter(App);
