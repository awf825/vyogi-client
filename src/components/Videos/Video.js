import React, { useCallback, useState, useEffect, useContext } from "react";
import Call from "./Call/Call";
import DailyIframe from "@daily-co/daily-js";
import dailyApi from "./dailyApi";
import { roomUrlFromPageUrl, pageUrlFromRoomUrl } from "../../urlUtils";
import { CallObjectContext, VideoTypes } from "./VideoContext";
import { handleCodeSubmission } from "./VideoApiCalls";
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
  }, [dispatch]);

  const startJoiningCall = useCallback(
    (url) => {
      if (
        url === undefined ||
        url.message === "There is no lesson to request at this time."
      ) {
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
    },
    [dispatch]
  );

  const onSubmit = async () => {
    let codeSubmissionResponse = await handleCodeSubmission(
      token,
      data.codeInput
    );

    // Checks if there is a code submitted and checks to see if it is valid
    if (
      codeSubmissionResponse === undefined ||
      codeSubmissionResponse.message === "code is invalid" ||
      codeSubmissionResponse.message ===
        "There is no lesson to request at this time."
    ) {
      setRoomUrl(null);
      dispatch(VideoTypes.STATE_IDLE);
    } else {
      startJoiningCall(codeSubmissionResponse);
    }
  };

  // Leaves the call and cleans up
  const startLeavingCall = useCallback(() => {
    if (!callObject) return;
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
  }, [callObject, call, dispatch]);

  // Cleans the url for the call
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
  }, [callObject, dispatch]);

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
          <Call
            roomUrl={roomUrl}
            user={props.user}
            account={props.account}
            onClickLeaveCall={startLeavingCall}
            disabled={!enableCallButtons}
          />
        </CallObjectContext.Provider>
      ) : (
        <div className="videoLaunch">
          <div className="videoLaunch__inputs">
            <div className="videoLaunch__container">
              <input
                className="videoLaunch__inputs__text"
                type="text"
                value={data.codeInput}
                onChange={handleInputChange}
                name="codeInput"
                id="codeInput"
                placeholder="Input code here!"
              />
              <button
                className="videoLaunch__inputs__btn"
                disabled={!enableStartButton}
                onClick={onSubmit}
              >
                Access
              </button>
              <button
                className="videoLaunch__inputs__btn"
                onClick={handleVideoLaunch}
              >
                Launch as admin
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Videos;
