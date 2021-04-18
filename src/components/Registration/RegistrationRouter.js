import React from "react";
import { Link } from "react-router-dom";
import { ListGroup } from "react-bootstrap";
import { IoArrowBackCircleSharp } from "react-icons/io5";

const RegistrationRouter = () => {
  // This is the registration page I'm using just for routing
  // The openModal property is added to the props.location and allows us to pass a prop through a Link

  return (
    <div className="registration_router">
      <Link className="registration_router__link_back" to="/">
        <IoArrowBackCircleSharp className="registration_router__link_back__icon" />
      </Link>
      <ListGroup className="registration_router__register">
        <ListGroup.Item className="registration_router__link_container">
          <Link
            className="registration_router__link"
            to={{
              pathname: "/registration/signup",
              openModal: true,
            }}
          >
            Sign Up
          </Link>
        </ListGroup.Item>
        <ListGroup.Item className="registration_router__link_container">
          <Link
            className="registration_router__link"
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
