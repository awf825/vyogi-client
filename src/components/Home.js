import React from 'react';
import axios from 'axios';
import {Nav} from 'react-bootstrap';
import QuoteBanner from './QuoteBanner';
// import PitchBanner from './PitchBanner';
import Zoom from 'react-reveal/Zoom';
import CPP from './CPP'
// import CPQ from './CPQ'

// const Home = (props) => {
const Home = () => {

  // const handleClick = () => {
  //   axios.delete('http://localhost:3001/logout', {withCredentials: true})
  //     .then(resp => {
  //       props.handleLogout()
  //       props.history.push('/')
  //     })
  //     .catch(er => console.log(er))
  // }

  return (
    <div>
      {/* {
        props.loggedInStatus ? 
        // <Header {...props} /> :
        <Nav justify variant="tabs" defaultActiveKey="/home">
          <Nav.Item>
            <Nav.Link href="/testapptment" >Book</Nav.Link>
          </Nav.Item>
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
      } */}
      <QuoteBanner profile_photo="mountain.jpg" alt_name="IMG" />
      <Zoom duration={3000}>
        <div>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Nulla posuere sollicitudin aliquam ultrices sagittis orci a. Vel facilisis volutpat est velit egestas dui id ornare arcu. 
            Aliquet eget sit amet tellus cras adipiscing enim eu turpis. Et ultrices neque ornare aenean euismod elementum nisi. Sagittis 
            nisl rhoncus mattis rhoncus. Tempor orci eu lobortis elementum. Felis imperdiet proin fermentum leo vel orci porta. Ultrices tincidunt
              arcu non sodales neque sodales. Pellentesque eu tincidunt tortor aliquam nulla facilisi cras. Pellentesque elit ullamcorper dignissim 
              cras tincidunt. Proin sed libero enim sed faucibus turpis. Ut consequat semper viverra nam libero justo. Vitae elementum curabitur
              vitae nunc sed velit dignissim sodales. Pellentesque nec nam aliquam sem et tortor consequat.</p>
        </div>
      </Zoom>

      <CPP />
    </div>
  );
};

export default Home;
