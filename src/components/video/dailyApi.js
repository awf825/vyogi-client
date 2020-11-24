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
  let response = await fetch(newRoomEndpoint),
  room = await response.json();
  return room;

  // Comment out the above and uncomment the below, using your own URL
  // return { url: "https://your-domain.daily.co/hello" };
}

export default { createRoom };