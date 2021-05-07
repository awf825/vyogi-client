import React, { useCallback, useState, useEffect, useContext } from "react";
import Call from "./Call/Call";
import VideoTray from "./Tray/VideoTray";
import DailyIframe from "@daily-co/daily-js";
import dailyApi from "../video/dailyApi";
import { roomUrlFromPageUrl, pageUrlFromRoomUrl } from "../../urlUtils";
import { CallObjectContext, VideoTypes } from "./VideoContext";
import { handleCodeSubmission } from "./VideoApiCalls";
import "./test.css";
import { MessageContext, sendMessage } from "../Messaging/MessageContext";

const Videos = (props) => {
  const [call, dispatch] = useContext(CallObjectContext);
  const [state, send] = useContext(MessageContext);
  const [data, setData] = useState({ codeInput: "", showVideo: false });
  const [showCall, setShowCall] = useState(false);
  const [roomUrl, setRoomUrl] = useState(null);
  const [callObject, setCallObject] = useState(null);
  const token = localStorage.getItem("token");

  // Handles the change on the input form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "codeInput":
        setData({ ...data, [name]: value });
        break;
      case "showVideo":
        setData({ ...data, [name]: value });
        break;
      default:
        break;
    }
  };

  const createCall = useCallback(() => {
    dispatch(VideoTypes.STATE_CREATING);
    return dailyApi
      .createRoom()
      .then((room) => room.url)
      .catch((error) => {
        console.log("Error creating room", error);
        setRoomUrl(null);
        dispatch(VideoTypes.STATE_IDLE);
      });
  }, []);

  const startJoiningCall = useCallback((url) => {
    if (url === undefined) {
      return;
    } else {
      const newCallObject = DailyIframe.createCallObject();
      setRoomUrl(url);
      setCallObject(newCallObject);
      dispatch(VideoTypes.STATE_JOINING);
      newCallObject.join({ url });
      setShowCall(true);
    }
    // * !!!
    // * IMPORTANT: only one call object is meant to be used at a time. Creating a
    // * new call object with DailyIframe.createCallObject() *before* your previous
    // * callObject.destroy() completely finishes can result in unexpected behavior.
    // * Disabling the start button until then avoids that scenario.
    // * !!!
    // */
  }, []);

  // checks to see if there are errors if not joins the call
  let codeSubmissionResponse;
  const onSubmit = () => {
    codeSubmissionResponse = handleCodeSubmission(data.codeInput, token);
  };

  if (codeSubmissionResponse !== undefined) {
    setRoomUrl(null);
    dispatch(VideoTypes.STATE_IDLE);
  } else {
    startJoiningCall(codeSubmissionResponse);
  }

  const startLeavingCall = useCallback(() => {
    if (!callObject) return;
    // If we're in the error state, we've already "left", so just clean up
    if (call === "STATE_ERROR") {
      callObject.destroy().then(() => {
        setRoomUrl(null);
        setCallObject(null);
        dispatch(VideoTypes.STATE_IDLE);
      });
    } else {
      dispatch(VideoTypes.STATE_LEAVING);
      callObject.leave();
    }
  }, [callObject, call]);

  useEffect(() => {
    const url = roomUrlFromPageUrl();
    url && startJoiningCall(url);
  }, [startJoiningCall]);

  useEffect(() => {
    const pageUrl = pageUrlFromRoomUrl(roomUrl);
    if (pageUrl === window.location.href) return;
    window.history.replaceState(null, null, pageUrl);
  }, [roomUrl]);

  useEffect(() => {
    if (!callObject) return;

    const events = ["joined-meeting", "left-meeting", "error"];

    function handleNewMeetingState(event) {
      switch (callObject.meetingState()) {
        case "joined-meeting":
          dispatch(VideoTypes.STATE_JOINED);
          setShowCall(true);
          break;
        case "left-meeting":
          callObject.destroy().then(() => {
            setRoomUrl(null);
            setCallObject(null);
            setShowCall(false);
            dispatch(VideoTypes.STATE_IDLE);
          });
          break;
        case "error":
          dispatch(VideoTypes.STATE_ERROR);
          break;
        default:
          break;
      }
    }

    handleNewMeetingState();

    for (const event of events) {
      callObject.on(event, handleNewMeetingState);
    }

    return function cleanup() {
      for (const event of events) {
        callObject.off(event, handleNewMeetingState);
      }
    };
  }, [callObject]);

  useEffect(() => {
    if (!callObject) {
      return;
    }

    function handleAppMessage(event) {
      if (event) {
        console.log(`received app message from ${event.fromId}: `, event.data);
      }
    }

    callObject.on("app-message", handleAppMessage);

    return function cleanup() {
      callObject.off("app-message", handleAppMessage);
    };
  }, [callObject]);

  const enableCallButtons = call
    ? call === "STATE_JOINED" || call === "STATE_ERROR"
    : true;
  const enableStartButton = call ? call === "STATE_IDLE" : true;

  const handleVideoLaunch = (event) => {
    createCall().then((url) => startJoiningCall(url));
  };

  if (call === "STATE_ERROR") {
    send(sendMessage("There was an error launching the video"));
  }

  return (
    <div id="video" className="videoapp">
      {showCall ? (
        <CallObjectContext.Provider value={callObject}>
          <div className="videoapp__call">
            <Call roomUrl={roomUrl} user={props.user} account={props.account} />
          </div>
          <div className="videoapp__tray">
            <VideoTray
              disabled={!enableCallButtons}
              onClickLeaveCall={startLeavingCall}
            />
          </div>
        </CallObjectContext.Provider>
      ) : (
        <div className="video-launch">
          <div className="video-launch-inputs">
            <input
              type="text"
              value={data.codeInput}
              onChange={handleInputChange}
              name="codeInput"
              id="codeInput"
            />
            <button disabled={!enableStartButton} onClick={onSubmit}>
              Access
            </button>
            <button onClick={handleVideoLaunch}>Launch as admin</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Videos;
