import React from 'react';
import axios from 'axios';
import {Nav} from 'react-bootstrap';
import QuoteBanner from './QuoteBanner'
import PitchBanner from './PitchBanner'
import CPP from './CPP'
// import CPQ from './CPQ'

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
        // <Header {...props} /> :
        <Nav justify variant="tabs" defaultActiveKey="/home">
          <Nav.Item>
            <Nav.Link to="/logout" onClick={handleClick}>Log Out</Nav.Link>
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
      <QuoteBanner profile_photo="mountain.jpg" alt_name="IMG" />
      <PitchBanner />

      <CPP />
    </div>
  );
};

export default Home;
