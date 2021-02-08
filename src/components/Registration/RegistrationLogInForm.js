import React, { useRef, useState } from "react";
import axios from "axios";
import { API_ROOT } from "../../api-config.js";
import { authenticate } from "./RegistrationAuth";
import { useHistory } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";
import { useForm } from "react-hook-form";

const RegistrationLoginForm = () => {
  // Initial State
  const { register, handleSubmit, errors, watch } = useForm();
  const [showErrors, setShowErrors] = useState(false);
  const [errorHandling, setErrorHandling] = useState("");
  const history = useHistory();
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
      if (resp) authenticate(resp.data, () => history.push("/"));
    } catch (err) {
      setErrorHandling(err.response.statusText);
      setShowErrors(true);
    }
  };

  if (showErrors) {
    return (
      <Alert variant="danger" onClose={() => setShowErrors(false)} dismissible>
        <Alert.Heading>{errorHandling}</Alert.Heading>
      </Alert>
    );
  }

  function onSubmit(data) {
    loginUser(data);
  }

  // Regex that checks to make sure the email is an email address.
  function isEmail(email) {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
  }

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h4 style={{ color: "red" }}>
          {errors.email?.type === "required" && "Email is required!"}
          {errors.password?.type === "required" && "Password is required!"}
          {errors.password?.type === "minLength" && errors.password?.message}
        </h4>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            ref={register({
              required: true,
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
              requred: true,
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
