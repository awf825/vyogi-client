let backendHost;
let originalHost = 'http://localhost:3001';

const hostname = window && window.location && window.location.hostname;

originalHost = 'http://localhost:3001';

if(hostname === 'localhost') {
  backendHost = 'http://localhost:3090'
} else if (hostname === 'www.yogastaging.net') {
  backendHost = 'https://vyogi-two.herokuapp.com'
} else if (hostname === 'www.yogawithlan.com') {
  backendHost = 'https://api.yogastaging.net'
};

const API_ROOT = backendHost;
// run rails from my machine if I need to
const RAILS_ROOT = originalHost;

export {
	API_ROOT,
	RAILS_ROOT
} 
