import React from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'

const localizer = momentLocalizer(moment)

const ScheduleCalender = (props) => {
  console.log('props sent to calender are', props)

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={props.dates}
        style={{ height: 800 }}
        selectable={true}
        onSelectSlot={props.handleSelection}
      />
    </div>
  )

}

export default ScheduleCalender;