import React from "react";
import { Modal } from "react-bootstrap";
import { GrClose } from "react-icons/gr";

const RegistrationModal = ({ handleClose, show, children, head }) => {
  // This is the modal that will handle the login and signup
  // The show and handle close are in their respective files and are being passed
  // The head prop is just for the title to be passed dynamically
  // The Icon is an X icon just to style it a bit
  // The children being passed is the login or signup form

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header className="modal__title">
        {head}
        <GrClose onClick={handleClose} className="modal__icon" />
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
};

export default RegistrationModal;
