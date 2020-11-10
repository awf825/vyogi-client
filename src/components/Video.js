import React, { useCallback, useState } from 'react'
import axios from 'axios'
import dailyApi from './video/dailyApi'
import DailyIframe from '@daily-co/daily-js';
// import { suid } from 'rand-token';
// import {AuthContext} from '../App'

const STATE_IDLE = 'STATE_IDLE';
const STATE_CREATING = 'STATE_CREATING';
const STATE_JOINING = 'STATE_JOINING';
const STATE_JOINED = 'STATE_JOINED';
const STATE_LEAVING = 'STATE_LEAVING';
const STATE_ERROR = 'STATE_ERROR';

export const Video = (props) => {
  // const { dispatch } = React.useContext(AuthContext);
  const initialState = {
    showVideo: props.videoRunning,
    codeInput: ""
  }

  const [data, setData] = React.useState(initialState);
  const [videoAppState, setAppState] = useState(STATE_IDLE);
  const [roomUrl, setRoomUrl] = useState(null);
  const [callObject, setCallObject] = useState(null);

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
          props.handleVideoGeneration()
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
      {data.showVideo ? (
        // NOTE: for an app this size, it's not obvious that using a Context
        // is the best choice. But for larger apps with deeply-nested components
        // that want to access call object state and bind event listeners to the
        // call object, this can be a helpful pattern.
        <div>
          <h1>and you will NEVER...</h1>
          <p>get yo bish back</p>
        </div>
        // <CallObjectContext.Provider value={callObject}>
        //   <Call roomUrl={roomUrl} />
        //   <Tray
        //     disabled={!enableCallButtons}
        //     onClickLeaveCall={startLeavingCall}
        //   />
        //  </CallObjectContext.Provider>
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