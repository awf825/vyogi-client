import React, { Component } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'

const localizer = momentLocalizer(moment)

class ScheduleCalender extends Component {
  constructor(props) {
    super(props)
    this.state = {
      clicked: false
    }
  }
    
  render() {
    console.dir(this)
    console.dir('this.props is', this.props)
    return (
      <div>
        <Calendar
          localizer={localizer}
          events={this.props.dates}
          style={{ height: 800 }}
          selectable={true}
          // selected={event => {
          //   console.log(event)
          // }}
          onSelectEvent={event => this.props.handleSelection(event)}
          // onSelectSlot={this.props.handleSelection}
          // components={{
          //   eventWrapper: CalendarEventWrapper
          // }}
        />
      </div>
    )
  }

} 


export default ScheduleCalender;