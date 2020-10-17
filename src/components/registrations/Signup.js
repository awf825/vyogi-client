import React, { Component } from 'react';
import axios from 'axios'

class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      password_confirmation: '',
      errors: ''
    };
  }

  componentWillMount() {
    return this.props.loggedInStatus ? this.redirect() : null
  }

  handleChange = (ev) => {
    const {name, value} = ev.target
    this.setState({
      [name]: value
    })
  }

  handleSubmit = (ev) => {
    ev.preventDefault()
    const { email, password, password_confirmation }= this.state
    let user = {
      email: email,
      password: password,
      password_confirmation: password_confirmation
    }

    axios.post('http://localhost:3001/users', {user}, {withCredentials: true})
      .then(resp => {
        if (resp.data.status === 'created') {
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
    this.props.history.push('/')
  }

  handleErrors = () => {
    return (
      <div>
        <ul>{this.state.errors.map((er) => {
          return <li key={er}>{er}</li>
        })}

        </ul>
      </div>
    )
  }

  render() {
    const {email, password, password_confirmation} = this.state
    return (
      <div>
        <h1>Sign Up</h1>
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
          <input
            placeholder="password_confirmation"
            type="password"
            name="password_confirmation"
            value={password_confirmation}
            onChange={this.handleChange}
          />
          <button placeholder="submit" type="submit">
            Sign Up
          </button>
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

export default Signup;