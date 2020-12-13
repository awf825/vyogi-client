import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import App from './App';
import { Provider } from 'react-redux'
import ConfigStore from './store/ConfigStore'

const ProviderComponent = () => {
  const store = ConfigStore();
  return (
    <Provider store={store}>
      <App/>
    </Provider>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <ProviderComponent />
  </React.StrictMode>,
  document.getElementById('root')
)

// ReactDOM.render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </React.StrictMode>,
//   document.getElementById('root')
// );


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
