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
      <div className="about__main">
        <div className="about__img"></div>
        <h2 className="about__instructor">Hi I’m Alanna!</h2>
        <p className="about__text">
        My first experience with yoga was all the way 
        back in elementary school when I found a Rodney Yee DVD at 
        the mall and decided to give it a try. From that point on 
        I dabbled here and there, but once I hit high school found 
        that I was intimidated by the competitive environment of many 
        yoga studios. It wasn’t until a couple years ago, when I was 
        living in New York City, that I began to practice seriously again. 
        I turned to yoga as a way to calm down in the hectic environment, 
        and <i>this</i> time it really stuck! I decided that yoga had such a 
        positive impact on my wellbeing that I had to share it with others. 
        Drawn to the Kripalu style due to its emphasis on compassion and inclusiveness, 
        I headed to the Kripalu Center in Stockbridge MA to get my 200 hour certification. 
        I believe yoga is for everybody regardless of size, age, background, or athletic ability 
        and I try to live and teach by Swami Kripalu’s words: “The 
        highest form of spiritual practice is self-observation without judgement.” 
        When I’m not practicing yoga, I spend time cooking, reading, 
        playing piano, (attempting) to learn new languages, or 
        watching Real Housewives. 
        </p>
        <ul className="about__list">
          <li className="about_item">
            <a className="about__link" href="https://www.facebook.com/alanna.flynn.54">
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
