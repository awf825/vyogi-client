import React, { useRef, useState } from "react";
import axios from "axios";
import { API_ROOT } from "../../api-config.js";
import { authenticate } from "./RegistrationAuth";
import { Form, Button, Alert } from "react-bootstrap";
import { useForm } from "react-hook-form";

const RegistrationLoginForm = (props) => {
  // Initial State
  const { register, handleSubmit, errors, watch, reset } = useForm();
  const [showErrors, setShowErrors] = useState(false);
  const [errorHandling, setErrorHandling] = useState("");
  const password = useRef({});
  password.current = watch("password", "");

  // Login User function has not been tested.  We can change it however you want.
  const loginUser = async (data) => {
    try {
      if (errorHandling.length >= 1) {
        setShowErrors(false);
        setErrorHandling("");
      }

      const resp = await axios.post(`${API_ROOT}/signin`, data);
      if (resp) {
        authenticate(resp.data, () => props.changeSuccess(true));
      }
    } catch (err) {
      console.log(err);
      setErrorHandling(err.response.statusText);
      setShowErrors(true);
    }
  };

  if (errors && errorHandling === "") {
    if (errors.password) {
      setErrorHandling(`${errors.password.message}`);
      setShowErrors(true);
    }
    if (errors.email) {
      setErrorHandling(`${errors.email.message}`);
      setShowErrors(true);
    }
  }

  const errorHandler = () => {
    setShowErrors(false);
    setErrorHandling("");
    reset(errors);
  };

  // Handles errors from the server such as a 401
  if (showErrors) {
    return (
      <Alert variant="danger" onClose={() => errorHandler()} dismissible>
        <Alert.Heading>{errorHandling}</Alert.Heading>
      </Alert>
    );
  }

  if (props.success) {
    return <h1>You are logged in!</h1>;
  }

  function onSubmit(data) {
    loginUser(data);
  }

  // Regex that checks to make sure the email is an email address.
  function isEmail(email) {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (regex.test(email)) {
      return true;
    } else {
      return {
        value: false,
        message: "Not a valid email",
      };
    }
  }

  return (
    <>
      <Form className="registration__form" onSubmit={handleSubmit(onSubmit)}>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            ref={register({
              required: {
                value: true,
                message: "Email is required!",
              },
              validate: (input) => isEmail(input),
            })}
            name="email"
            type="email"
            placeholder="Email"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            ref={register({
              required: {
                value: true,
                message: "Password is required!",
              },
              minLength: {
                value: 5,
                message: "Password is too short!",
              },
            })}
            name="password"
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        <Button type="submit">Submit</Button>
      </Form>
    </>
  );
};

export default RegistrationLoginForm;
