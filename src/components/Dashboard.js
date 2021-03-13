import React from "react";
import Quotes from "./Quotes/Quotes";
import About from "./About";
import Contact from "./Contact";
import Schedule from "./Schedule";
import Footer from "./Footer";

export const Dashboard = (props) => {
  // Since the dashboard is the push point for both authenticated and unauthenticated users
  // (see Header line 23, Login line 43, and App line 17), I refresh the session here. session
  // storage is always filled/wiped out BEFORE Dashboard returns
  const session = !!localStorage.getItem("token");

  return (
    <div>
      <Quotes />
      <div className="dashboard__container">
        <About />
        <Contact />
        <Schedule />
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
