import { API_ROOT, RAILS_ROOT } from '../api-config.js';
import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment'
import BookModal from './book/BookModal'
import BookModalContent from './book/BookModalContent'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

class Schedule extends Component {
  constructor(props) {
    super(props)
    this.state = {
      schedule: [],
      modalData: {},
      modalOpen: false,
      showPayForm: false
    }
  }

  componentDidMount() {     
    axios.get(`${RAILS_ROOT}/lessons`)
      .then(resp => {
        var evts = resp.data.reduce((arr, lesson) => {
          let obj = {
            id: lesson["id"],
            title: lesson["title"],
            description: lesson["description"],
            start: new Date((lesson["start"]+600) * 1000),
            end: new Date((lesson["start"]+3300) * 1000),
            level: lesson["level"],
            cost: lesson["cost"],
            allDay: false
          }
          arr.push(obj)
          return arr
        }, [])

        this.setState({
          schedule: evts
        })

      });
  }

  handleSelection = (e) => {
    var lessonIds = this.props.account.bookings.map(x => x.lesson_id)
    if (lessonIds.includes(e.id)) {
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
    const { schedule, modalOpen, modalData, showPayForm } = this.state
    const { user, account } = this.props
    const localizer = momentLocalizer(moment)

    const message = `This is lesson ${modalData.title}.
    It will start at ${modalData.start} and last an hour. Can you confirm
    this?`

    if (modalOpen && modalData) {
      this.children = (
        <BookModalContent 
          user={user}
          account={account}
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
        {
          schedule.length > 0 ? (
            <React.Fragment>
              <BookModal
                visible={modalOpen}
                dismiss={this.rejectModal}
                children={this.children} 
              >
              </BookModal>
              <Calendar
                localizer={localizer}
                events={schedule}
                style={{ height: 800 }}
                selectable={true}
                onSelectEvent={event => this.handleSelection(event)}
              />
            </React.Fragment>
          ) : (
            <div>
              <h1>LOADING...</h1>
            </div>
          )
        }
      </div>
    )
  }
}

export default Schedule;