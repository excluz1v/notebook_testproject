import React, { useState } from "react";
import styles from "./UsersInformation.module.css";

export default function UsersInformation(props) {
  const [succes, setSucces] = useState("");
  const [errors, setErrors] = useState("");
  const { user, userInfo, handleChange, logout, updateUser } = props;
  return (
    <div className={styles.inner}>
      <div className={styles.avatar}>
        <img src={userInfo.avatar} alt="avatar" />
      </div>

      <div className={styles.wrapper}>
        <div className={styles.wrapper__metadata}>
          <div>Название организации</div>
          <div>
            <input
              type="text"
              value={userInfo.title ? userInfo.title : "не указан"}
              onChange={handleChange}
              name="title"
            ></input>
          </div>
          <div>Тип организации</div>
          <div>
            <input
              type="text"
              value={userInfo.type ? userInfo.type : "не указан"}
              onChange={handleChange}
              name="type"
            ></input>
          </div>
          <div>ФИО пользователя</div>
          <div>
            <input
              type="text"
              value={userInfo.fullName ? userInfo.fullName : "не указан"}
              onChange={handleChange}
              name="fullName"
            ></input>
          </div>
        </div>
      </div>
      {succes ? (
        <div className="animate__animated animate__flash">{succes}</div>
      ) : null}
      {errors ? <div>{errors}</div> : null}
      <button
        className={styles.save}
        onClick={() => {
          updateUser(user.sub, userInfo, setSucces, setErrors);
        }}
      >
        сохранить
      </button>
      <button className={styles.quit} onClick={() => logout()}>
        выйти
      </button>
    </div>
  );
}
