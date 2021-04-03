import React, { useEffect, useContext, useState } from "react";
import "./Tray.css";
import TrayButton, {
  TYPE_MUTE_CAMERA,
  TYPE_MUTE_MIC,
  // TYPE_SCREEN,
  TYPE_LEAVE,
} from "../trayButton/TrayButton";
import { CallObjectContext } from "../../Video";
// import { logDailyEvent } from '../../../logUtils'

/**
 * Gets [isCameraMuted, isMicMuted, isSharingScreen].
 * This function is declared outside Tray() so it's not recreated every render
 * (which would require us to declare it as a useEffect dependency).
 */

function getStreamStates(callObject) {
  let isCameraMuted,
    isMicMuted = false;
  if (
    callObject &&
    callObject.participants() &&
    callObject.participants().local
  ) {
    const localParticipant = callObject.participants().local;
    isCameraMuted = !localParticipant.video;
    isMicMuted = !localParticipant.audio;
  }
  return [isCameraMuted, isMicMuted];
}

export default function Tray(props) {
  const callObject = useContext(CallObjectContext);
  const [isCameraMuted, setCameraMuted] = useState(false);
  const [isMicMuted, setMicMuted] = useState(false);

  function toggleCamera() {
    callObject.setLocalVideo(isCameraMuted);
  }

  function toggleMic() {
    callObject.setLocalAudio(isMicMuted);
  }

  function leaveCall() {
    props.onClickLeaveCall && props.onClickLeaveCall();
  }

  /**
   * Start listening for participant changes when callObject is set (i.e. when the component mounts).
   * This event will capture any changes to your audio/video mute state.
   */
  useEffect(() => {
    if (!callObject) return;

    function handleNewParticipantsState(event) {
      // event && logDailyEvent(event);
      // console.log('event @ handleNewPartcipantsState (Tray.js line 58):', event, Date.now())
      // console.log('callObject @ handleNewPartcipantsState (Tray):', callObject)
      const [isCameraMuted, isMicMuted] = getStreamStates(callObject);
      setCameraMuted(isCameraMuted);
      setMicMuted(isMicMuted);
    }

    handleNewParticipantsState();

    callObject.on("participant-updated", handleNewParticipantsState);

    return function cleanup() {
      callObject.off("participant-updated", handleNewParticipantsState);
    };
  }, [callObject]);

  return (
    <div className="tray">
      <TrayButton
        type={TYPE_MUTE_CAMERA}
        disabled={props.disabled}
        highlighted={isCameraMuted}
        onClick={toggleCamera}
      />
      <TrayButton
        type={TYPE_MUTE_MIC}
        disabled={props.disabled}
        highlighted={isCameraMuted}
        onClick={toggleMic}
      />
      <TrayButton
        type={TYPE_LEAVE}
        disabled={props.disabled}
        newButtonGroup={true}
        highlighted={true}
        onClick={leaveCall}
      />
    </div>
  );
}
