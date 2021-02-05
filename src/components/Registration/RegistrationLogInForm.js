import React, { useRef } from "react";
import axios from "axios";
import { API_ROOT } from "../../api-config.js";
import { authenticate } from "./RegistrationAuth";
import { useHistory } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";

const RegistrationLoginForm = () => {
  // Initial State
  const { register, handleSubmit, errors, watch } = useForm();
  const history = useHistory();
  const password = useRef({});
  password.current = watch("password", "");

  // Login User function has not been tested.  We can change it however you want.
  const loginUser = async (data) => {
    try {
      const resp = await axios.post(`${API_ROOT}/signin`, data);
      if (resp) authenticate(resp.data, () => history.push("/"));
    } catch (err) {
      console.error(err);
    }
  };

  // const loginUser = async (data) => {
  //   axios
  //     .post(`${API_ROOT}/signin`, data)
  //     .then((resp) => {
  //       if (resp.data.token) {
  //         localStorage.setItem("token", resp.data.token);
  //       }
  //     })
  //     .then((_) => history.push("/"))
  //     .catch((err) => console.log(err));
  // };

  function onSubmit(data) {
    loginUser(data);
    history.push("/");
  }

  // Regex that checks to make sure the email is an email address.
  function isEmail(email) {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
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
        <h1>{errors.email?.type === "required" && "Email is required!"}</h1>
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
        <h1>
          {errors.password?.type === "required" && "Password is required!"}
          {errors.password?.type === "minLength" && errors.password?.message}
        </h1>
      </Form.Group>
      <Button type="submit">Submit</Button>
    </Form>
  );
};

export default RegistrationLoginForm;
