let backendHost;

const hostname = window && window.location && window.location.hostname

if(hostname === 'localhost') {
  backendHost = 'http://localhost:3001'
} else if (hostname === 'www.yogastaging.net') {
  backendHost = 'https://vyogi.herokuapp.com'
}
// else {
//   backendHost = 'https://vyogi.herokuapp.com'
// }

// for static deploying
// const backendHost = 'http://localhost:3001'

export const API_ROOT = backendHost;
