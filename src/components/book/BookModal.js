import React from "react";
import { GrClose } from "react-icons/gr";
import { Modal, Button } from "react-bootstrap";
import PayForm from "../stripe/PayForm";

const BookModal = ({ visible, dismiss, children }) => {
  let payForm = false;
  if (children) payForm = children.showPayForm;

  if (payForm) {
    return (
      <Modal className="paymentModal" show={visible}>
        <Modal.Header className="paymentModal__header">
          <GrClose onClick={dismiss} style={{ cursor: "pointer" }} />
        </Modal.Header>
        <Modal.Body className="paymentModal__body">
          <PayForm
            closeModal={dismiss}
            oneLesson={children.oneLesson.modalData}
          />
        </Modal.Body>
      </Modal>
    );
  }

  return (
    <React.Fragment>
      {children ? (
        <Modal className="bookModal" show={visible}>
          <Modal.Header>
            <Modal.Title>{children.title}</Modal.Title>
            <GrClose onClick={dismiss} style={{ cursor: "pointer" }} />
          </Modal.Header>
          <Modal.Body>
            <div className="bookModal__desc">{children.desc}</div>
            <Button
              className="bookModal__btn"
              onClick={children.handleLessonConfirmation}
            >
              Continue
            </Button>
            <Button className="bookModal__btn" onClick={dismiss}>
              Close
            </Button>
          </Modal.Body>
        </Modal>
      ) : (
        <></>
      )}
    </React.Fragment>
  );
};

export default BookModal;
