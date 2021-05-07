import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import Quotes from "../Quotes/Quotes";
import { MessageContext, sendMessage } from "../Messaging/MessageContext";

const Footer = () => {
  const [state, dispatch] = useContext(MessageContext);
  const history = useHistory();

  // For the footer to check if there is a user or not
  const token = localStorage.getItem("token");

  const authorizeSelection = (e) => {
    if (!localStorage.getItem("token")) {
      e.preventDefault();
      dispatch(sendMessage("Please Sign In!"));
      history.push({
        pathname: "/message",
        openModal: true,
        head: "Error",
      });
    }
  };

  // The Footer anchor tags are used for the horizontal scroll effect.  If we use Links the horizontal scroll will not function

  // A link will bring up the full component out of the dashboard
  // While the anchor tag will scroll to the correct component inside the dashboard component

  return (
    <div className="footer">
      <div className="footer__links">
        <ul className="footer__list">
          <li className="footer__list__item">
            <a className="footer__link" href="#about">
              Home
            </a>
          </li>
          <li className="footer__list__item">
            <a
              className="footer__link"
              href="#schedule"
              onClick={(e) => authorizeSelection(e)}
            >
              Schedule
            </a>
          </li>
          <li className="footer__list__item">
            <a
              className="footer__link"
              href="#bookings"
              onClick={(e) => authorizeSelection(e)}
            >
              My Bookings
            </a>
          </li>
          <li className="footer__list__item">
            <a
              className="footer__link"
              href="#video"
              onClick={(e) => authorizeSelection(e)}
            >
              Video
            </a>
          </li>
          <li className="footer__list__item">
            {token ? (
              <Link
                className="footer__link"
                to={{
                  pathname: "/registration/signout",
                  openModal: true,
                }}
              >
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

      <Quotes />
    </div>
  );
};

export default Footer;
