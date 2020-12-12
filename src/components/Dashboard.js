import React, { useState } from 'react';
import { connect } from 'react-redux';

export const Dashboard = (props) => {
  return (
    <div className="wrap">
      <h1>Welcome</h1>
      <p>{`User details ${props.userDetails}`}</p>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    userDetails: state.login.userDetails
  }
}

export default connect(mapStateToProps, null)(Dashboard);