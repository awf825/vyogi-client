import { API_ROOT } from "../../api-config";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import moment from "moment";
import BookModal from "../book/BookModal";
import { MessageContext, sendMessage } from "../Messaging/MessageContext";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Loader from "../Loader";

const Schedule = (props) => {
  const [schedule, setSchedule] = useState([]);
  const [modalData, setModalData] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [showLessonForm, setShowLessonForm] = useState(false);
  const [calendarView, setCalendarView] = useState('week')
  const [state, dispatch] = useContext(MessageContext);

  const token = localStorage.getItem("token");

  let children;

  Date.prototype.addHours = function (h) {
    this.setTime(this.getTime() + h * 60 * 60 * 1000);
    return this;
  };

  const twentyFourHourClockConvert = (int) => {
    let ap;
    if (int <= 12) {
      ap = "A.M";
    } else {
      ap = "P.M";
      int = int - 12;
    }
    return `${int} o'clock ${ap}`;
  };

  const localizer = momentLocalizer(moment);

  // Modal logic
  const handleSelection = (e) => {
    setModalOpen(true);
    setModalData(e);
  };

  const rejectModal = () => {
    setModalOpen(false);
    setShowLessonForm(false);
    dispatch(sendMessage(""));
  };

  const handleLessonConfirmation = () => {
    setShowLessonForm(true);
  };

  const handleLessonRejection = () => {
    rejectModal();
  };

  // Checks to see if the user is logged in and updates the schedule
  useEffect(() => {
    axios.all([
      axios.get(`${API_ROOT}/calendar`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
      axios.get(`${API_ROOT}/lessonBookings`, {
        headers: { Authorization: `Bearer ${token}` },
      })
    ])
    .then(axios.spread((calendar, lessonBookings) => {
      let calendarPayload = calendar.data;
      let lessonBookingPayload = lessonBookings.data.map(lb => lb.calendarEventId);
      let schedule = [];
      calendarPayload.forEach((p, i) => {
        if (lessonBookingPayload.includes(p.id)) { return }
        let start = new Date(p.start);
        let end = new Date(p.end);
        p.start = start;
        p.end = end;
        p.allDay = false;
        p.cost = 2.0;
        schedule.push(p)
      });
      setSchedule(schedule);
    }));
  }, []);

  // Checks to see if the modal should be opened and puts the correct data in it
  if (modalOpen && modalData) {
    const hour = twentyFourHourClockConvert(modalData.start.getHours());
    const desc = `
        I have a client driven style of teaching; once we meet in the video portal we can discuss
        what exactly you want to get out of it and we can go from there! This 1-on-1 lesson will cost
        $20, will start at ${hour}, and last an hour. We have a 24 hour notice policy for cancellations,
        you can cancel an appointment for any reason from the My Bookings tab in the footer.
      `;
    const title = modalData.title;
    children = {
      title,
      desc,
      oneLesson: { modalData },
      handleLessonConfirmation,
      handleLessonRejection,
      showLessonForm,
    };
  }

  return (
    <div id="schedule" className="schedule">
      {schedule.length > 0 ? (
        <React.Fragment>
          <BookModal
            visible={modalOpen}
            dismiss={rejectModal}
            children={children}
          ></BookModal>
          <Calendar
            localizer={localizer}
            events={schedule}
            className="schedule__calendar"
            selectable={true}
            view={calendarView}
            onView={setCalendarView}
            min={new Date(1970, 1, 1, 8)}
            scrollToTime={new Date(1970, 1, 1, 3)}
            onSelectEvent={(event) => handleSelection(event)}
          />
        </React.Fragment>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Schedule;
