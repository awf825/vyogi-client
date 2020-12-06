import React, { useEffect, useContext, useReducer, useCallback } from 'react'
// import './Call.css';
import Tile from '../tile/Tile'
import CallMessage from '../callMessage/CallMessage'
import './Call.css'
import { CallObjectContext } from '../../Video';
// import CallMessage from './CallMessage/CallMessage';
import {
  initialCallState,
  CLICK_ALLOW_TIMEOUT,
  PARTICIPANTS_CHANGE,
  CAM_OR_MIC_ERROR,
  FATAL_ERROR,
  callReducer,
  isLocal,
  getMessage,
} from '../callState'
import { logDailyEvent } from '../../../logUtils'


export default function Call() {
  const callObject = useContext(CallObjectContext);
  const [callState, dispatch] = useReducer(callReducer, initialCallState);

  useEffect(() => {
    if (!callObject) return;
  
    const events = [
      "participant-joined",
      "participant-updated",
      "participant-left"
    ];

    function handleNewParticipantsState(event) {
      event && logDailyEvent(event)
      dispatch({
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

    function handleCameraErrorEvent(e) {
      logDailyEvent(e);
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

  // fatal errors
  useEffect(() => {
    if (!callObject) return;

    function handleErrorEvent(e) {
      logDailyEvent(e);
      dispatch({
        type: FATAL_ERROR,
        message: (e && e.errorMsg) || 'Unknown'
      });
    }

    callObject.on('error', handleErrorEvent);

    return function cleanup() {
      callObject.off('error', handleErrorEvent)
    }
  }, [callObject]);

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
      const isLarge = !isLocal(id)
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

  const [largeTiles, smallTiles] = getTiles();
  const message = getMessage(callState);
  return (
    <div className="call">
      <div className="large-tiles">
        {
          !message
            ? largeTiles
            : null /* Avoid showing large tiles to make room for the message */
        }
      </div>
      <div className="small-tiles">{smallTiles}</div>
      {message && (
        <CallMessage
          header={message.header}
          detail={message.detail}
          isError={message.isError}
        />
      )}
    </div>
  );
}
