import React from "react";
import { Nav } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { signout } from "./Registration/RegistrationAuth";
import { GoPerson } from "react-icons/go";

export const Header = (props) => {
  const history = useHistory();
  const logout = () => {
    signout(() => history.pushState("/"));
  };

  const authorizeSelection = (e) => {
    if (!localStorage.getItem("token")) {
      // this is one way of doing this, but it freezes the button and 
      // makes shit look stupid 
      e.preventDefault();
      alert("Nuh uh uh!");
      return history.push("/");
    }
  }

  return (
    <div>
      <Nav justify variant="tabs" defaultActiveKey="/home">
        <Nav.Item >
          <Nav.Link href="/schedule" onClick={(e) => authorizeSelection(e)}>Schedule</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/video" onClick={(e) => authorizeSelection(e)}>Go To Lesson</Nav.Link>
        </Nav.Item>

        {props.session ? (
          <Nav.Item>
            <Nav.Link href="/" onSelect={logout}>
              Log Out
            </Nav.Link>
          </Nav.Item>
        ) : (
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
