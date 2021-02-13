import React from "react";
import {
  IoLogoFacebook,
  IoLogoInstagram,
  IoIosMail,
  IoMdCall,
} from "react-icons/io";

const SocialFooter = () => {
  // link to telephone href="tel:555-555-5555"
  // link to email href="mailto:email@email.com"
  return (
    <div className="socialFooter">
      <ul className="socialFooter__list">
        <li className="socialFooter__item">
          <a href="#" className="socialFooter__link">
            <IoLogoFacebook className="socialFooter__icon socialFooter__fb" />
          </a>
        </li>
        <li className="socialFooter__item">
          <a href="#" className="socialFooter__link">
            <IoLogoInstagram className="socialFooter__icon socialFooter__insta" />
          </a>
        </li>
        <li className="socialFooter__item">
          <a href="#" className="socialFooter__link">
            <IoIosMail className="socialFooter__icon socialFooter__mail" />
          </a>
        </li>
        <li className="socialFooter__item">
          <a href="#" className="socialFooter__link">
            <IoMdCall className="socialFooter__icon socialFooter__phone" />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default SocialFooter;
