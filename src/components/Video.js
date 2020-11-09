import React from 'react'
import axios from 'axios'
import VideoContainer from './video/VideoContainer'
import VideoAction from './video/VideoAction'
import dailyApi from './video/dailyApi'
// import { suid } from 'rand-token';
// import {AuthContext} from '../App'

export const Video = (props) => {
  // const { dispatch } = React.useContext(AuthContext);
  const initialState = {
    showVideo: props.videoRunning,
    codeInput: ""
  }

  const [data, setData] = React.useState(initialState);

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
          // var tkn = suid(16)
          // may not need this dispatch
          // dispatch({
          //   type: "AWAKE",
          //   // eventually pass lesson end here
          //   payload: {
          //     user
          //     videoToken: tkn
          //   }
          // })
          // setData({
          //   ...data,
          //   showVideo: true,
          //   codeInput: ""
          // })
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

  return (
    <div>
      <div className={data.showVideo ? "display-none" : "display-block"}>
        <input
          type="text"
          value={data.codeInput}
          onChange={handleInputChange}
          name="codeInput"
          id="codeInput"
        />
        <button onClick={generateLessonSession}>Access</button>
      </div>
      <div className="video-container">
        <VideoContainer show={data.showVideo} >
          <VideoAction 
            data={props}
          />
        </VideoContainer>
      </div>
    </div>
  )
}

export default Video