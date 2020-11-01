import React from 'react'

export const VideoContainer = ({show, children}) => {
  const showHideClassName = show ? "video display-block" : "video display-none"

  return (
    <div className={showHideClassName}>
      <div className="video-main">
        {children}
      </div>
    </div>
  )
}

export default VideoContainer