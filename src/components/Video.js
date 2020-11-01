import React from 'react'
import {AuthContext} from '../App'
import VideoContainer from './video/VideoContainer'
import VideoAction from './video/VideoAction'

export const Video = (props) => {
  const { dispatch } = React.useContext(AuthContext);
  const initialState = {
    showVideo: false
  }

  const generateLessonSession = (ev) => {
    ev.preventDefault()
    console.log(initialState)
    // get request
    // check current lesson id and access codes/booking ids
      // check for correct access Verify 
      // 1) that the user is attached to the lesson via booking 
      // 2) the access code inputted is attached to the lesson.
    // either redirect the user to the home page or schedule OR display video
  }

  return (
    <div>
      <form onSubmit={generateLessonSession} className={initialState.showVideo ? "access-form display-none" : "access-form display-block"}>
        <input type="text" placeholder="Enter Code"></input>
        <button>Access</button>
      </form>
      <div className="video-container">
        <VideoContainer show={initialState.showVideo} >
          <VideoAction 
            data={props}
          />
        </VideoContainer>
      </div>
    </div>
  )
}

export default Video