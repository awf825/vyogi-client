import React, { useEffect, useContext, useState } from "react";
import TrayButton, {
  TYPE_MUTE_CAMERA,
  TYPE_MUTE_MIC,
  TYPE_LEAVE,
} from "./VideoTrayButtons";
import { CallObjectContext } from "../VideoContext";

const VideoTray = (props) => {
  const callObject = useContext(CallObjectContext);
  const [isCameraMuted, setCameraMuted] = useState(false);
  const [isMicMuted, setMicMuted] = useState(false);

  const getStreamStates = (callObject) => {
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
  };

  function toggleCamera() {
    console.log(callObject);
    callObject.setLocalVideo(isCameraMuted);
  }

  function toggleMic() {
    callObject.setLocalAudio(isMicMuted);
  }

  function leaveCall() {
    props.onClickLeaveCall && props.onClickLeaveCall();
  }

  useEffect(() => {
    if (!callObject) return;

    const handleNewParticipantsState = () => {
      const [isCameraMuted, isMicMuted] = getStreamStates(callObject);
      setCameraMuted(isCameraMuted);
      setMicMuted(isMicMuted);
    };

    handleNewParticipantsState();

    callObject.on("participant-updated", handleNewParticipantsState);

    return function cleanup() {
      callObject.off("participant-updated", handleNewParticipantsState);
    };
  }, [callObject]);

  return (
    <>
      <TrayButton
        type={TYPE_MUTE_CAMERA}
        disabled={props.disabled}
        highlighted={isCameraMuted}
        onClick={toggleCamera}
      />
      <TrayButton
        type={TYPE_MUTE_MIC}
        disabled={props.disabled}
        highlighted={isMicMuted}
        onClick={toggleMic}
      />
      <TrayButton
        type={TYPE_LEAVE}
        disabled={props.disabled}
        newButtonGroup={true}
        highlighted={true}
        onClick={leaveCall}
      />
    </>
  );
};

export default VideoTray;
