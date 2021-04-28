import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { GrClose } from "react-icons/gr";
import { MessageContext, sendMessage } from "./MessageContext";

const MessageModal = (props) => {
  const [showModal, setShowModal] = useState(false);
  const history = useHistory();
  const [state, dispatch] = useContext(MessageContext);

  if (props.pass.location.openModal && !showModal) {
    setShowModal(true);
    return;
  }

  if (!props.pass.location.openModal) {
    history.push("/");
  }

  const handleClose = () => {
    setShowModal(false);
    dispatch(sendMessage(""));
    history.push("/");
  };

  const { head } = props;

  return (
    <>
      {state.message ? (
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header className="modal__title">
            {head}
            <GrClose onClick={handleClose} className="modal__icon" />
          </Modal.Header>
          <Modal.Body>{state.message}</Modal.Body>
        </Modal>
      ) : (
        <></>
      )}
    </>
  );
};

export default MessageModal;
