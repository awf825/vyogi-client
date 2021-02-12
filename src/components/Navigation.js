import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  IoIosMenu,
  IoIosHome,
  IoIosTv,
  IoIosCalendar,
  IoMdPerson,
  IoIosCloseCircleOutline,
} from "react-icons/io";

const Navigation = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="navigation">
      <h1>Nav</h1>
    </div>
  );
};

export default Navigation;
