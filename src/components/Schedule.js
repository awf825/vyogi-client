import React, {Component} from 'react';
import axios from 'axios';
import Fade from 'react-reveal/Fade';
import ScheduleCalender from './schedule/ScheduleCalender'
import BookModal from './book/BookModal'
import BookModalContent from './book/BookModalContent'

class Schedule extends Component {
  constructor(props) {
    super(props)
    const email = props.user.email
    const id = props.user.id
    this.state = {
      schedule: [],
      modalData: {},
      modalOpen: false,
      showPayForm: false,
      userEmail: email,
      userId: id
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3001/api/v1/lessons', {withCredentials: true})
    .then(resp => {
      let evts = []
      resp.data.map(d => {
        evts.push(
          {
            id: d["id"],
            title: d["title"],
            description: d["description"],
            start: new Date(d["start"]),
            end: new Date(d["start"]),
            level: d["level"],
            cost: d["cost"],
            allDay: false
          }
        )
      })

      this.setState({
        schedule: evts
      })
    })
    .catch(er => console.error(er))
  }

  handleSelection = (e) => {
    this.setState({
      modalOpen: true,
      modalData: e
    })
  }

  rejectModal = () => {
    this.setState({
      modalOpen: false,
      showPayForm: false
    }) 
  }

  handleLessonConfirmation = () => {
    this.setState({
      showPayForm: true
    })
  }

  handleLessonRejection = () => {
    this.rejectModal()
  }

  // SOME POINT IN THIS COMPONENT

  //// ONLY COMMIT CHARGE, BOOKING AND SCHEDULE ONCE USER SUBMITS
  //// FORM IN BOOK COMPONENT!!! !!!BUT NEED TO FIND A WAY TO HOLD ON TO SCHEDULE OBJ
  //// ONCE BOOK LINK IS SELECTED SO FULL BOOKING CAN BE BUILT IN
  //// THE BACK END 

  render() {
    const { schedule, modalOpen, modalData, showPayForm, userId, userEmail } = this.state

    const message = `This is lesson ${modalData.title}.
    It will start at ${modalData.start} and last an hour. Can you confirm
    this?`

    if (modalOpen && modalData) {
      this.children = (
        <BookModalContent 
          userId={userId}
          userEmail={userEmail}
          message={message}
          id={modalData.id}
          cost={modalData.cost}
          description={modalData.description}
          start={modalData.start}
          title={modalData.title}
          handleLessonConfirmation={this.handleLessonConfirmation}
          handleLessonRejection={this.handleLessonRejection}
          showPayForm={showPayForm}
        />
      )
    }
    return (
      <div>
        <Fade left>
          <h1>Book Here</h1>
          <React.Fragment>
            <BookModal
              visible={modalOpen}
              dismiss={this.rejectModal}
              children={this.children} 
            >
            </BookModal>
            <ScheduleCalender dates={schedule} handleSelection={this.handleSelection}/>
          </React.Fragment>
        </Fade>
      </div>
    )
  }
}

export default Schedule;