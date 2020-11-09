import React, { useEffect } from 'react'

export const Call = () => {
  useEffect(() => {
    if (!callObject) return;
  
    const events = [
      "participant-joined",
      "participant-updated",
      "participant-left"
    ];

    function handleNewParticipantsState(event) {
      event && logDailyEvent(event)
      dispatchEvent({
        type: PARTICIPANTS_CHANGE,
        participants: callObject.participants()
      })
    }
  
    handleNewParticipantsState();
  
    for (const event of events) {
      callObject.on(event, handleNewParticipantsState);
    }
  
    return function cleanup() {
      for (const event of events) {
        callObject && callObject.off(event, handleNewParticipantsState);
      }
    }
  }, [callObject])

  // mic errors
  useEffect(() => {
    if (!callObject) return;

    function handleCameraErrorEvent(event) {
      logDailyEvent(event);
      dispatch({
        type: CAM_OR_MIC_ERROR,
        message: (e && e.errorMsg && e.errorMsg.errorMsg) || "Unknown"
      });
    }
  
    callObject.on("camera-error", handleCameraErrorEvent);
  
    return function cleanup() {
      callObject.off("camera-error", handleCameraErrorEvent);
    };
  }, [callObject])

  // access reminder popup
  useEffect(() => {
    const t = setTimeout(() => {
      dispatch({ type: CLICK_ALLOW_TIMEOUT });
    }, 2500);
  
    return function cleanup() {
      clearTimeout(t);
    };
  }, []);

  function getTiles() {
    let largeTiles = [];
    let smallTiles = [];
    Object.entries(callState.callItems).forEach(([id, callItem]) => {
      const isLarge = 
        isScreenShare(id) ||
        (!isLocal(id) && !containsScreenShare(callState.callItems));
      const tile = (
        <Tile 
          key={id}
          videoTrack={callItem.videoTrack}
          audioTrack={callItem.audioTrack}
          isLocalPerson={isLocal(id)}
          isLarge={isLarge}
          isLoading={callItem.isLoading}
        />
      );
      // AT THIS POINT, PUSH ADMIN LARGE AND CLIENT SMALL; LOCK THAT POSITION
      if (isLarge) {
        largeTiles.push(tile);
      } else {
        smallTiles.push(tile);
      }
    });
    return [largeTiles, smallTiles];
  }
}