import React, { useCallback, useState, useEffect, useContext } from "react";
import { API_ROOT } from "../../api-config";
import DailyIframe from "@daily-co/daily-js";
import dailyApi from "../video/dailyApi";
import { roomUrlFromPageUrl, pageUrlFromRoomUrl } from "../../urlUtils";
import { CallObjectContext, VideoTypes } from "./VideoContext";
import { handleCodeSubmission } from "./VideoApiCalls";

const Videos = (props) => {
  const [state, dispatch] = useContext(CallObjectContext);
  const [data, setData] = useState({ codeInput: "", showVideo: false });
  const [roomUrl, setRoomUrl] = useState(null);
  const [callObject, setCallObject] = useState(null);
  const token = localStorage.getItem("token");

  const handleInputChange = (event) => {
    const { name, value } = event.target;

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

  // Code Submission
  const handleCodeSubmissionPayload = handleCodeSubmission(
    token,
    data.codeInput
  );
  if (handleCodeSubmissionPayload.message) {
    alert(handleCodeSubmissionPayload.message);
    setRoomUrl(null);
    dispatch({
      type: VideoTypes.STATE_IDLE,
      payload: handleCodeSubmissionPayload.message,
    });
  } else {
    startJoiningCall(handleCodeSubmissionPayload);
  }

  // Launch the video
  const handleVideoLaunch = (e) => {
    createCall().then((url) => startJoiningCall(url));
  };

  // creating the Call
  const createCall = useCallback(() => {
    dispatch({ type: VideoTypes.STATE_CREATING });
    return dailyApi
      .createRoom()
      .then((room) => room.url)
      .catch((err) => {
        console.log("Error creating the room", err);
        setRoomUrl(null);
        dispatch({ type: VideoTypes.STATE_IDLE });
      });
  }, []);

  const startJoiningCall = useCallback((url) => {
    if (url === undefined) {
      return;
    } else {
      const newCallObject = DailyIframe.createCallObject();
      setRoomUrl(url);
      setCallObject(newCallObject);
      dispatch({ type: VideoTypes.STATE_JOINING });
      newCallObject({ url });
    }
  }, []);

  ////////////***********

  const showCall = [STATE_JOINING, STATE_JOINED, STATE_ERROR].includes(
    videoAppState
  );

  // DISABLE LEAVE FOR TRAINER
  const startLeavingCall = useCallback(() => {
    if (!callObject) return;
    // If we're in the error state, we've already "left", so just clean up
    if (videoAppState === STATE_ERROR) {
      callObject.destroy().then(() => {
        setRoomUrl(null);
        setCallObject(null);
        setAppState(STATE_IDLE);
      });
    } else {
      setAppState(STATE_LEAVING);
      callObject.leave();
    }
  }, [callObject, videoAppState]);

  // THESE EFFECTS CLEAN URL SO VIDEO CAN BE DISPLAYED
  useEffect(() => {
    const url = roomUrlFromPageUrl();
    url && startJoiningCall(url);
  }, [startJoiningCall]);

  useEffect(() => {
    const pageUrl = pageUrlFromRoomUrl(roomUrl);
    if (pageUrl === window.location.href) return;
    window.history.replaceState(null, null, pageUrl);
  }, [roomUrl]);

  /**
   * Uncomment to attach call object to window for debugging purposes.
   */
  // useEffect(() => {
  //   window.callObject = callObject;
  // }, [callObject]);

  // EVERYTIME callObject changes, this method is fired
  useEffect(() => {
    if (!callObject) return;

    // these are attached to callObject payload
    const events = ["joined-meeting", "left-meeting", "error"];

    function handleNewMeetingState(event) {
      // event && logDailyEvent(event);
      // console.log('event @ handleNewMeetingState:', event, Date.now())
      // console.log('callObject @ handleNewMeetingState:', callObject)
      switch (callObject.meetingState()) {
        case "joined-meeting":
          setAppState(STATE_JOINED);
          break;
        case "left-meeting":
          callObject.destroy().then(() => {
            setRoomUrl(null);
            setCallObject(null);
            setAppState(STATE_IDLE);
          });
          break;
        case "error":
          setAppState(STATE_ERROR);
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

  // MAY NOT NEED THIS?
  useEffect(() => {
    if (!callObject) {
      return;
    }

    function handleAppMessage(event) {
      if (event) {
        // logDailyEvent(event);
        console.log(`received app message from ${event.fromId}: `, event.data);
      }
    }

    callObject.on("app-message", handleAppMessage);

    return function cleanup() {
      callObject.off("app-message", handleAppMessage);
    };
  }, [callObject]);
  /**
   * Only enable the call buttons (camera toggle, leave call, etc.) if we're joined
   * or if we've errored out.
   *
   * !!!
   * IMPORTANT: calling callObject.destroy() *before* we get the "joined-meeting"
   * can result in unexpected behavior. Disabling the leave call button
   * until then avoids this scenario.
   * !!!
   */
  const enableCallButtons = [STATE_JOINED, STATE_ERROR].includes(videoAppState);

  /**
   * Only enable the start button if we're in an idle state (i.e. not creating,
   * joining, etc.).
   *
   * !!!
   * IMPORTANT: only one call object is meant to be used at a time. Creating a
   * new call object with DailyIframe.createCallObject() *before* your previous
   * callObject.destroy() completely finishes can result in unexpected behavior.
   * Disabling the start button until then avoids that scenario.
   * !!!
   */
  const enableStartButton = videoAppState === STATE_IDLE;

  //////////***************

  return (
    <div id="testing">
      <h1>Video</h1>
    </div>
  );
};

export default Videos;
