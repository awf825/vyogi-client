import React, { useState, useContext } from "react";
import RegistrationModal from "../Registration/RegistrationModal";
import { useHistory } from "react-router-dom";
import { MessageContext, sendMessage } from "../Messaging/MessageContext";

const StripeSuccess = (props) => {
  const [showModal, setShowModal] = useState(false);
  const history = useHistory();
  const [state, dispatch] = useContext(MessageContext);

  const redirect = () => {
    history.push("/");
  };

  function closeModal() {
    if (showModal) {
      setShowModal(false);
      props.location.openModal = false;
      dispatch(sendMessage(""));
      redirect();
    }
  }

  if (props.location.openModal && !showModal) {
    setShowModal(true);
    return;
  }

  if (!props.location.openModal) {
    history.push("/");
  }

  return (
    <>
      <div className="wrap">
        <RegistrationModal
          show={showModal}
          handleClose={closeModal}
          head="Appointment Booked!"
        >
          <h1>{state.message}</h1>
        </RegistrationModal>
      </div>
    </>
  );
};

export default StripeSuccess;
