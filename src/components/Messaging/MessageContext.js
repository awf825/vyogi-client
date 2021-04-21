import React, { useState } from "react";

const MessageContext = React.createContext();

const MessageContextProvider = ({ children }) => {
  const [messageForUser, setMessageForUser] = useState("");

  return (
    <MessageContextProvider value={{ messageForUser, setMessageForUser }}>
      {children}
    </MessageContextProvider>
  );
};

export { MessageContext, MessageContextProvider };
