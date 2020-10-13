import React, { Component } from 'react';
import axios from 'axios'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import Home from './components/Home'
import Login from './components/registrations/Login'
import Signup from './components/registrations/Signup'
import BigJoe from './components/BigJoe'
import {Nav} from 'react-bootstrap';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      user: {}
    }
  }

  // We need to ‘automate’ this request though. 
  // App.js should keep track of this status and request 
  // this information every time it’s mounted.
  componentDidMount() {
    this.loginStatus()
  }

  loginStatus = () => {
    // withCredentials allows our Rails server to set and read the 
    // cookie on the front-end’s browser. ALWAYS pass this argument! 
    axios.get('http://localhost:3001/logged_in', {withCredentials: true})
    .then(response => {
      if (response.data.logged_in) {
        this.handleLogin(response)
      } else {
        this.handleLogout()
      }
    })
    .catch(error => console.log('api errors:', error))
  }

  handleLogin = (data) => {
    this.setState({
      isLoggedIn: true,
      user: data.user
    })
  }

  handleLogout = () => {
    this.setState({
      isLoggedIn: false,
      user: {}
    })
  }

  handleClick = () => {
    axios.delete('http://localhost:3001/logout', {withCredentials: true})
      .then(resp => {
        this.handleLogout()
        // props.history.push('/')
      })
      .catch(er => console.log(er))
  }

  // Our App.js component is not going to render itself to the DOM,
  //  instead, it will serve as our router to render all other components. 
  //  It will also manage the application’s state and authentication status; 
  //  we use the component’s state to maintain the logged in status of a User, 
  //  and to store the User data when we request it from the server.

  render() {
    // render=props. This allows us to pass props to the components to 
    // be rendered, and in that way, we can pass isLoggedIn state status, 
    // handleLogin(), and handleLogout(), to our components as props!
    const { isLoggedIn } = this.state
    return (
      <div>
          {
            // TODO Have this ternary operator do:
            // if user is logged in AND NOT on Log in Screen, render NavBar, 
            // some options should show on home page for unsigned users
            // (if this.state.LoggedIn || this.state.defaultNav)
            (isLoggedIn) ? 
            // <Header {...props} /> :
            <Nav justify variant="tabs" defaultActiveKey="/home">
              <Nav.Item>
                <Nav.Link href="/testapptment" >Book</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link to="/logout" onClick={this.handleClick}>Log Out</Nav.Link>
              </Nav.Item>
            </Nav>
            :         
            <Nav justify variant="tabs" defaultActiveKey="/home">
              <Nav.Item>
                <Nav.Link href="/login" >Log In</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/signup" >Sign Up</Nav.Link>
              </Nav.Item>
            </Nav>
          }
        <BrowserRouter>
          <Switch>
            <Route exact path='/' render={props => (
              <Home {...props} handleLogout={this.handleLogout} loggedInStatus={isLoggedIn}/>
            )}/>
            <Route exact path='/login' render={props => (
              <Login {...props} handleLogin={this.handleLogin} loggedInStatus={isLoggedIn}/>
            )}/>
            <Route exact path='/signup' render={props => (
              <Signup {...props} handleLogin={this.handleLogin} loggedInStatus={isLoggedIn}/>
            )}/>
            <Route exact path='/testapptment' render={props => (
              <BigJoe {...props} />
            )}/>
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;
