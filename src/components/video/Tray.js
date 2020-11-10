// import React, { useEffect } from 'react'

// function getStreamStates(callObject) {
//   let isCameraMuted,
//     isMicMuted,
//     isSharingScreen = false;
//   if (
//     callObject &&
//     callObject.participants() &&
//     callObject.participants().local
//   ) {
//     const localParticipant = callObject.participants().local;
//     isCameraMuted = !localParticipant.video;
//     isMicMuted = !localParticipant.audio;
//     isSharingScreen = localPartcipant.screen;
//   }
//   return [isCameraMuted, isMicMuted, isSharingScreen];
// }

// function toggleCamera() {
//   callObject.setLocalVideo(isCameraMuted);
// }

// function toggleMic() {
//   callObject.setLocalAudio(isMicMuted);
// }

// function toggleSharingScreen() {
//   isSharingScreen
//     ? callObject.stopScreenShare()
//     : callObject.startScreenShare();
// }

// export default function Tray(props) {
//   useEffect (() => {
//     if (!callObject) return;

//     function handleNewPartcipantsState(event) {
//       event && logDailyEvent(event);
//       const [isCameraMuted, isMicMuted, isSharingScreen] = getStreamStates(
//         callObject
//       );
//       setCameraMuted(isCameraMuted);
//       setMicMuted(isMicMuted);
//       setSharingScreen(isSharingScreen);
//     }

//     handleNewParticipantsState();

//     callObject.on("participant-updated", handleNewPartcipantsState)

//     return function cleanup() {
//       callObject.off("participant-updated", handleNewParticipantsState);
//     };
//   }, [callObject]);
// }