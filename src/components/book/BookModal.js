import React, { useState, useEffect } from "react";
import { GrClose } from "react-icons/gr";
import { Modal, Button } from "react-bootstrap";
import LessonForm from "../LessonForm";

const BookModal = ({ visible, dismiss, children }) => {
  const [oneLessonData, setOneLessonData] = useState({});
  const [showLesson, setShowLesson] = useState(false);

  useEffect(() => {
    if (children) {
      setOneLessonData(children.oneLesson.modalData);
      setShowLesson(children.showLessonForm);
    }
  }, [children]);

  if (showLesson) {
    return (
      <Modal className="modal" show={visible} onHide={dismiss}>
        <Modal.Header className="modal__header">
          <h3 className="modal__header__text">Tell me about you!</h3>
          <GrClose className="modal__icon" onClick={dismiss} />
        </Modal.Header>
        <Modal.Body className="modal__body">
          <LessonForm
            oneLesson={oneLessonData}
            dismiss={dismiss}
            visible={visible}
          />
        </Modal.Body>
      </Modal>
    );
  }

  return (
    <React.Fragment>
      {children ? (
        <Modal className="modal" show={visible} onHide={dismiss}>
          <Modal.Header>
            <Modal.Title>{children.title}</Modal.Title>
            <GrClose className="modal__icon" onClick={dismiss} />
          </Modal.Header>
          <Modal.Body>
            <div className="modal__desc">{children.desc}</div>
            <Button
              className="modal__submit"
              onClick={children.handleLessonConfirmation}
            >
              Continue
            </Button>
            <Button className="modal__submit" onClick={dismiss}>
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
