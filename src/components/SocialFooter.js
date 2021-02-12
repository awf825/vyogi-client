import React from "react";
import {
  IoLogoFacebook,
  IoLogoInstagram,
  IoIosMail,
  IoMdCall,
} from "react-icons/io";

const SocialFooter = () => {
  return (
    <div>
      <h1>social footer</h1>
      <ul>
        <li>
          <IoLogoFacebook />
        </li>
        <li>
          <IoLogoInstagram />
        </li>
        <li>
          <IoIosMail />
        </li>
        <li>
          <IoMdCall />
        </li>
      </ul>
    </div>
  );
};

export default SocialFooter;
