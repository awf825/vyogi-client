import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

// Need to add a way to communicat to user that the form has failed.  Maybe a state that shows when the form fails to submit

const LessonForm = () => {
  const [errors, setErrors] = useState({
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
  });

  const user = localStorage.getItem("token");

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
    } else {
      console.log("invalid");
    }
  };

  return (
    <>
      {user ? (
        <div className="lessonForm">
          <div className="lessonForm__form__container">
            <Form className="lessonForm__form" onSubmit={handleSubmit}>
              <div className="lessonForm__content">
                <h3 className="lessonForm__heading">Lesson Form</h3>
                <Form.Group>
                  <Form.Label className="lessonForm__label">
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
                  <Form.Label className="lessonForm__label">
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
                  <Form.Label className="lessonForm__label">
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
                  <Form.Label className="lessonForm__label">
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
                  <Form.Label className="lessonForm__label">
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
                <Button type="submit">Submit</Button>
              </div>
            </Form>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default LessonForm;
