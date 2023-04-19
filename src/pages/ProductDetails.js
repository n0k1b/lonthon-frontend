import React from "react";
import styles from "./ProductDetails.module.css";
import Slider from "react-slick";

import author_dp from "../image/author_dp.jpg";
import product_banner from "../image/product_banner.png";
import text_image from "../image/text_image.jpg";

const ProductDetails = () => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div>
      <div className={styles.cover}>
        <div className={styles.coverText}>
          <p className={styles.title}>Novel</p>
          <p className={styles.route}>Literature &gt; Novel</p>
        </div>
      </div>

      <div className={styles.contentSec}>
        <div className={styles.contentBox}>
          <div className={styles.part1}>
            <div className={styles.productData}>
              <p className={styles.productTitle}>Backbone</p>
              <p className={styles.productDes}>
                Lorem ipsum dolor sit amet consectetur. Enim consectetur amet a
                augue. At morbi duis elit aliquet platea. Lorem consequat
                praesent sed nibh eu nisi. Lorem vestibulum ullamcorper rutrum
                et est felis vitae dictum ac. Vitae dolor massa commodo tellus
                id mauris pulvinar. In purus at et non nisl vitae.
              </p>

              <div className={styles.authorSec}>
                <img className={styles.authorDp} src={author_dp} alt="author" />
                <div>
                  <p className={styles.authorName}>Adnan Hasan</p>
                </div>
              </div>

              <div>
                <select className={styles.filterOp} name="download">
                  <option value="" disabled selected>
                    Download With
                  </option>
                  <option value="PDF">PDF</option>
                  <option value="JPG">JPG</option>
                  <option value="PHP">PHP</option>
                </select>
              </div>
            </div>

            <img className={styles.banner} src={product_banner} alt="banner" />
          </div>

          <div className={styles.part2}>
            <div>
              <p className={styles.p2Title}>About</p>
              <p className={styles.p2Text}>
                Lorem ipsum dolor sit amet consectetur. Aliquam at elementum
                suspendisse feugiat. Pellentesque aliquam in ac in nulla. Tellus
                viverra non nulla parturient non consectetur sit.
              </p>
            </div>

            <div>
              <p className={styles.p2Title}>Part 1</p>

              <div>
                <Slider {...settings}>
                  <img className={styles.contentImg} src={text_image} alt="" />
                  <img className={styles.contentImg} src={text_image} alt="" />
                  <img className={styles.contentImg} src={text_image} alt="" />
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
