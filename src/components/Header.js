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
