let backendHost;

const hostname = window && window.location && window.location.hostname

if(hostname === "localhost") {
  backendHost = 'http://localhost:3001'
}

export const API_ROOT = backendHost;