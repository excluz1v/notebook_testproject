import React from "react";
import styles from "./RIghtPart.module.css";

export default function RightPart(props) {
  return <div className={styles.rightPart}>{props.children}</div>;
}
