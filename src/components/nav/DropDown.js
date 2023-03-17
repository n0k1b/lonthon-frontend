import React from "react";
import styles from "./DropDown.module.css";

const DropDown = (props) => {
  return (
    <div className={styles.container}>
      {props.links.map((link) => (
        <div className={styles.item}>{link}</div>
      ))}
    </div>
  );
};

export default DropDown;
