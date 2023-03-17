import React from "react";
import { Link } from "react-router-dom";
import styles from "./LiteratureSection.module.css";
import MultipleItems from "./Slider";

const LiteratureSection = () => {
  return (
    <div>
      <div className={styles.titleCon}>
        <p className={styles.title}>Literature</p>
        <Link className={styles.link} to="/literature">
          <p className={styles.view_all}>View All</p>
        </Link>
      </div>
      <div className={styles.carausel_section}>
        <MultipleItems />
      </div>
    </div>
  );
};

export default LiteratureSection;
