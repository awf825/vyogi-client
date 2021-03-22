import React from "react";
import {
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoSnapchat,
} from "react-icons/io";

const About = () => {
  return (
    <div className="about" id="about">
      <div className="about__main">
        <div className="about__img"></div>
        <h2 className="about__instructor">Hi I’m Alanna!</h2>
        <p className="about__text">
          My first experience with yoga was all the way back in elementary
          school when I found a Rodney Yee DVD at the mall and decided to give
          it a try. From that point on I dabbled here and there, but once I hit
          high school found that I was intimidated by the competitive
          environment of many yoga studios. It wasn’t until a couple years ago,
          when I was living in New York City, that I began to practice seriously
          again. I turned to yoga as a way to calm down in the hectic
          environment, and this time it really stuck! I decided that yoga had
          such a positive impact on her wellbeing that I had to share with
          others. Last year I headed to the Kripalu Center to get her 200 hour
          certification, drawn to the Kripalu style due to its emphasis on
          compassion and inclusiveness. I believe yoga is truly for everybody
          regardless of size, age, background, or athletic ability and I try to
          live and teach by Swami Kripalu’s words: “The highest form of
          spiritual practice is self-observation without judgement.” When I’m
          not practicing yoga, you can find me cooking, reading, playing piano,
          (attempting) to learn new languages, or watching Real Housewives.
        </p>
        <ul className="about__list">
          <li className="about_item">
            <a
              className="about__link"
              href="https://www.facebook.com/alanna.flynn.54"
            >
              <IoLogoFacebook className="about__icon about__fb" />
            </a>
          </li>
          <li className="about_item">
            <a className="about__link" href="/">
              <IoLogoInstagram className="about__icon about__insta" />
            </a>
          </li>
          <li className="about_item">
            <a className="about__link" href="/">
              <IoLogoSnapchat className="about__icon about__snap" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default About;
