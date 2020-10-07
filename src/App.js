import React, { Component } from 'react';
import axios from 'axios'
import {BrowserRouter, Switch, Router} from 'react-router-dom'

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
    axios.get('http://localhost:3001/logged_in', {withCredntials: true})
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

  // Our App.js component is not going to render itself to the DOM,
  //  instead, it will serve as our router to render all other components. 
  //  It will also manage the application’s state and authentication status; 
  //  we use the component’s state to maintain the logged in status of a User, 
  //  and to store the User data when we request it from the server.

  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={}/>
            <Route exact path='/login' component={}/>
            <Route exact path='/signup' component={}/>
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}







// stateless, functional component in original boilerplate
// function App() {
//   return (
//     <div className="App">

//     </div>
//   );
// }

export default App;
