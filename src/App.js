import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header";
import Video from "./components/Video";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Schedule from "./components/Schedule";
import RegistrationRouter from "./components/Registration/RegistrationRouter";
import RegistrationLogin from "./components/Registration/RegistrationLogin";
import RegistrationSignUp from "./components/Registration/RegistrationSignUp";
import SocialFooter from "./components/SocialFooter";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
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
        <SocialFooter />
      </div>
    </BrowserRouter>
  );
}

export default App;
