import React from "react";
import { GrClose } from "react-icons/gr";
import { Modal, Button } from "react-bootstrap";

const AboutModal = ({ visible, dismiss, children }) => {
  return (
    <React.Fragment>
      {children ? (
        <Modal className="modal" show={visible} onHide={dismiss}>
          <Modal.Header>
            <Modal.Title>How To Use This Site</Modal.Title>
            <GrClose className="modal__icon" onClick={dismiss} />
          </Modal.Header>
          <Modal.Body>
            <div className="modal__desc">{children}</div>
            <Button className="modal__submit" onClick={dismiss}>
              Ok
            </Button>
          </Modal.Body>
        </Modal>
      ) : (
        <></>
      )}
    </React.Fragment>
  );
};

const About = () => {
  const [modalOpen, setModalOpen] = React.useState(false);

  const handleAboutClick = () => {
    setModalOpen(true);
  };

  const rejectModal = () => {
    setModalOpen(false);
    // dispatch(sendMessage(""));
  };

  const info = `
          If you're new here, you'll have to hit the Sign Up tab in the footer 
          in order to access my calendar. Once you've done that, go to the Schedule tab 
          and click on an available time slot for a lesson. You'll be prompted to answer
          a few simple questions about yourself, like your name and what you're trying to get out 
          of the lesson. After you're done with that, you'll get a code emailed to you
          that will allow you to access the lesson you booked at the scheduled time. I have
          a 24 hour cancellation policy: you can cancel a lesson for any reason in the My Bookings
          tab.
  `;

  return (
    <div className="about" id="about">
      <div className="about__main">
        <AboutModal
          visible={modalOpen}
          dismiss={rejectModal}
          children={info}
        ></AboutModal>
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
          environment, and <i>this</i> time it really stuck! I decided that yoga
          had such a positive impact on my wellbeing that I had to share it with
          others. Drawn to the Kripalu style due to its emphasis on compassion
          and inclusiveness, I headed to the Kripalu Center in Stockbridge MA to
          get my 200 hour certification. I believe yoga is for everybody
          regardless of size, age, background, or athletic ability and I try to
          live and teach by Swami Kripalu’s words: “The highest form of
          spiritual practice is self-observation without judgement.” When I’m
          not practicing yoga, I spend time cooking, reading, playing piano,
          (attempting) to learn new languages, or watching Real Housewives.
          <br />
        </p>
        <button className="about__btn" onClick={handleAboutClick}>
          HOW TO USE THIS SITE
        </button>
      </div>
    </div>
  );
};

export default About;
