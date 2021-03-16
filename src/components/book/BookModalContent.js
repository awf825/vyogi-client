import React from 'react'
import PayForm from '../stripe/PayForm'

const BookModalContent = (props) => {
  const confirm = props.handleLessonConfirmation
  const reject = props.handleLessonRejection
  const reveal = props.showPayForm 

  return (
    <div>
      <div className="book-modal-landing">
        <p>{props.message}</p>
        <input type="button" class="book-modal-btn" value="Continue" onClick={confirm}></input>
        <input type="button" class="book-modal-btn" value="Back to Calendar" onClick={reject}></input>
      </div>
      {
        reveal ? 
        <PayForm 
          closeModal={reject}
          oneLesson={props.oneLesson}
          // cost={props.cost}
          // description={props.description}
          // start={props.start}
          // title={props.title}
        /> 
        : null
      }
    </div>
  )
}

export default BookModalContent