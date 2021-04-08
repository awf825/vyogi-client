import { API_ROOT } from "../api-config.js";
import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import BookModal from "./book/BookModal";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Loader from "./Loader";

const Schedule = (props) => {
  const [schedule, setSchedule] = useState([]);
  const [modalData, setModalData] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [showPayForm, setShowPayForm] = useState(false);

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
    // Can't wipe out this logic //

    // var lessonIds = this.props.account.bookings.map(x => x.lesson_id)
    // if (lessonIds.includes(e.id)) {
    //   this.rejectModal()
    //   alert('You are already booked for this time.')
    // } else {
    //   this.setState({
    //     modalOpen: true,
    //     modalData: e
    //   })
    // }
    setModalOpen(true);
    setModalData(e);
  };

  const rejectModal = () => {
    setModalOpen(false);
    setShowPayForm(false);
  };

  const handleLessonConfirmation = () => {
    setShowPayForm(true);
  };

  const handleLessonRejection = () => {
    rejectModal();
  };

  // Checks to see if the user is logged in and updates the schedule
  useEffect(() => {
    axios
      .get(`${API_ROOT}/calendar`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((resp) => {
        let payload = resp.data;
        payload.forEach((p, i) => {
          let start = new Date(p.start);
          let end = new Date(p.end);
          p.start = start;
          p.end = end;
          p.allDay = false;
          p.cost = 1.2;
        });
        setSchedule(payload);
      })
      .catch((err) => console.log(err));
  }, []);

  // Checks to see if the modal should be opened and puts the correct data in it
  if (modalOpen && modalData) {
    const hour = twentyFourHourClockConvert(modalData.start.getHours());
    const desc = `
        I have a client driven style of teaching; once we meet in the video portal we can discuss
        what exactly you want to get out of it and we can go from there! This 1-on-1 lesson will cost
        $12, will start at ${hour}, and last an hour. We have a 24 hour notice policy for cancellations,
        you can cancel an appointment for any reason from the My Bookings tab in the footer.
      `;
    const title = modalData.title;
    children = {
      title,
      desc,
      oneLesson: { modalData },
      handleLessonConfirmation,
      handleLessonRejection,
      showPayForm,
    };
  }

  return (
    <div
      id="schedule"
      style={{
        background: "lightgrey",
        width: "100%",
        height: "100%",
      }}
    >
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
            style={{
              background: "lightblue",
              border: "solid black 3px",
              borderRadius: "3px",
              height: "70%",
              width: "80%",
              margin: "10%",
            }}
            selectable={true}
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
