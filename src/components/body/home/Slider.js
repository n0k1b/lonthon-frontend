import styles from "./Slider.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useRef } from "react";
import Slider from "react-slick";
import LongCard from "../../UI/LongCard";

import card1 from "../../../image/card1.png";
import card2 from "../../../image/card2.png";
import card3 from "../../../image/card3.png";

const MultipleItems = () => {
  const slider = useRef(null);
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "7vw",
    slidesToShow: 3,
    speed: 500,
    arrows: false,
    responsive: [
      {
        breakpoint: 1160,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <div className={styles.container}>
      <button
        className={styles.arrowPrev}
        onClick={() => slider.current.slickPrev()}
      >
        ←
      </button>
      <button
        className={styles.arrowNext}
        onClick={() => slider.current.slickNext()}
      >
        →
      </button>
      <Slider ref={slider} {...settings}>
        <div>
          <LongCard img={card2} type="Novel" />
        </div>
        <div>
          <LongCard img={card1} type="Poem" />
        </div>
        <div>
          <LongCard img={card3} type="Others" />
        </div>
        <div>
          <LongCard img={card2} type="Novel" />
        </div>
      </Slider>
    </div>
  );
};

export default MultipleItems;
