import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header";
import Video from "./components/Video";
import Login from "./components/registrations/Login";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Schedule from "./components/Schedule";
import RegistrationRouter from "./components/Registration/RegistrationRouter";
import RegistrationLogin from "./components/Registration/RegistrationLogin";
import RegistrationSignUp from "./components/Registration/RegistrationSignUp";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          // Login from the header/nav presents the login component
          <Route exact path="/register" component={Login} />
          // Right now, header/nav is always in dashboard but non existent
          elsewhere, // you can play with that if you want
          <Route exact path="/registration" component={RegistrationRouter} />
          <Route
            exact
            path="/registration/login"
            component={RegistrationLogin}
          />
          <Route
            exact
            path="/registration/signup"
            component={RegistrationSignUp}
          />
          <Route exact path="/" render={(props) => <Dashboard {...props} />} />
          <Route exact path="/video" render={(props) => <Video {...props} />} />
          <Route
            exact
            path="/schedule"
            render={(props) => <Schedule session {...props} />}
          />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
