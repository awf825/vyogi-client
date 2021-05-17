import { API_ROOT } from '../../api-config.js';

const newRoomEndpoint =
  `${API_ROOT}/video`;

/**
 * - Pass an "exp" (expiration) parameter to the Daily REST endpoint so you
 *   don't end up with a huge number of live rooms.
 *
 * See https://docs.daily.co/reference#create-room for more information on how
 * to use the Daily REST API to create rooms.
 */

async function createRoom() {
  const user = localStorage.getItem('_id');
  const token = localStorage.getItem('token');
  let options = {
  	method: 'POST',
  	headers: {
  		Authorization: `Bearer ${token}`
  	},
  	body: JSON.stringify({
  		user: user
  	})
  };

  // call to backend is made here
  let response = await fetch(newRoomEndpoint, options),
  	payload = await response.json()

  // if (response && payload) {
  //   debugger
  //   console.log('payload.bucket:', payload.bucket)
  //   return payload.room
  // } else {
  //   alert("You are not authorized to perform this action.")
  //   return new Error()
  // }

  if (payload.message) {
    alert(payload.message)
    return undefined
  } else {
    console.log('payload.bucket:', payload.bucket)
    return payload.room
  }
}

export default { createRoom };