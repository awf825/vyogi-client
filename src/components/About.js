import React from "react";
import {
  IoLogoFacebook,
  IoLogoInstagram,
  IoIosMail,
  IoMdCall,
} from "react-icons/io";

const About = () => {
  return (
    <div className="about">
      <h1 className="about__heading">About Us</h1>
      <div className="about__main">
        <div className="about__img"></div>
        <h2 className="about__instructor">Testname & Test</h2>
        <p className="about__text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
          ut augue vel nisl gravida sagittis. Donec sollicitudin egestas orci,
          et dignissim ex commodo ut. Donec scelerisque hendrerit risus et
          maximus. Nam et dictum magna. Donec ac suscipit ex. Donec suscipit
          lorem ac ex volutpat, sit amet bibendum velit elementum. Quisque
          mattis scelerisque dolor, sit amet eleifend mauris efficitur vitae. In
          ut erat quis odio vulputate lobortis id ut lorem. Sed sit amet arcu in
          odio mattis malesuada. Curabitur porta, magna at vestibulum eleifend,
          risus est tincidunt erat, id venenatis urna elit at erat. Phasellus
          rutrum dictum elit sit amet volutpat. Duis ligula dui, scelerisque
          vitae pharetra id, congue dapibus eros. Etiam at odio venenatis,
          commodo odio at, posuere turpis. Phasellus mollis auctor libero, non
          mollis quam dapibus in. Ut eu nisi eget velit laoreet cursus. Fusce at
          dictum justo. Ut ante enim, malesuada dignissim mauris ac, sodales
          rutrum dui. Fusce vitae felis a nibh interdum tempor. Vivamus
          vulputate at augue non molestie. Sed eget eros nisi. Quisque congue,
          libero vel auctor suscipit, turpis nisl tincidunt purus, at tempor
          urna ligula et turpis. Vestibulum ante ipsum primis in faucibus orci
          luctus et ultrices posuere cubilia curae; Nulla ligula ipsum, pharetra
          et congue id, vulputate eu augue. Ut fermentum, lorem eu sollicitudin
          pretium, arcu elit ultricies lacus, et varius quam tortor at enim.
          Aenean purus turpis, sagittis vel ullamcorper sed, volutpat eu purus.
          Cras viverra, diam a aliquet placerat, justo lectus mollis quam, in
          imperdiet enim orci mattis lectus. Pellentesque eu ligula dignissim
          eros mollis tempus id vitae nunc. Nunc eget vulputate neque, a aliquam
          nisi. Suspendisse potenti. Class aptent taciti sociosqu ad litora
          torquent per conubia nostra, per inceptos himenaeos. Donec a elit
          tincidunt, rutrum tellus ac, aliquam elit. Morbi gravida arcu sit amet
          magna lacinia, eget fringilla arcu tincidunt. Donec porttitor turpis
          at lorem rhoncus, ac venenatis mi interdum. Morbi in varius urna.
        </p>
        <ul className="about__list">
          <li className="about_item">
            <a className="about__link" href="#">
              <IoLogoFacebook className="about__icon about__fb" />
            </a>
          </li>
          <li className="about_item">
            <a className="about__link" href="#">
              <IoLogoInstagram className="about__icon about__insta" />
            </a>
          </li>
          <li className="about_item">
            <a className="about__link" href="#">
              <IoIosMail className="about__icon about__mail" />
            </a>
          </li>
          <li className="about_item">
            <a className="about__link" href="#">
              <IoMdCall className="about__icon about__phone" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default About;
