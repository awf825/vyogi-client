import React from 'react'
import BigJoe2 from '../forms/BigJoe2'

const BookModalContent = (props) => {
  const confirm = props.handleLessonConfirmation
  const reject = props.handleLessonRejection
  const reveal = props.showPayForm 
  return (
    <div>
      <div>
        <p>{props.message}</p>
        <input type="button" value="Yes" onClick={confirm}></input>
        <input type="button" value="No" onClick={reject}></input>
      </div>
      {
        reveal ? <BigJoe2 id={props.id}/> : null
      }
    </div>
  )
}

export default BookModalContent