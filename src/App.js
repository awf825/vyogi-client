import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import Dashboard from "./components/Dashboard";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import RegistrationRouter from "./components/Registration/RegistrationRouter";
import RegistrationLogin from "./components/Registration/RegistrationLogin";
import RegistrationSignUp from "./components/Registration/RegistrationSignUp";
import Redirect from "./components/Redirect";

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
          <Route exact path="/redir" component={Redirect} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
