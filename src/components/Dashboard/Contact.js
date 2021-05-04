import React from "react";
import { useForm } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
// Put these in the form only removed to get rid of warnings
// Alert

const Contact = () => {
  const { register } = useForm();
  // Put these in the form only removed to get rid of warnings
  // handleSubmit, watch, errors

  const token = localStorage.getItem("token");

  // I haven't added any functionality to this form.
  // I wanted to see what we would need for the fields before moving forward
  // Also how we would send the information and where to

  // function isEmail(email) {
  //   const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //   return regex.test(email);
  // }

  return (
    <>
      {token ? (
        <div className="contact" id="contact">
          <h1 className="contact__header">Contact Us</h1>
          <div className="contact__form_container">
            <Form className="contact__form">
              <Form.Group>
                <Form.Label className="contact__label">
                  Send us a message!
                </Form.Label>
                <Form.Control
                  as="textarea"
                  ref={register({
                    required: {
                      value: true,
                      message: "Message is required!",
                    },
                    minLength: {
                      value: 10,
                      message: "Message is too short!",
                    },
                  })}
                  name="message"
                  type="text"
                  className="contact__text"
                  placeholder="Enter your message here"
                />
              </Form.Group>
              <Button type="submit">Submit</Button>
            </Form>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Contact;
