import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: ''
    };
  }

  componentWillMount() {
    return this.props.loggedInStatus ? this.redirect() : null
  }

  handleChange = (ev) => {
    const {name, value} = ev.target;
    this.setState({
      [name]: value
    })
  };

  handleSubmit = (ev) => {
    ev.preventDefault();
    const {email, password} = this.state

    let user = {
      email: email,
      password: password
    }

    axios.post('http://localhost:3001/api/v1/login', {user}, {withCredentials: true})
      .then(resp => {
        if (resp.data.logged_in) {
          this.props.handleLogin(resp.data)
          this.redirect()
        } else {
          this.setState({
            errors: resp.data.errors
          })
        }
      })
      .catch(er => console.log('api errors:', er))
  }

  redirect = () => {
    this.props.history.push('/schedule')
  }

  handleErrors = () => {
    return (
      <div>
        <ul>
          {this.state.errors.map(er => {
            return <li key={er}>{er}</li>
          })}
        </ul>
      </div>
    )
  }

  render() {
    const {email, password} = this.state
    return (
      <div>
        <h1>Log In</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="email"
            type="text"
            name="email"
            value={email}
            onChange={this.handleChange}
          />
          <input
            placeholder="password"
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
          />
          <button placeholder="submit" type="submit">
            Log In
          </button>
          <div>
            or <Link to="/signup">sign up</Link>
          </div>
        </form>
        <div>
          {
            this.state.errors ? this.handleErrors() : null
          }
        </div>
      </div>
    );
  }
}

export default Login;