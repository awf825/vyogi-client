import React, { Component } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'

const localizer = momentLocalizer(moment)

class ScheduleCalender extends Component {
  constructor(props) {
    super(props)
  }
    
  render() {
    return (
      <div>
        <Calendar
          localizer={localizer}
          events={this.props.dates}
          style={{ height: 800 }}
          selectable={true}
          onSelectEvent={event => this.props.handleSelection(event)}
        />
      </div>
    )
  }

} 


export default ScheduleCalender;