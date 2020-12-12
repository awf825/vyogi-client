import React, { useState } from 'react';

export const Dashboard = (props) => {
  return (
    <div className="wrap">
      <h1>Welcome</h1>
      <p>{`Hello ${props.user.login.userDetails.user.email}`}</p>
    </div>
  )
}

export default Dashboard