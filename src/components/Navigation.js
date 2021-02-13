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
  const [open, setOpen] = useState("_start");
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
      {open === "_open" ? (
        <div className="navigation__navbar">
          <div onClick={() => setOpen("_closed")}>
            <IoIosCloseCircleOutline
              className={"navigation__closer" + open}
              title="Close"
            />

            <div className="navigation__scale">
              <Link to="/" className="navigation__links">
                <IoIosHome
                  className={"navigation__icon navigation__home" + open}
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
                  className={"navigation__icon navigation__vid" + open}
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
                  className={"navigation__icon navigation__cal" + open}
                  title="Schedule"
                />
              </Link>
            </div>
            {user ? (
              <div className="navigation__scale">
                <Link to="/" className="navigation__links" onClick={logout}>
                  <IoLogOutOutline
                    className={"navigation__icon navigation__reg" + open}
                    title="Sign Out"
                  />
                </Link>
              </div>
            ) : (
              <div className="navigation__scale">
                <Link to="/registration" className="navigation__links">
                  <IoMdPerson
                    className={"navigation__icon navigation__reg" + open}
                    title="Sign Up / Sign In"
                  />
                </Link>
              </div>
            )}
          </div>
        </div>
      ) : (
        <>
          <div onClick={() => setOpen("_open")}>
            <IoIosMenu
              className={"navigation__opener" + open}
              title="Navigation"
            />
          </div>

          <div className="navigation__scale">
            <Link to="/" className="navigation__links">
              <IoIosHome
                className={"navigation__icon navigation__home" + open}
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
                className={"navigation__icon navigation__vid" + open}
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
                className={"navigation__icon navigation__cal" + open}
                title="Schedule"
              />
            </Link>
          </div>
          {user ? (
            <div className="navigation__scale">
              <Link to="/" className="navigation__links" onClick={logout}>
                <IoLogOutOutline
                  className={"navigation__icon navigation__reg" + open}
                  title="Sign Out"
                />
              </Link>
            </div>
          ) : (
            <div className="navigation__scale">
              <Link to="/registration" className="navigation__links">
                <IoMdPerson
                  className={"navigation__icon navigation__reg" + open}
                  title="Sign Up / Sign In"
                />
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Navigation;
