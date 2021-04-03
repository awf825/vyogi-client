import React from "react";
import Loader from "./Loader";
import { useHistory } from "react-router-dom";

const Redirect = () => {
  const history = useHistory();
  const loading = () => {
    setTimeout(() => {
      return <Loader />;
    }, 100);
    history.push("/");
  };

  return <>{loading()}</>;
};

export default Redirect;
