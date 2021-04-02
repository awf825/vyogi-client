import React, { Component } from "react";
import { GrClose } from "react-icons/gr";
import { Modal, Button } from "react-bootstrap";
import PayForm from "../stripe/PayForm";

const BookModal = ({ visible, dismiss, children }) => {
  let payForm = false;
  if (children) payForm = children.showPayForm;
  if (payForm) {
    return (
      <PayForm closeModal={dismiss} oneLesson={children.oneLesson.modalData} />
    );
  }

  return (
    <React.Fragment>
      {children ? (
        <Modal show={visible}>
          <Modal.Header>
            <Modal.Title>{children.title}</Modal.Title>
            <GrClose onClick={dismiss} style={{ cursor: "pointer" }} />
          </Modal.Header>
          <Modal.Body>
            {children.desc}
            <Button onClick={children.handleLessonConfirmation}>
              Continue
            </Button>
            <Button onClick={dismiss}>Close</Button>
          </Modal.Body>
        </Modal>
      ) : (
        <></>
      )}
    </React.Fragment>
  );
};

export default BookModal;
