import React, { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { GrClose } from "react-icons/gr";
import PayForm from "../components/stripe/PayForm";

// Need to add a way to communicat to user that the form has failed.  Maybe a state that shows when the form fails to submit

const LessonForm = (props) => {
  const [showPayForm, setShowPayForm] = useState(false);

  const [errors, setErrors] = useState({
    blank: "",
    check: "",
    practiced: "Tell us about you!",
    focus: "Tell us about you!",
    limitations: "Tell us about you!",
    needToKnow: "Tell us about you!",
  });

  const [data, setData] = useState({
    check: "no",
    practiced: "",
    limitations: "",
    focus: "",
    needToKnow: "",
    allDay: props ? props.oneLesson.allDay : null,
    cost: props ? props.oneLesson.cost : null,
    end: props ? props.oneLesson.end : null,
    id: props ? props.oneLesson.id : null,
    start: props ? props.oneLesson.start : null,
    title: props ? props.oneLesson.title : null,
  });

  const user = localStorage.getItem("token");

  if (showPayForm) {
    return (
      <Modal className="modal" show={props.visible}>
        <Modal.Header className="modal__header">
          <h3>Please enter payment information!</h3>
          <GrClose className="modal__icon" onClick={props.dismiss} />
        </Modal.Header>
        <Modal.Body className="modal__body">
          <PayForm closeModal={props.dismiss} oneLesson={data} />
        </Modal.Body>
      </Modal>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "check":
        setData({ ...data, [name]: value });
        setErrors({
          ...errors,
          [name]:
            value !== "yes" || value !== "no" ? "" : "Please select a value",
        });
        errors.check =
          value !== "yes" || value !== "no" ? "" : "Please select a value";
        break;
      case "practiced":
        setData({ ...data, [name]: value });
        setErrors({
          ...errors,
          [name]:
            value.length < 3 || value === "Tell us about you!"
              ? "Please fill in all text fields"
              : "",
        });
        break;
      case "limitations":
        setData({ ...data, [name]: value });
        setErrors({
          ...errors,
          [name]:
            value.length < 3 || value === "Tell us about you!"
              ? "Please fill in all text fields"
              : "",
        });
        break;
      case "focus":
        setData({ ...data, [name]: value });
        setErrors({
          ...errors,
          [name]:
            value.length < 3 || value === "Tell us about you!"
              ? "Please fill in all text fields"
              : "",
        });
        break;
      case "needToKnow":
        setData({ ...data, [name]: value });
        setErrors({
          ...errors,
          [name]:
            value.length < 3 || value === "Tell us about you!"
              ? "Please fill in all text fields"
              : "",
        });
        break;
      default:
        break;
    }
  };

  const validForm = () => {
    let valid = true;
    Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validForm(errors)) {
      console.log("valid");
      setShowPayForm(true);
    } else {
      setErrors({ ...errors, blank: "Please fill out all fields!" });
      setTimeout(() => {
        setErrors({ ...errors, blank: "" });
      }, 5000);
      console.log("invalid");
    }
  };

  return (
    <>
      {user ? (
        <div className="lessonForm">
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <span>{errors.blank}</span>
              <Form.Label>
                Are you pregnant/have you given birth within the past year?
              </Form.Label>
              <span>{errors.check}</span>
              <Form.Group className="lessonForm__radio">
                <Form.Check
                  className="lessonForm__radio__btn"
                  type="radio"
                  value="yes"
                  checked={data.check === "yes"}
                  label="Yes"
                  name="check"
                  onChange={handleChange}
                />
                <Form.Check
                  className="lessonForm__radio__btn"
                  type="radio"
                  value="no"
                  label="No"
                  name="check"
                  checked={data.check === "no"}
                  onChange={handleChange}
                />
              </Form.Group>
            </Form.Group>
            <Form.Group>
              <Form.Label>
                Have you practiced yoga before? If so, what type and for how
                long?
              </Form.Label>
              <span>
                {errors.practiced !== "Tell us about you!"
                  ? errors.practiced
                  : ""}
              </span>
              <Form.Control
                className="lessonForm__text"
                as="textarea"
                name="practiced"
                rows={2}
                value={data.practiced}
                onChange={handleChange}
                placeholder={errors.practiced}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>
                Do you have any injuries or physical limitations?
              </Form.Label>
              <span>
                {errors.limitations !== "Tell us about you!"
                  ? errors.limitations
                  : ""}
              </span>
              <Form.Control
                as="textarea"
                className="lessonForm__text"
                name="limitations"
                rows={2}
                value={data.limitations}
                onChange={handleChange}
                placeholder={errors.limitations}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>
                Is there anything specific you'd like to focus on during our
                time together?
              </Form.Label>
              <span>
                {errors.focus !== "Tell us about you!" ? errors.focus : ""}
              </span>
              <Form.Control
                as="textarea"
                className="lessonForm__text"
                name="focus"
                rows={2}
                value={data.focus}
                onChange={handleChange}
                placeholder={errors.focus}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>
                Is there anything else you'd like me to know?
              </Form.Label>
              <span>
                {errors.needToKnow !== "Tell us about you!"
                  ? errors.needToKnow
                  : ""}
              </span>
              <Form.Control
                as="textarea"
                className="lessonForm__text"
                name="needToKnow"
                rows={2}
                value={data.needToKnow}
                onChange={handleChange}
                placeholder={errors.needToKnow}
              />
            </Form.Group>
            <Button className="modal__submit" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default LessonForm;
