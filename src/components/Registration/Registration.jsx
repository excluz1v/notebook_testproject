import React, { useEffect, useState } from "react";
import RightPart from "../RightPart/RightPart";
import styles from "./registrarion.module.css";
import Error from "../Error/Error";
import {
  changeCategory,
  createUserRequest,
  getIcons,
  getIconswithOffset,
} from "../../requests";
import Input from "./Input/Input";
import Arrow from "./Arrow/Arrow";

export default function Registration(props) {
  let [userData, setUserData] = useState({
    email: "",
    password: "",
    title: "",
    type: "",
    fullName: "",
    avatar: "",
  });
  let [validationError, setError] = useState(null);
  let [urls, setUrls] = useState([]);
  let [category, setcategory] = useState(["office"]);
  let [offset, setOffset] = useState(10);
  let [success, setSuccess] = useState(false);

  //первичная загрузка иконок
  useEffect(() => {
    getIcons("office")
      .then((res) => res.json())
      .then(
        (result) => {
          setUrls(
            result["icons"].map((icon) => {
              return icon.raster_sizes[2].formats[0].preview_url;
            })
          );
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);

  let clickNextButton = () => {
    getIconswithOffset(category, offset + 10, setOffset, setUrls);
    setUserData((prevState) => ({
      ...prevState,
      avatar: "",
    }));
  };
  let clickPrevButton = () => {
    getIconswithOffset(category, offset - 10, setOffset, setUrls);
    setUserData((prevState) => ({
      ...prevState,
      avatar: "",
    }));
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email" || name === "password") {
      setError("");
      setSuccess(false);
    }
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  let createUser = (event) => {
    event.preventDefault();
    createUserRequest(userData, setError, setSuccess);
  };

  //выбор категории
  let pickCategory = (event) => {
    if (userData.avatar)
      document.querySelector(`[src='${userData.avatar}']`).style.border =
        "none";
    setUserData((prevState) => ({
      ...prevState,
      avatar: "",
    }));
    changeCategory(event.target.innerHTML, setUrls);
    setcategory(event.target.innerHTML);
  };
  //выбор аватарки
  let pickAvatar = (event) => {
    if (userData.avatar === "") event.target.style.border = " 1px solid blue";
    else {
      document.querySelector(`[src='${userData.avatar}']`).style.border =
        "none";
      event.target.style.border = " 1px solid blue";
    }
    setUserData((prevState) => ({
      ...prevState,
      avatar: event.target.getAttribute("src"),
    }));
  };
  return (
    <>
      <RightPart>
        <form className={styles.form} onSubmit={(e) => createUser(e)}>
          <h3>Информация об аккаунте</h3>
          <Input
            name="email"
            placeholder="email*"
            value={userData.email}
            onChange={(e) => handleChange(e)}
          />
          <Input
            type="password"
            name="password"
            placeholder="Пароль*"
            value={userData.password}
            onChange={(e) => handleChange(e)}
          />
          <Error error={validationError} />
          <h3>Персональная информация</h3>
          <Input
            name="title"
            placeholder="Название фирмы"
            value={userData.title}
            onChange={(e) => handleChange(e)}
          />
          <Input
            name="type"
            placeholder="Род деятельности"
            value={userData.type}
            onChange={(e) => handleChange(e)}
          />
          <Input
            name="fullName"
            placeholder="ФИО представителя"
            value={userData.fullName}
            onChange={(e) => handleChange(e)}
          />
          <div className={styles.dropdown}>
            <div>Иконка</div>
            <div className={styles.dropinner}>Категория</div>
            <div className={styles.category}>{category}</div>
            <div className={styles.dropdown_content}>
              <span onClick={(event) => pickCategory(event)}>office</span>
              <span onClick={(event) => pickCategory(event)}>avatar</span>
              <span onClick={(event) => pickCategory(event)}>animal</span>
            </div>
          </div>
          <div className={styles.icons}>
            {urls.map((el, index) => (
              <div key={index}>
                <img
                  src={el}
                  alt="icon"
                  onClick={(event) => pickAvatar(event)}
                />
              </div>
            ))}
            {offset > 10 ? (
              <Arrow onClick={clickPrevButton} img="prevArrow" />
            ) : (
              <div> </div>
            )}
            {<Arrow onClick={clickNextButton} img="nextArrow" />}
          </div>
          <button>Подтвердить</button>
        </form>
        {success ? <div className={styles.success}>Аккаунт создан</div> : null}
      </RightPart>
    </>
  );
}
