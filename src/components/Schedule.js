import React, {Component} from 'react';
import {Link} from 'react-router-dom';
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
      modalOpen: false,
      modalData: {},
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3001/lessons', {withCredentials: true})
    .then(resp => {
      let evts = []
      resp.data.map(d => {
        evts.push(
          {
            id: d["id"],
            allDay: false,
            start: new Date(d["start"]),
            end: new Date(d["start"]),
            title: d["title"]
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
    console.log('stall')
  }

  rejectModal = (e) => {
    this.setState({
      modalInputName: "",
      modalOpen: false
    }) 
  }

  // SOME POINT IN THIS COMPONENT

  //// ONLY COMMIT CHARGE, BOOKING AND SCHEDULE ONCE USER SUBMITS
  //// FORM IN BOOK COMPONENT!!! !!!BUT NEED TO FIND A WAY TO HOLD ON TO SCHEDULE OBJ
  //// ONCE BOOK LINK IS SELECTED SO FULL BOOKING CAN BE BUILT IN
  //// THE BACK END 

  render() {
    const { schedule, modalOpen, modalData } = this.state
    if (modalOpen && modalData) {
      this.children = (
        <BookModalContent data={modalData}/>
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

{/* <Link to="/book", state: {schedule={s}}>Book</Link>
<Link to={{
  pathname: "/book",
  state: {
    lesson: s
  }
}}>Book</Link> */}

export default Schedule;