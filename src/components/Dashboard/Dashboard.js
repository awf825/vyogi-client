import React from "react";
import About from "./About";
import Schedule from "./Schedule";
import Video from "../Video";
import Footer from "./Footer";
import UserBookings from "./UserBookings";

export const Dashboard = (props) => {
  const hash = props.location.hash;

  const whatToShow = () => {
    switch (hash) {
      case "#about":
        return <About />;
      case "#schedule":
        return <Schedule />;
      case "#bookings":
        return <UserBookings />;
      case "#video":
        return <Video />;
      default:
        return <About />;
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard__container">{whatToShow()}</div>
      <div className="dashboard__footer">
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
