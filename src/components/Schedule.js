import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Fade from 'react-reveal/Fade';
import ScheduleCalender from './schedule/ScheduleCalender'

class Schedule extends Component {
  constructor(props) {
    super(props)
    this.state = {
      schedule: []
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

  handleSelection = (event) => {
    console.log(event)
  }

  // SOME POINT IN THIS COMPONENT

  //// ONLY COMMIT CHARGE, BOOKING AND SCHEDULE ONCE USER SUBMITS
  //// FORM IN BOOK COMPONENT!!! !!!BUT NEED TO FIND A WAY TO HOLD ON TO SCHEDULE OBJ
  //// ONCE BOOK LINK IS SELECTED SO FULL BOOKING CAN BE BUILT IN
  //// THE BACK END 

  render() {
    const { schedule } = this.state
    console.log('schedule on render', schedule)
    return (
      <div>
        <Fade left>
          <h1>Book Here</h1>
          <ScheduleCalender dates={schedule} handleSelection={this.handleSelection}/>
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