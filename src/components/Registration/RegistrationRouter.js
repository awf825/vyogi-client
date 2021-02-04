import React from "react";
import { Link } from "react-router-dom";
import { ListGroup } from "react-bootstrap";

const RegistrationRouter = () => {
  // This is the registration page I'm using just for routing
  // The openModal property is added to the props.location and allows us to pass a prop through a Link

  return (
    <div
      style={{
        background: "lightgray",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <ListGroup>
        <ListGroup.Item variant="info">
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to={{
              pathname: "/registration/signup",
              openModal: true,
            }}
          >
            Sign Up
          </Link>
        </ListGroup.Item>
        <ListGroup.Item variant="primary">
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to={{
              pathname: "/registration/login",
              openModal: true,
            }}
          >
            Log In
          </Link>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
};

export default RegistrationRouter;
