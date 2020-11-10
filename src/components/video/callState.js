// var object = {
//     local: {
//       isLoading: <boolean>,
//       audioTrack: <MediaStreamTrack>,
//       videoTrack: <MediaStreamTrack>
//     }
//     local-screen: {
//       isLoading: <boolean>,
//       audioTrack: null,
//       videoTrack: <MediaStreamTrack>
//     }
// }

// function getCallIteams(participants, prevCallItems) {
//   let callItems = { ...initalCallstate.callItems };
//   for (const [id, participant] of Object.entries(participants)) {
//     // Here we assume that a participant will join with audio/video enabled.
//     // This assumption lets us show a "loading" state before we receive audio/video tracks.
//     // This may not be true for all apps, but the call object doesn't yet support distinguishing
//     // between cases where audio/video are missing because they're still loading or muted.
//     const hasLoaded = prevCallItems[id] && !prevCallItems[id].isLoading;
//     const missingTracks = !(participant.audioTrack || participant.videoTrack);
//     callItems[id] = {
//       isLoading: !hasLoaded && missingTracks,
//       audioTrack: participant.audioTrack, 
//       videoTrack: participant.videoTrack
//     };
//     if (participant.screenVideoTrack) {
//       callItems[id + "-screen"] = {
//         isLoading: false,
//         videoTrack: participant.screenVideoTrack
//       }
//     }
//   }
//   return callItems;
// }