import React from "react";
import { useHistory } from "react-router-dom";
import { signout } from "./RegistrationAuth";

const RegistrationSignout = () => {
  const history = useHistory();

  const logout = () => {
    signout(() => history.push("/"));
  };

  return <>{logout()}</>;
};

export default RegistrationSignout;
