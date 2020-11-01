import React, {Component} from 'react';
import axios from 'axios';
import Fade from 'react-reveal/Fade';
import ScheduleCalender from './schedule/ScheduleCalender'
import BookModal from './book/BookModal'
import BookModalContent from './book/BookModalContent'

class Schedule extends Component {
  constructor(props) {
    super(props)
    this.state = {
      schedule: [],
      modalData: {},
      modalOpen: false,
      showPayForm: false,
      userLessonIds: []
    }
  }

  componentDidMount() {        
    axios.all([
      axios.get('http://localhost:3001/api/v1/lessons'),
      axios.get(`http://localhost:3001/api/v1/accounts/${this.props.user.account_id}`)
    ])
    .then(responseArr => {
        let evts = []
        responseArr[0].data.map(d => {
          const condition1 = (d["status"] !== "Full/Unavailable")
          if (condition1) {
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
          }
        })
      this.setState({
        schedule: evts,
        userLessonIds: responseArr[1].data.lessons
      })
    });
  }

  handleSelection = (e) => {
    if (this.state.userLessonIds.includes(e.id)) {
      this.rejectModal()
      alert('You are already booked for this time.')
    } else {
      this.setState({
        modalOpen: true,
        modalData: e
      })
    }
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

  render() {
    const { schedule, modalOpen, modalData, showPayForm, userLessonIds } = this.state
    const { user } = this.props

    const message = `This is lesson ${modalData.title}.
    It will start at ${modalData.start} and last an hour. Can you confirm
    this?`

    if (modalOpen && modalData) {
      this.children = (
        <BookModalContent 
          userId={user.id}
          userEmail={user.email}
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
            <ScheduleCalender dates={schedule} handleSelection={this.handleSelection} blacklist={userLessonIds}/>
          </React.Fragment>
        </Fade>
      </div>
    )
  }
}

export default Schedule;