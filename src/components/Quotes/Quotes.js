import React from "react";
import { Carousel } from "react-bootstrap";
import quotes from "../../data/quotes.json";

const Quotes = () => {
  // The key will have to be changed to an ID
  return (
    <>
      {quotes ? (
        <div className="quotes">
          <Carousel
            className="quotes__carousel"
            controls={false}
            indicators={false}
            fade={true}
          >
            {quotes.map((q) => (
              <Carousel.Item pause={"hover"} interval={500} key={q.year}>
                <h3 className="quotes__quote">
                  {q.quote} - {q.name}, {q.year}
                </h3>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Quotes;
