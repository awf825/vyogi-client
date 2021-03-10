import { API_ROOT } from '../api-config.js';
import React, { useCallback, useState, useEffect } from 'react'
import Call from './video/call/Call';
import Tray from './video/tray/Tray';
import dailyApi from './video/dailyApi'
import DailyIframe from '@daily-co/daily-js';
import { roomUrlFromPageUrl, pageUrlFromRoomUrl } from '../urlUtils';
import { logDailyEvent } from '../logUtils';
import './Video.css'

export const CallObjectContext = React.createContext();

const STATE_IDLE = 'STATE_IDLE';
const STATE_CREATING = 'STATE_CREATING';
const STATE_JOINING = 'STATE_JOINING';
const STATE_JOINED = 'STATE_JOINED';
const STATE_LEAVING = 'STATE_LEAVING';
const STATE_ERROR = 'STATE_ERROR';

export const Video = (props) => {
  const initialState = {
    codeInput: "",
    showVideo: false
  }
  
  const [data, setData] = useState(initialState);
  const [videoAppState, setAppState] = useState(STATE_IDLE);
  const [roomUrl, setRoomUrl] = useState(null);
  const [callObject, setCallObject] = useState(null);
  
  const handleInputChange = event => {
    setData({
      ...data,
      [event.target.name]: event.target.value
    })
  }

  const handleCodeSubmission = async event => {
    const token = localStorage.getItem('token'); 
    const code = data.codeInput
    let options = {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          code: code
        })
    }

    let response = await fetch(`${API_ROOT}/video_client`, options),
      payload = await response.json()
    
    if (payload.message) {
      alert(payload.message)
      setRoomUrl(null);
      setAppState(STATE_IDLE);
    } else {
      startJoiningCall(payload)
    }
  }  

  const handleVideoLaunch = event => {
    createCall().then((url) => startJoiningCall(url))
  }             
  
  const createCall = useCallback(() => {
    setAppState(STATE_CREATING);
    return dailyApi
    .createRoom()
    .then((room) => room.url)
    .catch((error) => {
      console.log('Error creating room', error);
      //alert('You are unauthorized to perform this action.')
      setRoomUrl(null);
      setAppState(STATE_IDLE);
    });
  }, []);
  //THESE FUNCTIONS BOTH HAVE NO DEPENDENCIES BECAUSE THEY ARE CHAINED TOGETHER
  const startJoiningCall = useCallback((url) => {
    if (url === undefined) {
      return
    } else {
      const newCallObject = DailyIframe.createCallObject();
      setRoomUrl(url);
      setCallObject(newCallObject);
      setAppState(STATE_JOINING);
      newCallObject.join({ url });
    }
    // * !!!
    // * IMPORTANT: only one call object is meant to be used at a time. Creating a
    // * new call object with DailyIframe.createCallObject() *before* your previous
    // * callObject.destroy() completely finishes can result in unexpected behavior.
    // * Disabling the start button until then avoids that scenario.
    // * !!!
    // */
  }, []);
  
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
    const events = ['joined-meeting', 'left-meeting', 'error'];
    
    function handleNewMeetingState(event) {
      // event && logDailyEvent(event);
      // console.log('event @ handleNewMeetingState:', event, Date.now())
      // console.log('callObject @ handleNewMeetingState:', callObject)
      switch (callObject.meetingState()) {
        case 'joined-meeting':
          setAppState(STATE_JOINED);
          break;
        case 'left-meeting':
          callObject.destroy().then(() => {
            setRoomUrl(null);
            setCallObject(null);
            setAppState(STATE_IDLE);
          });
          break;
        case 'error':
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
    
    callObject.on('app-message', handleAppMessage);
    
    return function cleanup() {
      callObject.off('app-message', handleAppMessage);
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
            
  return (
    <div className="videoapp">
      {showCall ? (
        <CallObjectContext.Provider value={callObject}>
          <Call 
            roomUrl={roomUrl}
            user={props.user}
            account={props.account}
          />
          <Tray
            disabled={!enableCallButtons}
            onClickLeaveCall={startLeavingCall}
          /> 
        </CallObjectContext.Provider>
      ) : (
        <div className="video-launch">
          <input
            type="text"
            value={data.codeInput}
            onChange={handleInputChange}
            name="codeInput"
            id="codeInput"
          />
          <button
            disabled={!enableStartButton}
            onClick={handleCodeSubmission}
          >
            Access
          </button>
          <button 
            onClick={handleVideoLaunch}
          >
            Launch as admin
          </button>
        </div>
      )}
    </div>
  )
}

export default Video;