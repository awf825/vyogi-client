import React, { useRef, useState, useContext } from "react";
import axios from "axios";
import { API_ROOT } from "../../api-config.js";
import { Form, Button, Alert } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { authenticate } from "./RegistrationAuth";
import { MessageContext, sendMessage } from "../Messaging/MessageContext";

const RegistrationSignUpForm = (props) => {
  const { register, handleSubmit, errors, watch, reset } = useForm();
  const [showErrors, setShowErrors] = useState(false);
  const [errorHandling, setErrorHandling] = useState("");
  const [state, dispatch] = useContext(MessageContext);
  const password = useRef({});
  password.current = watch("password", "");

  const createUser = async (data) => {
    try {
      if (errorHandling.length >= 1) {
        setShowErrors(false);
        setErrorHandling("");
      }
      const resp = await axios.post(`${API_ROOT}/signup`, data);
      if (resp) {
        authenticate(resp.data, () => props.changeSuccess(true));
        dispatch(sendMessage("You are signed up! Welcome!"));
      }
    } catch (err) {
      setErrorHandling(err.response.statusText);
      setShowErrors(true);
    }
  };

  function onSubmit(data) {
    createUser(data);
  }

  // Checks to see if there is an error
  if (errors && errorHandling === "") {
    if (errors.password) {
      setErrorHandling(`${errors.password.message}`);
      setShowErrors(true);
    }
    if (errors.email) {
      setErrorHandling(`${errors.email.message}`);
      setShowErrors(true);
    }

    if (errors.passwordConf) {
      setErrorHandling(`${errors.passwordConf.message}`);
      setShowErrors(true);
    }
  }

  const errorHandler = () => {
    setShowErrors(false);
    setErrorHandling("");
    reset(errors);
  };

  // Hanldes showing all errors
  if (showErrors) {
    return (
      <Alert variant="danger" onClose={() => errorHandler()} dismissible>
        <Alert.Heading>{errorHandling}</Alert.Heading>
      </Alert>
    );
  }

  if (state.message) {
    return <h1>{state.message}</h1>;
  }

  // Email validation
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
          className="registration__form__text"
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
          className="registration__form__text"
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          ref={register({
            required: {
              value: true,
              message: "Please confirm password!",
            },
            matched: {
              validate: (value) => value === password.current,
              message: "Passwords do not match!",
            },
          })}
          name="passwordConf"
          type="password"
          placeholder="Confirm Password"
          className="registration__form__text"
        />
      </Form.Group>
      <Button className="modal__submit" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default RegistrationSignUpForm;
