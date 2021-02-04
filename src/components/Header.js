import React from "react";
import { Nav } from "react-bootstrap";
import { API_ROOT } from "../api-config.js";
import axios from "axios";

export const Header = (props) => {
  // Logout right now makes a call to backend that
  // simply sends back 204. The alert at line 18
  // is what you want to target. For now, don't worry about this
  // particular error handle.
  const logout = () => {
    axios
      .post(`${API_ROOT}/signout`)
      .then((resp) => {
        if (resp.status === 204) {
          alert("goodbye");
        }
      })
      .then((_) => {
        sessionStorage.clear();
      })
      .then((_) => {
        props.history.push("/");
      })
      .catch((err) => {
        console.log("ERROR AT SIGNOUT:", err);
      });
  };

  return (
    // I added the registration link just to show you what I've been working on we can reroute everything later on if you like what I did
    <div>
      <Nav justify variant="tabs" defaultActiveKey="/home">
        <Nav.Item>
          <Nav.Link href="/schedule">Schedule</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/video">Go To Lesson</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/registration">Register</Nav.Link>
        </Nav.Item>
        {props.session ? (
          <Nav.Item>
            <Nav.Link href="/" onSelect={logout}>
              Log Out
            </Nav.Link>
          </Nav.Item>
        ) : (
          <Nav.Item>
            <Nav.Link href="/register">Log In</Nav.Link>
          </Nav.Item>
        )}
      </Nav>
    </div>
  );
};

export default Header;
