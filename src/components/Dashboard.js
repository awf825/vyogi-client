import React from 'react';
import Header from './Header'

export const Dashboard = (props) => {
  const token = sessionStorage.getItem('token');
  const user = sessionStorage.getItem('user');
  const session = (!!token && !!user)

  return (
    <div className="wrap">
      <Header session={session}/>
      <h1>TEST</h1>
      <h1>TEST</h1>
    </div>
  )
}

export default Dashboard
