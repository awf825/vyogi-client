let backendHost;

const hostname = window && window.location && window.location.hostname

if(hostname === 'localhost') {
  backendHost = 'http://localhost:3001'
} else if (hostname === 'yoga-frontend.herokuapp.com') {
  backendHost = 'https://glacial-falls-04883.herokuapp.com'
}

export const API_ROOT = backendHost;