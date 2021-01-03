import React, { Component } from 'react';
//import Header from './Header'
import { Nav } from 'react-bootstrap';
import { connect } from 'react-redux';
import { LogoutAction } from '../store/actions/LogoutAction';

class Dashboard extends Component {
  constructor(props) {
    super(props)
    console.log('PROPS AT DASH:', props)
    //const storage = JSON.parse(localStorage.getItem("session"))
    this.state = {
      session: props.user,
      loggedIn: false
    }
  }

  componentDidMount() {
    //const storage = JSON.parse(localStorage.getItem("session"))
    this.setState({
      loggedIn: this.state.session.length ? true : false
    })
  }

  logout = (e) => {
    localStorage.removeItem("session")
    this.setState({
      session: {},
      loggedIn: false
    })
  }

  render() {
    console.log('STATE OF DASHBOARD AT RENDER', this.state)
    //console.log('MY STATE TOGGLE AT DASHBOARD', this.state.session.length)
    return (
      <div >
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
          { this.state.loggedIn ?
            <Nav.Item>
              <Nav.Link href="/" onSelect={this.logout}>Log Out</Nav.Link>
            </Nav.Item> :
            <Nav.Item>
              <Nav.Link href="/register">Log In</Nav.Link>
            </Nav.Item>
          }
         </Nav>
      </div>
    )
  }
}

export default Dashboard;

// export const Dashboard = (props) => {
//   console.log('PROPS AT DASHBOARD.JS:', props)
//   var initialState = {
//     user: {}
//   }

  // const logout = () => {
  //   localStorage.removeItem("session")
  //   setState({
  //     user: {}
  //   })
  //   //props.logoutAction().then(res => {})
  // }

//   return (
//     <div className="wrap">
//       <Nav justify variant="tabs" defaultActiveKey="/home">
//         <Nav.Item>
//           <Nav.Link href="/dashboard" >Dashboard</Nav.Link>
//         </Nav.Item>
//         <Nav.Item>
//           <Nav.Link href="/schedule" >Schedule</Nav.Link>
//         </Nav.Item>
//         <Nav.Item>
//           <Nav.Link href="/video" >Go To Lesson</Nav.Link>
//         </Nav.Item>
//         <Nav.Item>
//           <Nav.Link href="/about" >About</Nav.Link>
//         </Nav.Item>
//         { props.userDetails.length ?
//           <Nav.Item>
//             <Nav.Link href="/" onSelect={logout}>Log Out</Nav.Link>
//           </Nav.Item> :
//           <Nav.Item>
//             <Nav.Link href="/register">Log In</Nav.Link>
//           </Nav.Item>
//         }
//        </Nav>
//       <h1>TEST</h1>
//       <p>{state.user ? state.user.email : "Loading..."}</p>
//       {/* <p>{props.user.email}</p> */}
//       {/* <p>{`Hello ${props.user.login.userDetails.user.email}`}</p> */}
//     </div>
//   )
// }

// const mapStateToProps = (state) => {
//   return {
//     userDetails: state.login.userDetails,
//   }
// }
//
// const mapDispatchToProps = {
//   logoutAction: LogoutAction
// }
//
// export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
