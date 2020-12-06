import React from 'react';
import {Nav} from 'react-bootstrap';

export const Header = (props) => {
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
          <Nav.Link href="/register" onSelect={props.handleLogout}>Log Out</Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  )
}

export default Header;