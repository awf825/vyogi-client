import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'

const Home = (props) => {

  const handleClick = () => {
    axios.delete('http://localhost:3001/logout', {withCredentials: true})
      .then(resp => {
        props.handleLogout()
        props.history.push('/')
      })
      .catch(er => console.log(er))

  }

  return (
    <div>
      {
        props.loggedInStatus ? 
        <Link to='/logout' onClick={handleClick}>Log Out</Link> :
        <React.Fragment>
          <Link to='/login'>Log In</Link>
          <br></br>
          <Link to='/signup'>Sign Up</Link>
          <br></br>
        </React.Fragment>
      }
    </div>
  );
};

export default Home;
