
import React, { useEffect, useContext, useReducer } from 'react'
import './Call.css'
import Tile from '../tile/Tile'
import CallMessage from '../callMessage/CallMessage'
import { CallObjectContext } from '../../Video';
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


export default function Call(props) {
  const callObject = useContext(CallObjectContext);
  const [callState, dispatch] = useReducer(callReducer, initialCallState);

  useEffect(() => {
    if (!callObject) return;
  
    const events = [
      "participant-joined",
      "participant-updated",
      "participant-left"
    ];

    // console.log('participants at useEffect in Call.js line 25:', callObject.participants())

    function handleNewParticipantsState(event) {
      //debugger
      // event.participant.owner = true if event.participant.local AND user.is_admin? 
      if (event) {
        event.participant.owner = true
      }
      console.log('callObject.partis @ handlenewparticipants:', callObject.participants())
      // event && logDailyEvent(event)
      // console.log('event @ handleNewPartcipantsState (Call.js ln 34):', event, Date.now())
      // console.log('callObject @ handleNewPartcipantsState:', callObject)
      dispatch({
        type: PARTICIPANTS_CHANGE,
        participants: callObject.participants(),
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

  // access reminder popup, t is the amount of time taken to build the video
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
    // console.log('callState:', callState)
    Object.entries(callState.callItems).forEach(([id, callItem]) => {
      //console.log('id (identity) of callState item in getTiles loop:', id)
      console.log('callItem in getTiles Loop:', callItem)
      // const isLarge = callItem.isAdmin || !isLocal(id)
      // ALL CALL ITEMS ARE COMING BACK AS ADMIN IF USER IS ADMIN AND VICE VERSA
      // ID A CALL ITEM AS THE OWNER INSTEAD OF ADMIN
      const isLarge = callItem.isMainScreen
      // TODO: REMOVE STUPID BACKGROUND 
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
      if (isLarge) {
        largeTiles.push(tile);
      } else {
        smallTiles.push(tile);
      }
    });
    // console.log('largeTiles before return in getTiles:', largeTiles)
    // console.log('smallTiles before return in getTiles:', smallTiles)
    return [largeTiles, smallTiles];
  }

  const [largeTiles, smallTiles] = getTiles();
  const message = getMessage(callState);
  return (
    <div className="call">
      <div className="trainer-tile">
        {
          !message
            ? largeTiles
            : null 
        }
      </div>
      <div className="client-tile">{smallTiles}</div>
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
