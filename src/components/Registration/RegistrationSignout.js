import React, { useState } from "react";
import RegistrationModal from "./RegistrationModal";
import { useHistory } from "react-router-dom";
import { signout } from "./RegistrationAuth";

const RegistrationSignout = (props) => {
  const [showModal, setShowModal] = useState(false);
  const history = useHistory();

  const logout = () => {
    signout(() => history.push("/"));
  };

  function closeModal() {
    if (showModal) {
      setShowModal(false);
      props.location.openModal = false;
      logout();
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
          head="Sign Out"
        >
          <h1>Goodbye!</h1>
        </RegistrationModal>
      </div>
    </>
  );
};

export default RegistrationSignout;
