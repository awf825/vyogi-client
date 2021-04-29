import React from "react";
import MessagingModal from "./MessagingModal";

const Message = (props) => {
  return (
    <>
      <div className="wrap">
        <MessagingModal pass={props} head={props.head}></MessagingModal>
      </div>
    </>
  );
};

export default Message;
