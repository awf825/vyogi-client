import React, { useEffect } from 'react'
import { Nav } from 'react-bootstrap';
import { connect } from 'react-redux';
import { LogoutAction } from '../store/actions/LogoutAction';

export const Header = (props) => {
  const logout = () => {
    //sessionStorage.removeItem("user")
    props.logoutAction().then(res => {})
  }

  return (
    <div>
      <Nav justify variant="tabs" defaultActiveKey="/home">
        <Nav.Item>
          <Nav.Link href="/dashboard" >Dashboard</Nav.Link>
        </Nav.Item>
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
          <Nav.Link href="/" onSelect={logout}>Log Out</Nav.Link>
        </Nav.Item>
       </Nav>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    userDetails: state.login.userDetails,
  }
}

const mapDispatchToProps = {
  logoutAction: LogoutAction
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);