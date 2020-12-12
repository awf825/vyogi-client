import React from 'react';
import { Nav } from 'react-bootstrap';
import { API_ROOT } from '../api-config.js';
import AuthContext from '../AuthContext';
import axios from 'axios';

export const Header = () => {
  const { dispatch } = React.useContext(AuthContext)

  const handleLogout = () => {
    axios.post(`${API_ROOT}/logout`, {})
      .then(resp => {
        dispatch({
          type: "LOGOUT"
        })
        console.log('resp at logout', resp)
      })
      .catch(err => {
        console.err(err)
      })
  }

  return (
    <div>
      <Nav justify variant="tabs" defaultActiveKey="/home">
        <Nav.Item>
          <Nav.Link href="/schedule" >Schedule</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/video" >Go To Lesson</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/about" >About</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/" onSelect={handleLogout}>Log Out</Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  )
}

export default Header;