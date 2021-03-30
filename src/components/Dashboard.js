import React from "react";
import About from "./About";
import Contact from "./Contact";
import Schedule from "./Schedule";
import Video from "./Video";
import Footer from "./Footer";
import LessonForm from "./LessonForm";
import UserBookings from "./UserBookings";

export const Dashboard = (props) => {
  return (
    <div className="dashboard">
      <div className="dashboard__container">
        <About />
        <Schedule />
        <UserBookings />
        <Video />
        <Contact />
        <LessonForm />
      </div>
      <div className="dashboard__footer">
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
