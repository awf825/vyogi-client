import React from "react";

const Loader = () => {
  return (
    <div className="loader">
      <div className="loader__body">
        <div className="loader__text">Loading</div>
        <div className="loader__ring"></div>
        <div className="loader__ring_two"></div>
        <div className="loader__ring_three"></div>
      </div>
    </div>
  );
};

export default Loader;
