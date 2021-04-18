import React from "react";
import { Carousel } from "react-bootstrap";
import quotes from "../../data/quotes.json";

const Quotes = () => {
  // The key will have to be changed to an ID
  // The interval is how you change the speed at which the quote changes

  // shuffled arr
  let shuffle = quotes.sort(() => Math.random() - 0.5);

  console.log(shuffle);
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
            {shuffle.map((q) => (
              <Carousel.Item pause={"hover"} interval={1000} key={q.id}>
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
