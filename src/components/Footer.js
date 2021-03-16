import React from "react";
import { Link, useHistory } from "react-router-dom";
import { signout } from "./Registration/RegistrationAuth";

const Footer = () => {
  const history = useHistory();

  // For the footer to check if there is a user or not
  const user = localStorage.getItem("token");

  const logout = () => {
    signout(() => history.push("/"));
  };

  const authorizeSelection = (e) => {
    if (!localStorage.getItem("token")) {
      e.preventDefault();
      alert("Please Sign In!");
      return history.push("/");
    }
  };

  return (
    <div className="footer">
      <div className="footer__links">
        <ul className="footer__list">
          <li className="footer__list__item">
            <Link className="footer__link" to="/">
              Home
            </Link>
          </li>
          <li className="footer__list__item">
            <Link
              className="footer__link"
              to="/video"
              onClick={(e) => authorizeSelection(e)}
            >
              Video
            </Link>
          </li>
          <li className="footer__list__item">
            <Link
              className="footer__link"
              to="/schedule"
              onClick={(e) => authorizeSelection(e)}
            >
              Schedule
            </Link>
          </li>
          <li className="footer__list__item">
            {user ? (
              <Link className="footer__link" to="/" onClick={logout}>
                Sign Out
              </Link>
            ) : (
              <Link className="footer__link" to="/registration">
                Sign Up / Sign In
              </Link>
            )}
          </li>
        </ul>
      </div>

      <div className="footer__copy">
        <p className="footer__paragraph">
          &copy; Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
          sodales quis lacus et dictum. Ut congue, lorem sit amet egestas
          laoreet, ligula velit.
        </p>
      </div>
    </div>
  );
};

export default Footer;
