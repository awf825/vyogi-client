import React from "react";
import MessagingModal from "../Messaging/MessagingModal";

const StripeSuccess = (props) => {
  return (
    <>
      <div className="wrap">
        <MessagingModal
          pass={props}
          head="Appointment Booked!"
        ></MessagingModal>
      </div>
    </>
  );
};

export default StripeSuccess;
