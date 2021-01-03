import React, { useEffect, useState } from 'react'
import { Nav } from 'react-bootstrap';
import { connect } from 'react-redux';
import { LogoutAction } from '../store/actions/LogoutAction';

export const Header = (props) => {
  // var initialUser = {}
  // try {
  //   initialUser = localStorage.getItem("session") ?
  //     JSON.parse(localStorage.getItem("session")) : {}
  // } catch (err) {
  //   console.log('error:', err)
  // }
  // const [user, setUser] = useState(initialUser)
  const logout = () => {
    //localStorage.removeItem("user")
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
        { props.user ?
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

const mapStateToProps = (state) => {
  return {
    userDetails: state.login.userDetails,
  }
}

const mapDispatchToProps = {
  logoutAction: LogoutAction
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
