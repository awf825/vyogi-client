import React from "react";
import { Nav } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { signout } from "./Registration/RegistrationAuth";
import { GoPerson } from "react-icons/go";

// import { API_ROOT } from "../api-config.js";
// import axios from "axios";

export const Header = (props) => {
  // Logout right now makes a call to backend that
  // simply sends back 204. The alert at line 18
  // is what you want to target. For now, don't worry about this
  // particular error handle.

  // const logout = () => {
  //   axios
  //     .post(`${API_ROOT}/signout`)
  //     .then((resp) => {
  //       if (resp.status === 204) {
  //         alert("goodbye");
  //       }
  //     })
  //     .then((_) => {
  //       localStorage.clear();
  //     })
  //     .then((_) => {
  //       props.history.push("/");
  //     })
  //     .catch((err) => {
  //       console.log("ERROR AT SIGNOUT:", err);
  //     });
  // };

  // I commented out the original signout and abstracted it to the signout method.
  // I also added an Icon for the registration section let me know what you think.
  const history = useHistory();
  const logout = () => {
    signout(() => history.pushState("/"));
  };

  return (
    <div>
      <Nav justify variant="tabs" defaultActiveKey="/home">
        <Nav.Item>
          <Nav.Link href="/schedule">Schedule</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/video">Go To Lesson</Nav.Link>
        </Nav.Item>

        {props.session ? (
          <Nav.Item>
            <Nav.Link href="/" onSelect={logout}>
              Log Out
            </Nav.Link>
          </Nav.Item>
        ) : (
          // <Nav.Item>
          //   <Nav.Link href="/register">Log In</Nav.Link>
          // </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/registration">
              <GoPerson />
            </Nav.Link>
          </Nav.Item>
        )}
      </Nav>
    </div>
  );
};

export default Header;
