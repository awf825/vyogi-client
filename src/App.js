import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import Video from "./components/Video";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Schedule from "./components/Schedule";
import RegistrationRouter from "./components/Registration/RegistrationRouter";
import RegistrationLogin from "./components/Registration/RegistrationLogin";
import RegistrationSignUp from "./components/Registration/RegistrationSignUp";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navigation />
        <Switch>
          <Route exact path="/" render={(props) => <Dashboard {...props} />} />
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
          <Route exact path="/video" render={(props) => <Video {...props} />} />
          <Route
            eact
            path="/schedule"
            render={(props) => <Schedule {...props} />}
          />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
