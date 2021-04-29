import React, { useReducer } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import Dashboard from "./components/Dashboard/Dashboard";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import RegistrationRouter from "./components/Registration/RegistrationRouter";
import RegistrationLogin from "./components/Registration/RegistrationLogin";
import RegistrationSignUp from "./components/Registration/RegistrationSignUp";
import RegistrationSignout from "./components/Registration/RegistrationSignout";
import Message from "./components/Messaging/Message";
import Redirect from "./components/Redirect";
import StripeSuccess from "./components/stripe/StripeSuccess";
import {
  MessageContext,
  messageReducer,
} from "./components/Messaging/MessageContext";

function App() {
  const [state, dispatch] = useReducer(messageReducer, false);

  return (
    <MessageContext.Provider value={[state, dispatch]}>
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => <Dashboard {...props} />}
            />
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
            <Route
              exact
              path="/registration/signout"
              component={RegistrationSignout}
            />
            <Route
              exact
              path="/appointment/success"
              component={StripeSuccess}
            />

            <Route exact path="/message" component={Message} />
            <Route exact path="/redir" component={Redirect} />
          </Switch>
        </div>
      </BrowserRouter>
    </MessageContext.Provider>
  );
}

export default App;
