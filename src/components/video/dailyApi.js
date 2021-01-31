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
  const user = sessionStorage.getItem('user');
  const token = sessionStorage.getItem('token');
  let options = {
  	method: 'POST',
  	headers: {
  		Authorization: `Bearer ${token}`
  	},
  	body: JSON.stringify({
  		user: user
  	})
  };

  let response = await fetch(newRoomEndpoint, options),
  	room = await response.json()

  return room;
}

export default { createRoom };