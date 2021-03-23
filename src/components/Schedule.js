import { API_ROOT } from "../api-config.js";
import React, { Component } from "react";
import axios from "axios";
import moment from "moment";
import BookModal from "./book/BookModal";
import BookModalContent from "./book/BookModalContent";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Loader from "./Loader";

Date.prototype.addHours = function (h) {
  this.setTime(this.getTime() + h * 60 * 60 * 1000);
  return this;
};

class Schedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      schedule: [],
      modalData: {},
      modalOpen: false,
      showPayForm: false,
    };
  }

  componentDidMount() {
    // const url = `${API_ROOT}/lessons`
    const url = `${API_ROOT}/calendar`
    const token = localStorage.getItem("token");
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((resp) => {
        //debugger
        // 0.8 = $8 in stripe
        var payload = resp.data;
        console.log("axios.get(`${API_ROOT}/lessons`:", payload);
        payload.forEach((p, i) => {
          var start = new Date(p.start);
          var end = new Date(p.end)
          p.start = start;
          p.end = end;
          p.allDay = false;
          p.cost = 0.8;
        });
        this.setState({
          schedule: payload,
        });
      })
      .catch((err) => {
        console.log("SCHEDULE ERROR:", err);
      });
  }

  handleSelection = (e) => {
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
    this.setState({
      modalOpen: true,
      modalData: e,
    });
  };

  rejectModal = () => {
    this.setState({
      modalOpen: false,
      showPayForm: false,
    });
  };

  handleLessonConfirmation = () => {
    this.setState({
      showPayForm: true,
    });
  };

  handleLessonRejection = () => {
    this.rejectModal();
  };

  twentyFourHourClockConvert = (int) => {
    let ap;
    if (int <= 12) {
      ap = 'A.M';
    } else {
      ap = 'P.M'
      int = int-12
    }
    return `${int} o\' clock ${ap}` 
  }

  render() {
    const { schedule, modalOpen, modalData, showPayForm } = this.state;
    const localizer = momentLocalizer(moment);
    if (modalOpen && modalData) {
      const hour = this.twentyFourHourClockConvert(modalData.start.getHours());
      const desc = `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim 
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo 
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum 
        dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
        sunt in culpa qui officia deserunt mollit anim id est laborum
      `;
      const message = `
        This lesson will start at ${hour} and last an hour.
      `;
      this.children = (
        <BookModalContent
          header = {modalData.title}
          desc={desc}
          message={message}
          oneLesson={modalData}
          handleLessonConfirmation={this.handleLessonConfirmation}
          handleLessonRejection={this.handleLessonRejection}
          showPayForm={showPayForm}
        />
      );
    }
    return (
      <div>
        {schedule.length > 0 ? (
          <React.Fragment>
            <BookModal
              visible={modalOpen}
              dismiss={this.rejectModal}
              children={this.children}
            ></BookModal>
            <Calendar
              localizer={localizer}
              events={schedule}
              style={{ height: 800 }}
              selectable={true}
              onSelectEvent={(event) => this.handleSelection(event)}
            />
          </React.Fragment>
        ) : (
          <Loader />
        )}
      </div>
    );
  }
}

export default Schedule;
