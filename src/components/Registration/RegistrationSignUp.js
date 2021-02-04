import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import RegistrationModal from "./RegistrationModal";
import RegistrationSignUpForm from "./RegistrationSignUpForm";

const RegistrationSignUp = (props) => {
  const [showModal, setShowModal] = useState(false);
  const history = useHistory();

  function closeModal() {
    if (showModal) {
      setShowModal(false);
      props.location.openModal = false;
      history.push("/registration");
    }
  }

  if (props.location.openModal && !showModal) {
    setShowModal(true);
    return;
  }
  return (
    <div className="wrap">
      <RegistrationModal
        show={showModal}
        handleClose={closeModal}
        head="Sign Up"
      >
        <RegistrationSignUpForm />
      </RegistrationModal>
    </div>
  );
};

export default RegistrationSignUp;
