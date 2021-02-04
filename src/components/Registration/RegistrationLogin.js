import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import RegistrationModal from "./RegistrationModal";
import RegistrationLoginForm from "./RegistrationLogInForm";

const RegistrationLogin = (props) => {
  const [showModal, setShowModal] = useState(false);
  const history = useHistory();

  // Closes the modal and moves the user back to the RegistrationRouter for now
  function closeModal() {
    if (showModal) {
      setShowModal(false);
      props.location.openModal = false;
      history.push("/registration");
    }
  }

  // Checks to see if the user has selected the option from the RegistrationRouter page
  if (props.location.openModal && !showModal) {
    setShowModal(true);
    return;
  }

  return (
    <div className="wrap">
      <RegistrationModal show={showModal} handleClose={closeModal} head="Login">
        <RegistrationLoginForm />
      </RegistrationModal>
    </div>
  );
};

export default RegistrationLogin;
