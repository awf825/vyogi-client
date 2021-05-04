import React, { useReducer } from "react";
import About from "./About";
import Schedule from "./Schedule";
import Video from "../Video";
import Footer from "./Footer";
import UserBookings from "./UserBookings";
import { videoReducer, CallObjectContext } from "../Videos/VideoContext";
import Videos from "../Videos/Video";

export const Dashboard = (props) => {
  const [state, dispatch] = useReducer(videoReducer, false);
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
      case "#testing":
        return <Videos />;
      default:
        return <About />;
    }
  };

  return (
    <CallObjectContext.Provider value={[state, dispatch]}>
      <div className="dashboard">
        <div className="dashboard__container">{whatToShow()}</div>
        <div className="dashboard__footer">
          <Footer />
        </div>
      </div>
    </CallObjectContext.Provider>
  );
};

export default Dashboard;
