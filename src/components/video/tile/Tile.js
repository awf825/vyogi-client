import React, { useEffect, useRef } from 'react';
import './Tile.css';
import Loader from '../../Loader'
/**
 * Props
 * - videoTrack: MediaStreamTrack?
 * - audioTrack: MediaStreamTrack?
 * - isLocalPerson: boolean
 * - isLarge: boolean
 * - isLoading: boolean
 * - onClick: Function
 */
export default function Tile(props) {
  const videoEl = useRef(null);
  const audioEl = useRef(null);

  /**
   * When video track changes, update video srcObject
   */
  useEffect(() => {
    videoEl.current &&
      (videoEl.current.srcObject = new MediaStream([props.videoTrack]));
  }, [props.videoTrack]);

  /**
   * When audio track changes, update audio srcObject
   */
  useEffect(() => {
    audioEl.current &&
      (audioEl.current.srcObject = new MediaStream([props.audioTrack]));
  }, [props.audioTrack]);

  // function getLoadingComponent() {
  //   return
  //   // return props.isLoading && <Loader />;
  // }

  function getVideoComponent(classNames) {
    // https://stackoverflow.com/questions/23248441/resizing-video-element-to-parent-div
    const videoClass = classNames.includes("local") ? "local" : "incoming"
    return (
      props.videoTrack && <video className={videoClass} autoPlay muted playsInline ref={videoEl} />
    );
  }

  function getAudioComponent() {
    return (
      !props.isLocalPerson &&
      props.audioTrack && <audio autoPlay playsInline ref={audioEl} />
    );
  }

  function getClassNames() {
    let classNames = 'tile';
    classNames += props.isLarge ? ' large' : ' small';
    //classNames += (props.isLocalPerson ? ' local' : ' incoming');
    props.isLocalPerson && (classNames += ' local');
    return classNames;
  }

  return (
    <div className={getClassNames()} onClick={props.onClick}>
      {getVideoComponent(getClassNames())}
      {getAudioComponent()}
    </div>
  );
}