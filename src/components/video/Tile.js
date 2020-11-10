// export default function Tile(props) {
//   const videoEl = useRef(null);
//   const audioEl = useRef(null);

//   /**
//  * When video track and audio track changes, update video srcObject
//  */
//   useEffect(() => {
//     videoEl.current &&
//       (videoEl.current.srcObject = new MediaStream([props.videoTrack]))
//   }, [props.videoTrack])

//   useEffect(() => {
//     audioEl.current &&
//       (audioEl.current.srcObject = new MediaStream([props.audioTrack]));
//   }, [props.audioTrack]);

//   function getVideoComponent() {
//     return (
//       props.videoTrack && <video autoPlay muted playsInline ref={videoEl} />
//     );
//   }

//   function getAudioComponent() {
//     return (
//       !props.isLocalPerson &&
//       props.audioTrack && <audio autoPLay playsInline ref={audioEl} />
//     )
//   }

//   return (
//     <div className={}>
//       {getVideoComponent()}
//       {getAudioComponent()}
//     </div>
//   );
// }