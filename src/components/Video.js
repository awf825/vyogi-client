import { API_ROOT } from '../api-config.js';
import React, { useCallback, useState, useEffect, useContext } from 'react'
import Call from './video/call/Call';
import Tray from './video/tray/Tray';
import axios from 'axios'
import dailyApi from './video/dailyApi'
import DailyIframe from '@daily-co/daily-js';
import { roomUrlFromPageUrl, pageUrlFromRoomUrl } from '../urlUtils';
import { logDailyEvent } from '../logUtils';
import { suid } from 'rand-token';
import AuthContext from '../AuthContext'
import Cookies from 'universal-cookie'
import './Video.css'
const cookies = new Cookies();
const currentVideoSession = cookies.get('videoToken')

export const CallObjectContext = React.createContext();

const STATE_IDLE = 'STATE_IDLE';
const STATE_CREATING = 'STATE_CREATING';
const STATE_JOINING = 'STATE_JOINING';
const STATE_JOINED = 'STATE_JOINED';
const STATE_LEAVING = 'STATE_LEAVING';
const STATE_ERROR = 'STATE_ERROR';

export const Video = () => {
  const initialState = {
    showVideo: !!currentVideoSession,
    codeInput: ""
  }
  
  const [data, setData] = useState(initialState);
  const [videoAppState, setAppState] = useState(!!currentVideoSession ? STATE_JOINED : STATE_IDLE);
  const [roomUrl, setRoomUrl] = useState(null);
  const [callObject, setCallObject] = useState(null);
  const userObject = useContext(AuthContext)
  
  const handleInputChange = event => {
    setData({
      ...data,
      [event.target.name]: event.target.value
    })
  }
  
  const createCall = useCallback(() => {
    if (!userObject.state.user.is_admin) {
      return axios.get(
        `${API_ROOT}/video_client`
      ).then((resp) => {
        console.log('resp at bucket:', resp)
        if (resp.data.status == 404) {
          return resp.data.message
        } else {
          return resp.data.data.url
        }
      })
    } else {
      setAppState(STATE_CREATING);
      return dailyApi
      .createRoom()
      .then((room) => room.url)
      .catch((error) => {
        console.log('Error creating room', error);
        setRoomUrl(null);
        setAppState(STATE_IDLE);
      });
    }
  }, []);
  //THESE FUNCTIONS BOTH HAVE NO DEPENDENCIES BECAUSE THEY ARE CHAINED TOGETHER
  const startJoiningCall = useCallback((url) => {
    debugger
    if (url === "There is no live lesson at this time. Please try again later.") {
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
    // SO HERE, WHEN LOOKING TO MAKE A NEW CALL, CHECK IF
    // USER IS TRAINER LOOKING TO MAKE A NEW LESSON (LAMBDA)
    // OR IF USER IS A CLIENT ENTERING CODE
    // try {
    //   const newCallObject = DailyIframe.createCallObject();
    //   setRoomUrl(url);
    //   setCallObject(newCallObject);
    //   setAppState(STATE_JOINING);
    //   newCallObject.join({ url });
    // } catch(err) {
    //   alert(err)
    // }
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
          <Call roomUrl={roomUrl} />
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
            onClick={(e) => {
              axios.get(`${API_ROOT}/codes`)
              .then(resp => {
                var validation = resp.data.reduce((x,y) => {
                  x.push(y.code)
                  return x
                }, []).find(el => el == data.codeInput)
          
                if (validation) {
                  setData({
                    ...data,
                    showVideo: true,
                    codeInput: ""
                  })
                  createCall().then((url) => startJoiningCall(url))
                } else {
                  alert('Code is invalid or lesson has not begun.')
                  setRoomUrl(null);
                  setAppState(STATE_IDLE);
                }
              })
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