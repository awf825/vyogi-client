import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import RegistrationModal from "./RegistrationModal";
import RegistrationSignUpForm from "./RegistrationSignUpForm";

const RegistrationSignUp = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const history = useHistory();

  function closeModal() {
    if (showModal) {
      setShowModal(false);
      props.location.openModal = false;
      if (success) {
        history.push("/");
      } else {
        history.push("/registration");
      }
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
    <div className="wrap">
      <RegistrationModal
        show={showModal}
        handleClose={closeModal}
        head="Sign Up"
      >
        <RegistrationSignUpForm
          success={success}
          changeSuccess={(s) => setSuccess(s)}
        />
      </RegistrationModal>
    </div>
  );
};

export default RegistrationSignUp;
