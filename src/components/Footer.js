import React from "react";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__links">
        <ul className="footer__list">
          <li className="footer__list__item">
            <a className="footer__link" href="#">
              Link 1
            </a>
          </li>
          <li className="footer__list__item">
            <a className="footer__link" href="#">
              Link 2
            </a>
          </li>
          <li className="footer__list__item">
            <a className="footer__link" href="#">
              Link 3
            </a>
          </li>
          <li className="footer__list__item">
            <a className="footer__link" href="#">
              Link 4
            </a>
          </li>
          <li className="footer__list__item">
            <a className="footer__link" href="#">
              Link 5
            </a>
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
