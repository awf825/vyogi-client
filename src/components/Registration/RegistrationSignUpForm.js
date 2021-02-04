import React, { useRef } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";

const RegistrationSignUpForm = () => {
  const { register, handleSubmit, errors, watch } = useForm();
  const history = useHistory();
  const password = useRef({});
  password.current = watch("password", "");

  const createUser = async (data) => {
    try {
      const resp = await axios.post("URL", data);
      console.log(resp);
    } catch (err) {
      console.error(err);
    }
  };

  function onSubmit(data) {
    createUser(data);
    history.push("/");
  }

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

      <Form.Group>
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          ref={register({
            requred: true,
            validate: (value) => value === password.current,
          })}
          name="passwordComf"
          type="password"
          placeholder="Password"
        />
        <h1>
          {errors.passwordComf?.type === "required" && "Password is required!"}
          {errors.passwordComf?.type === "validate" &&
            "Passwords Do Not Match!"}
        </h1>
      </Form.Group>
      <Button type="submit">Submit</Button>
    </Form>
  );
};

export default RegistrationSignUpForm;
