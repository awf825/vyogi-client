import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { signout } from "./Registration/RegistrationAuth";
import {
  IoIosMenu,
  IoIosHome,
  IoIosTv,
  IoIosCalendar,
  IoMdPerson,
  IoIosCloseCircleOutline,
} from "react-icons/io";
import { IoLogOutOutline } from "react-icons/io5";

const Navigation = () => {
  const [open, setOpen] = useState(false);
  const history = useHistory();

  // For the nav to check if there is a user or not
  const user = localStorage.getItem("token");

  const logout = () => {
    signout(() => history.push("/"));
  };

  const authorizeSelection = (e) => {
    if (!localStorage.getItem("token")) {
      // this is one way of doing this, but it freezes the button and
      // makes shit look stupid
      e.preventDefault();
      alert("Nuh uh uh!");
      return history.push("/");
    }
  };

  return (
    <div className="navigation">
      {open ? (
        <div className="navigation__navbar">
          <div onClick={() => setOpen(false)}>
            <IoIosCloseCircleOutline
              className="navigation__closer"
              title="Close"
            />

            <div className="navigation__scale">
              <Link to="/" className="navigation__links">
                <IoIosHome
                  className="navigation__icon navigation__home"
                  title="Home"
                />
              </Link>
            </div>

            <div className="navigation__scale">
              <Link
                to="/video"
                onClick={(e) => authorizeSelection(e)}
                className="navigation__links"
              >
                <IoIosTv
                  className="navigation__icon navigation__vid"
                  title="Videos"
                />
              </Link>
            </div>

            <div className="navigation__scale">
              <Link
                to="/schedule"
                onClick={(e) => authorizeSelection(e)}
                className="navigation__links"
              >
                <IoIosCalendar
                  className="navigation__icon navigation__cal"
                  title="Schedule"
                />
              </Link>
            </div>
            {user ? (
              <div className="navigation__scale">
                <Link to="/" className="navigation__links" onClick={logout}>
                  <IoLogOutOutline
                    className="navigation__icon navigation__reg"
                    title="Sign Out"
                  />
                </Link>
              </div>
            ) : (
              <div className="navigation__scale">
                <Link to="/registration" className="navigation__links">
                  <IoMdPerson
                    className="navigation__icon navigation__reg"
                    title="Sign Up / Sign In"
                  />
                </Link>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div onClick={() => setOpen(true)}>
          <IoIosMenu className="navigation__opener" title="Navigation" />
        </div>
      )}
    </div>
  );
};

export default Navigation;
