import React from "react";
import About from "./About";
import Contact from "./Contact";
import Schedule from "./Schedule";
import Video from "./Video";
import Footer from "./Footer";
import LessonForm from "./LessonForm";

export const Dashboard = (props) => {
  // Since the dashboard is the push point for both authenticated and unauthenticated users
  // (see Header line 23, Login line 43, and App line 17), I refresh the session here. session
  // storage is always filled/wiped out BEFORE Dashboard returns
  // const session = !!localStorage.getItem("token");

  return (
    <div className="dashboard">
      <div className="dashboard__container">
        <About />
        <Schedule />
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
