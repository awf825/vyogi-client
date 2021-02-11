import React from "react";
import Header from "./Header";

export const Dashboard = (props) => {
  // Since the dashboard is the push point for both authenticated and unauthenticated users
  // (see Header line 23, Login line 43, and App line 17), I refresh the session here. session
  // storage is always filled/wiped out BEFORE Dashboard returns
  const session = !!localStorage.getItem("token");

  return (
    <div className="wrap">
      <Header session={session} />
      <h1>TEST</h1>
      <h1>TEST</h1>
    </div>
  );
};

export default Dashboard;
