import React, { useCallback, useState, useEffect } from 'react'
import Call from './video/Call';
import Tray from './video/Tray';
import axios from 'axios'
import dailyApi from './video/dailyApi'
import DailyIframe from '@daily-co/daily-js';
import { roomUrlFromPageUrl, pageUrlFromRoomUrl } from '../urlUtils';
import { logDailyEvent } from '../logUtils';
import { suid } from 'rand-token';
// import {AuthContext} from '../App'
import Cookies from 'universal-cookie'
const cookies = new Cookies();
const currentVideoSession = cookies.get('videoToken')

export const CallObjectContext = React.createContext();
const STATE_IDLE = 'STATE_IDLE';
const STATE_CREATING = 'STATE_CREATING';
const STATE_JOINING = 'STATE_JOINING';
const STATE_JOINED = 'STATE_JOINED';
const STATE_LEAVING = 'STATE_LEAVING';
const STATE_ERROR = 'STATE_ERROR';

export const Video = (props) => {
  const initialState = {
    showVideo: !!currentVideoSession,
    codeInput: ""
  }
  
  const [data, setData] = useState(initialState);
  const [videoAppState, setAppState] = useState(!!currentVideoSession ? STATE_JOINED : STATE_IDLE);
  const [roomUrl, setRoomUrl] = useState(null);
  const [callObject, setCallObject] = useState(null);
  console.log('callobject after init:', callObject)
  
  const handleVideoGeneration = () => {
    var inFifteenMinutes = new Date(new Date().getTime() + 15 * 60 * 1000);
    var tkn = suid(16)
    cookies.set('videoToken', tkn, { expires: inFifteenMinutes, path: '/' })
  }

  const generateLessonSession = (ev) => {
    ev.preventDefault()
    // get lesson access codes
    axios.get('http://localhost:3001/api/v1/codes')
    .then(resp => {
      var validation = resp.data.reduce((x,y) => {
        x.push(y.code)
        return x
      }, []).find(el => el == data.codeInput)
      
      if (validation) {
        debugger
        handleVideoGeneration()
        setData({
          ...data,
          showVideo: true,
          codeInput: ""
        })
      } else {
        alert('Code is invalid')
      }
    })
  }
  
  const handleInputChange = event => {
    setData({
      ...data,
      [event.target.name]: event.target.value
    })
  }

  
  const createCall = useCallback(() => {
    setAppState(STATE_CREATING);
    return dailyApi
    .createRoom()
    .then((room) => room.url)
    .catch((error) => {
      console.log('Error creating room', error);
      setRoomUrl(null);
      setAppState(STATE_IDLE);
    });
  }, []);
  
  const startJoiningCall = useCallback((url) => {
    const newCallObject = DailyIframe.createCallObject();
    setRoomUrl(url);
    setCallObject(newCallObject);
    setAppState(STATE_JOINING);
    newCallObject.join({ url });
  }, []);
  
  const showCall = [STATE_JOINING, STATE_JOINED, STATE_ERROR].includes(
    videoAppState
  );
    
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
    
  useEffect(() => {
    if (!callObject) return;
    
    const events = ['joined-meeting', 'left-meeting', 'error'];
    
    function handleNewMeetingState(event) {
      event && logDailyEvent(event);
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

  useEffect(() => {
    if (!callObject) {
      return;
    }
    
    function handleAppMessage(event) {
      if (event) {
        logDailyEvent(event);
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
  // NOTE: for an app this size, it's not obvious that using a Context
  // is the best choice. But for larger apps with deeply-nested components
  // that want to access call object state and bind event listeners to the
  // call object, this can be a helpful pattern.
            
  return (
    <div className="videoapp">
      {showCall ? (
        <CallObjectContext.Provider value={callObject}>
          <Call roomUrl={roomUrl} />
          {/* <Tray
            disabled={!enableCallButtons}
            onClickLeaveCall={startLeavingCall}
          />  */}
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
            onClick={(e) => {
              generateLessonSession(e);
              createCall().then((url) => startJoiningCall(url));
            }}
          >
            Access
          </button>
        </div>
      )}
    </div>
  )
}

export default Video