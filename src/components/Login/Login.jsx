import React from "react";
import LoginButton from "../../LoginButton";
import RightPart from "../RightPart/RightPart";
import styles from "./Login.module.css";

export default function Login() {
  return (
    <>
      <RightPart>
        <h3>Или войдите в ваш аккаунт</h3>
        <form className={styles.form}>
          <LoginButton />
        </form>
      </RightPart>
    </>
  );
}
