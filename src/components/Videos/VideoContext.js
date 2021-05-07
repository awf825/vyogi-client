import React from "react";

export const CallObjectContext = React.createContext();

export const VideoTypes = {
  STATE_IDLE: "STATE_IDLE",
  STATE_CREATING: "STATE_CREATING",
  STATE_JOINING: "STATE_JOINING",
  STATE_JOINED: "STATE_JOINED",
  STATE_LEAVING: "STATE_LEAVING",
  STATE_ERROR: "STATE_ERROR",
};

export const videoReducer = (call, action) => {
  switch (action.type) {
    case "STATE_IDLE":
      return { ...call, message: action.payload };
    case "STATE_CREATING":
      return { ...call, message: action.payload };
    case "STATE_JOINING":
      return { ...call, message: action.payload };
    case "STATE_JOINED":
      return { ...call, message: action.payload };
    case "STATE_LEAVING":
      return { ...call, message: action.payload };
    case "STATE_ERROR":
      return { ...call, message: action.payload };
    default:
      return call;
  }
};
