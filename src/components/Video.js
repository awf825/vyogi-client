import React from 'react'
// import {AuthContext} from '../App'
import axios from 'axios'
import VideoContainer from './video/VideoContainer'
import VideoAction from './video/VideoAction'

export const Video = (props) => {
  // const { dispatch } = React.useContext(AuthContext);
  const initialState = {
    showVideo: false,
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
          console.log('go')
          setData({
            ...data,
            showVideo: true,
            codeInput: ""
          })
        } else {
          alert('Code is invalid')
        }
      })
    // get request
    // check current lesson id and access codes/booking ids
      // check for correct access Verify 
      // 1) that the user is attached to the lesson via booking 
      // 2) the access code inputted is attached to the lesson.
    // either redirect the user to the home page or schedule OR display videod
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