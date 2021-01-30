import React from 'react'
import { Nav } from 'react-bootstrap';
import { API_ROOT } from '../api-config.js';
import axios from 'axios';

export const Header = (props) => {
  const logout = () => {
    axios.post(`${API_ROOT}/signout`).then(resp => {
      if (resp.status === 204) {
        alert('NON-GENERIC goodbye');
      }
    })
      .then( _ => { sessionStorage.clear() } )
      .then( _ => { props.history.push('/') } )
      .catch(err => { console.log('ERROR AT SIGNOUT:', err) } )
  };

  return (

    <div>
      <Nav justify variant="tabs" defaultActiveKey="/home">
        <Nav.Item>
          <Nav.Link href="/schedule" >Schedule</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/video" >Go To Lesson</Nav.Link>
        </Nav.Item>
        { 
          props.session ?
          <Nav.Item>
            <Nav.Link href="/" onSelect={logout}>Log Out</Nav.Link>
          </Nav.Item> :
          <Nav.Item>
            <Nav.Link href="/register">Log In</Nav.Link>
          </Nav.Item>
        }
       </Nav>
    </div>
  )
}

export default Header;
