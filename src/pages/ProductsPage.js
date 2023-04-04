import React from "react";
import styles from "./DashboardPage.module.css";
import classes from "./ProductsPage.module.css";
import dp from "../image/dp.jpg";
import { Link } from "react-router-dom";

const ProductsPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.leftCon}>
        <div className={styles.authorCon}>
          <div className={styles.authorSec}>
            <img className={styles.dp} src={dp} alt="author_dp" />

            <div>
              <p className={styles.name}>Ashraful Hauqe</p>
              <p className={styles.role}>Content Writter</p>
            </div>
          </div>
          <Link className={styles.link} to="/dashboard/edit_profile">
            <div className={styles.btn}>Edit Profile</div>
          </Link>
        </div>

        <div className={styles.optionsCon}>
          <Link className={styles.link} to="/dashboard">
            <p className={styles.options}>Dashboard</p>
          </Link>

          <Link className={styles.link} to="/dashboard/contact">
            <p className={styles.options}>Contact</p>
          </Link>

          <Link className={styles.link} to="/dashboard/products">
            <p className={styles.active}>Products</p>
          </Link>
        </div>
      </div>

      <div className={classes.rightCon}>
        <div className={classes.rContainer}>
          <p className={classes.pTitle}>Products</p>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
