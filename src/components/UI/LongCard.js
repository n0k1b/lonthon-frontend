import React from "react";
import styles from "./LongCard.module.css";
// import author_dp from "../../image/author_dp.jpg";
import GreyBtn from "../UI/GreyBtn";

// import { HiOutlineHeart, HiHeart } from "react-icons/hi";
// import { useState } from "react";

const LongCard = (props) => {
  // const [liked, setLiked] = useState(false);

  // const likeHandler = () => {
  //   setLiked(!liked);
  // };
  return (
    <div className={styles.container}>
      <div className={styles.imgCon}>
        <img className={styles.img} alt="" src={props.img} />
      </div>
      <div className={styles.contentCon}>
        <div className={styles.text_area}>
          <p className={styles.type}>{props.type}</p>
          <p className={styles.title}>Backbone</p>
          <p className={styles.author2}>Adnan Hasan</p>
          <p className={styles.des}>
            Lorem ipsum dolor sit amet consectetur. Est amet placerat neque
            fermentum nulla facilisis venenatis aliquam pretium. Pharetra sit
            venenatis ornare aliquam ornare amet volutpat.
          </p>
        </div>

        <div className={styles.authorCon}>
          {/* <hr /> */}
          <div className={styles.author_section}>
            {/* <div className={styles.sec}>
              <div className={styles.details}>
                <img className={styles.author_img} alt="" src={author_dp} />
                <p className={styles.name}>Adnan Hasan</p>
              </div>
              {!liked && (
                <HiOutlineHeart
                  className={styles.unlike}
                  onClick={likeHandler}
                />
              )}
              {liked && (
                <HiHeart className={styles.like} onClick={likeHandler} />
              )}
            </div> */}

            <GreyBtn>Read More</GreyBtn>
          </div>
        </div>
      </div>

      <div className={styles.price}>Free</div>
    </div>
  );
};

export default LongCard;
