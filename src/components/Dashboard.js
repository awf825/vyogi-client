import React, { useEffect, useState } from 'react';

export const Dashboard = (props) => {
  var initialState = {
    user: {}
  }

  const [state, setState] = useState(initialState)

  useEffect(() => {
    if (!props.user) {
      return;
    } else {
      console.log('change in props.user')
      setState({
        user: props.user,
      })
    }
  }, [props.user])

  return (
    <div className="wrap">
      <h1>TEST</h1>
      <p>{state.user ? state.user.email : "Loading..."}</p>
      {/* <p>{props.user.email}</p> */}
      {/* <p>{`Hello ${props.user.login.userDetails.user.email}`}</p> */}
    </div>
  )
}

export default Dashboard
