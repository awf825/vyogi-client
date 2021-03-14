import React, { useRef, useState } from "react";
import axios from "axios";
//import { API_ROOT } from "../../api-config.js";
//import { useHistory } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";

const VideoAccessForm = (props) => {
  // const { register, handleSubmit, errors, watch, reset } = useForm();
  const [showErrors, setShowErrors] = useState(false);
  const [errorHandling, setErrorHandling] = useState("");

  return (
    <Form>
      <Form.Group>
        <Form.Control
          placeholder="Access"
          name="codeInput"
          onChange={props.handleInputChange}
        />
      </Form.Group>
      <Button type="submit" onClick={props.launchAsClient}>Submit</Button>
      <Button type="submit" onClick={props.launchAsAdmin}>Launch as Admin</Button>
    </Form>
  );
};

export default VideoAccessForm;