import React from "react";

export const sendMessage = (message) => ({
  type: "SEND_MESSAGE",
  payload: message,
});

export const messageForUser = "";

export const MessageContext = React.createContext({});

export const messageReducer = (state, action) => {
  switch (action.type) {
    case "SEND_MESSAGE":
      return { ...state, message: action.payload };
    default:
      return state;
  }
};
